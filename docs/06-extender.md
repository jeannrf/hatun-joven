# Cómo extender el proyecto

Guía para quien construya nuevas funcionalidades sobre el sitio actual. Antes de empezar, lee [Desarrollo](04-desarrollo.md) y [Firebase](05-firebase.md).

## Recetas

### Agregar una sección a la página

1. Crea `src/components/MiSeccion.astro` con un `<section id="mi-seccion" aria-labelledby="…">` y su `<h2 class="d">`.
2. Pon sus textos en un bloque nuevo de `src/content/home.ts` (`export const miSeccion = { … }`) e impórtalo en el componente.
3. Insértala en `src/pages/index.astro` en el orden deseado. Entre secciones de distinto fondo, sepáralas con `<KnitBand />` (Índigo sobre Marfil; `fg/bg` invertidos al entrar a un bloque Índigo).
4. Si va en el menú, agrega `{ label, href: '#mi-seccion' }` a `nav` en `home.ts`.
5. Usa los estilos existentes: `.wrap` (ancho y márgenes), `.d` (titulares en Luckiest Guy), `.btn btn--p` / `.btn btn--s`, `.cinta` y las variables de color de `global.css`.

### Agregar un campo a un formulario

Un campo nuevo toca **cuatro lugares**; si falta uno, Firestore rechaza el envío:

1. **Marcado:** el `<input>` en `src/components/Modales.astro` (inscripción) o `FormAliado.astro` (aliados), con `id`, `name` y un `<p class="campo__error" id="<id>-e">`.
2. **Validación:** su regla en `reglas` (o `checks` si es casilla) dentro del `<script>` de `Modales.astro`.
3. **Datos:** agrégalo al objeto `datos` del envío en el mismo script.
4. **Reglas de seguridad:** súmalo a `keys().hasOnly([...])` y valida tipo y largo en `firestore.rules`, luego `firebase deploy --only firestore:rules`.
5. **Panel:** si el equipo debe verlo, agrega su columna en `columnas` de `src/pages/admin.astro`.

### Agregar un formulario nuevo (otra colección)

1. Nuevo `<dialog class="modal" id="modal-<nombre>">` en `Modales.astro` con un `<form class="form" data-form="<coleccion>">`; regístralo en `dialogos` y, si aplica, en `porHref`.
2. Cualquier botón lo abre con `data-modal="<nombre>"`.
3. Amplía el tipo de `guardar()` en `src/lib/firebase.ts` y arma su objeto `datos`.
4. Crea el bloque `match /<coleccion>/{id}` en `firestore.rules` (crear con validación; leer/borrar solo `esAdmin()`; editar nunca).
5. Agrega su pestaña y columnas en el panel (`admin.astro` y `listar()` en `src/lib/admin.ts`).

### Agregar una página nueva

1. Crea `src/pages/<ruta>.astro` usando `Base.astro` (título y descripción) para heredar SEO y estilos.
2. Firebase sirve `/<ruta>` automáticamente (`cleanUrls`). Aparece sola en el sitemap; si no debe indexarse, exclúyela en `astro.config.mjs` y en `public/robots.txt`.

### Funciones de servidor (correos, numeración, integraciones)

El sitio es estático: no hay servidor propio. Para lógica que no puede vivir en el navegador (enviar correos, numerar reclamos, llamar APIs con claves privadas):

1. Pasar el proyecto al plan **Blaze** y poner una alerta de presupuesto.
2. `firebase init functions` (TypeScript), región `southamerica-west1`, igual que Firestore.
3. Disparar la función desde Firestore (`onDocumentCreated`) o como función invocable, y negar al navegador la escritura directa en esas colecciones.
4. Para correos: extensión *Trigger Email* con una cuenta SMTP del equipo.

## Reglas que no se deben romper

- **Contenido:** solo en `src/content/home.ts`; no escribir textos dentro de los componentes.
- **Marca:** colores solo desde las variables de `global.css`; el logo es siempre la imagen oficial; Luckiest Guy en titulares y Cabin en texto.
- **Contenido sensible:** no nombrar organizaciones aliadas ni entidades del gobierno; no prometer stands ni beneficios no confirmados.
- **Datos personales:** cualquier dato nuevo se valida en `firestore.rules`, se pinta en el panel con `textContent` y nunca se expone a lectura pública.
- **Movimiento:** toda animación nueva respeta `prefers-reduced-motion`.
- **Peso:** librerías pesadas (como Firebase) se cargan con `import()` dinámico solo cuando se usan.

## Limitaciones actuales

| Limitación | Por qué | Cómo resolverla |
| --- | --- | --- |
| No hay avisos por correo de nuevos registros | Requiere servidor (plan Blaze) | Cloud Function o extensión *Trigger Email* |
| Panel con una sola cuenta y sin roles | Diseño mínimo pedido por el equipo | Más cuentas en Authentication y una lista de correos en `esAdmin()` |
| Los registros no se editan, solo se borran | Reglas: `update: if false` | Habilitar `update` solo para `esAdmin()` y campos concretos (p. ej. `estado`) |
| Sin protección anti-spam | Decisión del equipo (sin captcha) | App Check con reCAPTCHA Enterprise |
| Sin medición de visitas | Usa cookies: necesita la Política de Privacidad primero | Firebase Analytics o una alternativa sin cookies |
| `og.png` se genera a mano | Imagen fija | Regenerarla si cambian fecha, lugar o logo |
| El dominio es `hatun-joven.web.app` | Sin dominio propio aún | Dominio personalizado en Hosting; actualizar `site` y `robots.txt` |
| Logo en raster (PNG/WebP) | No hay archivo vectorial | Reemplazar por SVG cuando exista |
