# SRS – Landing Page Hatun Joven

11 de noviembre de 2026 · Jeanpier

## 1. Introducción

**Propósito.** Este SRS define qué debe hacer y cómo debe verse la landing page de Hatun Joven, para que diseño y desarrollo trabajen sobre una misma base antes de construirla.

**Alcance.** Una landing de una sola página (one-page), en español, que presenta el movimiento Hatun Joven, promociona el evento del 6 de marzo de 2027 en Jauja, capta asistentes y convoca a aliados y sponsors. Quedan fuera: venta de entradas con pago en línea, panel de administración y área de usuarios.

**Definiciones.**

- **SRS:** especificación de requisitos de software.
- **CTA:** llamado a la acción (botón o enlace que pide al visitante hacer algo).
- **RF / RNF:** requisito funcional / no funcional.
- **Chuto:** personaje tradicional de la danza jaujina; su sombrero, bordado, gesto y máscara inspiran la identidad gráfica.

**Referencias.**

- *Brochure Hatun Joven* (11 páginas, Canva): contenido institucional, métricas, cronograma, espacio y paquetes de alianza.
- *Hatun Joven – Branding* (41 páginas, Canva, Lead UPC x Hatun Joven): naming, tipografía, paleta, logotipo, elementos gráficos y series de contenido.
- *Paleta principal* (imagen): Índigo, Magenta vívido, Verde vívido y Marfil.

## 2. Descripción general

**Qué es Hatun Joven.** Un movimiento de liderazgo e impacto social juvenil formado por jóvenes migrantes jaujinos que salieron a estudiar y trabajar y hoy vuelven para crear oportunidades en Jauja, la Primera Capital Histórica del Perú. Su objetivo es generar un puente entre la juventud rural y las oportunidades en tecnología, emprendimiento, activismo, ciencia y sociedad.

**Objetivo de la landing.** Posicionar a Hatun Joven como el encuentro juvenil más importante de la provincia de Jauja (objetivo de posicionamiento del branding) y convertir visitas en tres acciones:

1. Inscripción de jóvenes al evento del **6 de marzo de 2027** (Auditorio IEP Pitágoras, Jauja).
2. Postulación de organizaciones como aliado o sponsor.
3. Seguimiento en redes con #HatunJoven.

**Público objetivo.**

| Perfil | Qué busca en la página | Acción esperada |
| --- | --- | --- |
| Jóvenes de 14 a 20 años de Jauja (34 distritos, 89 comunidades campesinas) | Qué es el evento, cronograma, cómo llegar | Inscribirse |
| Padres, colegios y docentes | Confianza: quién organiza, trayectoria | Compartir / autorizar |
| Organizaciones, universidades y empresas | Alcance, métricas, paquetes de alianza | Postular como aliado |
| Comunidades estudiantiles (Lima y Junín) | Cómo co-organizar o tener stand | Contactar |

**Supuestos y restricciones.**

- La mayoría del público joven entrará desde el celular y con datos móviles limitados en zonas rurales.
- El contenido se publica solo en español.
- Los textos y métricas salen del brochure; el equipo debe confirmarlos antes de publicar (ver sección 7).
- El brochure usa un tono vino/guinda que no está en la paleta del branding; la landing sigue la paleta del branding.

## 3. Identidad visual y branding

La landing usa la paleta principal del branding con la proporción 60/30/10 que define el propio manual: Marfil como superficie, Índigo como estructura y Magenta como acento.

**Paleta principal.**

| Color | HEX | Rol de marca | Uso en la landing | Proporción |
| --- | --- | --- | --- | --- |
| Marfil | #F7F2E9 | Respiración y calidez | Fondo general, tarjetas | 60 % superficie |
| Índigo | #2A1BB4 | Institucionalidad y contraste | Titulares, texto, header, footer, secciones de fondo oscuro | 30 % estructura |
| Magenta vívido | #F22E9A | Energía y llamado a la acción | Botones CTA, ítems destacados del cronograma, hover | 10 % acento |
| Verde vívido | #4DF234 | Sin definir en el manual (dice "floro") | Detalles sobre Índigo: badges, contadores, subrayados | Detalle, dentro del 10 % |

**Reglas de contraste (WCAG 2.1 AA, calculadas).**

