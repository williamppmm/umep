import { z } from 'zod';

export const leadSchema = z.object({
  tipo: z.enum(['mantenimiento', 'reparacion', 'cotizacion'], {
    required_error: 'El tipo de servicio es requerido',
  }),
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es muy largo'),
  email: z
    .string()
    .email('Email inválido')
    .toLowerCase(),
  telefono: z
    .string()
    .optional(),
  ciudad: z
    .string()
    .min(2, 'La ciudad es requerida')
    .max(100, 'La ciudad es muy larga'),
  equipo: z
    .string()
    .min(2, 'Especifique el equipo')
    .max(200, 'Descripción del equipo muy larga'),
  marca: z
    .string()
    .optional(),
  modelo: z
    .string()
    .optional(),
  descripcion: z
    .string()
    .min(20, 'La descripción debe tener al menos 20 caracteres para ayudarnos a entender mejor su necesidad')
    .max(1000, 'La descripción es muy larga'),
  token: z.string().optional(),
  hp: z.string().optional(), // honeypot
});

export type LeadInput = z.infer<typeof leadSchema>;
