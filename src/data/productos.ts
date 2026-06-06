export type Presentacion = {
  formato: string;
  unidades: string;
};

export type Producto = {
  id: string;
  nombre: string;
  tamano: string;
  descripcion: string;
  congelado: string[];
  cocido: string[];
  foto?: string;
};

export const productos: Producto[] = [
  {
    id: 'tequeno-grande',
    nombre: 'Tequeño Grande',
    tamano: '15 cm',
    descripcion:
      'El clásico para entrada en carta. Crocante por fuera, queso bien estirable por dentro.',
    congelado: ['x4', 'x20', 'x40'],
    cocido: ['individual'],
    foto: '/fotos/producto-grande.jpg',
  },
  {
    id: 'tequeno-pequeno',
    nombre: 'Tequeño Pequeño',
    tamano: '7,5 cm',
    descripcion:
      'Ideal para finger food, picadas y eventos. Porción justa, se vende rápido.',
    congelado: ['x12', 'x60', 'x120'],
    cocido: ['x12', 'x25'],
    foto: '/fotos/producto-pequeno.jpg',
  },
];
