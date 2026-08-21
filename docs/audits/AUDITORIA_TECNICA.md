# Auditoría técnica · umepcali.com

## Diez hallazgos antes de rediseñar nada

El portal cumple un año en producción y funciona. La arquitectura general es buena y no necesita una reescritura. Sin embargo, el despliegue auditado usa una versión de Next.js fuera de soporte, presenta avisos de seguridad pendientes y transfiere 5,26 MB de animación en cada carga completa del documento. Ninguno de esos tres problemas se resuelve con un rediseño visual.

**Revisión consolidada 4 · 20 de agosto de 2026**

**Commit auditado:** `c2a477f` (13 de marzo de 2026)

**Alcance:** repositorio público, producción, DNS, dependencias y recursos multimedia

**Estado en el momento de la auditoría:** ningún cambio correctivo desplegado

**Trabajo local observado entonces:** `README.md` modificado, GIF eliminado y `public/media/umep-intro.mp4` añadido; la integración del MP4 en `SplashIntro.tsx` seguía pendiente.

Esta versión sustituye las redacciones anteriores que se contradecían. Separa explícitamente el estado de producción del árbol local, distingue riesgos de runtime y build-time, y convierte cada hallazgo en un bloque con criterio de cierre.

> **Uso del documento:** el cuerpo de la auditoría conserva la fotografía del commit `c2a477f` y de producción en la fecha indicada. Las expresiones “actual”, “pendiente” o “ausente” dentro de la evidencia se refieren a esa línea base. El estado posterior se mantiene en la tabla siguiente para no reescribir la evidencia histórica.

## Seguimiento de implementación

**Última actualización:** 20 de agosto de 2026

**Rama de implementación:** `fix/wave-0-hardening`, commit `80f47a8`

**Estado:** cambios de la ola 0 verificados localmente y en Vercel Preview; producción pendiente.

| Hallazgo | Estado posterior | Evidencia o siguiente cierre |
|---|---|---|
| P0-01 · Dependencias | Mitigado en Preview | Next 14.2.35, Blob 2.8.0, Resend 6.21.0 y Undici 6.28.0; `npm audit --omit=dev` queda en 3 altas y 0 moderadas. Pendiente producción y migración. |
| P0-02 · Next.js sin soporte | Abierto | La contención en 14.2.35 no sustituye la migración a Next 16 ni la alineación de Node. |
| P0-03 · Splash | Verificado en Preview | MP4 de 146.095 bytes, sin GIF ni `priority`; reproducción confirmada en el deployment de la rama. Pendiente producción. |
| P1-04 · Ruta de contacto | Verificado en Preview | `safeParse`, esquema estricto, escape HTML y allowlist del hostname de Blob; un envío real llegó al buzón operativo y mostró correctamente la imagen autorizada. Pendiente producción. |
| P1-05 · Carga de imágenes | Abierto | La allowlist protege el enlace recibido por correo, pero `/api/upload` aún confía en `file.type`, usa nombre predecible y permite escritura anónima. |
| P2-06 · Rate limit | Abierto | Continúa el contador en memoria por instancia; falta WAF o Upstash según la decisión final. |
| P2-07 · Autenticación de correo | Implementado; observación en curso | SPF de Zoho verificado, DKIM `zmail` activo y DMARC en `p=none`; Mail-Tester aprobó el flujo corporativo y el formulario de Preview entregó mediante Resend al buzón operativo. Falta observar los informes DMARC. |
| P2-08 · Páginas de servicios | Abierto | Sin cambios. |
| P3-09 · Movimiento | Parcial | El splash respeta movimiento reducido; continúan pendientes el ticker y las demás animaciones infinitas. |
| P3-10 · Favicon | Abierto | Sin cambios. |

La evidencia de correo se encuentra en [docs/correo](../correo/README.md). Cuando todos los hallazgos estén cerrados, esta auditoría no debe borrarse: se marca como **cerrada**, se añade el commit y deployment finales y, si deja de ser material de trabajo diario, puede moverse a `docs/audits/archive/` como registro histórico.

### Verificación del Preview · 20 de agosto de 2026

- Vercel completó correctamente el deployment del commit `80f47a8`.
- El MP4 se reprodujo en una visita real al Preview.
- Se envió una solicitud como cliente desde el formulario.
- El mensaje llegó al buzón operativo de Zoho.
- La imagen adjunta al flujo se visualizó correctamente desde el correo.

Esta prueba confirma el recorrido funcional del usuario. No cierra P1-05: la protección binaria, BotID, nombres opacos y tratamiento de cargas huérfanas continúan pendientes.

## Resumen ejecutivo

