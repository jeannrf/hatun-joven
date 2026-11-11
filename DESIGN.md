---
name: Hatun Joven
description: La página lleva puesto al Chuto: wordmark gigante, bandas tejidas en retícula de 8 px y una paleta Marfil, Índigo y Magenta.
colors:
  marfil: "#f7f2e9"
  marfil-hondo: "#ece4d4"
  indigo: "#2a1bb4"
  indigo-hondo: "#1d1186"
  magenta: "#f22e9a"
  magenta-hondo: "#d01a80"
  verde: "#4df234"
  blanco: "#ffffff"
  amarillo: "#f2b705"
  lavanda: "#9439f0"
  rojo: "#ee270f"
typography:
  display:
    fontFamily: "Luckiest Guy, Cabin, sans-serif"
    fontSize: "clamp(5.25rem, 17vw, 17.5rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Luckiest Guy, Cabin, sans-serif"
    fontSize: "clamp(2.75rem, 6.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.01em"
  title:
    fontFamily: "Luckiest Guy, Cabin, sans-serif"
    fontSize: "clamp(1.25rem, 2.4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1
  body-lead:
    fontFamily: "Cabin, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Cabin, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Cabin, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  button:
    fontFamily: "Cabin, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  cinta: "0.3rem"
  sm: "0.4rem"
  md: "0.6rem"
  pill: "999px"
spacing:
  punto: "8px"
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  seccion: "clamp(4.5rem, 10vw, 9rem)"
  seccion-cierre: "clamp(2.5rem, 5vw, 4rem)"
  ancho: "90rem"
components:
  button-primary:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.blanco}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.75rem"
    height: "3.5rem"
  button-primary-hover:
    backgroundColor: "{colors.magenta-hondo}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.indigo}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.75rem"
    height: "3.5rem"
  button-secondary-hover:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.marfil}"
  button-claro:
    backgroundColor: "transparent"
    textColor: "{colors.marfil}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.75rem"
  button-claro-hover:
    backgroundColor: "{colors.marfil}"
    textColor: "{colors.indigo}"
  cinta:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.marfil}"
    typography: "{typography.title}"
    rounded: "{rounded.cinta}"
    padding: "0.5em 0.75em 0.32em"
  cinta-sobre-indigo:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.cinta}"
  cuenta-celda:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.verde}"
    rounded: "{rounded.md}"
    padding: "0.7rem 0.4rem 0.5rem"
    width: "5rem"
  campo-etiqueta:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.marfil}"
    rounded: "{rounded.cinta}"
    padding: "0.42em 0.6em 0.24em"
  banda-tejida:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.marfil}"
    height: "112px"
  banda-tejida-invertida:
    backgroundColor: "{colors.marfil}"
    textColor: "{colors.indigo}"
    height: "112px"
---

# Design System: Hatun Joven

## Overview

**Creative North Star: "El Chuto en persona"**

La página no presenta al Chuto: lo lleva puesto. El wordmark HATUN JOVEN, con la O oficial del sombrero, es dueño del primer pantallazo a escala de cartel, y las vueltas de tejido de la manga del Chuto hacen de estructura: separan secciones, cierran bloques Índigo y marcan cada fila del cronograma. Todo lo demás es tipo grande sobre una superficie Marfil cálida, con el Índigo cargando estructura y el Magenta reservado para la acción.

La densidad es de cartel de feria, no de sitio de evento corporativo: titulares en Luckiest Guy a tamaño de grito, texto corrido en Cabin a tamaño cómodo para leer en el celular, pocas piezas por pantalla. El movimiento existe pero es contado: la banda bajo el hero se teje punto a punto al cargar, la cinta de fecha cae a su sitio y las cifras de impacto suben una sola vez. Con `prefers-reduced-motion` todo queda quieto.

Lo cultural se usa como personaje y textura, nunca como disfraz: los motivos (rombo, llama, venado, flor, greca) se dibujan punto a punto en una retícula de 8 px, como el tejido real, y no se reinterpretan como iconos ni ornamento vectorial suave. El sistema rechaza la landing de evento estándar: foto con velo, título centrado y fila de tarjetas.

**Key Characteristics:**
- Wordmark a escala de cartel: es el logotipo oficial tal cual (recorte de `hatun_joven_logo.png`), nunca recompuesto con tipografía.
- Bandas tejidas Índigo de 112 px (14 filas de 8 px) como divisor entre secciones.
- Marfil 60 %, Índigo 30 %, Magenta 10 %; Verde solo sobre Índigo.
- Etiquetas y rótulos ligeramente rotados (la cinta del sombrero a −4°).
- Botones en píldora; sombras suaves teñidas de Índigo, nunca negras.

