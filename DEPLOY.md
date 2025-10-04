# Guía de Deployment - UMEP Website

## ✅ Pre-requisitos completados

El proyecto está **100% listo para deployment** con las siguientes características implementadas:

- ✅ Next.js 14 con App Router + TypeScript + Tailwind
- ✅ 5 páginas completamente funcionales (Home, Servicios, Productos, Contacto, Privacidad)
- ✅ 7 servicios industriales + 3 productos (balanzas)
- ✅ Formulario de contacto con validación Zod
- ✅ CTAs a WhatsApp (300 321 2328) con mensajes prellenados
- ✅ SEO técnico completo (sitemap, robots, metadata, JSON-LD)
- ✅ Google Analytics 4 integrado
- ✅ Redes sociales (Facebook + Instagram) en footer
- ✅ Diseño responsive mobile-first
- ✅ Build exitoso sin errores

---

## 🚀 Paso 1: Crear repositorio en GitHub

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "feat: UMEP website MVP - Ready for production"

# Crear rama main
git branch -M main

# Conectar con tu repositorio de GitHub
# (Crea primero el repo en github.com)
git remote add origin https://github.com/TU-USUARIO/umep-site.git

# Subir código
git push -u origin main
```

---

## 🌐 Paso 2: Deploy en Vercel (GRATIS)

### 2.1 Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Registrarse con GitHub (recomendado)

### 2.2 Importar proyecto

1. Click en **"Add New Project"**
2. Selecciona el repositorio `umep-site`
3. Vercel detectará automáticamente que es Next.js
4. **NO cambies nada** en la configuración
5. Click en **"Deploy"**

⏱️ El deployment tomará ~2-3 minutos

---

## 🔧 Paso 3: Configurar Variables de Entorno

### 3.1 Google Analytics (Opcional pero recomendado)

1. Ir a [analytics.google.com](https://analytics.google.com)
2. Crear cuenta y propiedad GA4
3. Copiar Measurement ID (formato: `G-XXXXXXXXXX`)

### 3.2 Agregar en Vercel

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agregar:
   ```
   Name: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   Environment: Production, Preview, Development
   ```
4. Click **"Save"**
5. Ir a **Deployments** → **Redeploy** (para aplicar cambios)

---

## 🌍 Paso 4: Conectar dominio propio (Opcional)

### Si tienes `umep.co` o `www.umep.co`:

1. En Vercel: **Settings** → **Domains**
2. Click **"Add"**
3. Escribir `umep.co`
4. Vercel te dará instrucciones de DNS:
   - Tipo: `A`
   - Name: `@`
   - Value: `76.76.19.19` (IP de Vercel)
5. Configurar DNS en tu proveedor de dominio (GoDaddy, Namecheap, etc.)
6. Esperar propagación DNS (5-60 minutos)

### Alternativa temporal (GRATIS):

Usar la URL gratuita de Vercel:
```
https://umep-site.vercel.app
```

---

## 📊 Paso 5: Configurar Search Console

1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Click **"Agregar propiedad"**
3. Verificar dominio (Vercel te ayuda)
4. Enviar sitemap: `https://tu-dominio.com/sitemap.xml`

---

## 📱 Paso 6: Generar QR para tarjetas

### Opción 1: En línea (Gratis)

1. Ir a [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Tipo: URL
3. URL: `https://umep-site.vercel.app` (o tu dominio)
4. Personalizar con logo UMEP (si tienes)
5. Descargar PNG/SVG de alta calidad

### Opción 2: Con terminal

```bash
# Instalar qrencode (macOS)
brew install qrencode

# Generar QR
qrencode -o umep-qr.png "https://umep-site.vercel.app"
```

---

## 🎯 Checklist Final

Antes de compartir el sitio, verifica:

- [ ] Sitio carga correctamente en `https://tu-dominio.com`
- [ ] Todas las páginas funcionan: Home, Servicios, Productos, Contacto, Privacidad
- [ ] Formulario de contacto muestra mensaje de éxito
- [ ] Botones de WhatsApp abren con mensaje prellenado
- [ ] Links de redes sociales (Facebook/Instagram) funcionan
- [ ] Sitio se ve bien en móvil (abre desde tu teléfono)
- [ ] Google Analytics recibe visitas (verifica en 24-48h)
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] Robots accesible en `/robots.txt`