| Indicador | Medición |
|---|---:|
| Primera carga del home en producción | 5,68 MB |
| Proporción atribuible al GIF | 92,6 % |
| Next.js desplegado | 14.2.33, fuera de soporte |
| `npm audit --omit=dev` | 4 altas y 3 moderadas |
| JavaScript del despliegue medido | 185 KB |
| MP4 local adoptado | 146.095 bytes, 97,29 % menor que el GIF |

La arquitectura del proyecto es sólida: App Router correctamente utilizado, `next/font`, `next/image` con `sizes`, sitemap y robots programáticos, metadatos completos, skip-link y contenido desacoplado en JSON. El sitio debe evolucionarse, no reescribirse.

Las prioridades reales son cuatro:

1. Integrar correctamente el MP4 que ya sustituyó al GIF en el árbol local.
2. Migrar desde Next.js 14 a una rama con soporte y actualizar las dependencias de runtime.
3. Validar y escapar en el servidor los datos enviados por el formulario.
4. Proteger la carga de imágenes y sustituir el rate limit en memoria.

## Registro de hallazgos

### P0-01 · Crítico — Dependencias con avisos de seguridad pendientes

**Evidencia**

- `package-lock.json`: Next.js 14.2.33.
- `npm outdated`: 14.2.35 dentro de la rama 14 y 16.3.1 como versión estable vigente durante la auditoría.
- `npm audit --omit=dev`: cuatro paquetes con severidad alta y tres con severidad moderada.
- El proyecto utiliza App Router y React Server Components.

El aviso de seguridad de Next.js del 11 de diciembre de 2025 describe una denegación de servicio mediante una petición construida contra endpoints de App Router. Para la rama 14, el parche correspondiente se publicó en 14.2.35 y no existe un workaround de aplicación recomendado: actualizar es obligatorio.

No obstante, 14.2.35 solo es una contención. El audit vigente incluye avisos posteriores cuyo rango para `next` llega hasta `16.3.0-preview.10`; por eso permanecer en 14.2.35 no constituye un cierre sostenible.

| Paquete | Severidad | Origen | Triaje para este despliegue |
|---|---|---|---|
| `next` | Alta | Directa | App Router expuesto a tráfico; requiere actualización. El aviso específico de Image Optimizer depende del modo de despliegue y no se trata igual en Vercel que en self-hosting. |
| `undici` | Alta | `@vercel/blob` | Cliente HTTP usado en runtime por la subida a Blob. La versión instalada, 6.23.0, está dentro del rango vulnerable `<=6.27.0`. |
| `postcss` | Alta | Empaquetado por Next | Actúa durante compilación; no procesa directamente datos del formulario en runtime. |
| `nanoid` | Alta | Vía PostCSS/Next | En este árbol aparece en la cadena de build. |
| `resend` | Moderada | Directa | Runtime del formulario; la versión instalada está en el rango reportado. |
| `svix` | Moderada | Vía Resend | Dependencia transitiva de la versión instalada de Resend. |
| `uuid` | Moderada | Vía Svix | Dependencia transitiva de la misma cadena. |

El número bruto —cuatro altas y tres moderadas— necesita este triaje: no todas las entradas tienen la misma exposición. Aun así, `next` y `undici` sí participan en rutas de runtime y deben resolverse.

#### Matiz obligatorio sobre `undici`

Actualizar `@vercel/blob` a 2.8.0 **no garantiza por sí solo** que el lockfile abandone `undici@6.23.0`: esa versión de Blob declara `undici: ^6.23.0`, por lo que 6.23.0 continúa satisfaciendo el rango. En una simulación contra el árbol actual, Blob cambia a 2.8.0 y `undici` permanece intacto. `npm update undici` sí lo mueve a 6.28.0, primera versión fuera de todos los rangos que reporta el audit actual.

#### Contención si la migración no sale inmediatamente

```bash
npm install next@14.2.35 @vercel/blob@2.8.0 resend@^6.21.0
npm update undici
npm audit --omit=dev
npm run lint
npm run build
```

Debe hacerse commit del `package-lock.json` y desplegarse un preview antes de producción. Si la migración a Next.js 16 puede completarse en la misma jornada, es preferible ir directamente a P0-02 y evitar dos actualizaciones sucesivas.

**Criterio de cierre:** ninguna vulnerabilidad conocida que afecte el runtime de este despliegue; cualquier aviso aceptado por ser exclusivamente de build debe quedar documentado con paquete, alcance y razón.

**Secretos:** no se requiere una rotación por React2Shell. La rama estable 14.x no estuvo en el rango de aquella vulnerabilidad. Esto no sustituye una rotación si existiera otra evidencia independiente de exposición.

