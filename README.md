# UMEP - Sitio Web Corporativo

Sitio web oficial de UMEP (Unidad de Mantenimiento Electrónico Profesional), especialistas en mantenimiento y reparación de equipos industriales en Valle del Cauca, Colombia.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Validación**: Zod + React Hook Form
- **SEO**: Sitemap, Robots.txt, JSON-LD
- **Analítica**: Google Analytics 4
- **Hosting**: Vercel (Free Tier)

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone <repository-url>
cd umep

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
cp .env.example .env.local
```

Variables disponibles:

- `NEXT_PUBLIC_GA_ID`: ID de Google Analytics (formato: G-XXXXXXXXXX)
- Futuras: reCAPTCHA, EmailJS (Fase 2)

## 📁 Estructura del Proyecto

```
umep/
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── page.tsx           # Home
│   │   ├── servicios/         # Servicios
│   │   ├── productos/         # Productos (Balanzas)
│   │   ├── contacto/          # Contacto
│   │   ├── legal/privacidad/  # Política de Privacidad
│   │   ├── sitemap.ts         # Sitemap dinámico
│   │   └── robots.ts          # Robots.txt
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes UI base
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── ProductsGrid.tsx
│   │   ├── LeadForm.tsx
│   │   └── CTAWhatsApp.tsx
│   ├── content/              # Contenido JSON
│   │   ├── services.json     # 7 servicios
│   │   └── products.json     # 3 balanzas
│   └── lib/                  # Utilidades y schemas
│       └── schemas.ts        # Validación Zod
├── public/                   # Archivos estáticos
└── tailwind.config.ts        # Configuración Tailwind
```

## 🌐 Deploy en Vercel

### Paso 1: Crear repositorio en GitHub

```bash
git init
git add .
git commit -m "feat: Initial commit - UMEP website MVP"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Paso 2: Importar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub
4. Framework Preset: **Next.js** (auto-detectado)
5. Click en "Deploy"

### Paso 3: Configurar Variables de Entorno

En Vercel Dashboard → Project Settings → Environment Variables:

```
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
```

### Paso 4: Conectar Dominio (Opcional)

1. Project Settings → Domains
2. Agregar `umep.co` o `www.umep.co`
3. Configurar DNS según instrucciones de Vercel

## 📊 SEO y Analítica

### Google Analytics 4

1. Crear propiedad GA4 en [analytics.google.com](https://analytics.google.com)
2. Copiar Measurement ID (formato: G-XXXXXXXXXX)
3. Agregar como variable de entorno `NEXT_PUBLIC_GA_ID`

### Search Console

1. Verificar dominio en [search.google.com/search-console](https://search.google.com/search-console)
2. Enviar sitemap: `https://umep.vercel.app/sitemap.xml`

### Eventos GA4 Configurados

- `page_view`: Automático
- `click_whatsapp`: Click en botones WhatsApp
- `generate_lead`: Envío de formulario
- `view_product`: Vista de productos

## 🛠️ Comandos Disponibles

```bash
npm run dev      # Desarrollo local (puerto 3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## 📝 Contenido Editable

### Servicios

Editar `src/content/services.json` para modificar los 7 servicios ofrecidos.

### Productos (Balanzas)

Editar `src/content/products.json` para agregar/modificar balanzas.

## 🔒 Seguridad

- ✅ HTTPS automático (Vercel)
- ✅ Honeypot en formularios
- ✅ Validación cliente y servidor (Zod)
- ⏳ reCAPTCHA v3 (próximamente)

## 📱 Contacto UMEP

- **WhatsApp**: [300 321 2328](https://wa.me/573003212328)
- **Email**: umep.colombia@gmail.com
- **Facebook**: [UMEP](https://www.facebook.com/share/166ieRm1tF/?mibextid=wwXIfr)
- **Instagram**: [@umep.co](https://www.instagram.com/umep.co?igsh=aHVwdng1Nm00aGY3)

## 📄 Licencia

© 2025 UMEP - Unidad de Mantenimiento Electrónico Profesional. Todos los derechos reservados.

---

**Desarrollado para Carol Andrea Jiménez - Ingeniera Electrónica**
