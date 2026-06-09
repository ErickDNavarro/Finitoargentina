import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(180),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Finito Argentina'),
    /** Tag principal (uno solo, para el chip visual) */
    tag: z.enum(['Mayorista', 'Cocina', 'Eventos', 'Origen', 'Negocio']),
    /** Imagen de cover (path desde public/) */
    cover: z.string().optional(),
    /** Foto alt para accesibilidad */
    coverAlt: z.string().optional(),
    /** Tiempo estimado de lectura en minutos */
    readingMinutes: z.number().int().positive().default(4),
    /** Si true, no aparece en el index */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