### P0-02 · Crítico — Next.js 14 está fuera de soporte

La política oficial marca Next.js 16 como Active LTS, Next.js 15 como Maintenance LTS y Next.js 14 como no soportado. Migrar a 15 ahora desplazaría el problema poco tiempo: según la política de dos años de Maintenance LTS y su fecha de lanzamiento, su salida está prevista para octubre de 2026. El destino razonable es Next.js 16.

La superficie local de migración es relativamente pequeña: no hay middleware, rutas paralelas, PPR activo, configuración propia de webpack ni parámetros dinámicos complejos. Los cambios que sí requieren revisión son:

- React y React DOM 18 → 19.2.
- Retirada de `next lint`; debe utilizarse ESLint CLI con configuración flat.
- Turbopack como builder predeterminado.
- Posibles cambios de tipos, imágenes y configuración introducidos entre las majors.

La migración mecánica puede iniciarse con el codemod oficial:

```bash
npx @next/codemod@canary upgrade latest
```

#### Alineación de Node

El entorno local auditado usa Node 24.13.1; la configuración del proyecto leída en Vercel indicaba Node 22.x. En otras palabras, se prueba localmente con una versión distinta de la utilizada para compilar y ejecutar el despliegue. Ambas satisfacen el mínimo de Next.js 16, pero la diferencia introduce variabilidad innecesaria.

La migración debe fijar una versión explícita, por ejemplo:

```json
{
  "engines": {
    "node": "24.x"
  }
}
```

y seleccionar la misma major en Vercel. El cambio debe verificarse en preview antes de producción.

**Criterio de cierre:** Next.js en Active o Maintenance LTS, Node alineado entre local y Vercel, lint y build verdes, y smoke test de las cinco rutas y ambos endpoints.

### P0-03 · Crítico — El splash penaliza las cargas directas

**Producción auditada**

- `public/media/umep-splash.gif`: 5.389.521 bytes, 150 cuadros, 5 segundos exactos y 320 × 214 px.
- `SplashIntro.tsx`: `priority`, `unoptimized` y overlay `fixed inset-0 z-50` durante cuatro segundos.
- `SplashIntro`, `Header` y `main` son hermanos dentro del layout raíz.

El hero no espera al splash: se renderiza por debajo desde el comienzo. El overlay lo cubre durante cuatro segundos, pero no bloquea su render. El splash tampoco vuelve a montarse durante la navegación interna porque el layout raíz persiste; reaparece en recargas, entradas directas y nuevas visitas.

El GIF puede ser candidato a LCP por ser una imagen visible de gran área. `priority` no crea esa condición: adelanta la descarga y aumenta la competencia de red. Como `next/image` no transforma GIF animado, `unoptimized` es coherente con el formato.

La descripción precisa es esta: en cada carga completa y directa del documento se inicia una transferencia prioritaria de 5,39 MB mientras el overlay cubre el contenido durante cuatro segundos. La transferencia y el overlay se solapan; sus duraciones no se suman. En conexiones móviles lentas, la descarga sigue compitiendo con los recursos prioritarios del hero y empeora la disponibilidad perceptible.

#### Identidad visual conservada

El análisis de los 150 cuadros encontró este comportamiento:

| Tramo | Píxeles brillantes | Comportamiento |
|---|---:|---|
| 0,00–1,50 s | 0,2–1,0 % | UMEP dibujado, casi estático |
| 1,67–2,50 s | 2,0–4,6 % | Inicio de los destellos |
| 2,75–4,45 s | Hasta 15,8 % | Las pistas energizan las letras; pico en 3,17 s |
| 4,50–5,00 s | 7,8→3,8 % | Asentamiento hacia el estado inicial |

El archivo finalmente adoptado conserva más contexto que la ventana experimental de 1,8 segundos:

| Archivo final | Valor |
|---|---:|
| Ruta | `public/media/umep-intro.mp4` |
| Peso | 146.095 bytes |
| Duración | 3,267 s |
| Cuadros | 98 a 30 fps |
| Recorte | Cuadros 52–149, equivalentes a 1,73–5,00 s |
| Vídeo | H.264 High, `yuv420p`, faststart |
| Audio | Ninguno |
| Reducción frente al GIF | 97,29 % |

Las siguientes cifras pertenecen a una ventana experimental más corta, centrada aproximadamente en 2,75–4,45 s. No deben compararse como si describieran el archivo final de 3,267 segundos:

