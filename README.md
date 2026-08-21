# UMEP Web

Sitio web corporativo de UMEP (Unidad de Mantenimiento Electronico Profesional), orientado a captacion de leads para servicios tecnicos industriales y venta de balanzas. Desplegado en produccion en Vercel bajo el dominio `umepcali.com`.

## Resumen

El proyecto esta construido con Next.js 14 (App Router) y TypeScript. Su objetivo principal es presentar servicios, mostrar productos y convertir visitas en contactos mediante:

- formulario web con validacion de datos;
- contacto directo por WhatsApp;
- envio de leads por correo mediante Resend;
- carga opcional de imagenes a Vercel Blob;
- integracion con Google Analytics 4;
- splash animado de marca una vez por sesion.

## Stack Tecnico

- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- React Hook Form
- Zod
- Resend
- Vercel Blob
- Lucide React (iconos de UI genericos)
- SVG propios (iconos de servicio)

## Funcionalidades Principales

- Splash animado de marca (`SplashIntro`) en MP4, una vez por sesion y omitido cuando el usuario prefiere movimiento reducido.
- Ticker horizontal con palabras clave de los servicios UMEP.
- Home corporativa con secciones de servicios, clientes showcase, productos y conversion.
- Pagina de servicios basada en contenido estructurado (`src/content/services.json`).
- Pagina de productos basada en contenido estructurado (`src/content/products.json`).
- Pagina de contacto con formulario de leads y enlaces directos de atencion.
- Endpoint `POST /api/upload` para subir una imagen opcional del equipo.
- Endpoint `POST /api/contact` para enviar la solicitud por correo.
- Rate limiting in-memory: 3 req/10 min en `/api/contact`, 5 req/10 min en `/api/upload`.
- Honeypot anti-bot en el formulario de contacto.
- Metadatos SEO, `robots.ts`, `sitemap.ts` y datos estructurados JSON-LD (LocalBusiness + Organization).
- Integracion activa con Google Analytics 4.

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
    Hero.tsx
    LeadForm.tsx
    ProductCard.tsx
    ProductsGrid.tsx
    ServicesGrid.tsx
    SplashIntro.tsx
    StructuredData.tsx
    Ticker.tsx
    ui/
      Button.tsx
      Card.tsx
      Container.tsx
      Icon.tsx          (Lucide React — iconos de UI genericos)
      Input.tsx
      LogoUmep.tsx
      SectionTitle.tsx
      ServiceIcon.tsx   (SVG propios — uno por tipo de servicio)
      Textarea.tsx
  content/
    products.json
    services.json
  lib/
    contactSecurity.ts
    rateLimit.ts
    schemas.ts
    siteConfig.ts
  types/
    gtag.d.ts
public/
  images/
    clients/            (logos de clientes)
  media/
    umep-intro.mp4      (animacion optimizada del splash)
```

## Iconos de Servicio

Cada servicio usa un icono SVG disenado a medida, encapsulado en `ServiceIcon.tsx`. Los slugs disponibles son:

| Slug | Servicio |
|------|----------|
| `variadores-velocidad` | Variadores de velocidad |
| `arrancadores-suaves` | Arrancadores suaves |
| `plc-modulos` | PLCs y modulos |
| `hmi-pantallas` | HMIs y pantallas |
| `balanzas-electronicas` | Balanzas electronicas |
| `ultrasonidos-laboratorio` | Ultrasonidos y laboratorio |
| `fuentes-modulos` | Fuentes y modulos de poder |

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

Variables requeridas para operacion completa:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxxx
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
BLOB_ALLOWED_HOSTNAME=sykw99bi95mzbciw.public.blob.vercel-storage.com
```

