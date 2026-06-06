export const brand = {
  nombre: 'Finito Argentina',
  tagline: 'Tequeños venezolanos',
  zona: 'CABA + Zona Norte (GBA)',
} as const;

export const hero = {
  eyebrow: 'Tequeños al por mayor · CABA + Zona Norte',
  titulo: 'Tequeños venezolanos de verdad para tu carta.',
  subtitulo:
    'Te dejamos el primer pedido. Lo vendés. Recién ahí nos pagás. Si no rota, lo retiramos — cero deuda, cero stock parado.',
  ctaPrimario: 'Quiero ser revendedor',
  ctaSecundario: 'Lo quiero para un evento',
} as const;

export const consignacion = {
  eyebrow: 'Sin riesgo, en serio',
  titulo: 'Probá Finito sin poner un peso.',
  subtitulo:
    'Sabemos lo que pensás cuando aparece un proveedor nuevo: "¿y si no rota?", "¿y si me quedo con la mercadería?". Por eso el primer pedido te lo dejamos. Pagás solo lo que se vendió.',
  pasos: [
    {
      n: '1',
      titulo: 'Te lo dejamos',
      descripcion:
        'Coordinamos cuánto y qué formato. Te llega congelado, listo para el freidor. No abrís la billetera.',
    },
    {
      n: '2',
      titulo: 'Lo freís y lo vendés',
      descripcion:
        'Sale en 4 minutos. Lo cobrás con tu margen. Ves cómo se mueve con tu gente real, sin presión.',
    },
    {
      n: '3',
      titulo: 'Pagás solo lo que rotó',
      descripcion:
        'Si rota, pedís más. Si no rota, lo retiramos sin drama — cero deuda, cero mercadería parada.',
    },
  ],
  destacado: 'Sin inversión inicial · Sin mínimos imposibles · Sin compromiso',
} as const;

export const porQueFinito = {
  eyebrow: 'Por qué Finito',
  titulo: 'La receta es de la abuela. Literal.',
  texto:
    'No salimos de una fábrica. Es la receta familiar venezolana, la que se pasa de abuela a hijos: masa fina que cruje, queso que estira de verdad, fritura prolija. Tu cliente lo nota en el primer mordisco. Y eso es lo que vuelve a pedir.',
  puntos: [
    'Masa fina que cruje, no gomosa',
    'Queso que estira de verdad',
    'Receta familiar, no industrial',
    'Tamaño parejo, fritura sin grasa',
  ],
} as const;

export const productos_intro = {
  eyebrow: 'Productos',
  titulo: 'Dos tamaños. Tu cliente elige.',
  subtitulo:
    'El grande para entrada de carta. El chico para picada y finger food. Te llegan congelados, listos para el freidor. Si es para evento, los hacemos cocidos.',
  notaPrecio:
    'El precio te lo pasamos por WhatsApp — depende del volumen y de la zona. Sin pose.',
} as const;

export const paraQuien = {
  eyebrow: 'Para quién',
  titulo: '¿Es para vos?',
  segmentos: [
    {
      icono: 'utensils',
      titulo: 'Restaurantes',
      texto:
        'Entrada de carta que sale en 4 minutos del freidor. Margen alto, prep nula, foto que vende.',
      tag: 'mayorista',
    },
    {
      icono: 'beer',
      titulo: 'Bares y cervecerías',
      texto:
        'Picada premium que se come con la mano. Rotación alta en after-office y marida con cualquier cerveza.',
      tag: 'mayorista',
    },
    {
      icono: 'party',
      titulo: 'Eventos y catering',
      texto:
        'Cumpleaños, casamientos, eventos corporativos. Llegan calientes y crocantes, no fritos hace una hora.',
      tag: 'evento',
    },
  ],
} as const;

export const formulario = {
  eyebrow: 'Quiero ser revendedor',
  titulo: 'Mandanos tus datos. Te escribimos hoy.',
  subtitulo:
    'Te contestamos en el día — sin auto-responder de robot. Si preferís hablar ya, escribinos por WhatsApp.',
  privacidad: 'Tus datos quedan acá. No los vendemos, no te llenamos de mails.',
  exitoTitulo: 'Lo recibimos.',
  exitoTexto:
    'Te escribimos hoy o a más tardar mañana, por el medio que nos dejaste. Mientras tanto, espiá @finitoargentina.',
  errorGenerico:
    'No pudimos enviar el formulario. Probá de nuevo o escribinos directo por WhatsApp.',
} as const;

export const catering = {
  eyebrow: 'Catering eventos',
  titulo: '¿Tenés un evento? Llegan recién hechos.',
  texto:
    'Cumpleaños, casamientos, after-office, eventos corporativos. Los tequeños llegan cocidos, calientes, listos para servir — no fritos hace una hora en la cocina del salón. Cotización en el día.',
  cta: 'Lo quiero para mi evento',
} as const;

export const sobreFinito = {
  eyebrow: 'Sobre Finito',
  titulo: 'Una receta venezolana, hecha en Buenos Aires.',
  texto:
    'Empezamos en una cocina venezolana, con la receta que se pasaba de abuela a hijos. Hoy la hacemos en Buenos Aires con la misma vara: masa fina, queso de verdad, sin atajos. No somos una fábrica. Somos una familia que vende lo que come en su propia mesa.',
} as const;

export const socialProof = {
  eyebrow: 'Lo dicen ellos',
  titulo: 'Lugares que ya tienen Finito en su carta.',
  testimonios: [] as Array<{
    nombre: string;
    negocio: string;
    texto: string;
  }>,
} as const;

export const footer = {
  copyright: `© ${new Date().getFullYear()} Finito Argentina.`,
  tagline: 'Tequeños venezolanos. CABA + Zona Norte.',
} as const;