---

## 🔄 Actualizaciones futuras

### Cambiar contenido de servicios o productos:

1. Editar archivos JSON:
   - `src/content/services.json`
   - `src/content/products.json`

2. Commit y push:
   ```bash
   git add .
   git commit -m "update: precios de balanzas"
   git push
   ```

3. Vercel desplegará automáticamente (1-2 min)

### Agregar fotos de balanzas:

1. Colocar imágenes en `public/images/products/`
2. Nombres sugeridos:
   - `balanza-industrial-150kg.jpg`
   - `balanza-precision-5kg.jpg`
   - `balanza-comercial-30kg.jpg`
3. Actualizar rutas en `products.json`
4. Commit y push

---

## 📧 Configurar envío de emails (Fase 2)

Actualmente el formulario solo simula envío. Para recibir emails reales:

### Opción A: EmailJS (Gratis - 200 emails/mes)

1. Crear cuenta en [emailjs.com](https://www.emailjs.com/)
2. Crear servicio de email (Gmail)
3. Crear template
4. Copiar credenciales:
   - Service ID
   - Template ID
   - Public Key
5. Agregar en Vercel Environment Variables:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=xxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=xxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
   ```
6. Actualizar `LeadForm.tsx` con integración EmailJS

### Opción B: Formspree (Gratis - 50 envíos/mes)

1. Ir a [formspree.io](https://formspree.io)
2. Crear endpoint
3. Copiar URL del endpoint
4. Actualizar formulario para enviar a ese endpoint

---

## 🔐 Seguridad adicional (Opcional - Fase 2)

### reCAPTCHA v3

1. Ir a [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Registrar sitio (tipo v3)
3. Agregar variables:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
   RECAPTCHA_SECRET=xxx
   ```
4. Actualizar `LeadForm.tsx`

---

## 💡 Próximos pasos sugeridos

### Corto plazo (1-2 semanas):
- [ ] Comprar dominio `umep.co` (~$15 USD/año)
- [ ] Configurar EmailJS o Formspree para recibir leads
- [ ] Agregar fotos reales de Carol trabajando y de balanzas
- [ ] Crear logo profesional en Canva (gratis)

### Mediano plazo (1-2 meses):
- [ ] Implementar reCAPTCHA
- [ ] Conectar base de datos (Supabase Free)
- [ ] Panel de administración básico
- [ ] Blog con casos de éxito

### Largo plazo (3-6 meses):
- [ ] Tienda virtual completa
- [ ] Pasarela de pago (Mercado Pago/Wompi)
- [ ] Portal del cliente
- [ ] App móvil (Progressive Web App)

---

## 🆘 Troubleshooting

### El sitio no carga:
- Verificar que el deployment en Vercel esté en "Ready"
- Revisar logs en Vercel Dashboard

### Formulario no funciona:
- Por ahora es normal (solo muestra mensaje de éxito)
- Implementar EmailJS en Fase 2

### Google Analytics no registra visitas:
- Esperar 24-48h para primeros datos
- Verificar que NEXT_PUBLIC_GA_ID esté correctamente configurado

---

## 📞 Contacto para soporte técnico

Para dudas sobre el sitio web:
- **GitHub Issues**: (enlace a tu repo)
- **Email**: (tu email de desarrollador)

Para servicios de UMEP:
- **WhatsApp**: 300 321 2328
- **Email**: contacto.umep@gmail.com

---

## 🎉 ¡Felicitaciones!

El sitio de UMEP está listo para generar leads y posicionar a Carol como profesional en el mercado industrial del Valle del Cauca.

**URL actual**: https://umep-site.vercel.app

**Próximo paso**: Compartir QR en tarjetas de presentación y redes sociales.

---

*Desarrollado para Carol Andrea Jiménez - Ingeniera Electrónica*
*Octubre 2025*