Variables reservadas para futuras integraciones (ver `.env.example`):

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET=
```

### Descripcion

- `NEXT_PUBLIC_GA_ID`: habilita el script de Google Analytics 4.
- `RESEND_API_KEY`: requerida para que `POST /api/contact` pueda enviar correos.
- `BLOB_READ_WRITE_TOKEN`: requerida para que `POST /api/upload` pueda subir imagenes.
- `BLOB_ALLOWED_HOSTNAME`: host exacto del store de Blob autorizado para las imagenes incluidas en el correo.
- Variables de reCAPTCHA: reservadas para integracion futura cuando el trafico lo justifique.

`RESEND_API_KEY` y `BLOB_READ_WRITE_TOKEN` son credenciales y deben tratarse como variables sensibles. `NEXT_PUBLIC_GA_ID` y `BLOB_ALLOWED_HOSTNAME` son identificadores publicos. Para desarrollo se usa `.env.local`; en Vercel deben seleccionarse explicitamente los entornos necesarios, normalmente Production y Preview. Todo cambio de variables requiere un nuevo despliegue para aplicarse al deployment activo.

## Flujo del Formulario

1. El usuario completa el formulario de contacto.
2. El frontend valida los datos con React Hook Form + Zod.
3. Si el usuario adjunta una imagen, el cliente la comprime y la envia a `POST /api/upload`.
4. El frontend envia los datos del lead a `POST /api/contact`.
5. El backend construye un correo HTML y lo despacha mediante Resend hacia `contacto@umepcali.com`.
6. Se registra el evento `generate_lead` en Google Analytics 4.

## Correo y DNS

- Zoho Mail gestiona el correo corporativo de `@umepcali.com`.
- `admin@umepcali.com` es la cuenta superadministradora de Zoho.
- `contacto@umepcali.com` es el buzon operativo y no tiene privilegios administrativos.
- Resend gestiona el correo transaccional del formulario mediante una autenticacion separada.
- Vercel DNS publica los registros SPF, DKIM y DMARC de ambos flujos.

La configuracion, responsables, pruebas y mantenimiento se documentan en [docs/correo/README.md](docs/correo/README.md). No deben almacenarse en el repositorio contrasenas, tokens, claves privadas, codigos MFA ni codigos de recuperacion.

## Endpoints Internos

### `POST /api/upload`

- Recibe un archivo mediante `multipart/form-data`.
- El cliente legítimo comprime y convierte la imagen a JPEG antes del envío.
- La ruta acepta actualmente tipos declarados `jpg`, `jpeg`, `png` y `webp`; la validación binaria del servidor está pendiente en P1-05.
- Rechaza archivos mayores a 4 MB.
- Almacena el archivo con extensión `.jpg` en Vercel Blob.
- Rate limit: 5 requests por 10 minutos por IP.

### `POST /api/contact`

- Recibe los datos del lead en JSON.
- Valida el esquema completo en el servidor y rechaza campos no declarados.
- Escapa los valores antes de construir el correo HTML.
- Solo acepta imagenes alojadas en `BLOB_ALLOWED_HOSTNAME`.
- Usa `RESEND_API_KEY` para enviar el correo transaccional.
- Responde `500` si falta la configuracion de Resend.
- Usa un campo honeypot (`hp`) como filtro basico contra bots.
- Rate limit: 3 requests por 10 minutos por IP.

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

Las variables operativas deben configurarse en el dashboard de Vercel con el alcance adecuado. `BLOB_ALLOWED_HOSTNAME` esta configurada para Production y Preview; su valor publico coincide con el hostname documentado en `.env.example`. Las credenciales reales no se documentan en el repositorio.

## Contenido y Mantenimiento

- Servicios: editar `src/content/services.json`.
- Productos: editar `src/content/products.json`.
- Datos de marca, contacto, enlaces y metadata: editar `src/lib/siteConfig.ts`.
- Validacion del formulario: editar `src/lib/schemas.ts`.
- Ticker de palabras clave: editar el array `ITEMS` en `src/components/Ticker.tsx`.

## Documentacion Operativa

- [Arquitectura y estado del correo](docs/correo/README.md)
- [Procedimiento DKIM de Zoho](docs/correo/zoho-dkim.md)
- [Registro de autenticacion del correo del 20 de agosto de 2026](docs/correo/informe-autenticacion-2026-08-20.md)
- [Auditoria tecnica y seguimiento de hallazgos](docs/audits/AUDITORIA_TECNICA.md)

## Estado del Proyecto

Proyecto en produccion y operativo. El estado de los ajustes tecnicos, incluidas las diferencias que puedan existir entre el arbol local y el deployment activo, se mantiene en la [auditoria tecnica](docs/audits/AUDITORIA_TECNICA.md).

Pendiente para cuando el trafico lo justifique:

- **reCAPTCHA v3** — variables ya preparadas en `.env.example`.
- **Rate limiting distribuido** (Vercel KV / Upstash) — el actual es in-memory por instancia, suficiente para poco trafico.

## Contacto Comercial

- Sitio: `https://umepcali.com`
- Email: `contacto@umepcali.com`
- WhatsApp: `+57 300 321 2328`

## Licencia

Uso interno / propietario, salvo que el responsable del proyecto defina otra licencia.