| Códec experimental | Calidad | Peso |
|---|---:|---:|
| VP9 | CRF 34 | 198,7 KB |
| VP9 | CRF 40 | 121,2 KB |
| AV1 | CRF 38 | 99,9 KB |
| H.264 | CRF 24 | 120,1 KB |
| H.264 | CRF 28 | 68,6 KB |
| **H.264 final** | **CRF 26, cuadros 52–149** | **146.095 B** |

Los valores CRF de códecs distintos no representan calidades equivalentes por sí solos. La decisión práctica no depende de esa equivalencia: el MP4 final conserva la firma visual, es ampliamente compatible, tiene faststart y queda holgadamente por debajo del objetivo de 250 KB sin mantener dos fuentes.

#### Estado local y corrección

El GIF ya fue eliminado localmente, pero `SplashIntro.tsx` aún apunta a `/media/umep-splash.gif`. Si ese árbol se desplegara así, el recurso devolvería 404 y el overlay podría aparecer vacío u oscuro. Producción no está afectada mientras continúe sirviendo el deployment anterior.

La primera modificación de código debe sustituir `next/image` por un vídeo equivalente a:

- `<video autoPlay muted playsInline>` con `/media/umep-intro.mp4`.
- Sin bucle y sin una precarga de prioridad especial.
- `onEnded` como salida principal y temporizador de respaldo de aproximadamente 3,6 segundos.
- `onError` y salida por clic para no atrapar al usuario.
- `aria-hidden="true"`, al ser una presentación decorativa.
- Una sola aparición por sesión mediante `sessionStorage`.
- Omisión completa cuando `prefers-reduced-motion: reduce` esté activo.

El hero y el resto de la interfaz seguirán cargándose y renderizándose debajo del overlay, como ya ocurre hoy, pero competirán con un recurso de aproximadamente 143 KiB en vez de 5,39 MB.

**Criterio de cierre:** ninguna referencia al GIF, cero 404, intro reproducida una vez por sesión, salida funcional por fin/error/clic, navegación y foco disponibles después del desmontaje, y omisión bajo movimiento reducido.

### P1-04 · Alto — La ruta de contacto no valida ni escapa en el servidor

`leadSchema` existe y se usa mediante `zodResolver` en el navegador. La ruta `api/contact/route.ts` lee `req.json()`, destructura el cuerpo y coloca sus valores directamente en una plantilla HTML.

La validación del cliente mejora la experiencia, pero no constituye una frontera de seguridad. Una petición directa puede omitirla. Además, `safeParse()` por sí solo no neutraliza HTML: una cadena como `<img ...>` puede cumplir los límites de longitud y seguir siendo válida para Zod.

El arreglo mínimo seguro es una unidad inseparable:

1. Ejecutar `leadSchema.strict().safeParse(body)` en el servidor y devolver 400 si falla.
2. Construir el correo exclusivamente desde `parsed.data`.
3. Escapar `&`, `<`, `>`, `"` y `'` en cada valor incluido en HTML.
4. Validar `imagenUrl` contra `https:` y el hostname exacto del Blob autorizado.
5. Conservar el honeypot y rechazar cuerpos demasiado grandes antes de procesarlos.

`safeParse()` cierra la aceptación de payloads fuera del esquema; el escape cierra la inyección HTML; la allowlist impide enlaces arbitrarios. Adelantar solo la primera pieza no cierra el vector completo.

**Criterio de cierre:** pruebas de servidor para payload válido, campos faltantes, campos extra, etiquetas HTML, atributos maliciosos, protocolos no HTTPS y hosts de imagen externos; ninguna cadena sin escapar llega a la plantilla.

### P1-05 · Alto — La carga de imágenes está abierta y confía en metadatos del cliente

La ruta `api/upload/route.ts` acepta un POST anónimo, comprueba `file.type`, permite hasta 4 MB y guarda el resultado en un Blob público. El nombre incluye marca de tiempo y nombre original, con `addRandomSuffix: false`.

El cliente legítimo convierte siempre la imagen seleccionada a JPEG mediante canvas antes de enviarla. Por eso la ruta servidor no necesita aceptar PNG o WebP en el payload final: puede exigir una firma JPEG real y usar de manera coherente extensión `.jpg` y `contentType: image/jpeg`.

Un atacante directo, en cambio, controla `file.type`. Derivar `contentType` de ese valor no sería una solución. La validación debe inspeccionar la firma binaria y, si se permiten varios formatos en el futuro, derivar extensión y MIME únicamente del formato verificado.

`addRandomSuffix: true` reduce drásticamente la predictibilidad de las URLs, pero no vuelve privado el Blob ni elimina matemáticamente la posibilidad de descubrimiento. Para fotos de equipos, placas e instalaciones debe evaluarse un store privado o un mecanismo de lectura autenticada y temporal.

