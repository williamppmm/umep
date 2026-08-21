# Registro de autenticación de correo · 20 de agosto de 2026

## Alcance y fuentes

Este documento registra la intervención realizada sobre `umepcali.com` desde la consola administrativa de Zoho Mail con `admin@umepcali.com` y desde Vercel DNS.

Fuentes utilizadas:

- Informe operativo elaborado durante la intervención con la cuenta superadministradora.
- Estado mostrado por Zoho Mail Admin Console, según ese informe.
- Consultas posteriores al DNS público mediante Google (`8.8.8.8`) y Cloudflare (`1.1.1.1`).

No contiene contraseñas, tokens, códigos MFA, claves privadas ni códigos de recuperación. La clave DKIM publicada en DNS es pública, pero aquí se identifica por selector y características para evitar duplicarla innecesariamente.

## Identidades y permisos confirmados

| Identidad | Rol |
|---|---|
| `admin@umepcali.com` | Superadministrador de la organización de Zoho; ejecutó la configuración |
| `contacto@umepcali.com` | Usuario y buzón operativo; no tiene privilegios administrativos |

El acceso denegado observado inicialmente no era un fallo de contraseña: el navegador mantenía una sesión válida de `contacto@umepcali.com`, pero esa cuenta carecía del rol requerido. Zoho distingue entre identidad, buzón y permisos administrativos.

## Cambios ejecutados

### SPF de Zoho

- El TXT `v=spf1 include:zohomail.com ~all` ya existía en el dominio raíz.
- Desde Zoho se ejecutó su verificación manual.
- No fue necesario modificar el registro DNS.
- La consola dejó de mostrar la configuración de SPF como pendiente.

### DKIM de Zoho

- Selector generado: `zmail`.
- Longitud de clave: RSA de 2048 bits.
- Nombre publicado: `zmail._domainkey.umepcali.com`.
- Proveedor DNS: Vercel.
- El selector fue verificado, habilitado y marcado como predeterminado en Zoho.

Durante la publicación, Vercel mostró una validación de IPv4 porque el formulario todavía tenía seleccionado el tipo `A`. Para evitarlo, debe seleccionarse `TXT` antes de pegar el valor.

### DMARC

Se publicó en Vercel DNS:

```text
v=DMARC1; p=none; rua=mailto:admin@umepcali.com; fo=1; adkim=r; aspf=r; pct=100
```

La política permanece en observación. `fo=1` define cuándo solicitar informes de fallo, pero no tiene un destinatario efectivo para ellos mientras no exista una etiqueta `ruf`. Los informes agregados sí se solicitan mediante `rua`.

## Evidencia verificada en DNS público

El 20 de agosto de 2026, Google DNS y Cloudflare DNS devolvieron valores coincidentes para:

| Registro | Resultado |
|---|---|
| SPF de Zoho en `umepcali.com` | Publicado |
| DKIM de Zoho en `zmail._domainkey.umepcali.com` | Publicado; clave RSA de 2048 bits |
| DMARC en `_dmarc.umepcali.com` | Publicado en `p=none` |
| SPF de Resend en `send.umepcali.com` | Publicado e independiente del SPF raíz |
| DKIM de Resend en `resend._domainkey.umepcali.com` | Publicado e independiente de `zmail` |

Los registros consultados tenían un TTL de `60` segundos.

## Prueba de envío real

El 20 de agosto de 2026 se probó un mensaje enviado desde `contacto@umepcali.com` mediante [Mail-Tester](https://mail-tester.com/). La captura de resultados aportada para el registro mostró:

| Comprobación | Resultado |
|---|---|
| SPF | Aprobado para `contacto@umepcali.com` desde `136.143.188.15` |
| DKIM | Firma válida |
| DMARC | Verificación aprobada |
| Servidor remitente | `sender4-op-o15.zoho.com`, asociado correctamente |
| Listas negras | Sin coincidencias |
| Puntuación total | 10/10 |

Con esta evidencia queda demostrado el funcionamiento de extremo a extremo para el correo corporativo de Zoho. La categoría naranja «Tu mensaje se podría mejorar» no invalida la autenticación y no mostró una penalización en la puntuación total.

## Acciones pendientes

1. Elevar el TTL de SPF, `zmail._domainkey` y `_dmarc` de `60` a `3600`.
2. Activar MFA en `admin@umepcali.com` y almacenar la recuperación fuera del repositorio.
3. Revisar los informes DMARC antes de endurecer la política a `quarantine` o `reject`.

## Criterio para endurecer DMARC

No debe aplicarse una fecha automática. El cambio desde `p=none` debe basarse en informes que demuestren que todos los emisores legítimos están identificados y alineados. Primero puede evaluarse `p=quarantine`; `p=reject` debe esperar a que la fase anterior no muestre incidencias.