## Colors

Una paleta textil de alto contraste: fondo de lana cruda, estructura índigo profundo, y un magenta y un verde eléctricos que vienen del branding, no del brochure.

### Primary
- **Magenta Chuto** (magenta): la acción. Fondo de todo botón primario (Inscríbete), la fila destacada del cronograma, la cinta sobre bloques Índigo y el anillo de foco. Como texto solo a tamaño grande.
- **Magenta Hondo** (magenta-hondo): estado hover del Magenta; nunca color de reposo.

### Secondary
- **Índigo Telar** (indigo): estructura. Todo el texto sobre Marfil, la palabra JOVEN, fondos de bandas tejidas, la cinta, las celdas de la cuenta regresiva y los bloques de Impacto y Cierre.
- **Índigo Hondo** (indigo-hondo): sombras teñidas (como `rgb(29 17 134 / α)`) y el fondo más oscuro de las vueltas de la manga.

### Tertiary
- **Verde Eléctrico** (verde): el detalle que vibra. Dígitos de la cuenta regresiva, la ciudad dentro de la cinta, las cifras de impacto, la palabra HATUN del logo del pie y acentos de motivo dentro de las bandas. Siempre sobre Índigo.
- **Amarillo Sol** (amarillo), **Lavanda** (lavanda), **Rojo Achiote** (rojo): solo dentro de los motivos tejidos: acentos de banda y las franjas y fondos de la manga vertical de Impacto.

### Neutral
- **Marfil Lana** (marfil): superficie del 60 %. Fondo de página y del header fijo, texto sobre Índigo, puntos del borde de las bandas.
- **Marfil Hondo** (marfil-hondo): hover de filas del cronograma y pista de la barra de desplazamiento.
- **Blanco** (blanco): texto sobre Magenta (botón primario, fila destacada, cinta sobre Índigo).

### Named Rules
**The 60/30/10 Rule.** Marfil cubre la superficie, Índigo la estructura y Magenta la acción. Si una pantalla tiene más Magenta que el resto de su acento, algo que no es acción se pintó de acción.

**The Verde-sobre-Índigo Rule.** El Verde (contraste 7.35:1 sobre Índigo, 1.34:1 sobre Marfil) solo aparece sobre fondos Índigo. Nunca como texto ni detalle sobre Marfil.

**The Secundarios-en-el-Tejido Rule.** Amarillo, Lavanda y Rojo viven solo dentro de motivos tejidos. Ningún botón, texto, borde ni fondo de interfaz los usa.

**The Magenta-Grande Rule.** Blanco o Marfil sobre Magenta da 3.3 a 3.7:1: el Magenta lleva texto solo a tamaño grande (24 px normal o 18.66 px bold en adelante), y como color de texto solo a escala de titular.

## Typography

**Display Font:** Luckiest Guy (con Cabin, sans-serif)
**Body Font:** Cabin (con system-ui, sans-serif)

**Character:** Luckiest Guy grita en mayúsculas gordas con la soltura de un cartel pintado a mano; Cabin habla bajo, humanista y clara. La pareja es provisional mientras no haya licencia web de Now y Doublebass.