| Combinación | Contraste | Uso permitido |
| --- | --- | --- |
| Índigo sobre Marfil | 9.8 : 1 | Todo texto |
| Marfil sobre Índigo | 9.8 : 1 | Todo texto |
| Verde sobre Índigo | 7.4 : 1 | Todo texto |
| Blanco sobre Magenta | 3.7 : 1 | Solo texto grande o negrita ≥ 19 px (botones) |
| Magenta sobre Marfil | 3.3 : 1 | Solo títulos ≥ 24 px |
| Verde sobre Marfil o blanco | 1.3 : 1 | Nunca para texto; solo decoración |
| Magenta sobre Índigo | 2.9 : 1 | Nunca para texto |

**Paleta secundaria (uso puntual en ilustraciones y patrones).** Amarillo #F2B705, Verde oliva #F4E308 (en el manual figura como "##F4E308"), Lavanda vívido #9439F0, Rojo vívido #EE270F. No se usa en UI ni en texto.

**Tipografía.**

| Uso | Fuente | Notas |
| --- | --- | --- |
| Logo y titulares (H1, H2) | Luckiest Guy | Disponible en Google Fonts |
| Variante del logo / titulares especiales | Doublebass | No está en Google Fonts; se necesita el archivo y su licencia web |
| Texto y subtítulos | Now | Licencia web por confirmar |
| Texto alternativo / respaldo | Cabin | Disponible en Google Fonts; respaldo de Now |

**Logotipo.** Wordmark "HATUN JOVEN" con el personaje del Chuto (sombrero con bandas de color) sustituyendo la "O" de JOVEN. Hay versiones horizontal y apilada, sobre Marfil, Índigo y Magenta, e isotipo circular solo con el personaje. Header: versión horizontal; favicon y avatar: isotipo circular.

**Elementos gráficos.** Patrones y símbolos de las mangas del chuto (rombos, flores bordadas, llamas, grecas) y las bandas de color del sombrero. Se usan como separadores de sección y fondos sutiles, en SVG.

**Concepto y tono.** "Del Chuto al lenguaje gráfico": sombrero, bordado, gesto y máscara como personaje cultural, no estereotipo. Ejes: **Movimiento + Color + Encuentro**. Lema: **Conoce · Conecta · Crea**. El tono es cercano, juvenil y orgulloso de su origen: tutea, usa frases cortas y verbos de acción, y evita lenguaje corporativo.

## 4. Arquitectura de contenido

La landing tiene 12 bloques (header, 10 secciones y footer) en una sola página, en este orden. Todo el contenido sale del brochure salvo donde se indica.

