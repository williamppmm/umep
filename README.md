# UMEP Web

Sitio web corporativo de UMEP (Unidad de Mantenimiento Electronico Profesional), orientado a captacion de leads para servicios tecnicos industriales y venta de balanzas. Desplegado en produccion en Vercel bajo el dominio `umepcali.com`.

## Resumen

El proyecto esta construido con Next.js 16 (App Router), React 19 y TypeScript. Su objetivo principal es presentar servicios, mostrar productos y convertir visitas en contactos mediante:

- formulario web con validacion de datos;
- contacto directo por WhatsApp;
- envio de leads por correo mediante Resend;
- envio opcional de una imagen JPEG dentro del correo transaccional;
- integracion con Google Analytics 4;
- splash animado de marca una vez por sesion;
- siete paginas de servicio indexables con contenido y metadata propios;
- movimiento decorativo finito con control global de pausa.

## Stack Tecnico

- Next.js 16.3
- React 19.2
- TypeScript 5
- Tailwind CSS 3
- React Hook Form
- Zod
- Resend
- Vercel BotID Basic
- Lucide React (iconos de UI genericos)
- SVG propios (iconos de servicio)

## Funcionalidades Principales

- Splash animado de marca (`SplashIntro`) en MP4, una vez por sesion y omitido cuando el usuario prefiere movimiento reducido.
- Ticker horizontal de 15 segundos con palabras clave de los servicios UMEP.
- Control global y persistente en el header para pausar o reanudar el movimiento decorativo.
- Home corporativa con secciones de servicios, clientes showcase, productos y conversion.
- Pagina general y siete paginas individuales de servicios basadas en contenido estructurado (`src/content/services.json`).
- Pagina de productos basada en contenido estructurado (`src/content/products.json`).
- Pagina de contacto con formulario de leads y enlaces directos de atencion.
- Endpoint `POST /api/contact` para validar datos e imagen y enviar la solicitud por correo.
- Validacion binaria JPEG, limite comprimido de 3 MB y dimensiones maximas de 1600 x 1600 pixeles.
- Rate limiting perimetral en Vercel WAF: 5 solicitudes cada 600 segundos por IP para `POST /api/contact`.
- BotID Basic invisible y honeypot anti-bot en el formulario de contacto.
- Metadatos SEO, `robots.ts`, `sitemap.ts` y datos estructurados JSON-LD (LocalBusiness, Organization, Service y FAQPage).
- Integracion activa con Google Analytics 4.

## Estructura del Proyecto

```text
src/
  app/
    api/
      contact/route.ts
    contacto/page.tsx
    productos/page.tsx
    servicios/
      [slug]/page.tsx
      page.tsx
    legal/privacidad/page.tsx
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    CTAWhatsApp.tsx
    ClientsShowcase.tsx
    GoogleAnalytics.tsx
    Header.tsx
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
    jpegSecurity.ts
    motionPreference.ts
    schemas.ts
    siteConfig.ts
  instrumentation-client.ts
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

## Movimiento y Accesibilidad

- El ticker de Servicios y los elementos decorativos del hero ejecutan una sola secuencia de 15 segundos y se detienen.
- Al abandonar Inicio o Servicios y regresar, la secuencia correspondiente vuelve a empezar si el movimiento esta habilitado.
- El boton compacto del header pausa y reanuda las animaciones decorativas desde el fotograma actual; en el menu movil aparece con texto completo.
- La preferencia manual se conserva entre rutas, recargas y visitas mediante almacenamiento local del navegador.
- `prefers-reduced-motion: reduce` desactiva automaticamente el splash y el movimiento decorativo.
- El control es operable por teclado y comunica su estado mediante `aria-pressed`.

## Requisitos

- Node.js 24.x
- npm 11 recomendado (incluido con Node.js 24)

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
npm test
```

## Variables de Entorno

Variables requeridas para operacion completa:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Descripcion

- `NEXT_PUBLIC_GA_ID`: habilita el script de Google Analytics 4.
- `RESEND_API_KEY`: requerida para que `POST /api/contact` pueda enviar correos.
`RESEND_API_KEY` es una credencial y debe tratarse como variable sensible. `NEXT_PUBLIC_GA_ID` es un identificador publico. Para desarrollo se usa `.env.local`; en Vercel deben seleccionarse explicitamente los entornos necesarios, normalmente Production y Preview. Todo cambio de variables requiere un nuevo despliegue para aplicarse al deployment activo.

BotID no requiere un secreto propio del repositorio. Vercel debe proporcionar el token OIDC del proyecto en runtime. En desarrollo local la verificacion se omite como humano; para comprobar el rechazo puede iniciarse el servidor con `BOTID_DEV_BYPASS=BAD-BOT`, variable que se ignora dentro de Vercel.

## Flujo del Formulario

1. El usuario completa el formulario de contacto.
2. El frontend valida los datos con React Hook Form + Zod.
3. Si el usuario adjunta una imagen, el cliente la convierte a JPEG, la limita a 1600 pixeles y la incluye junto con los datos en una sola solicitud multipart a `POST /api/contact`.
4. El servidor valida primero el esquema y luego inspecciona la firma, el peso y las dimensiones reales del JPEG.
5. El backend incorpora la imagen al propio correo como adjunto inline y lo despacha mediante Resend hacia `contacto@umepcali.com`.
6. La aplicacion no escribe nuevas fotografias en Vercel Blob ni genera una URL publica para el lead.
7. Se registra el evento `generate_lead` en Google Analytics 4.

