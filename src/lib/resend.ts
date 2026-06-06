import { Resend } from 'resend';
import type { LeadInput } from './lead-schema';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmtFecha(d: Date): string {
  return d.toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

function isEmail(s: string): boolean {
  return s.includes('@') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

type SendLeadParams = {
  lead: LeadInput;
  apiKey: string;
  from: string;
  to: string;
  fecha?: Date;
};

export async function sendLeadEmail({
  lead,
  apiKey,
  from,
  to,
  fecha = new Date(),
}: SendLeadParams): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = new Resend(apiKey);
  const mensaje = lead.mensaje?.trim() || '—';
  const fechaFmt = fmtFecha(fecha);

  const subject = `Nuevo revendedor interesado — ${lead.negocio}`;

  const text = [
    `Nombre:    ${lead.nombre}`,
    `Negocio:   ${lead.negocio} (${lead.tipo})`,
    `Zona:      ${lead.zona}`,
    `Contacto:  ${lead.contacto}`,
    `Mensaje:   ${mensaje}`,
    '',
    `(enviado desde finitoargentina.com el ${fechaFmt})`,
  ].join('\n');

  const html = `
<!doctype html>
<html lang="es">
<body style="background:#1A1A1A;font-family:Archivo,system-ui,sans-serif;color:#EEE2C8;padding:24px;margin:0;">
  <div style="max-width:560px;margin:auto;background:#242424;border:1px solid #3A3A3A;border-radius:12px;padding:32px;">
    <h1 style="color:#FBB03B;font-family:'Archivo Black',Arial,sans-serif;font-size:22px;margin:0 0 4px 0;text-transform:uppercase;">Nuevo revendedor</h1>
    <p style="color:#A8A29A;font-size:14px;margin:0 0 24px 0;">${escapeHtml(lead.negocio)}</p>

    <table cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;line-height:1.5;">
      <tr><td style="padding:6px 0;color:#A8A29A;width:110px;">Nombre</td><td style="padding:6px 0;color:#FFFFFF;font-weight:600;">${escapeHtml(lead.nombre)}</td></tr>
      <tr><td style="padding:6px 0;color:#A8A29A;">Negocio</td><td style="padding:6px 0;color:#FFFFFF;font-weight:600;">${escapeHtml(lead.negocio)} <span style="color:#FBB03B;">(${escapeHtml(lead.tipo)})</span></td></tr>
      <tr><td style="padding:6px 0;color:#A8A29A;">Zona</td><td style="padding:6px 0;color:#FFFFFF;font-weight:600;">${escapeHtml(lead.zona)}</td></tr>
      <tr><td style="padding:6px 0;color:#A8A29A;">Contacto</td><td style="padding:6px 0;color:#FFFFFF;font-weight:600;">${escapeHtml(lead.contacto)}</td></tr>
      <tr><td style="padding:6px 0;color:#A8A29A;vertical-align:top;">Mensaje</td><td style="padding:6px 0;color:#EEE2C8;">${escapeHtml(mensaje).replace(/\n/g, '<br>')}</td></tr>
    </table>

    <p style="margin:28px 0 0 0;padding-top:18px;border-top:1px solid #3A3A3A;color:#A8A29A;font-size:12px;">
      Enviado desde finitoargentina.com · ${escapeHtml(fechaFmt)}
    </p>
  </div>
</body>
</html>`.trim();

  try {
    const { error } = await resend.emails.send({
      from: `Finito Argentina <${from}>`,
      to,
      subject,
      text,
      html,
      replyTo: isEmail(lead.contacto) ? lead.contacto : undefined,
    });
    if (error) return { ok: false, error: error.message ?? 'Resend error' };
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Unknown error',
    };
  }
}

type SendConfirmationParams = {
  lead: LeadInput;
  apiKey: string;
  from: string;
  replyTo: string;
  whatsappNumber: string;
  instagramUrl: string;
};

/**
 * Auto-respuesta al lead confirmando la recepción.
 * Solo se manda si el contacto es un email válido.
 * Si falla, no es bloqueante — el lead a la empresa ya quedó capturado.
 */
