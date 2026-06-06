import { publicEnv } from './env';

const NUMBER = publicEnv.PUBLIC_WHATSAPP_NUMBER;

function build(text: string): string {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
}

export const whatsappLinks = {
  revendedor: build(
    '¡Hola Finito! Quiero ser revendedor de tequeños. Mi negocio es ___ y estoy en ___.'
  ),
  catering: build(
    '¡Hola Finito! Quiero consultar por catering de tequeños para un evento. La fecha es ___ y somos ___ personas.'
  ),
  general: build('¡Hola Finito! Quiero más información sobre los tequeños.'),
} as const;

export type WhatsappOrigin = keyof typeof whatsappLinks;
