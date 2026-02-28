# UMEP - Sitio Web Corporativo

Sitio oficial de UMEP (Unidad de Mantenimiento Electronico Profesional), desplegado en Vercel y orientado a generacion de leads por formulario y WhatsApp.

## Estado actual del proyecto

- Framework: Next.js 14 (App Router) + TypeScript
- UI: Tailwind CSS
- Formularios: React Hook Form + Zod
- Analitica: Google Analytics 4 (`NEXT_PUBLIC_GA_ID`)
- Hosting: Vercel (produccion activa)
- Correo:
  - Dominio corporativo: `@umepcali.com`
  - Buzon principal de contacto: `contacto@umepcali.com` (administrado en Zoho)
  - Envio transaccional del formulario: Resend (API)

## Scripts del proyecto

Definidos en `package.json`:

```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # next lint
```

Verificacion realizada:

- `npm run lint`: OK, sin errores.
- `npm run build`: OK.
- Si falta `RESEND_API_KEY`, el endpoint `POST /api/contact` responde error `500` hasta configurar la variable.

## Instalacion local

```bash
git clone <repository-url>
cd umep
npm install
cp .env.example .env.local
```

Completa variables en `.env.local` y ejecuta:

```bash
npm run dev
```

App local: `http://localhost:3000`

## Variables de entorno

Variables usadas actualmente:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxxx
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

Notas:

- `NEXT_PUBLIC_GA_ID`: opcional, habilita eventos GA4.
- `RESEND_API_KEY`: obligatoria para que funcione el endpoint `POST /api/contact`.
- `BLOB_READ_WRITE_TOKEN`: obligatoria para subir imagenes opcionales del formulario a Vercel Blob.

## Flujo de contacto (correo)

1. El usuario completa el formulario y puede adjuntar 1 imagen.
2. Si adjunta imagen, el frontend la comprime y la sube a `POST /api/upload`.
3. El frontend envia `POST /api/contact` con los datos del lead y la URL publica de la imagen.
4. El backend construye el email HTML y envia con Resend.
5. El correo llega a `contacto@umepcali.com` (buzon corporativo en Zoho) con enlace para abrir la imagen.

Archivos clave: `src/app/api/upload/route.ts` y `src/app/api/contact/route.ts`

## Produccion en Vercel

`vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

Checklist minimo de entorno en Vercel:

1. Definir `NEXT_PUBLIC_GA_ID` (si aplica).
2. Definir `RESEND_API_KEY`.
3. Definir `BLOB_READ_WRITE_TOKEN`.
4. Confirmar dominio principal (`umepcali.com`) y DNS vigente.
5. Verificar que `contacto@umepcali.com` continue operativo en Zoho.

## Estructura principal

```text
src/
  app/
    api/contact/route.ts
    api/upload/route.ts
    contacto/page.tsx
    servicios/page.tsx
    productos/page.tsx
    legal/privacidad/page.tsx
    sitemap.ts
    robots.ts
  components/
    LeadForm.tsx
    GoogleAnalytics.tsx
    StructuredData.tsx
  content/
    services.json
    products.json
  lib/
    siteConfig.ts
    schemas.ts
```

## Contacto UMEP

- WhatsApp: `+57 300 321 2328`
- Email: `contacto@umepcali.com`
- Sitio: `https://umepcali.com`

---

Documento ajustado para reflejar el estado real del proyecto y su operacion en produccion.
