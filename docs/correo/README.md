# Correo de UMEP

Esta carpeta documenta la arquitectura, responsables y procedimientos del correo de `umepcali.com`. Su objetivo es que la operación no dependa de recordar qué cuenta creó cada servicio o en qué panel se administra cada registro.

No se deben guardar aquí contraseñas, tokens, claves privadas, códigos MFA ni códigos de recuperación. Esos datos deben permanecer en un gestor de contraseñas con acceso controlado.

## Arquitectura

| Función | Servicio | Dominio o identidad | Administración |
|---|---|---|---|
| Correo corporativo | Zoho Mail | `@umepcali.com` | Zoho Mail Admin Console |
| Superadministración de Zoho | Zoho Mail | `admin@umepcali.com` | Gestiona la organización y los alias; genera y habilita DKIM |
| Buzón operativo | Zoho Mail | `contacto@umepcali.com` | Usuario normal; recibe solicitudes comerciales |
| Correo del formulario web | Resend | `noreply@umepcali.com` | Resend Dashboard y la API del sitio |
| Return-Path transaccional | Resend/Amazon SES | `send.umepcali.com` | Resend |
| DNS autoritativo | Vercel DNS | `ns1.vercel-dns.com` / `ns2.vercel-dns.com` | Proyecto o equipo de Vercel |

`contacto@umepcali.com` no es la cuenta administradora de Zoho. Que pueda entrar al buzón no implica que pueda crear alias, generar DKIM ni modificar la configuración del dominio. Esas operaciones requieren `admin@umepcali.com` o que el superadministrador asigne un rol administrativo.

Zoho muestra los valores requeridos para SPF y DKIM, pero su publicación corresponde a quien tenga acceso a Vercel DNS. Son dos permisos distintos y no es necesario compartir credenciales entre responsables.

## Flujo de correo

### Correo corporativo

```text
Usuario de Zoho
    → servidores de Zoho Mail
    → destinatario externo
```

Su autenticación depende del SPF del dominio raíz y del DKIM de Zoho, actualmente habilitado con el selector `zmail`.

### Formulario del sitio

```text
POST /api/contact
    → Resend
    → noreply@umepcali.com
    → contacto@umepcali.com
```

Resend utiliza un Return-Path separado en `send.umepcali.com`. Por eso Amazon SES no se añade al SPF del dominio raíz: el subdominio ya tiene su propio SPF.

## Estado DNS verificado

Fotografía tomada el 20 de agosto de 2026 mediante consultas al DNS público.

| Propósito | Nombre | Estado | Valor resumido |
|---|---|---|---|
| Verificación de Zoho | `umepcali.com` | Activo | `zoho-verification=...` |
| SPF corporativo de Zoho | `umepcali.com` | Activo | `v=spf1 include:zohomail.com ~all` |
| MX corporativo | `umepcali.com` | Activo | `mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com` |
| SPF de Resend | `send.umepcali.com` | Activo | `include:amazonses.com ~all` |
| DKIM de Resend | `resend._domainkey.umepcali.com` | Activo | Clave pública RSA publicada |
| DKIM de Zoho | `zmail._domainkey.umepcali.com` | Activo | RSA de 2048 bits; verificado y habilitado en Zoho |
| DMARC | `_dmarc.umepcali.com` | Activo, en observación | `p=none`, informes a `admin@umepcali.com` |

El registro DMARC observado es:

```text
v=DMARC1; p=none; rua=mailto:admin@umepcali.com; fo=1; adkim=r; aspf=r; pct=100
```

`p=none` solicita informes sin pedir al receptor que ponga en cuarentena o rechace mensajes por DMARC. `fo=1` no tiene un destino para informes de fallo sin una dirección `ruf`; puede retirarse en una futura edición para simplificar el registro.

## Estado de la intervención

El 20 de agosto de 2026 se completaron en la consola de Zoho y en Vercel DNS:

- Verificación de SPF en Zoho, sin cambiar el TXT que ya estaba publicado.
- Generación del selector DKIM `zmail` con una clave RSA de 2048 bits.
- Publicación del TXT en Vercel, verificación en Zoho y habilitación del selector.
- Publicación de DMARC en modo de observación.
- Confirmación de los registros mediante Google DNS y Cloudflare DNS.
- Envío real desde `contacto@umepcali.com`: SPF, DKIM y DMARC aprobados por el receptor, con resultado 10/10 en Mail-Tester.

El registro detallado está en [informe-autenticacion-2026-08-20.md](./informe-autenticacion-2026-08-20.md). El procedimiento reutilizable está en [zoho-dkim.md](./zoho-dkim.md).

## Trabajo pendiente

1. Elevar de `60` a `3600` el TTL de SPF, `zmail._domainkey` y `_dmarc`.
2. Activar MFA en `admin@umepcali.com` y guardar los códigos de recuperación fuera del repositorio.
3. Revisar semanalmente los informes DMARC durante dos a cuatro semanas antes de considerar `p=quarantine`.

## Herramientas de verificación

### Mail-Tester

[Mail-Tester](https://mail-tester.com/) permite enviar un mensaje a una dirección temporal y revisar, en una sola pantalla, SPF, DKIM, DMARC, reputación básica, listas negras y aspectos generales del contenido.

Procedimiento reutilizable:

1. Abrir Mail-Tester y copiar la dirección temporal que genera.
2. Enviar un mensaje real desde el proveedor y la identidad que se quieren validar.
3. Evitar incluir información confidencial: el mensaje se entrega a un servicio externo de pruebas.
4. Consultar el resultado y revisar por separado SPF, DKIM y DMARC; la puntuación total no sustituye esos detalles.
5. Registrar fecha, remitente probado y resultado, sin conservar como credencial la URL temporal del test.

En UMEP se utilizó el 20 de agosto de 2026 con un mensaje de `contacto@umepcali.com`. La prueba confirmó SPF, DKIM y DMARC, identificó el servidor de Zoho y obtuvo 10/10. Esta herramienta complementa la consulta DNS y la revisión de encabezados; no garantiza por sí sola la entrega en la bandeja principal de todos los destinatarios.

## Alias para informes DMARC

Crear `dmarc@umepcali.com` es opcional. Mientras los informes enviados a `admin@umepcali.com` sean revisados, no es necesario bloquear el trabajo por falta del alias.

Si se crea posteriormente, el superadministrador puede asignarlo como alias del buzón que vaya a supervisar los informes y luego cambiar únicamente el valor `rua` del registro DMARC.

## Reglas operativas

- Mantener un solo registro SPF en cada nombre DNS.
- No añadir `amazonses.com` al SPF raíz mientras Resend use `send.umepcali.com` como Return-Path.
- No adivinar selectores DKIM; copiarlos del panel del proveedor.
- No pasar a `quarantine` o `reject` sin revisar antes la alineación de todos los emisores legítimos.
- Registrar cualquier cambio DNS con fecha, responsable, valor anterior, valor nuevo y verificación posterior.
- Activar MFA para `admin@umepcali.com` y conservar su recuperación fuera del repositorio.

## Registro de cambios

| Fecha | Cambio | Panel | Estado |
|---|---|---|---|
| 2026-08-20 | SPF existente verificado | Zoho Mail Admin Console | Verificado |
| 2026-08-20 | DKIM `zmail` RSA 2048 generado, publicado y habilitado | Zoho + Vercel DNS | Activo y propagado |
| 2026-08-20 | DMARC `p=none` añadido con `rua=admin@umepcali.com` | Vercel DNS | Propagado |
| 2026-08-20 | Envío real desde `contacto@umepcali.com` | Zoho + Mail-Tester | SPF, DKIM y DMARC aprobados; 10/10 |

## Fuentes

- [SPF en Zoho Mail](https://www.zoho.com/mail/help/adminconsole/spf-configuration.html)
- [DKIM en Zoho Mail](https://www.zoho.com/mail/help/adminconsole/dkim-configuration.html)
- [DMARC en Zoho Mail](https://www.zoho.com/mail/help/adminconsole/dmarc-policy.html)
- [Dominios en Resend](https://resend.com/docs/dashboard/domains/introduction)
- [Mail-Tester](https://mail-tester.com/)