#### Camino recomendado para el volumen actual

Mantener la carga por la ruta servidor es suficiente para JPEG de 2–3 MB y evita exponer un emisor adicional de tokens. Debe añadirse:

- BotID Basic en la solicitud.
- La regla WAF común de P2-06 por delante.
- Máximo comprimido de 2–3 MB.
- Firma binaria JPEG y rechazo de cualquier otro contenido.
- Dimensiones máximas razonables para evitar imágenes descomprimidas abusivas.
- Nombre opaco con sufijo aleatorio.
- Vínculo entre la carga y el intento de contacto, con expiración.
- Limpieza de cargas huérfanas si el contacto no llega a completarse.

#### Si posteriormente se adopta client upload

El token debe emitirse únicamente después de BotID y autorización. El token debe limitar tipo, tamaño, prefijo y vigencia; el `clientPayload` debe validarse y la carga debe vincularse a un intento de formulario. Un endpoint anónimo que entrega tokens a cualquiera solo desplaza el problema.

**Criterio de cierre:** un bot o `curl` sin las comprobaciones no puede almacenar contenido; archivos con MIME falso son rechazados; los nombres no son predecibles; existen límites de tamaño/dimensiones y tratamiento de huérfanos.

### P2-06 · Medio — El rate limit en memoria no es global en serverless

`lib/rateLimit.ts` usa un `Map` en el ámbito del módulo y un `setInterval` de limpieza. Sí existe rate limiting; el problema es que su estado vive en cada instancia. Solicitudes concurrentes pueden llegar a procesos diferentes, cada uno con un contador nuevo, y las funciones pueden congelarse antes de que el temporizador limpie nada.

Vercel KV ya no está disponible. Los almacenes existentes se migraron a Upstash Redis y los proyectos nuevos deben instalar Redis desde Marketplace.

Existen dos caminos válidos:

1. **WAF de Vercel:** bloquea antes de invocar la función y no requiere modificar `checkRateLimit`.
2. **Upstash Redis:** permite límites distintos, estadísticas propias y un contador más consistente, pero convierte `checkRateLimit` en asíncrona; `contact` y `upload` deben usar `await`.

Para el tráfico actual se recomienda una única regla de rate limit en Hobby con condición `POST /api/*`, compartida por ambos endpoints, y un límite inicial común de cinco solicitudes cada diez minutos por IP o JA4. Una carga con foto consume normalmente dos solicitudes —upload y contacto—, por lo que el presupuesto compartido debe observarse después del despliegue. Los contadores de WAF son regionales: reducen mucho la dispersión del `Map`, pero no equivalen a un contador global estricto.

Hobby incluye una sola regla de rate limit por proyecto. No es posible configurar simultáneamente 3/10 minutos para contacto y 5/10 minutos para upload mediante dos reglas. Upstash queda reservado para cuando se necesiten presupuestos separados, telemetría propia o precisión global adicional.

**Criterio de cierre:** peticiones repetidas reciben 429 de manera reproducible en preview; la regla cubre únicamente POST de las APIs previstas; los envíos legítimos con imagen caben en el presupuesto; el `Map` y su temporizador dejan de considerarse la defensa efectiva.

### P2-07 · Medio — Falta completar la autenticación de correo del dominio

| Registro | Estado observado | Consecuencia |
|---|---|---|
| `resend._domainkey` | DKIM presente | El correo transaccional se firma. |
| `send.umepcali.com` | SPF con Amazon SES | Resend está delegado en su subdominio de envío. |
| Apex `umepcali.com` | Sin SPF de Zoho | El correo corporativo no publica autorización de Zoho. |
| `_dmarc.umepcali.com` | Inexistente | No existe política ni telemetría DMARC publicada. |

No debe añadirse `include:amazonses.com` al SPF del apex: Resend ya utiliza `send.umepcali.com`, cuyo SPF está separado y puede alinear con DMARC mediante el dominio organizativo. Añadirlo al apex aumentaría las consultas DNS sin necesidad.

Zoho documenta `include:zohomail.com` para Zoho Mail y `include:one.zoho.com` cuando se usan varios servicios de Zoho. Antes de publicar debe confirmarse el valor mostrado en el panel de la cuenta y verificarse que no exista otro registro SPF, porque el dominio solo puede tener uno.

Configuración inicial propuesta:

```text
@       TXT  v=spf1 include:zohomail.com ~all
_dmarc  TXT  v=DMARC1; p=none; rua=mailto:<buzón-real-del-dominio>
```

