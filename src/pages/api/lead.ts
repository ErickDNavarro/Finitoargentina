import type { APIRoute } from 'astro';
import { leadSchema, type FieldErrors } from '@/lib/lead-schema';
import { verifyTurnstile } from '@/lib/turnstile';
import { checkRateLimit } from '@/lib/ratelimit';
import { sendLeadEmail } from '@/lib/resend';
import { getServerEnv } from '@/lib/env';

export const prerender = false;

type ErrorBody = {
  error: {
    code: string;
    message: string;
    fields?: FieldErrors;
  };
};

function jsonError(
  status: number,
  code: string,
  message: string,
  fields?: FieldErrors,
  extraHeaders?: HeadersInit
): Response {
  const body: ErrorBody = { error: { code, message, ...(fields ? { fields } : {}) } };
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...(extraHeaders ?? {}) },
  });
}

function getIp(request: Request, clientAddress?: string): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip') ||
    clientAddress ||
    'unknown'
  );
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError(400, 'INVALID_JSON', 'Cuerpo inválido.');
  }

  const env = getServerEnv();
  const ip = getIp(request, clientAddress);

  // 1. Honeypot — si vino con valor, fingimos éxito y descartamos
  if (typeof payload === 'object' && payload !== null) {
    const hp = (payload as Record<string, unknown>).website;
    if (typeof hp === 'string' && hp.length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }
  }

  // 2. Validación con Zod
  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    const fields: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0];
      if (typeof k === 'string' && !(k in fields)) {
        (fields as Record<string, string>)[k] = issue.message;
      }
    }
    return jsonError(400, 'VALIDATION_ERROR', 'Revisá los campos.', fields);
  }
  const lead = parsed.data;

  // 3. Turnstile (no bloquea si no hay secret configurado)
  const turnstileOk = await verifyTurnstile(
    lead.turnstileToken ?? '',
    env.TURNSTILE_SECRET_KEY,
    ip
  );
  if (!turnstileOk) {
    return jsonError(
      400,
      'TURNSTILE_FAILED',
      'No pudimos verificar que no seas un bot. Recargá y probá de nuevo.'
    );
  }

  // 4. Rate limit por IP
  const rl = checkRateLimit(`lead:${ip}`);
  if (!rl.ok) {
    return jsonError(429, 'RATE_LIMITED', 'Demasiadas solicitudes. Probá en un minuto.', undefined, {
      'Retry-After': String(rl.retryAfterSeconds),
    });
  }

  // 5. Enviar email (si no hay API key, modo dev: log y éxito)
  if (!env.RESEND_API_KEY) {
    console.warn('[lead] RESEND_API_KEY no configurada — lead recibido pero no enviado por email:');
    console.warn(JSON.stringify({ ...lead, turnstileToken: undefined }, null, 2));
    return new Response(JSON.stringify({ ok: true, dev: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  const sent = await sendLeadEmail({
    lead,
    apiKey: env.RESEND_API_KEY,
    from: env.LEAD_FROM_EMAIL,
    to: env.LEAD_TO_EMAIL,
  });

  if (!sent.ok) {
    console.error('[lead] Resend error:', sent.error);
    return jsonError(500, 'INTERNAL_ERROR', 'No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.');
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST' } }), {
    status: 405,
    headers: { 'content-type': 'application/json', allow: 'POST' },
  });
