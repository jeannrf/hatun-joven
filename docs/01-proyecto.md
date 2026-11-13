# El proyecto

Landing de una sola página, en español, para el movimiento Hatun Joven. Tiene tres objetivos:

1. Que jóvenes de la provincia de Jauja se **inscriban** al encuentro del 6 de marzo de 2027.
2. Que organizaciones postulen como **sponsor** y agrupaciones juveniles como **comunidad aliada**.
3. Que la gente siga al movimiento en **redes**.

## Secciones de la página (en orden)

| Sección | Ancla | Contenido |
| --- | --- | --- |
| Header | — | Logo (vuelve arriba), menú y botón «Inscríbete» |
| Hero | `#inicio` | Logo oficial, fecha, bajada, cuenta regresiva y botones |
| Nosotros | `#nosotros` | Quiénes somos, redes, los cinco campos y el lema |
| El encuentro | `#evento` | Fecha, horario y las dos zonas |
| Cronograma | `#cronograma` | Los 8 bloques del día |
| Ya lo hicimos antes | — | Cifras de eventos anteriores y manga tejida |
| Aliados | `#aliados` | Metas de alcance y los caminos Sponsor / Comunidad aliada |
| Preguntas frecuentes | `#preguntas` | Preguntas pensadas para jóvenes que quieren participar |
| Cierre y pie | — | Llamado final, pasaporte del evento, lema, hashtag y redes |

## Formularios

Se abren en ventanas (modales), no están en la página:

| Formulario | Se abre con | Se guarda en |
| --- | --- | --- |
| Inscríbete al encuentro | Botones «Inscríbete» | Firestore → `inscripciones` |
| Postula como sponsor | Botones «Sé aliado» y tarjeta Sponsor | Firestore → `aliados` (`tipo: sponsor`) |
| ¿Quieres ser comunidad aliada? | Enlace del cierre y tarjeta Comunidad | Firestore → `aliados` (`tipo: comunidad`) |

La inscripción pide nombres, apellido paterno, apellido materno, edad (se acepta cualquiera; el público objetivo es de 14 a 20 años; si es menor de 14, debe confirmar que un adulto responsable lo sabe), colegio, celular y la aceptación de tratamiento de datos (Ley N.º 29733).

## Estado actual

Publicado y funcionando: todas las secciones de arriba, los tres formularios guardando en Firestore, el panel `/admin`, la vista previa al compartir y el SEO del evento. Lo que el sitio todavía **no** hace está en [Cómo extender → Limitaciones actuales](06-extender.md#limitaciones-actuales).

## Decisiones tomadas

- **Identidad:** fondo Marfil, logo oficial tal cual (nunca recompuesto con tipografía), Luckiest Guy + Cabin, bandas tejidas con motivos de las mangas del Chuto.
- **No se nombran organizaciones aliadas ni entidades del gobierno** en la web (entrarán sponsors nuevos).
- **No se promete stand** a quienes postulan como aliados.
- **Público objetivo: 14 a 20 años.** El formulario acepta cualquier edad y el equipo filtra en `/admin`.
- **El evento es gratuito.**
- **Sin captcha** por decisión del equipo.
- Los **paquetes para sponsors** se presentan en un PPT aparte, no en la web.