| # | Sección (ancla) | Contenido | CTA |
| --- | --- | --- | --- |
| 0 | Header fijo | Logo horizontal; menú: Nosotros, Evento, Cronograma, Aliados, Contacto | "Inscríbete" (Magenta) |
| 1 | Hero (#inicio) | "HATUN JOVEN" + "Un movimiento de Liderazgo e Impacto Social Juvenil en la Primera Capital Histórica del Perú"; fecha 6 de marzo de 2027 · Jauja; cuenta regresiva; foto del valle o de Jauja con tratamiento Índigo | "Inscríbete" y "Sé aliado" |
| 2 | Quiénes somos (#nosotros) | Texto "Somos un movimiento de jóvenes migrantes jaujinos…"; objetivo: puente entre juventud rural y oportunidades en tecnología, emprendimiento, activismo, ciencia y sociedad | — |
| 3 | Nuestro impacto | Contadores animados: +25 eventos (hackathons, congresos, ponencias), 4.8k asistentes, +30 organizaciones (BCRP, Municipalidad de Lima). Tracción: 20 miembros en Lima y 7 en Jauja | — |
| 4 | Buscamos impactar en | +350 jóvenes de 14 a 20 años, 89 comunidades campesinas y centros poblados, 34 distritos (toda la provincia de Jauja) | — |
| 5 | El evento (#evento) | Lugar: Auditorio IEP Pitágoras, Jauja; fecha; mapa embebido; espacios: Zona 1 Auditorio (4.º piso, 400 personas, keynotes, paneles, pitching) y Zona 2 Feria de agrupaciones (15+ stands) | "Cómo llegar" |
| 6 | Cronograma (#cronograma) | 8 bloques de 8:30 a 17:00 (ver tabla abajo) | "Inscríbete" |
| 7 | Coorganizadores | Mantaro Valley, Rebirth, UNICODE, LEAD UPC: logo + una línea cada uno | Enlace a la web/red de cada uno |
| 8 | Eventos anteriores | Final Hult Prize at UNI (27 feb 2025, Teatro Segura), Rebirth Economics (27 set 2025, Auditorio Luis Bustamante), Software Week (1–5 set 2026, UNI), con foto | — |
| 9 | Sé aliado (#aliados) | 3 tarjetas: Aliado de Difusión, Aliado Estratégico, Coorganizador / Main Partner, cada una con "Lo que pedimos" y "Lo que te damos" | "Quiero ser aliado" → formulario |
| 10 | Contacto y FAQ (#contacto) | Formulario de consultas, preguntas frecuentes (contenido nuevo, a redactar), redes y #HatunJoven | "Enviar" |
| 11 | Footer | Logo, lema Conoce · Conecta · Crea, redes, correo, crédito Lead UPC x Hatun Joven | — |

**Cronograma del 6 de marzo de 2027.** Se corrigen las horas marcadas "am" que en el brochure son de la tarde.

| Hora | Actividad |
| --- | --- |
| 8:30 – 9:00 | Check-in de participantes |
| 9:00 – 9:30 | Ecosistema de Juventudes |
| 9:30 – 11:00 | Ecosistema de Startups |
| 11:00 – 12:00 | Dinámica de Pasaporte (destacada) |
| 12:00 – 13:00 | Dinámica UNICODE x Tharsis |
| 13:00 – 14:00 | Dinámica LEAD UPC x AIDA |
| 14:00 – 15:30 | Shots de Liderazgo y Panel de Líderes |
| 15:30 – 17:00 | Qué es lo que buscamos (cierre, destacado) |

## 5. Requisitos funcionales

Prioridad: **Alta** = necesario para publicar; **Media** = deseable en la primera versión; **Baja** = puede esperar a una segunda versión.

| ID | Requisito | Prioridad |
| --- | --- | --- |
| RF-01 | El header queda fijo al hacer scroll y sus enlaces llevan con desplazamiento suave a cada sección. | Alta |
| RF-02 | En móvil el menú se convierte en un botón hamburguesa que abre un panel a pantalla completa. | Alta |
| RF-03 | El hero muestra una cuenta regresiva (días, horas, minutos) hasta el 6 de marzo de 2027, 8:30 hora de Perú (UTC−5); al llegar la fecha muestra "¡Hoy es Hatun Joven!". | Media |
| RF-04 | Formulario de inscripción de participantes: nombre completo, edad, distrito de Jauja (lista de 34), colegio o institución, celular (WhatsApp), correo opcional, aceptación de tratamiento de datos. | Alta |
| RF-05 | Si el participante es menor de 18 años, el formulario pide nombre y celular de padre, madre o apoderado y su autorización. | Alta |
| RF-06 | Formulario "Quiero ser aliado": organización, contacto, cargo, correo, celular, tipo de alianza (Difusión / Estratégico / Main Partner) y mensaje. Cada tarjeta de alianza abre este formulario con el tipo ya marcado. | Alta |
| RF-07 | Los formularios validan los campos en el navegador, muestran errores junto al campo y un mensaje de confirmación al enviar. | Alta |
| RF-08 | Las respuestas de los formularios se guardan en un destino que el equipo pueda revisar (por ejemplo Google Sheets) y envían aviso por correo al equipo. | Alta |
| RF-09 | Los contadores de impacto se animan de 0 al valor final cuando entran en pantalla, una sola vez. | Baja |
| RF-10 | La sección del evento incluye un mapa embebido del Auditorio IEP Pitágoras y un botón "Cómo llegar" que abre Google Maps. | Media |
| RF-11 | Botón flotante de WhatsApp visible en todas las secciones, que abre un chat con el número del equipo. | Media |
| RF-12 | Botón "Agregar a mi calendario" que descarga el evento en formato .ics. | Baja |
| RF-13 | Enlaces a las redes de Hatun Joven en header (móvil: en el menú) y footer, que abren en una pestaña nueva. | Alta |
| RF-14 | Sección de preguntas frecuentes en acordeón (una respuesta abierta a la vez). | Media |
| RF-15 | Al compartir el enlace en WhatsApp, Facebook o Instagram se muestra una vista previa con imagen, título y descripción del evento. | Alta |
| RF-16 | Medición de visitas y de clics en los CTA (Inscríbete, Sé aliado, WhatsApp). | Media |

## 6. Requisitos no funcionales

| ID | Categoría | Requisito |
| --- | --- | --- |
| RNF-01 | Responsive | Diseño mobile-first que funciona sin scroll horizontal desde 360 px hasta 1440 px de ancho. |
| RNF-02 | Rendimiento | En móvil 4G, Lighthouse Performance ≥ 90 y LCP ≤ 2.5 s; peso total de la carga inicial ≤ 1.5 MB. |
| RNF-03 | Imágenes | Formato WebP o AVIF con tamaños responsivos y carga diferida (lazy loading) fuera del primer pantallazo. |
| RNF-04 | Fuentes | Máximo 2 familias en la carga inicial (Luckiest Guy + Cabin o Now), en WOFF2, con font-display: swap. |
| RNF-05 | Accesibilidad | Cumple WCAG 2.1 AA: contrastes de la sección 3, textos alternativos en imágenes, navegación por teclado, foco visible y etiquetas en los formularios. |
| RNF-06 | Movimiento | Las animaciones se desactivan si el usuario tiene activado "reducir movimiento" (prefers-reduced-motion). |
| RNF-07 | SEO | Título, meta descripción, encabezados en orden, datos estructurados schema.org/Event, sitemap y Open Graph. |
| RNF-08 | Compatibilidad | Funciona en las 2 últimas versiones de Chrome, Safari, Firefox y Edge, y en Chrome de Android 9 o superior. |
| RNF-09 | Seguridad | HTTPS obligatorio; formularios con protección anti-spam (honeypot o reCAPTCHA invisible); ninguna clave privada en el código del navegador. |
| RNF-10 | Privacidad | Aviso de tratamiento de datos personales conforme a la Ley N.º 29733 (Perú), con consentimiento explícito y especial cuidado con datos de menores. |
| RNF-11 | Mantenimiento | Textos, fechas, cronograma y aliados se editan en un solo archivo de contenido o CMS, sin tocar el código de las secciones. |
| RNF-12 | Marca | Colores y tipografías se definen como variables (tokens) únicas; ningún color fuera de la paleta del branding. |
| RNF-13 | Hosting | Sitio estático desplegado en un servicio gratuito o de bajo costo (por ejemplo Vercel o Netlify) con dominio propio. |

## 7. Criterios de aceptación y preguntas abiertas

**Criterios de aceptación.** La landing se da por terminada cuando:

- [ ] Las 10 secciones y el header/footer de la sección 4 están publicadas con contenido real y revisado.
- [ ] Los requisitos RF de prioridad Alta funcionan en móvil y escritorio.
- [ ] Una inscripción y una postulación de aliado de prueba llegan al destino y generan aviso al equipo.
- [ ] Lighthouse móvil da ≥ 90 en Performance, Accesibilidad, Buenas prácticas y SEO.
- [ ] Solo se usan los colores y fuentes de la sección 3, respetando las reglas de contraste.
- [ ] La vista previa al compartir el enlace en WhatsApp muestra imagen y título correctos.

**Preguntas abiertas para el equipo.**

1. **Verde vívido:** el manual describe su rol como "floro" y la paleta secundaria dice "aea". ¿Qué rol tienen? Propuesta: el verde marca lo nuevo o en vivo (badges, contadores).
2. **Fuentes Now y Doublebass:** ¿tienen los archivos y licencia web? Si no, se usan Luckiest Guy + Cabin, ambas libres.
3. **Logo:** ¿cuál es la versión final del logotipo entre las variantes del manual? Se necesitan los archivos en SVG.
4. **Paquetes de alianza:** el brochure dice "se cambiará por sponsor". ¿Se publican los tres paquetes tal cual o con nombres de sponsor (por ejemplo Bronce, Plata, Oro)?
5. **Inscripción:** ¿es gratuita y con cupo limitado? El auditorio admite 400 personas a la vez y la meta es +350 jóvenes.
6. **Cronograma:** confirmar las horas corregidas de la tarde y el contenido de la última actividad ("Qué es lo que buscamos").
7. **Métricas:** el brochure dice "5 / 20 organizaciones aliadas" en tracción y "+30 organizaciones" en impacto. ¿Cuáles se publican?
8. **Canales:** número de WhatsApp, correo de contacto, cuentas de redes y dominio web.
9. **Fotos:** ¿hay fotos propias en alta resolución de Jauja y de eventos anteriores, con permiso de uso?
