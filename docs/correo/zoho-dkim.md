# Procedimiento DKIM para Zoho Mail

> Estado en `umepcali.com`: ejecutado el 20 de agosto de 2026 con el selector `zmail`, clave RSA de 2048 bits, TXT publicado en Vercel y selector verificado y habilitado en Zoho. Este archivo se conserva como procedimiento de mantenimiento y rotación.

## Objetivo

Habilitar la firma DKIM del correo corporativo enviado por Zoho para `umepcali.com`. Este procedimiento no modifica el DKIM de Resend, que utiliza el selector independiente `resend`.

## Responsable y acceso

- Cuenta necesaria: `admin@umepcali.com`.
- Rol necesario: administrador o superadministrador de la organización de Zoho.
- `contacto@umepcali.com` es un usuario operativo y no tiene permisos suficientes para completar este procedimiento.

No se debe compartir la contraseña de `admin@umepcali.com`. El superadministrador puede ejecutar la parte de Zoho y entregar únicamente el nombre y valor TXT públicos al responsable de Vercel DNS.

## Parte 1 · Generar el selector en Zoho

1. Iniciar sesión en [Zoho Mail Admin Console](https://mailadmin.zoho.com/) como `admin@umepcali.com`.
2. Abrir **Domains**.
3. Seleccionar `umepcali.com`.
4. Abrir **Email Configuration → DKIM**.
5. Pulsar **Add**.
6. Crear un selector nuevo. El selector activo actual es `zmail`; una rotación debe usar otro nombre para permitir una transición sin interrupción.
7. Elegir una clave de **2048 bits**.
8. Guardar y copiar sin modificaciones:
   - Nombre o host TXT.
   - Valor TXT completo.

Plantilla de traspaso:

```text
Dominio: umepcali.com
Selector: ____________________
Nombre TXT: __________________._domainkey
Valor TXT: v=DKIM1; k=rsa; p=____________________________________
Generado por: ____________________
Fecha: ____________________
```

El valor es una clave pública y puede entregarse al administrador DNS. No deben enviarse contraseñas, sesiones, códigos MFA ni claves privadas.

## Parte 2 · Publicar el TXT en Vercel

En Vercel, abrir el DNS de `umepcali.com` y añadir:

```text
Tipo: TXT
Nombre: <selector>._domainkey
Valor: <valor exacto generado por Zoho>
```

Vercel añade automáticamente `.umepcali.com` al nombre. No duplicar el dominio salvo que la interfaz muestre explícitamente un nombre absoluto.

No modificar durante este paso:

- Los tres MX de Zoho.
- El SPF raíz `include:zohomail.com`.
- El SPF de `send.umepcali.com`.
- El selector `resend._domainkey`.
- El registro `_dmarc`.

## Parte 3 · Verificar y habilitar en Zoho

1. Esperar la propagación del TXT.
2. Volver a **Domains → umepcali.com → Email Configuration → DKIM**.
3. Pulsar **Verify** en el selector creado.
4. Cuando Zoho lo marque como verificado, pulsar **Enable** o establecerlo como selector predeterminado.

Publicar el TXT sin completar **Verify** y **Enable** no garantiza que Zoho firme los mensajes salientes.

## Parte 4 · Comprobar un correo real

Esta comprobación se completó el 20 de agosto de 2026 mediante un mensaje real enviado desde `contacto@umepcali.com`. [Mail-Tester](https://mail-tester.com/) confirmó SPF, DKIM y DMARC, identificó el servidor de Zoho y otorgó una puntuación total de 10/10. Los pasos siguientes se conservan para futuras rotaciones o diagnósticos.

1. Enviar desde `contacto@umepcali.com` un correo nuevo a un buzón externo de prueba, por ejemplo Gmail u Outlook.
2. Abrir los encabezados completos o **Mostrar original**.
3. Confirmar:

```text
SPF:   PASS
DKIM:  PASS
DMARC: PASS
```

4. Confirmar que el dominio de DKIM y el dominio visible `From` estén alineados con `umepcali.com`.
5. Registrar la fecha, el selector habilitado y el resultado en [README.md](./README.md#registro-de-cambios).

## Criterio de cierre

- [x] El TXT del selector responde en DNS público.
- [x] Zoho muestra el selector como verificado y habilitado.
- [x] Un mensaje corporativo real obtiene `SPF=PASS`, `DKIM=PASS` y `DMARC=PASS`.
- [x] La prueba identifica correctamente el servidor remitente de Zoho.

La configuración DKIM corporativa de Zoho se considera cerrada. Resend mantiene su autenticación independiente mediante `send.umepcali.com` y el selector `resend`.

Solo después de observar los informes DMARC durante dos a cuatro semanas debe evaluarse el paso de `p=none` a una política de aplicación.
