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
    `(enviado desde finitoargentina.com.ar el ${fechaFmt})`,
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
      Enviado desde finitoargentina.com.ar · ${escapeHtml(fechaFmt)}
    </p>
  </div>
</body>
</html>`.trim();

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: lead.contacto.includes('@') ? lead.contacto : undefined,
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