`p=none` no bloquea la suplantación: publica alineación y permite recopilar informes. Si el buzón `rua` no se revisa, se pierde el valor operativo de esa telemetría, aunque el registro no sea técnicamente decorativo. Después de dos a cuatro semanas de datos y de confirmar la alineación de Zoho y Resend, debe avanzarse gradualmente a `quarantine` y posteriormente a `reject` si no aparecen emisores legítimos no contemplados.

**Criterio de cierre:** SPF único y verificado por Zoho, DMARC visible en DNS, informes recibidos en un buzón atendido y prueba real de correo corporativo y transaccional con SPF/DKIM/DMARC alineados.

### P2-08 · Medio — Siete servicios no tienen páginas propias

`services.json` contiene siete servicios con slug, título, resumen y beneficios. Sin embargo, todos los enlaces “Ver detalles” terminan en `/servicios`, una página sin destinos individuales.

Esto limita la arquitectura de información y el SEO local: no existe una URL dedicada para búsquedas específicas como reparación de variadores en Cali o calibración de balanzas en el Valle del Cauca. También impide que cada servicio tenga metadatos, contenido, testimonios y datos estructurados propios.

La solución es crear `/servicios/[slug]` con:

- `generateStaticParams()` desde el JSON existente.
- `generateMetadata()` por servicio.
- Contenido suficiente y específico, no siete páginas duplicadas cambiando solo el título.
- Marcado `Service` relacionado con el `LocalBusiness` existente.
- Enlaces reales desde `ServicesGrid`.
- Las siete URLs en sitemap y enlaces internos contextuales.

No se necesita base de datos ni CMS para la primera versión.

**Criterio de cierre:** siete URLs únicas, indexables y enlazadas; metadata y canonical correctos; sitemap actualizado; contenido distinto y útil en cada página.

### P3-09 · Bajo — Movimiento perpetuo sin controles suficientes

Se encontraron cinco animaciones infinitas definidas en el sitio, además del splash:

- `Ticker.tsx`: `animate-ticker`, 30 segundos.
- `Hero.tsx`: `spinReverse`, 50 segundos.
- `Hero.tsx`: `spinForward`, 30 segundos.
- `Hero.tsx`: `logoPulse`, 6 segundos.
- `globals.css`: `pulse-idle`, 3 segundos, aplicado a botones sociales.

No existe `prefers-reduced-motion` ni un control para detener el ticker.

La referencia WCAG debe expresarse con precisión. El movimiento que empieza automáticamente, dura más de cinco segundos y aparece junto a otro contenido puede quedar bajo WCAG 2.2.2 “Pause, Stop, Hide”, nivel A. WCAG 2.3.3 “Animation from Interactions”, nivel AAA, aplica a animación no esencial iniciada por la interacción del usuario; no describe por sí sola estas animaciones automáticas.

`prefers-reduced-motion` es una protección necesaria, pero no sustituye siempre el mecanismo de pausa exigido para contenido automático. La corrección propuesta es:

- Desactivar splash y las cinco animaciones bajo `prefers-reduced-motion: reduce`.
- Añadir al ticker un control visible de pausar/reanudar, o detenerlo antes de cinco segundos.
- Convertir los anillos, el pulso del logo y los botones en animaciones finitas o eliminarlas cuando no aporten información.
- Comprobar que pausar no altera foco, lectura ni layout.

**Criterio de cierre:** el sitio queda inmóvil con la preferencia del sistema; el ticker puede pausarse o no supera cinco segundos; no queda movimiento perpetuo sin control cuando sea aplicable WCAG 2.2.2.

### P3-10 · Bajo — El favicon de origen es innecesariamente grande

`public/favicon.ico` pesa 370.070 bytes sin compresión. La medición contra producción fue:

| Codificación solicitada | Transferencia |
|---|---:|
| Brotli | 27.659 B |
| gzip | 27.953 B |
| identity | 370.070 B |

El CDN sí entrega Brotli cuando el navegador lo anuncia; la diferencia frente a gzip es de solo 294 bytes y no cambia la prioridad. El problema es el archivo de origen sobredimensionado.

Debe regenerarse un ICO pequeño con tamaños útiles o utilizar la convención de metadata de archivos de Next mediante `app/icon.png`. Esto es una optimización menor y puede viajar dentro de la ola de accesibilidad y documentación.

**Criterio de cierre:** icono nítido en 16, 32 y tamaños de acceso directo, sin regresión visual y con un peso de origen razonable.

## Plan de implementación por olas

Cada ola debe dejar el sitio desplegable, verificable y fácil de revertir. Los tiempos son estimaciones, no compromisos, y deben ajustarse después del primer preview.

### Ola 0 · Restaurar y contener

**Prioridad:** ahora

**Estimación:** 3–5 horas