export async function sendLeadConfirmation({
  lead,
  apiKey,
  from,
  replyTo,
  whatsappNumber,
  instagramUrl,
}: SendConfirmationParams): Promise<{ ok: true } | { ok: false; error: string; skipped?: boolean }> {
  // Si no es email, salimos en silencio
  if (!isEmail(lead.contacto)) {
    return { ok: false, error: 'contacto no es email', skipped: true };
  }

  const resend = new Resend(apiKey);
  const nombre = firstName(lead.nombre);
  const waLink = `https://wa.me/${whatsappNumber}`;
  const waDisplay = `+${whatsappNumber.replace(/^(\d{2})(\d{1})(\d{2})(\d{4})(\d{4}).*/, '$1 $2 $3 $4-$5')}`;

  const subject = 'Recibimos tu consulta — Finito Argentina';

  const text = [
    `Hola ${nombre},`,
    '',
    `Gracias por escribirnos. Recibimos tu consulta para sumar ${lead.negocio} como revendedor.`,
    '',
    'Te contactamos en menos de 24 hs hábiles por el medio que nos dejaste.',
    '',
    'Mientras tanto, podés:',
    `  • Escribirnos por WhatsApp: ${waDisplay}`,
    `  • Seguirnos en Instagram: ${instagramUrl}`,
    '',
    'Saludos,',
    'Finito Argentina',
    '',
    '— Este es un mensaje automático. Si querés respondernos, hacelo a este mismo email.',
  ].join('\n');

  const html = `
<!doctype html>
<html lang="es">
<body style="background:#F7F1E4;font-family:Archivo,system-ui,sans-serif;color:#1A1A1A;padding:24px;margin:0;">
  <div style="max-width:560px;margin:auto;background:#FFFFFF;border:1px solid #E2D3B2;border-radius:14px;overflow:hidden;">
    <div style="background:#1A1A1A;padding:28px 32px;text-align:center;">
      <div style="font-family:'Archivo Black',Arial,sans-serif;color:#FBB03B;font-size:24px;letter-spacing:0.06em;text-transform:uppercase;line-height:1;">FINITO</div>
      <div style="color:#A8A29A;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin-top:6px;">Argentina</div>
    </div>

    <div style="padding:36px 32px;">
      <h1 style="font-family:'Archivo Black',Arial,sans-serif;font-size:22px;color:#1A1A1A;margin:0 0 18px;text-transform:uppercase;letter-spacing:-0.01em;line-height:1.15;">
        Recibimos tu consulta
      </h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#333333;">
        Hola <strong>${escapeHtml(nombre)}</strong>,
      </p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#333333;">
        Gracias por escribirnos. Recibimos tu consulta para sumar <strong>${escapeHtml(lead.negocio)}</strong> como revendedor.
      </p>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.55;color:#333333;">
        Te contactamos en <strong>menos de 24 hs hábiles</strong> por el medio que nos dejaste.
      </p>

      <div style="background:#F7F1E4;border:1px solid #E2D3B2;border-radius:10px;padding:20px;margin:24px 0;">
        <div style="font-family:'Archivo Black',Arial,sans-serif;font-size:12px;color:#1A1A1A;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px;">Mientras tanto</div>
        <p style="margin:0 0 10px;font-size:15px;color:#333333;line-height:1.4;">
          <span style="color:#C9871F;font-weight:bold;">→</span>
          <a href="${waLink}" style="color:#1A1A1A;text-decoration:none;font-weight:600;border-bottom:1px solid #FBB03B;">Escribinos por WhatsApp</a>
          <span style="color:#999999;">· ${escapeHtml(waDisplay)}</span>
        </p>
        <p style="margin:0;font-size:15px;color:#333333;line-height:1.4;">
          <span style="color:#C9871F;font-weight:bold;">→</span>
          <a href="${instagramUrl}" style="color:#1A1A1A;text-decoration:none;font-weight:600;border-bottom:1px solid #FBB03B;">Seguinos en Instagram</a>
          <span style="color:#999999;">· @finitoargentina</span>
        </p>
      </div>

      <p style="margin:24px 0 0;font-size:14px;color:#666666;line-height:1.4;">
        Saludos,<br/>
        <strong style="color:#1A1A1A;">Finito Argentina</strong>
      </p>
    </div>

    <div style="background:#F7F1E4;padding:18px 32px;border-top:1px solid #E2D3B2;">
      <p style="margin:0;font-size:11px;color:#888888;line-height:1.5;text-align:center;">
        Este es un mensaje automático. Si querés respondernos, hacelo a este mismo email — te llega directo a la casilla del equipo.
      </p>
    </div>
  </div>
</body>
</html>`.trim();

  try {
    const { error } = await resend.emails.send({
      from: `Finito Argentina <${from}>`,
      to: lead.contacto,
      subject,
      text,
      html,
      replyTo,
    });
    if (error) return { ok: false, error: error.message ?? 'Resend error' };
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Unknown error',
    };
  }
}