## Correo y DNS

- Zoho Mail gestiona el correo corporativo de `@umepcali.com`.
- `admin@umepcali.com` es la cuenta superadministradora de Zoho.
- `contacto@umepcali.com` es el buzon operativo y no tiene privilegios administrativos.
- Resend gestiona el correo transaccional del formulario mediante una autenticacion separada.
- Vercel DNS publica los registros SPF, DKIM y DMARC de ambos flujos.

La configuracion, responsables, pruebas y mantenimiento se documentan en [docs/correo/README.md](docs/correo/README.md). No deben almacenarse en el repositorio contrasenas, tokens, claves privadas, codigos MFA ni codigos de recuperacion.

## Endpoints Internos

### `POST /api/contact`

- Recibe el formulario del sitio mediante `multipart/form-data`; conserva compatibilidad con JSON para solicitudes sin archivo.
- Ejecuta BotID Basic antes de leer o procesar el cuerpo y responde 403 cuando clasifica un bot.
- Valida el esquema completo en el servidor y rechaza campos no declarados.
- Escapa los valores antes de construir el correo HTML.
- Solo admite una imagen JPEG cuya firma binaria, peso maximo de 3 MB y dimensiones maximas de 1600 x 1600 hayan sido verificadas.
- Incluye la imagen como adjunto inline del correo; no la almacena por separado ni acepta una URL aportada por el cliente.
- Usa `RESEND_API_KEY` para enviar el correo transaccional.
- Responde `500` si falta la configuracion de Resend.
- Usa un campo honeypot (`hp`) como filtro basico contra bots.
- Vercel WAF aplica antes de la funcion un limite de 5 solicitudes cada 600 segundos por IP y responde 429 al excederlo.

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

Las variables operativas deben configurarse en el dashboard de Vercel con el alcance adecuado. Las credenciales reales no se documentan en el repositorio. `BLOB_READ_WRITE_TOKEN` y `BLOB_ALLOWED_HOSTNAME` fueron retiradas de todos los entornos, el proyecto fue desconectado de `umep-blob` y las credenciales anteriores del store se rotaron con expiracion inmediata. El store publico se conserva sin proyectos conectados para que los enlaces historicos sigan disponibles; la aplicacion no puede escribir nuevos archivos en el.

### Firewall de Vercel

La proteccion perimetral se mantiene en el dashboard y no esta versionada en `vercel.json`. La regla activa es:

```text
Nombre: observe-contact-post
IF   Request Path  Equals  /api/contact
AND  Method        Equals  POST
THEN Rate Limit    Fixed Window · 600 seconds · 5 requests · IP Address
     Too Many Requests (429)
```

En la interfaz actual se edita desde `Firewall > Rules > Custom Rules`. Los cambios quedan staged al guardar y solo se aplican despues de `Review Changes > Publish`. Cualquier modificacion de ruta, metodo, ventana o limite debe probarse primero con accion `Log`.

## Contenido y Mantenimiento

- Servicios: editar `src/content/services.json`.
- Productos: editar `src/content/products.json`.
- Datos de marca, contacto, enlaces y metadata: editar `src/lib/siteConfig.ts`.
- Validacion del formulario: editar `src/lib/schemas.ts`.
- Ticker de palabras clave: editar el array `ITEMS` en `src/components/Ticker.tsx`.
- Duracion y fotogramas del ticker y hero: editar `tailwind.config.ts`.
- Persistencia del control de movimiento: editar `src/lib/motionPreference.ts` y `src/components/Header.tsx`.

## Documentacion Operativa

- [Arquitectura y estado del correo](docs/correo/README.md)
- [Procedimiento DKIM de Zoho](docs/correo/zoho-dkim.md)
- [Registro de autenticacion del correo del 20 de agosto de 2026](docs/correo/informe-autenticacion-2026-08-20.md)
- [Auditoria tecnica y seguimiento de hallazgos](docs/audits/AUDITORIA_TECNICA.md)

## Estado del Proyecto

Proyecto en produccion y operativo. La ola 3 de accesibilidad, SEO y documentacion quedo desplegada el 25 de agosto de 2026: siete paginas de servicios, movimiento finito con pausa persistente y favicon optimizado. El estado de los ajustes tecnicos, incluidas las diferencias que puedan existir entre el arbol local y el deployment activo, se mantiene en la [auditoria tecnica](docs/audits/AUDITORIA_TECNICA.md).

Pendiente para cuando el trafico lo justifique:

- **Upstash Redis** — solo si posteriormente se requiere un contador global mas preciso que el WAF disponible.

## Contacto Comercial

- Sitio: `https://umepcali.com`
- Email: `contacto@umepcali.com`
- WhatsApp: `+57 300 321 2328`

## Licencia

Uso interno / propietario, salvo que el responsable del proyecto defina otra licencia.
