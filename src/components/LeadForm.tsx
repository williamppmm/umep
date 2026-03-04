'use client';

import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, type LeadInput } from '@/lib/schemas';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Card from './ui/Card';

const MAX_UPLOAD_SIZE = 4 * 1024 * 1024;
const MAX_DIMENSION = 1600;
const TARGET_QUALITY = 0.78;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

function formatMobileNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 10);

  return [part1, part2, part3].filter(Boolean).join(' ');
}

function createImageBitmapFromFile(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('No fue posible leer la imagen'));
    };

    img.src = objectUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('No fue posible procesar la imagen'));
          return;
        }
        resolve(blob);
      },
      'image/jpeg',
      quality
    );
  });
}

async function compressImage(file: File) {
  const image = await createImageBitmapFromFile(file);
  const ratio = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * ratio));
  const height = Math.max(1, Math.round(image.height * ratio));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No fue posible preparar la imagen');
  }

  ctx.drawImage(image, 0, 0, width, height);
  const blob = await canvasToBlob(canvas, TARGET_QUALITY);
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'equipo';
  const safeName = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'equipo';

  return new File([blob], `${safeName}.jpg`, { type: 'image/jpeg' });
}

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const telefonoRegister = register('telefono', {
    onChange: (event) => {
      event.target.value = formatMobileNumber(event.target.value);
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedImage(null);
      setSelectedImageName('');
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setSelectedImage(null);
      setSelectedImageName('');
      setErrorMessage('La imagen debe estar en formato JPG, PNG o WebP.');
      setStatus('error');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setSelectedImage(null);
      setSelectedImageName('');
      setErrorMessage('La imagen original supera el limite de 4 MB.');
      setStatus('error');
      event.target.value = '';
      return;
    }

    setStatus('idle');
    setErrorMessage('');
    setSelectedImage(file);
    setSelectedImageName(file.name);
  };

  const resetImage = () => {
    setSelectedImage(null);
    setSelectedImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImage = async (file: File) => {
    const compressedFile = await compressImage(file);

    if (compressedFile.size > MAX_UPLOAD_SIZE) {
      throw new Error('La imagen sigue siendo muy pesada después de comprimirla.');
    }

    const formData = new FormData();
    formData.append('file', compressedFile);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    if (!res.ok || !json.ok) {
      throw new Error(json.error ?? 'No fue posible subir la imagen');
    }

    return json.url as string;
  };

  const onSubmit = async (data: LeadInput) => {
    if (data.hp && data.hp.trim() !== '') {
      setStatus('success');
      reset();
      resetImage();
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      let imageUrl: string | undefined;

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const payload: LeadInput = {
        ...data,
        imagenUrl: imageUrl,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? 'Error desconocido');
      }

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: data.tipo,
        });
      }

      setStatus('success');
      reset();
      resetImage();

      setTimeout(() => {
        setStatus('idle');
      }, 6000);
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Hubo un error al enviar el formulario. Por favor intente de nuevo o contáctenos por WhatsApp.'
      );
    }
  };

  return (
    <>
      <Card className="max-w-3xl mx-auto" id="contacto">
        <h2 className="mb-6 text-2xl font-bold text-umep-text">
          Solicitar servicio
        </h2>

        {successVisible && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
            <p className="font-semibold">Solicitud enviada correctamente.</p>
            <p className="mt-1 text-sm">
              Recibimos tu mensaje y fue enviado a contacto@umepcali.com.
            </p>
            <p className="mt-1 text-sm">
              Te responderemos en las próximas 24-48 horas hábiles.
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
              <option value="reparacion">Reparación</option>
              <option value="cotizacion">Cotización balanza</option>
            </select>
            {errors.tipo && (
              <p className="mt-1 text-sm text-red-600">{errors.tipo.message}</p>
            )}
          </div>

          <Input
            label="Nombre completo *"
            {...register('nombre')}
            error={errors.nombre?.message}
            placeholder="Ej: Juan Pérez"
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
              label="Celular *"
              type="tel"
              {...telefonoRegister}
              error={errors.telefono?.message}
              placeholder="300 123 4567"
              inputMode="numeric"
              maxLength={14}
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
            label="Descripción del problema o necesidad *"
            {...register('descripcion')}
            error={errors.descripcion?.message}
            placeholder="Por favor describa la falla, síntomas, o el servicio que necesita (mínimo 20 caracteres)"
            rows={5}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-umep-text">
              Imagen de referencia (opcional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/*"
              onChange={handleImageChange}
              className="block w-full rounded-xl border border-dashed border-umep-border bg-slate-50 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
            />
            <p className="mt-2 text-xs text-gray-500">
              Puedes subir una imagen de referencia, como una foto del equipo o de la falla.
            </p>
            {selectedImageName && (
              <p className="mt-2 text-sm text-umep-text">
                Imagen seleccionada: <span className="font-medium">{selectedImageName}</span>
              </p>
            )}
          </div>

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
              ? selectedImage
                ? 'Subiendo imagen y enviando...'
                : 'Enviando...'
              : successVisible
                ? 'Solicitud enviada'
                : 'Enviar solicitud'}
          </Button>

          <p className="text-center text-sm text-gray-500">
            * Campos obligatorios. Sus datos serán tratados de acuerdo a nuestra{' '}
            <a href="/legal/privacidad" className="text-primary hover:underline">
              Política de Privacidad
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