### Hierarchy
- **Wordmark**: no es texto, es la imagen oficial `public/img/hatun-joven-wordmark.webp` (header: `-sm`), con sus colores propios (#E0045A y #0040B9), proporciones y posición de la O intactas. Ancho del 100 % de su columna, máximo 62rem.
- **Headline** (400, clamp(2.5rem, 5.6vw, 5.25rem) a clamp(2.75rem, 7vw, 6rem), 0.9 a 1.05): títulos de sección, en mayúsculas, con `text-wrap: balance` y medida corta (10 a 12ch).
- **Title** (400, clamp(1.25rem, 2.4vw, 2.25rem), 1): la cinta, las horas del cronograma, las etiquetas de campo, el lema y las cifras de impacto (estas a 2.1em de su frase).
- **Body lead** (400, clamp(1.2rem, 1.8vw, 1.5rem), 1.4 a 1.45): bajada del hero y textos de sección; medida de 26 a 52ch.
- **Body** (400, 1.125rem, 1.55): texto corrido y notas.
- **Label** (700, 0.95rem, 0.08em, MAYÚSCULAS): navegación de escritorio, rótulo de la cuenta regresiva y sus unidades.

### Named Rules
**The Grita-y-Habla Rule.** Luckiest Guy siempre en mayúsculas, peso 400 y solo para nombres, titulares, cifras y rótulos cortos. Nunca un párrafo en Luckiest Guy; nunca un titular en Cabin.

**The Cifras-Tabulares Rule.** Toda cifra que cambia (cuenta regresiva, contadores, horas) usa `font-variant-numeric: tabular-nums` para no bailar.

## Layout

Contenedor único de hasta 90rem con gutter fluido de clamp(1rem, 4vw, 3.5rem). Las secciones respiran con un padding superior de clamp(4.5rem, 10vw, 9rem) y uno inferior más corto, clamp(2.5rem, 5vw, 4rem), porque el cierre de cada sección es una banda tejida, no aire.

El hero es asimétrico: el wordmark ocupa la columna flexible de la izquierda y una columna de 17 a 22rem a la derecha apila cinta, bajada, cuenta regresiva, lugar y botones. Ocupa el alto de la ventana menos el header, más los 3rem de banda que asoman. Quiénes somos usa una retícula de 12 columnas (título en 8, texto en 4, alineado abajo). Impacto pone la frase de cifras junto a una manga vertical de 14 a 20rem. El cronograma es una lista de filas: hora, marca de 40 px y actividad.

Un solo corte importante a 960px (header a menú hamburguesa, hero a una columna), con ajustes a 900px (la manga de Impacto se oculta), 760px (Quiénes somos a una columna) y 640px (filas del cronograma en dos líneas, botón de cierre a ancho completo). En móvil el wordmark, la cinta, la bajada y los botones entran en los primeros 844 px.

### Named Rules
**The Banda-no-Hueco Rule.** Entre secciones hay una banda tejida, no un margen vacío. La banda que entra a un bloque Índigo se invierte (fondo Marfil, motivos Índigo y Magenta) para que su borde de puntos se lea contra el Índigo.

## Elevation & Depth

Sistema plano con sombras suaves y difusas, siempre teñidas de Índigo Hondo, que elevan apenas lo que se toca o se rotula. La profundidad real la dan el contraste de bloques (Marfil contra Índigo) y la rotación de etiquetas, no capas apiladas.

### Shadow Vocabulary
- **Botón en reposo** (`box-shadow: 0 6px 14px -6px rgb(29 17 134 / 0.45)`): solo botón primario sobre Marfil.
- **Botón en hover** (`box-shadow: 0 10px 20px -8px rgb(29 17 134 / 0.5)`): acompaña un `translateY(-2px)`.
- **Cinta** (`box-shadow: 0 8px 20px -10px rgb(29 17 134 / 0.6)`): la cinta Índigo sobre Marfil.
- **Header al desplazar** (`box-shadow: 0 10px 24px -18px rgb(29 17 134 / 0.5)`): aparece pasados 24 px de scroll.

### Named Rules
**The Sombra-Índigo Rule.** Ninguna sombra es negra ni gris: todas son Índigo Hondo con alfa. Sobre fondos Índigo las sombras se quitan.

## Shapes

La forma viene de dos fuentes. La interfaz es redonda y amable: botones en píldora (999px), celdas de la cuenta regresiva a 0.6rem, la fila destacada y la manga a 0.4rem, la cinta y las etiquetas de campo a 0.3rem. El tejido es cuadrado y duro: cada motivo es una matriz de puntos de 8 px renderizada con `shape-rendering: crispEdges`, con un borde de puntos alternos arriba y abajo de cada banda.

Las etiquetas se inclinan como si estuvieran cosidas a mano: la cinta a −4°, las etiquetas de campo entre −3° y 3°, la manga a 2°, la fila destacada del cronograma a −0.6°. Al pasar el cursor, una etiqueta de campo se endereza y sube 4 px.

### Named Rules
**The Punto-de-8 Rule.** Todo motivo tejido se dibuja en la retícula de 8 px, con bordes nítidos. Nunca esquinas redondeadas, antialias, degradados ni curvas en un motivo.

**The Inclinación-Contada Rule.** Solo se inclinan rótulos y etiquetas (entre −4° y 3°). El texto corrido, los botones y las secciones van rectos.

## Components

### Buttons
Rotundos y táctiles, del tamaño de un pulgar.
- **Shape:** píldora completa (999px), alto mínimo 3.5rem, borde de 3px.
- **Primary:** Magenta con texto Blanco, Cabin 700 a 1.25rem, padding 0.85rem 1.75rem, sombra de botón en reposo.
- **Hover / Focus:** sube 2 px, pasa a Magenta Hondo y crece la sombra; al presionar baja 1 px y escala a 0.98. Foco: anillo Magenta de 3px con 3px de separación. Transiciones con `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Secondary:** contorno Índigo sobre Marfil (Sé aliado); en hover se rellena de Índigo con texto Marfil.
- **Claro:** contorno Marfil sobre Índigo; en hover se rellena de Marfil con texto Índigo. Sobre Índigo ningún botón lleva sombra.

### Cinta del sombrero
La franja Índigo rotada −4° que rotula la fecha y las secciones, como la cinta del Chuto. Luckiest Guy en mayúsculas, palabra de acento en Verde. Sobre un bloque Índigo se vuelve Magenta con texto Blanco y sin sombra. En el hero cae a su sitio al cargar (0.7s, retraso 0.45s).

### Banda tejida
La pieza firma. Una vuelta de la manga del Chuto repetida a todo el ancho con un patrón SVG: 14 filas de 8 px (112 px), fondo Índigo, borde de puntos Marfil alternos arriba y abajo, motivos de 10 filas separados por 3 columnas, coloreados con Marfil y acentos (Verde, Amarillo). La banda bajo el hero se teje al cargar con un barrido por columnas de 1.4s en 36 pasos. Variante invertida: fondo Marfil, motivos Índigo y Magenta.

### Manga vertical
Cinco vueltas apiladas (llama, rombo, venado, flor, greca) con franjas finas de color entre ellas: el único lugar donde Amarillo, Lavanda y Rojo se ven como fondo. Va inclinada 2° junto a las cifras de Impacto y se oculta bajo 900px.

### Cuenta regresiva
Celdas Índigo de 5rem de ancho mínimo, dígitos Luckiest Guy de 2.5rem en Verde, unidad abajo en etiqueta Marfil. Rótulo "Faltan" en etiqueta Índigo.

### Etiquetas de campo
Rótulos Luckiest Guy grandes, Marfil sobre Índigo o Magenta alternados, cada uno con su propia inclinación; se enderezan en hover.

### Fila de cronograma
Retícula hora / marca tejida de 40 px / actividad, con línea punteada Índigo al 35 % entre filas y Marfil Hondo en hover. La fila destacada es Magenta, inclinada −0.6°, con la actividad en Luckiest Guy y la marca en Marfil.

### Navigation
Header fijo Marfil con el logo (HATUN Magenta, J O VEN Índigo con la O del Chuto) a la izquierda, enlaces en etiqueta Índigo y botón primario compacto (3rem de alto). El hover dibuja un subrayado Magenta de 3px que crece de izquierda a derecha. Bajo 960px: botón circular Índigo de 3rem que abre un panel Índigo a pantalla completa con un `clip-path` circular desde la esquina (0.6s), enlaces en Luckiest Guy grande y el botón primario al pie; el botón se vuelve Magenta mientras está abierto.

## Do's and Don'ts

### Do:
- **Do** usar el logotipo oficial como imagen en cada aparición del wordmark sobre Marfil, sin cambiar escala de la O, interlineado ni colores. Sobre Índigo (pie) se usa la variante tipográfica con la O oficial hasta tener el logo en versión para fondo oscuro.
- **Do** separar secciones con una banda tejida de 112 px, e invertirla cuando entra a un bloque Índigo.
- **Do** dibujar todo motivo nuevo como matriz de 10 filas en la retícula de 8 px, con bordes nítidos.
- **Do** reservar el Magenta para la acción: un botón primario por bloque, siempre Inscríbete o su equivalente.
- **Do** teñir toda sombra con Índigo Hondo y quitarla sobre fondos Índigo.
- **Do** dejar quieta toda animación con `prefers-reduced-motion` y no esconder nunca el wordmark (LCP) en su estado inicial.

### Don't:
- **Don't** construir la landing de evento estándar: foto con velo, título centrado y fila de tarjetas.
- **Don't** usar la guinda del brochure ni colores fuera de la paleta del branding.
- **Don't** poner Verde sobre Marfil, ni como texto ni como detalle.
- **Don't** usar Amarillo, Lavanda o Rojo fuera de los motivos tejidos.
- **Don't** escribir párrafos en Luckiest Guy ni titulares en Cabin.
- **Don't** redondear, suavizar o degradar los motivos tejidos, ni convertirlos en iconos de línea.
- **Don't** recomponer el wordmark con Luckiest Guy, agrandar la O ni redibujar el Chuto.
