# Editar contenido

Todos los textos y datos de la página están en **un solo archivo**: [`src/content/home.ts`](../src/content/home.ts). No hace falta tocar los componentes para cambiar un texto.

Después de editar: `npm run dev` para revisarlo en local y `npm run deploy` para publicarlo.

## Qué está en cada bloque de `home.ts`

| Bloque | Qué controla |
| --- | --- |
| `evento` | Fecha y hora (`fechaISO`, usada por la cuenta regresiva), fecha corta y larga, ciudad, lugar y `mapaConsulta` (lo que busca el mapa de Google) |
| `nav` | Enlaces del menú |
| `hero` | Bajada del hero y textos de los botones «Inscríbete» / «Sé aliado» |
| `nosotros` | Título, texto, frase del puente, los cinco campos y el lema |
| `impacto` | Título, cifras (+25, 4.8K, +30) con su detalle, y la frase del equipo |
| `cronograma` | Título y los bloques del día (`destacado: true` los pinta en magenta) |
| `cierre` | Título del llamado final y el hashtag |
| `modales` | Títulos, bajadas, mensajes de éxito y texto de consentimiento de los formularios |
| `encuentro` | Título, bajada, horario y las dos zonas del evento |
| `aliados` | Título, metas de alcance y textos de las tarjetas Sponsor / Comunidad |
| `preguntas` | Las preguntas frecuentes (`p` = pregunta, `r` = respuesta) |
| `contacto` | WhatsApp, correo y redes |

## Contacto y redes

```ts
export const contacto = {
  whatsapp: '',  // solo dígitos con código de país, p. ej. '51987654321'
  correo: '',    // p. ej. 'contacto@hatunjoven.pe'
  redes: [ /* Instagram, Facebook, TikTok, LinkedIn */ ],
};
```

- Al completar `whatsapp` aparece el **botón flotante de WhatsApp** y el enlace en preguntas frecuentes.
- Al completar `correo` aparece el enlace de correo en preguntas frecuentes.
- Lo que esté vacío no se muestra.

## Reglas de redacción

- Tutear, frases cortas, verbos de acción, nada corporativo.
- Solo datos confirmados por el equipo: no inventar cifras, beneficios ni nombres de aliados.
- No nombrar organizaciones ni entidades del gobierno.

## Imágenes

Están en [`public/img/`](../public/img/). Salen de los archivos oficiales de la raíz y no se redibujan:

| Archivo | Origen | Dónde se usa |
| --- | --- | --- |
| `hatun-joven-wordmark.webp` / `-sm.webp` | `hatun_joven_logo.png` (fondo transparente) | Hero, header, panel |
| `sombrero.webp` | `hj_piezas_graficas_2.png` (con contorno blanco) | Sombrero sobre la «S» del cierre |
| `chuto-rostro.webp` | `hj_piezas_graficas_2.png` | Sello del pasaporte |
| `hj-letra-o.webp` | `hj_letra_o_logo.png` | O del logo en el pie |
| `../og.png` | Composición del logo, fecha y banda | Vista previa al compartir el link (1200×630) |

Si cambian la fecha o el lugar, hay que regenerar `og.png`.
