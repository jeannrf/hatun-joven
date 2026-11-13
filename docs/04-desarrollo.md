# Desarrollo

## Requisitos

- Node.js 20 o superior y npm.
- Firebase CLI (`npm install -g firebase-tools`) con sesión iniciada (`firebase login`) para publicar.
- Un archivo `.env` en la raíz (ver [Firebase](05-firebase.md#configuración-env)).

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala dependencias |
| `npm run dev` | Sitio local con recarga en `http://localhost:4321` |
| `npm run build` | Compila el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` en local |
| `npm run deploy` | Compila y publica Hosting + reglas de Firestore |

## Tecnología

- **Astro 5**, sitio estático (sin servidor).
- **Firebase**: Hosting, Firestore (versión *lite*, solo escrituras/lecturas puntuales) y Authentication (solo para `/admin`).
- **Fuentes** servidas desde el propio sitio con `@fontsource` (Luckiest Guy y Cabin).
- **Íconos de redes**: `simple-icons` (LinkedIn dibujado aparte).
- **Sitemap** con `@astrojs/sitemap` (excluye `/admin`).

## Cómo viajan los datos

```
Visitante ──► hatun-joven.web.app (HTML estático, Firebase Hosting)
                │
                ├─ Formularios (modales) ──► Firestore: crear registro
                │                            (validado por firestore.rules)
                │
Equipo ─────► /admin ──► Firebase Auth (contraseña) ──► Firestore: leer / borrar
```

- No hay servidor propio: el navegador habla directo con Firebase.
- La seguridad está en `firestore.rules`, no en el código del navegador.
- Firebase solo se descarga cuando alguien envía un formulario o entra al panel.

## Estructura

```
src/
  pages/
    index.astro        # la landing
    admin.astro        # panel del equipo
  layouts/Base.astro   # <head>: SEO, vista previa al compartir, datos estructurados del evento
  content/home.ts      # TODOS los textos y datos
  styles/global.css    # colores, tipografía, botones, cinta
  lib/
    firebase.ts        # conexión y guardado (se carga solo al enviar un formulario)
    admin.ts           # sesión y lectura/borrado para el panel
  components/          # una sección por archivo (ver tabla)
public/                # imágenes, og.png, favicon, robots.txt
firebase.json          # Hosting y cabeceras de caché
firestore.rules        # reglas de seguridad
```

## Componentes

| Componente | Qué es |
| --- | --- |
| `Header` | Barra fija, menú (hamburguesa en móvil), logo que vuelve arriba |
| `Hero` | Logo oficial, cinta de fecha, cuenta regresiva, botones |
| `Nosotros` | Quiénes somos, redes, puente de campos, lema con puntadas |
| `Evento` | Fecha, horario y zonas del evento |
| `Cronograma` | Filas del día con marcas tejidas |
| `Impacto` | Cifras con contador animado y la `Manga` tejida |
| `Aliados` | Metas de alcance y tarjetas Sponsor / Comunidad |
| `Preguntas` | Acordeón nativo (`<details name>`) y contacto/WhatsApp si existen |
| `Cierre` | Llamado final, sombrero en la «S», pasaporte, caravana de llamas, pie |
| `Modales` | Los tres formularios (`<dialog>`), validación y envío a Firestore |
| `FormAliado` | Formulario reutilizable para sponsor y comunidad |
| `KnitBand` | Banda tejida que se mueve como carrusel infinito (`dir`, `speed`, colores) |
| `Manga` | Panel vertical tejido con los colores secundarios |
| `Redes` | Botones de redes (`tono`, `etiquetas`) |
| `motifs.ts` | Motivos pixelados (rombo, llama, venado, flor, greca) en retícula de 8 px |

## Convenciones

- **Contenido** solo en `src/content/home.ts`.
- **Colores** solo desde las variables de `global.css` (`--marfil`, `--indigo`, `--magenta`, `--verde` y secundarios dentro de los tejidos).
- **Movimiento:** todo lo animado se detiene con «reducir movimiento» del sistema.
- **Botones que abren formularios:** atributo `data-modal="inscripcion" | "sponsor" | "comunidad"`.
- **Logo:** siempre la imagen oficial; nunca recomponerlo con tipografía.
- **Datos de formularios:** en el panel se pintan con `textContent` (nunca `innerHTML`), porque los escribe cualquier persona.
