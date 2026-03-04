import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactInfo, siteConfig } from '@/lib/siteConfig';

const resendApiKey = process.env.RESEND_API_KEY;

const tipoLabels: Record<string, string> = {
  mantenimiento: 'Mantenimiento preventivo',
  reparacion: 'Reparación',
  cotizacion: 'Cotización balanza',
};

export async function POST(req: NextRequest) {
  try {
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return NextResponse.json(
        { ok: false, error: 'Configuracion de correo incompleta en el servidor' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const body = await req.json();

    if (body.hp && body.hp.trim() !== '') {
      return NextResponse.json({ ok: true });
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
      imagenUrl,
    } = body;

    const tipoLabel = tipoLabels[tipo] ?? tipo;
    const imageBlock = imagenUrl
      ? `
          <div style="margin-top: 20px;">
            <p style="color: #666; font-size: 14px; margin-bottom: 8px;">Imagen de referencia:</p>
            <a href="${imagenUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #1A3A6E; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: bold;">Ver foto del equipo</a>
            <p style="margin-top: 10px; font-size: 12px; color: #666; word-break: break-all;">${imagenUrl}</p>
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
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; font-weight: bold; color: #1A3A6E;">${tipoLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${email}</td>
            </tr>
            ${telefono ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Telefono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${telefono}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Ciudad</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${ciudad}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Equipo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${equipo}</td>
            </tr>
            ${marca ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Marca</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${marca}</td>
            </tr>` : ''}
            ${modelo ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #666; font-size: 14px;">Modelo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e3e9ef; color: #0B1320;">${modelo}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 20px;">
            <p style="color: #666; font-size: 14px; margin-bottom: 8px;">Descripcion del problema / necesidad:</p>
            <div style="background: #f3f6f9; padding: 16px; border-radius: 6px; color: #0B1320; white-space: pre-line;">${descripcion}</div>
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
      subject: `[${tipoLabel}] ${nombre} - ${equipo} (${ciudad})`,
      html,
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
