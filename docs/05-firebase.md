# Firebase

Proyecto: **`hatun-joven`** · Consola: https://console.firebase.google.com/project/hatun-joven · Plan: Spark (gratuito).

## Configuración (.env)

El archivo `.env` (fuera de git) lleva la configuración web de Firebase. Plantilla en [`.env.example`](../.env.example). Estos valores **no son secretos** (van al navegador); la seguridad la ponen las reglas.

```
PUBLIC_FIREBASE_API_KEY=...
PUBLIC_FIREBASE_AUTH_DOMAIN=hatun-joven.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=hatun-joven
PUBLIC_FIREBASE_STORAGE_BUCKET=hatun-joven.firebasestorage.app
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
PUBLIC_FIREBASE_APP_ID=...
PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

Se obtienen en Consola → Configuración del proyecto → Tus apps → app web, o con:
`firebase apps:sdkconfig WEB <appId> --project hatun-joven`.

## Hosting

- Publica la carpeta `dist/` en https://hatun-joven.web.app.
- Imágenes, fuentes y scripts con caché de 1 año; HTML con caché de 5 minutos.
- Publicar: `npm run deploy` (o `firebase deploy --only hosting`).

## Firestore

Región: **`southamerica-west1` (Santiago)**.

| Colección | Campos |
| --- | --- |
| `inscripciones` | `nombres`, `apellidoPaterno`, `apellidoMaterno`, `edad` (entero 1–120), `colegio`, `celular`, `consentimiento`, `creado` |
| `aliados` | `tipo` (`sponsor` \| `comunidad`), `organizacion`, `contacto`, `cargo`?, `correo`, `celular`, `mensaje`?, `consentimiento`, `creado` |

`creado` lo pone el servidor (`serverTimestamp`).

## Reglas de seguridad ([`firestore.rules`](../firestore.rules))

| Quién | Puede |
| --- | --- |
| Cualquier visitante | **Crear** registros, solo con los campos permitidos, largos válidos, edad válida (1–120) y consentimiento |
| Cuenta del panel (`admin@hatun-joven.web.app`) | **Leer y borrar** registros |
| Nadie | Editar registros, ni leer o escribir otras colecciones |

Si se agrega o cambia un campo en un formulario, **hay que actualizar las reglas** o Firestore rechazará el envío. Publicar reglas: `firebase deploy --only firestore:rules`.

## Authentication

- Método activo: correo/contraseña, usado solo por el panel.
- Única cuenta: `admin@hatun-joven.web.app` (identificador interno, no es un buzón).
- Recomendado: Authentication → Configuración → Acciones del usuario → desactivar **«Habilitar la creación (registro)»**.

## Para más adelante

- **Avisos por correo** de cada inscripción o postulación y **Libro de Reclamaciones** requieren el plan **Blaze** (Cloud Functions).
- **Dominio propio:** Hosting → Agregar dominio personalizado; luego cambiar `site` en `astro.config.mjs` y la URL de `public/robots.txt`.