1. Integrar `umep-intro.mp4` en `SplashIntro` y eliminar la referencia rota al GIF.
2. Añadir `onEnded`, respaldo temporal, `onError`, salida por clic, `sessionStorage`, `aria-hidden` y omisión con movimiento reducido.
3. Implementar como una sola unidad `safeParse + escape HTML + allowlist de imagenUrl` en la ruta de contacto.
4. Publicar SPF de Zoho y DMARC en modo observación con un buzón real.
5. Si Next.js 16 no puede desplegarse en la misma jornada, aplicar la contención de P0-01, incluido `npm update undici`.

**Salida:** preview sin 404, splash funcional y ligero, payloads maliciosos rechazados/escapados, DNS visible y dependencias de runtime contenidas o migración iniciada.

### Ola 1 · Migrar a una plataforma soportada

**Prioridad:** inmediatamente después

**Estimación:** medio día a un día

1. Migrar a Next.js 16.3.1 y React/React DOM 19.2 mediante el codemod oficial.
2. Actualizar `@vercel/blob` y Resend.
3. Ejecutar explícitamente `npm update undici` y comprobar la versión resuelta en el lockfile.
4. Sustituir `next lint` por ESLint CLI con configuración flat.
5. Fijar `engines.node` y alinear Vercel con Node 24.
6. Ejecutar lint, build, audit y pruebas de humo en preview.
7. Documentar cualquier aviso de build que permanezca aceptado.

**Salida:** framework soportado, Node alineado, build/lint verdes y ningún aviso sin triaje que afecte el runtime.

### Ola 2 · Cerrar las APIs

**Prioridad:** después de la migración

**Estimación:** un día

1. Añadir BotID Basic a contacto y carga.
2. Configurar una sola regla WAF para `POST /api/*`, inicialmente cinco solicitudes cada diez minutos.
3. Mantener la subida por servidor para el tamaño actual, con máximo de 2–3 MB, dimensiones acotadas y firma JPEG real.
4. Habilitar nombres opacos con sufijo aleatorio.
5. Vincular la carga a un intento de formulario y definir la eliminación de huérfanos.
6. Decidir explícitamente si las fotografías justifican Blob privado; documentar la decisión de privacidad.
7. Utilizar Upstash únicamente si se necesitan límites separados o contador global más preciso. En ese caso, convertir `checkRateLimit` en asíncrona y usar `await` en ambas rutas.

**Salida:** escritura anónima no viable, payloads falsos rechazados, abuso limitado antes de las funciones y política clara para imágenes abandonadas.

### Ola 3 · Accesibilidad, SEO y documentación

**Prioridad:** cuando las rutas críticas estén cerradas

**Estimación:** 1–2 días

1. Implementar movimiento reducido para splash y animaciones.
2. Añadir pausa al ticker o limitar su duración; retirar el movimiento perpetuo decorativo.
3. Regenerar el favicon o migrarlo a `app/icon.png`.
4. Crear las siete páginas `/servicios/[slug]` con metadata, contenido, datos estructurados y sitemap.
5. Limpiar `.env.example` de referencias futuras a EmailJS y reCAPTCHA que no forman parte del sistema real.
6. Sincronizar el README con el estado finalmente implementado.
7. Marcar en esta auditoría cada hallazgo como abierto, mitigado o cerrado, con commit y fecha.

**Salida:** controles de movimiento verificables, arquitectura SEO ampliada y documentación que describe el sistema real.

### Ola 4 · Rediseño

**Prioridad:** después de estabilizar la base

**Estimación:** sin urgencia técnica

1. `LeadForm`: estados de carga, progreso de imagen, errores y confirmación.
2. `ClientsShowcase`: convertir logos en mini casos con evidencia o métricas disponibles.
3. `/productos`: filtros, comparación y rutas de decisión claras.
4. Hero al final, cuando el lenguaje visual y las señales de confianza estén asentados.

El rediseño no queda descartado; queda colocado después de retirar el overlay pesado y cerrar los flujos que reciben datos. Así, cada mejora visual se evalúa sobre el sitio que realmente se entregará.

## Decisiones consolidadas de la revisión cruzada

