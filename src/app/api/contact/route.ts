import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { Resend } from 'resend';
import { contactInfo, siteConfig } from '@/lib/siteConfig';
import { checkRateLimit } from '@/lib/rateLimit';
import { leadSchema } from '@/lib/schemas';
import { escapeHtml, sanitizeEmailHeader } from '@/lib/contactSecurity';
import { MAX_JPEG_SIZE, validateJpegUpload } from '@/lib/jpegSecurity';

const resendApiKey = process.env.RESEND_API_KEY;
const MAX_REQUEST_SIZE = MAX_JPEG_SIZE + 64 * 1024;
const IMAGE_CONTENT_ID = 'equipo-umep';
const botIdDevelopmentOptions = process.env.VERCEL_ENV
  ? undefined
  : {
      isDevelopment: true,
      bypass: process.env.BOTID_DEV_BYPASS === 'BAD-BOT' ? 'BAD-BOT' as const : 'HUMAN' as const,
    };

const tipoLabels: Record<string, string> = {
  mantenimiento: 'Mantenimiento preventivo',
  reparacion: 'Reparación',
  cotizacion: 'Cotización balanza',
};

export async function POST(req: NextRequest) {
  try {
    const verification = await checkBotId({
      developmentOptions: botIdDevelopmentOptions,
      advancedOptions: {
        checkLevel: 'basic',
      },
    });

    if (verification.isBot) {
      return NextResponse.json(
        { ok: false, error: 'No fue posible verificar el envio. Recarga la pagina e intenta nuevamente.' },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error('BotID verification error:', error);
    return NextResponse.json(
      { ok: false, error: 'La verificacion del formulario no esta disponible. Intenta nuevamente en unos minutos.' },
      { status: 503 }
    );
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(`contact:${ip}`, 3, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: 'Demasiadas solicitudes. Por favor espera unos minutos antes de intentarlo de nuevo.' },
      { status: 429 }
    );
  }

  try {
    const contentLength = Number(req.headers.get('content-length') ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { ok: false, error: 'La solicitud supera el limite permitido' },
        { status: 413 }
      );
    }

    let body: unknown;
    let image: File | null = null;
    const contentType = req.headers.get('content-type')?.toLowerCase() ?? '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const imageEntries = formData.getAll('imagen');

      if (imageEntries.length > 1) {
        return NextResponse.json(
          { ok: false, error: 'Solo se permite una imagen por solicitud' },
          { status: 400 }
        );
      }

      const entries = Object.fromEntries(formData.entries());
      delete entries.imagen;
      body = entries;

      if (imageEntries.length === 1) {
        if (!(imageEntries[0] instanceof File)) {
          return NextResponse.json(
            { ok: false, error: 'El archivo de imagen no es valido' },
            { status: 400 }
          );
        }
        image = imageEntries[0];
      }
    } else if (contentType.includes('application/json')) {
      try {
        body = await req.json();
      } catch {
        return NextResponse.json(
          { ok: false, error: 'El cuerpo de la solicitud no contiene JSON valido' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { ok: false, error: 'El formato de la solicitud no esta permitido' },
        { status: 415 }
      );
    }

    if (
      typeof body === 'object' &&
      body !== null &&
      'hp' in body &&
      typeof body.hp === 'string' &&
      body.hp.trim() !== ''
    ) {
      return NextResponse.json({ ok: true });
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Los datos enviados no son validos',
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      tipo,
      nombre,
      email,
      telefono,
      ciudad,
      equipo,
      marca,
      modelo,
      descripcion,
    } = parsed.data;

    let validatedImageContent: Buffer | undefined;
    if (image) {
      const imageBytes = Buffer.from(await image.arrayBuffer());
      const validation = validateJpegUpload(imageBytes);
      if (!validation.ok) {
        return NextResponse.json(
          { ok: false, error: validation.error },
          { status: 400 }
        );
      }

      validatedImageContent = imageBytes;
    }

    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return NextResponse.json(
        { ok: false, error: 'Configuracion de correo incompleta en el servidor' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const tipoLabel = tipoLabels[tipo];
    const escaped = {
      tipoLabel: escapeHtml(tipoLabel),
      nombre: escapeHtml(nombre),
      email: escapeHtml(email),
      telefono: escapeHtml(telefono),
      ciudad: escapeHtml(ciudad),
      equipo: escapeHtml(equipo),
      marca: marca ? escapeHtml(marca) : undefined,
      modelo: modelo ? escapeHtml(modelo) : undefined,
      descripcion: escapeHtml(descripcion),
    };

    const imageBlock = validatedImageContent
      ? `
          <div style="margin-top: 20px;">
            <p style="color: #666; font-size: 14px; margin-bottom: 8px;">Imagen de referencia:</p>
            <img src="cid:${IMAGE_CONTENT_ID}" alt="Foto del equipo enviada con la solicitud" style="display: block; max-width: 100%; height: auto; border-radius: 8px;" />
            <p style="margin-top: 10px; font-size: 12px; color: #666;">La imagen está incorporada como adjunto inline de este mensaje.</p>
          </div>
        `
      : '';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f3f6f9;">
        <div style="background: #1A3A6E; padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #F4C542; margin: 0; font-size: 20px;">Nueva solicitud desde ${siteConfig.name}</h1>
        </div>
        <div style="background: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e3e9ef;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; width: 35%; color: #666; font-size: 14px;">Tipo de servicio</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; font-weight: bold; color: #1A3A6E;">${escaped.tipoLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${escaped.nombre}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${escaped.email}</td>
            </tr>
            ${telefono ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Telefono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${escaped.telefono}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Ciudad</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${escaped.ciudad}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Equipo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${escaped.equipo}</td>
            </tr>
            ${marca ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Marca</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${escaped.marca}</td>
            </tr>` : ''}
            ${modelo ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Modelo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${escaped.modelo}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 20px;">
            <p style="color: #666; font-size: 14px; margin-bottom: 8px;">Descripcion del problema / necesidad:</p>
            <div style="background: #f3f6f9; padding: 16px; border-radius: 6px; color: #0B1320; white-space: pre-line;">${escaped.descripcion}</div>
          </div>

          ${imageBlock}

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e3e9ef; font-size: 12px; color: #999;">
            Enviado desde ${siteConfig.url} - ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
          </div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <noreply@umepcali.com>`,
      to: contactInfo.email,
      replyTo: email,
      subject: sanitizeEmailHeader(`[${tipoLabel}] ${nombre} - ${equipo} (${ciudad})`),
      html,
      attachments: validatedImageContent
        ? [
            {
              filename: 'foto-equipo.jpg',
              content: validatedImageContent,
              contentType: 'image/jpeg',
              contentId: IMAGE_CONTENT_ID,
            },
          ]
        : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}
