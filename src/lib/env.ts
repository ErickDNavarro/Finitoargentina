import { z } from 'zod';

const publicSchema = z.object({
  PUBLIC_SITE_URL: z.string().url().default('https://finitoargentina.com'),
  PUBLIC_WHATSAPP_NUMBER: z.string().min(8).default('5491100000000'),
  PUBLIC_INSTAGRAM_URL: z.string().url().default('https://instagram.com/finitoargentina'),
  PUBLIC_TURNSTILE_SITE_KEY: z.string().default('1x00000000000000000000AA'),
});

const serverSchema = z.object({
  RESEND_API_KEY: z.string().optional(),
  LEAD_TO_EMAIL: z.string().email().default('hola@finitoargentina.com'),
  LEAD_FROM_EMAIL: z.string().email().default('web@finitoargentina.com'),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});

export const publicEnv = publicSchema.parse({
  PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
  PUBLIC_WHATSAPP_NUMBER: import.meta.env.PUBLIC_WHATSAPP_NUMBER,
  PUBLIC_INSTAGRAM_URL: import.meta.env.PUBLIC_INSTAGRAM_URL,
  PUBLIC_TURNSTILE_SITE_KEY: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
});

export function getServerEnv() {
  return serverSchema.parse({
    RESEND_API_KEY: import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY,
    LEAD_TO_EMAIL: import.meta.env.LEAD_TO_EMAIL ?? process.env.LEAD_TO_EMAIL,
    LEAD_FROM_EMAIL: import.meta.env.LEAD_FROM_EMAIL ?? process.env.LEAD_FROM_EMAIL,
    TURNSTILE_SECRET_KEY: import.meta.env.TURNSTILE_SECRET_KEY ?? process.env.TURNSTILE_SECRET_KEY,
  });
}
