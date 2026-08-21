import { z } from 'zod';

export const leadSchema = z.object({
  tipo: z.enum(['mantenimiento', 'reparacion', 'cotizacion'], {
    required_error: 'El tipo de servicio es requerido',
  }),
  nombre: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es muy largo'),
  email: z
    .string()
    .trim()
    .max(254, 'El email es muy largo')
    .email('Email invalido')
    .toLowerCase(),
  telefono: z
    .string()
    .trim()
    .min(1, 'El telefono es requerido')
    .max(30, 'El telefono es muy largo')
    .refine(
      (value) => /^[0-9\s()+-]+$/.test(value),
      'El telefono solo puede contener numeros'
    )
    .refine(
      (value) => value.replace(/\D/g, '').length === 10,
      'El telefono debe tener exactamente 10 digitos'
    )
    .refine(
      (value) => value.replace(/\D/g, '').startsWith('3'),
      'El telefono debe ser un numero movil colombiano y comenzar con 3'
    ),
  ciudad: z
    .string()
    .trim()
    .min(2, 'La ciudad es requerida')
    .max(100, 'La ciudad es muy larga'),
  equipo: z
    .string()
    .trim()
    .min(2, 'Especifique el equipo')
    .max(200, 'Descripcion del equipo muy larga'),
  marca: z.string().trim().max(100, 'La marca es muy larga').optional(),
  modelo: z.string().trim().max(100, 'El modelo es muy largo').optional(),
  descripcion: z
    .string()
    .trim()
    .min(20, 'La descripcion debe tener al menos 20 caracteres para ayudarnos a entender mejor su necesidad')
    .max(1000, 'La descripcion es muy larga'),
  imagenUrl: z
    .string()
    .max(2048, 'URL de imagen demasiado larga')
    .url('URL de imagen invalida')
    .optional(),
  hp: z.string().max(200).optional(),
}).strict();

export type LeadInput = z.infer<typeof leadSchema>;
