# UMEP Web

Sitio web corporativo de UMEP (Unidad de Mantenimiento Electronico Profesional), orientado a captacion de leads para servicios tecnicos industriales y venta de balanzas, con despliegue previsto en Vercel.

## Resumen

El proyecto esta construido con Next.js 14 (App Router) y TypeScript. Su objetivo principal es presentar servicios, mostrar productos y convertir visitas en contactos mediante:

- formulario web con validacion de datos;
- contacto directo por WhatsApp;
- envio de leads por correo mediante Resend;
- carga opcional de imagenes a Vercel Blob;
- integracion opcional con Google Analytics 4.

## Stack Tecnico

- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- React Hook Form
- Zod
- Resend
- Vercel Blob
- Lucide React

## Funcionalidades Principales

- Home corporativa con secciones de servicios, productos, clientes y conversion.
- Pagina de servicios basada en contenido estructurado (`src/content/services.json`).
- Pagina de productos basada en contenido estructurado (`src/content/products.json`).
- Pagina de contacto con formulario de leads y enlaces directos de atencion.
- Endpoint `POST /api/upload` para subir una imagen opcional del equipo.
- Endpoint `POST /api/contact` para enviar la solicitud por correo.
- Metadatos SEO, `robots.ts`, `sitemap.ts` y datos estructurados.
- Integracion condicional con Google Analytics cuando existe `NEXT_PUBLIC_GA_ID`.

## Estructura del Proyecto

```text
src/
  app/
    api/
      contact/route.ts
      upload/route.ts
    contacto/page.tsx
    productos/page.tsx
    servicios/page.tsx
    legal/privacidad/page.tsx
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    CTAWhatsApp.tsx
    ClientsShowcase.tsx
    GoogleAnalytics.tsx
    LeadForm.tsx
    ProductsGrid.tsx
    ServicesGrid.tsx
    StructuredData.tsx
    ui/
  content/
    products.json
    services.json
  lib/
    schemas.ts
    siteConfig.ts
public/
  images/
  media/
```

## Requisitos

- Node.js 18.17 o superior
- npm 9 o superior

## Instalacion Local

```bash
git clone <repository-url>
cd umep
npm install
```

Crea tu archivo local de entorno con base en el ejemplo:

```bash
cp .env.example .env.local
```

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicacion quedara disponible en `http://localhost:3000`.

## Scripts Disponibles

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Variables de Entorno

Variables activas en el flujo actual:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxxx
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

Variables listadas en `.env.example` para futuras integraciones:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET=
```

### Descripcion

- `NEXT_PUBLIC_GA_ID`: habilita el script de Google Analytics 4.
- `RESEND_API_KEY`: requerida para que `POST /api/contact` pueda enviar correos.
- `BLOB_READ_WRITE_TOKEN`: requerida para que `POST /api/upload` pueda subir imagenes.
- Variables de EmailJS y reCAPTCHA: reservadas; hoy no forman parte del flujo operativo.

## Flujo del Formulario

1. El usuario completa el formulario de contacto.
2. El frontend valida los datos con React Hook Form + Zod.
3. Si el usuario adjunta una imagen, el cliente la comprime y la envia a `POST /api/upload`.
4. El frontend envia los datos del lead a `POST /api/contact`.
5. El backend construye un correo HTML y lo despacha mediante Resend hacia `contacto@umepcali.com`.
6. Si GA4 esta habilitado, se registra el evento `generate_lead`.

## Endpoints Internos

### `POST /api/upload`

- Recibe un archivo mediante `multipart/form-data`.
- Acepta `jpg`, `jpeg`, `png` y `webp`.
- Rechaza archivos mayores a 4 MB.
- Convierte y almacena la imagen como `.jpg` en Vercel Blob.

### `POST /api/contact`

- Recibe los datos del lead en JSON.
- Usa `RESEND_API_KEY` para enviar el correo transaccional.
- Responde `500` si falta la configuracion de Resend.
- Usa un campo honeypot (`hp`) como filtro basico contra bots.

## Despliegue

El proyecto esta preparado para Vercel. La configuracion actual esta en `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Checklist de Produccion

1. Configurar `RESEND_API_KEY`.
2. Configurar `BLOB_READ_WRITE_TOKEN`.
3. Configurar `NEXT_PUBLIC_GA_ID` si se requiere analitica.
4. Verificar el dominio principal y DNS.
5. Confirmar que `contacto@umepcali.com` siga operativo.
6. Probar el flujo completo: carga de imagen, envio de formulario y recepcion del correo.

## Contenido y Mantenimiento

- Servicios: editar `src/content/services.json`.
- Productos: editar `src/content/products.json`.
- Datos de marca, contacto, enlaces y metadata: editar `src/lib/siteConfig.ts`.
- Validacion del formulario: editar `src/lib/schemas.ts`.

## Estado del Proyecto

Proyecto funcional y orientado a operacion en produccion. El codigo actual cubre la captacion de leads, el canal de WhatsApp y el contenido comercial principal.

Antes de mantenerlo a mediano plazo conviene revisar periodicamente:

- vigencia de variables de entorno y credenciales;
- integridad del flujo de correo;
- enlaces sociales y datos de contacto;
- contenido comercial y SEO;
- dependencias que hoy no se usan y puedan retirarse.

## Contacto Comercial

- Sitio: `https://umepcali.com`
- Email: `contacto@umepcali.com`
- WhatsApp: `+57 300 321 2328`

## Licencia

Uso interno / propietario, salvo que el responsable del proyecto defina otra licencia.
