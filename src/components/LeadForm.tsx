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
  const successVisible = status === 'success';

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Error desconocido');

      // GA4 event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: data.tipo,
        });
      }

      setStatus('success');
      reset();

      // Keep the confirmation visible long enough for the user to notice it.
      setTimeout(() => {
        setStatus('idle');
      }, 6000);
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
      setErrorMessage(
        'Hubo un error al enviar el formulario. Por favor intente de nuevo o contactenos por WhatsApp.'
      );
    }
  };

  return (
    <>
      <Card className="max-w-3xl mx-auto" id="contacto">
        <h2 className="text-2xl font-bold text-umep-text mb-6">
          Solicitar servicio
        </h2>

        {successVisible && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
            <p className="font-semibold">Solicitud enviada correctamente.</p>
            <p className="mt-1 text-sm">
              Recibimos tu mensaje y fue enviado a contacto@umepcali.com.
            </p>
            <p className="mt-1 text-sm">
              Te responderemos en las proximas 24-48 horas habiles.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
            <p className="font-medium">Error al enviar</p>
            <p className="mt-1 text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-umep-text">
              Tipo de servicio *
            </label>
            <select
              {...register('tipo')}
              className="w-full rounded-xl border border-umep-border px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-primary-600"
            >
              <option value="mantenimiento">Mantenimiento preventivo</option>
              <option value="reparacion">Reparacion</option>
              <option value="cotizacion">Cotizacion balanza</option>
            </select>
            {errors.tipo && (
              <p className="mt-1 text-sm text-red-600">{errors.tipo.message}</p>
            )}
          </div>

          <Input
            label="Nombre completo *"
            {...register('nombre')}
            error={errors.nombre?.message}
            placeholder="Ej: Juan Perez"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Email *"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="ejemplo@empresa.com"
            />
            <Input
              label="Telefono"
              type="tel"
              {...register('telefono')}
              error={errors.telefono?.message}
              placeholder="3001234567"
            />
          </div>

          <Input
            label="Ciudad *"
            {...register('ciudad')}
            error={errors.ciudad?.message}
            placeholder="Ej: Cali, Palmira, Yumbo"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

          <Textarea
            label="Descripcion del problema o necesidad *"
            {...register('descripcion')}
            error={errors.descripcion?.message}
            placeholder="Por favor describa la falla, sintomas, o el servicio que necesita (minimo 20 caracteres)"
            rows={5}
          />

          <input
            type="text"
            {...register('hp')}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <Button
            type="submit"
            variant="primary"
            disabled={status === 'sending' || successVisible}
            className="w-full"
          >
            {status === 'sending'
              ? 'Enviando...'
              : successVisible
                ? 'Solicitud enviada'
                : 'Enviar solicitud'}
          </Button>

          <p className="text-center text-sm text-gray-500">
            * Campos obligatorios. Sus datos seran tratados de acuerdo a nuestra{' '}
            <a href="/legal/privacidad" className="text-primary hover:underline">
              Politica de Privacidad
            </a>
            .
          </p>
        </form>
      </Card>

      {successVisible && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border border-green-200 bg-white p-4 shadow-xl">
          <p className="text-sm font-semibold text-green-900">Mensaje enviado</p>
          <p className="mt-1 text-sm text-slate-700">
            Tu solicitud fue enviada a contacto@umepcali.com.
          </p>
        </div>
      )}
    </>
  );
}