| Tema | Decisión final |
|---|---|
| Next.js 14.2.35 | Contención para el aviso de diciembre; no solución final del audit vigente. |
| React2Shell | No afectó la rama estable 14.x; no obliga a rotar secretos. |
| Render del hero | Ya ocurre debajo del overlay; descarga y espera se solapan. |
| Navegación interna | El layout persiste; el splash no se remonta entre rutas. |
| GIF | Se conserva la identidad mediante el MP4 final de 146.095 bytes. |
| MP4 experimental | Los pesos de 69–120 KB pertenecían a una ventana más corta; no contradicen el archivo final si se etiquetan correctamente. |
| LCP | El tamaño y visibilidad hacen candidata a la imagen; `priority` adelanta su descarga. |
| Vercel KV | Retirado; para nuevos proyectos se usa Redis desde Marketplace. |
| WAF Hobby | Una sola regla de rate limit; se comparte un límite para `POST /api/*`. |
| Upstash | `checkRateLimit` pasa a ser asíncrona y ambas rutas requieren `await`. |
| Blob client upload | Un emisor anónimo de tokens no protege nada; para este tamaño no es obligatorio migrar a client upload. |
| Archivos | Se confía en firma binaria, no en `file.type`. El flujo legítimo ya produce JPEG. |
| `addRandomSuffix` | Reduce predictibilidad; no convierte un Blob público en privado. |
| `undici` | Proviene de `@vercel/blob`, pero actualizar Blob no obliga a actualizar el lock transitorio; debe verificarse 6.28.0 o posterior compatible. |
| `safeParse` | Rechaza cuerpos inválidos; no sustituye escape HTML ni allowlist. |
| Zoho SPF | `include:zohomail.com`, salvo que el panel indique la variante para múltiples servicios. |
| Amazon SES | No se añade al SPF del apex porque Resend ya utiliza su subdominio. |
| DMARC `p=none` | Aporta observación; requiere revisar informes y luego endurecer la política. |
| Animaciones | Son cinco más el splash; 2.2.2 aplica al movimiento automático y 2.3.3 a animación iniciada por interacción. |
| Node | Local 24.13.1 y Vercel 22.x son estados distintos; deben alinearse. |
| Favicon | Producción entrega Brotli cuando se solicita; la optimización sigue siendo menor. |

## Qué no conviene reescribir

- **App Router y estructura general:** no hay evidencia que justifique migrar a otra arquitectura.
- **JavaScript:** el despliegue es ligero para una aplicación de Next con formulario.
- **`next/font`:** Poppins e Inter están autoalojadas con `display: swap`.
- **`next/image`:** las tarjetas declaran `sizes` adecuados.
- **Sitemap y robots:** son programáticos, tipados y derivados de una fuente común.
- **Metadatos:** `metadataBase`, Open Graph, plantilla de título y `es_CO` están presentes.
- **Skip-link:** ofrece salto al contenido con foco visible.
- **CAA y DKIM de Resend:** muestran una configuración de DNS y correo transaccional madura.
- **Contenido en JSON:** abarata la creación de páginas de servicio.
- **Dependencias:** las dependencias de producción auditadas tienen uso; `lucide-react` se utiliza en `ui/Icon.tsx`.

## Contexto para el rediseño posterior

Antes de pedir propuestas visuales debe comunicarse este marco:

> Servicio técnico industrial B2B en Cali. El visitante llega con un equipo averiado y necesita confiar en que UMEP sabe diagnosticarlo y repararlo. La conversión principal es una solicitud de servicio con una foto del equipo.

Ese contexto orienta el diseño hacia señales de competencia técnica, respuesta, cobertura y confianza, en lugar de recomendaciones genéricas sobre estética.

## Fuentes primarias y verificaciones

- [Política de soporte de Next.js](https://nextjs.org/support-policy)
- [Actualización de seguridad de Next.js del 11 de diciembre de 2025](https://nextjs.org/blog/security-update-2025-12-11)
- [BotID de Vercel](https://vercel.com/docs/botid)
- [Client uploads de Vercel Blob](https://vercel.com/docs/vercel-blob/client-upload)
- [SDK y advertencia de autorización para client uploads](https://vercel.com/docs/vercel-blob/using-blob-sdk)
- [Redis en Vercel y retirada de Vercel KV](https://vercel.com/docs/redis)
- [Una regla gratuita de rate limit en Hobby](https://vercel.com/changelog/rate-limiting-now-available-on-hobby-with-higher-included-usage-on-pro)
- [Configuración SPF oficial de Zoho Mail](https://www.zoho.com/mail/help/adminconsole/spf-configuration.html)
- [WCAG 2.2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [WCAG 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)

Las cifras de dependencias se obtuvieron con `npm outdated`, `npm explain` y `npm audit --omit=dev` sobre el árbol local asociado al commit auditado. Las cifras del MP4 se verificaron sobre `public/media/umep-intro.mp4`. Las mediciones de producción y DNS representan una fotografía del 20 de agosto de 2026 y deben volver a comprobarse antes de ejecutar cambios externos.

---

Auditoría consolidada el 20 de agosto de 2026 sobre el commit `c2a477f`.
