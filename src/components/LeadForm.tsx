'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, type LeadInput } from '@/lib/schemas';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Card from './ui/Card';

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      tipo: 'mantenimiento',
      hp: '',
    },
  });

  const onSubmit = async (data: LeadInput) => {
    // Honeypot check
    if (data.hp && data.hp.trim() !== '') {
      setStatus('success');
      reset();
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // EmailJS integration (placeholder - will be configured with env vars)
      // For now, we'll simulate sending to console and show success
      console.log('Lead form data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // GA4 event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: data.tipo,
        });
      }

      setStatus('success');
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
      setErrorMessage('Hubo un error al enviar el formulario. Por favor intente de nuevo o contáctenos por WhatsApp.');
    }
  };

  return (
    <Card className="max-w-3xl mx-auto" id="contacto">
      <h2 className="text-2xl font-bold text-umep-text mb-6">
        Solicitar servicio
      </h2>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
          <p className="font-medium">¡Mensaje enviado con éxito!</p>
          <p className="text-sm mt-1">Nos pondremos en contacto contigo en las próximas 24-48 horas hábiles.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
          <p className="font-medium">Error al enviar</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tipo de servicio */}
        <div>
          <label className="block text-sm font-medium text-umep-text mb-2">
            Tipo de servicio *
          </label>
          <select
            {...register('tipo')}
            className="w-full border border-umep-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none"
          >
            <option value="mantenimiento">Mantenimiento preventivo</option>
            <option value="reparacion">Reparación</option>
            <option value="cotizacion">Cotización balanza</option>
          </select>
          {errors.tipo && (
            <p className="mt-1 text-sm text-red-600">{errors.tipo.message}</p>
          )}
        </div>

        {/* Nombre */}
        <Input
          label="Nombre completo *"
          {...register('nombre')}
          error={errors.nombre?.message}
          placeholder="Ej: Juan Pérez"
        />

        {/* Email y Teléfono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email *"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="ejemplo@empresa.com"
          />
          <Input
            label="Teléfono"
            type="tel"
            {...register('telefono')}
            error={errors.telefono?.message}
            placeholder="3001234567"
          />
        </div>

        {/* Ciudad */}
        <Input
          label="Ciudad *"
          {...register('ciudad')}
          error={errors.ciudad?.message}
          placeholder="Ej: Cali, Palmira, Yumbo"
        />

        {/* Equipo, Marca, Modelo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Equipo *"
            {...register('equipo')}
            error={errors.equipo?.message}
            placeholder="Ej: Variador"
          />
          <Input
            label="Marca"
            {...register('marca')}
            error={errors.marca?.message}
            placeholder="Ej: Siemens"
          />
          <Input
            label="Modelo"
            {...register('modelo')}
            error={errors.modelo?.message}
            placeholder="Ej: G120"
          />
        </div>

        {/* Descripción */}
        <Textarea
          label="Descripción del problema o necesidad *"
          {...register('descripcion')}
          error={errors.descripcion?.message}
          placeholder="Por favor describa la falla, síntomas, o el servicio que necesita (mínimo 20 caracteres)"
          rows={5}
        />

        {/* Honeypot (hidden) */}
        <input
          type="text"
          {...register('hp')}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'sending'}
          className="w-full"
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          * Campos obligatorios. Sus datos serán tratados de acuerdo a nuestra{' '}
          <a href="/legal/privacidad" className="text-primary hover:underline">
            Política de Privacidad
          </a>
          .
        </p>
      </form>
    </Card>
  );
}
