import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

function sanitizeFileName(fileName: string) {
  const baseName = fileName.replace(/\.[^.]+$/, '');
  return baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'equipo';
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(`upload:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: 'Demasiadas solicitudes. Por favor espera unos minutos.' },
      { status: 429 }
    );
  }

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('Missing BLOB_READ_WRITE_TOKEN environment variable');
      return NextResponse.json(
        { ok: false, error: 'Configuracion de archivos incompleta en el servidor' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'No se recibio ninguna imagen' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { ok: false, error: 'Solo se permiten imagenes JPG, PNG o WebP' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: 'La imagen supera el limite permitido de 4 MB' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const fileName = `leads/${timestamp}-${sanitizeFileName(file.name)}.jpg`;

    const blob = await put(fileName, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'image/jpeg',
    });

    return NextResponse.json({
      ok: true,
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch (error) {
    console.error('Upload route error:', error);
    return NextResponse.json(
      { ok: false, error: 'No fue posible subir la imagen' },
      { status: 500 }
    );
  }
}
