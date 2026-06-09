/**
 * SEO + datos del negocio para schema.org, meta tags y display.
 * Cambios acá impactan al SEO de toda la web.
 */

export const businessInfo = {
  name: 'Finito Argentina',
  alternateName: 'Finito',
  shortName: 'Finito',
  description:
    'Tequeños venezolanos al por mayor para restaurantes, bares y eventos en CABA y Zona Norte. Primer pedido a consignación: sin riesgo, sin stock parado.',
  url: 'https://finitoargentina.com',
  telephone: '+5491155270357',
  /** Email backend — donde llegan los leads del form (Resend → Gmail) */
  email: 'finitoargentina@gmail.com',
  /** Email público principal — aparece en footer y schema (forward a Gmail vía Cloudflare) */
  contactEmail: 'hola@finitoargentina.com',
  /** Email comercial — cerca del CTA revendedor */
  salesEmail: 'ventas@finitoargentina.com',
  /** Email eventos — cerca de catering */
  eventsEmail: 'eventos@finitoargentina.com',
  priceRange: '$$',
  currenciesAccepted: 'ARS',
  paymentAccepted: 'Efectivo, Transferencia, Mercado Pago',
  servesCuisine: 'Venezolana',
  foundingDate: '2024',
  address: {
    locality: 'Pilar',
    region: 'Buenos Aires',
    country: 'AR',
    countryName: 'Argentina',
  },
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const,
    daysHuman: 'Lunes a sábado',
    opens: '09:00',
    closes: '20:00',
    openHuman: '9 a 20 hs',
  },
} as const;

/**
 * Keywords priorizadas (las primeras pesan más en meta keywords).
 */
export const keywords = [
  'tequeños al por mayor',
  'tequeños venezolanos',
  'tequeños mayorista CABA',
  'tequeños Zona Norte',
  'proveedor tequeños Buenos Aires',
  'catering tequeños',
  'tequeños congelados',
  'tequeños Pilar',
  'tequeños CABA',
  'tequeños para bar',
  'tequeños para restaurante',
  'tequeños eventos',
  'tequeños cumpleaños',
  'mayorista tequeños Argentina',
];

/**
 * Zonas de entrega mayorista — alimentan el JSON-LD areaServed
 * y el footer (visible para usuarios + crawlers).
 */
export const areasMayorista = {
  CABA: [
    'Palermo',
    'Belgrano',
    'Núñez',
    'Recoleta',
    'Villa Crespo',
    'Caballito',
    'Colegiales',
    'Chacarita',
    'Villa Urquiza',
    'Almagro',
    'Microcentro',
    'San Telmo',
  ],
  zonaNorte: [
    'Vicente López',
    'Olivos',
    'Florida',
    'Munro',
    'San Isidro',
    'Beccar',
    'Martínez',
    'Acassuso',
    'San Fernando',
    'Tigre',
    'Don Torcuato',
    'Pilar',
    'Del Viso',
    'Manuel Alberti',
    'Escobar',
    'Garín',
    'Ingeniero Maschwitz',
  ],
} as const;

/**
 * Entregas a particulares — más acotado (zona inmediata a la cocina).
 */
export const areasRetail = ['Pilar', 'Del Viso', 'Manuel Alberti'] as const;

export const social = {
  instagram: 'https://instagram.com/finitoargentina',
  instagramHandle: '@finitoargentina',
} as const;

/**
 * Meta SEO base. Se sobrescribe por página vía props del layout.
 */
export const seoMeta = {
  /** ≤60 chars — Google trunca más allá. Keyword first, brand al final. */
  defaultTitle: 'Tequeños al por mayor en CABA y Zona Norte · Finito',
  titleTemplate: '%s · Finito Argentina',
  defaultDescription:
    'Tequeños venezolanos al por mayor para restaurantes, bares y eventos en CABA y Zona Norte. Primer pedido a consignación: sin riesgo, sin stock parado. Cotizá por WhatsApp.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Tequeños venezolanos artesanales — Finito Argentina',
  language: 'es-AR',
  /** Pegá acá el token de Google Search Console cuando lo tengas. Sin tocar nada más. */
  googleSiteVerification: 'x18U-ULyAyIZw4fkR5cfR858dAu79UrBkWSv2LBZwx4',
} as const;
