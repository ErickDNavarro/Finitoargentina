import { z } from 'zod';

const phoneRegex = /^[\d\s+()\-./]{8,20}$/;

const contactoValido = (v: string) =>
  z.string().email().safeParse(v).success || phoneRegex.test(v);

export const leadSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'Mínimo 2 caracteres')
    .max(80, 'Máximo 80 caracteres'),
  negocio: z
    .string()
    .trim()
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  tipo: z.enum(['restaurante', 'bar', 'otro'], {
    errorMap: () => ({ message: 'Elegí una opción' }),
  }),
  zona: z
    .string()
    .trim()
    .min(2, 'Indicá tu zona')
    .max(80, 'Máximo 80 caracteres'),
  contacto: z
    .string()
    .trim()
    .min(5, 'Email o teléfono inválido')
    .max(120, 'Máximo 120 caracteres')
    .refine(contactoValido, 'Email o teléfono inválido'),
  mensaje: z
    .string()
    .trim()
    .max(800, 'Máximo 800 caracteres')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  website: z.string().max(0).optional().or(z.literal('')),
  turnstileToken: z.string().optional().default(''),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;
