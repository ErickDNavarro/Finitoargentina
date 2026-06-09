/**
 * Zonas con páginas SEO dedicadas.
 * Cada entrada genera /tequenos-{slug} en build time via [zona].astro.
 * Pensadas para capturar long-tail "tequeños mayorista [barrio]" sin competencia.
 */

export type Zona = {
  slug: string;
  nombre: string;
  nombreCompleto: string;
  partido: 'CABA' | 'Zona Norte';
  /** 1-2 frases describiendo el rubro local (bares/restaurantes característicos del barrio) */
  pitch: string;
  /** Tiempo estimado de entrega desde Pilar */
  entrega: string;
  /** Barrios/zonas cercanas que también cubrimos (para internal linking) */
  cercanos: string[];
};

export const zonas: Zona[] = [
  {
    slug: 'palermo',
    nombre: 'Palermo',
    nombreCompleto: 'Palermo, CABA',
    partido: 'CABA',
    pitch:
      'El barrio con la densidad más alta de bares y restaurantes de Buenos Aires. Tu local compite con cientos — una entrada bien diferenciada en la carta importa.',
    entrega: '24-48 hs hábiles',
    cercanos: ['Villa Crespo', 'Recoleta', 'Belgrano', 'Colegiales'],
  },
  {
    slug: 'belgrano',
    nombre: 'Belgrano',
    nombreCompleto: 'Belgrano, CABA',
    partido: 'CABA',
    pitch:
      'Barrio gastronómico con público fiel y poder de compra. Restaurantes de barrio y bares de cervecería conviven — los tequeños venezolanos suman tanto a carta de mediodía como a after-office.',
    entrega: '24-48 hs hábiles',
    cercanos: ['Núñez', 'Colegiales', 'Palermo', 'Vicente López'],
  },
  {
    slug: 'vicente-lopez',
    nombre: 'Vicente López',
    nombreCompleto: 'Vicente López, Zona Norte',
    partido: 'Zona Norte',
    pitch:
      'Olivos, Florida, Munro, Carapachay — la franja gastronómica de la avenida Maipú y el corredor Libertador concentra restaurantes y bares con público B2B exigente.',
    entrega: '24 hs hábiles',
    cercanos: ['San Isidro', 'Núñez', 'Belgrano', 'Martínez'],
  },
  {
    slug: 'san-isidro',
    nombre: 'San Isidro',
    nombreCompleto: 'San Isidro, Zona Norte',
    partido: 'Zona Norte',
    pitch:
      'San Isidro centro, Beccar, Martínez, Acassuso, Boulogne. Restaurantes premium y bares de barrio. Catering corporativo activo en zona Bajo San Isidro.',
    entrega: '24 hs hábiles',
    cercanos: ['Vicente López', 'San Fernando', 'Tigre', 'Martínez'],
  },
  {
    slug: 'pilar',
    nombre: 'Pilar',
    nombreCompleto: 'Pilar, Zona Norte',
    partido: 'Zona Norte',
    pitch:
      'Pilar centro, Del Viso, Manuel Alberti, Pilar del Este, La Lonja. Nuestra zona base — entregamos el mismo día. Restaurantes, parrillas y bares de country con eventos privados todo el año.',
    entrega: 'Mismo día',
    cercanos: ['Del Viso', 'Manuel Alberti', 'Escobar', 'Tigre'],
  },
];

export function getZonaBySlug(slug: string): Zona | undefined {
  return zonas.find((z) => z.slug === slug);
}
