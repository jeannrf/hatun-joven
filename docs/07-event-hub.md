# Event Management Hub (/admin)

Plataforma interna para gestionar Hatun Joven 2027: ponentes, participantes, postulaciones, organizaciones, sponsors y finanzas. **El CMS de la página pública** lo desarrolla otro integrante; en el Hub solo aparece anunciado en «Contenido».

## Estado actual (fase 1: estructura)

| Sección | Ruta | Qué es | Estado |
| --- | --- | --- | --- |
| Dashboard | `/admin` | Dinero, sponsors, ponentes e inscripciones de un vistazo | Parcial: ponentes, inscritos y postulaciones son reales |
| Ponentes | `/admin/ponentes` | Data room de quienes dan charlas o hacen dinámicas: foto, nombre, cargo, qué hará, contacto | **Funcional**: crear, ver, editar, borrar y exportar (Firestore `ponentes`) |
| Participantes | `/admin/participantes` | Inscripciones del formulario web | **En vivo** |
| Postulaciones | `/admin/postulaciones` | Lo que llega del formulario «Sé aliado» (sponsors y comunidades), con su dashboard | **En vivo** |
| Organizaciones | `/admin/organizaciones` | Data room del equipo: fichas de organizaciones aliadas | Vista previa |
| Sponsors | `/admin/sponsors` | Data room del equipo: comprometido, recibido y en especie de cada sponsor | Vista previa |
| Finanzas | `/admin/finanzas` | Ingresos, gastos, presupuesto y saldo | Vista previa |
| Contenido | `/admin/contenido` | CMS de la web pública | **Próximamente** (lo construye otro integrante) |
| Equipo y roles | `/admin/equipo` | Roles y lista de miembros | Vista previa |

- **Postulaciones vs. Sponsors/Organizaciones:** la postulación web solo trae el contacto y el mensaje, nunca montos. Los montos y acuerdos los registra el equipo en Sponsors y Organizaciones, que pueden enlazar la postulación de origen.
- **Ponentes:** sin seguimiento de contacto ni cronograma; solo la ficha de cada persona. La foto es un enlace de Google Drive compartido como «Cualquier persona con el enlace» (el Hub muestra su miniatura). La casilla «Aprobado para mostrarse en la web» marca a quién podrá publicar el CMS.

### Publicar las reglas (necesario para Ponentes)

Ponentes guarda en la colección `ponentes`, que las reglas solo abren a la cuenta del panel. Después de cambiar `firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

Sin ese paso, la sección muestra «No se pudieron leer los ponentes».

- **Vista previa**: se ven los indicadores, los bloques de insight, la tabla con sus columnas y filtros, y el formulario completo, pero no se guarda nada. Los valores aparecen como «—» (nunca cifras inventadas).
- **En vivo**: lee Firestore de verdad. Tiene búsqueda, filtro de edad, orden por columna, exportación a Excel y borrado con confirmación (lo que hacía el panel anterior).
- El acceso sigue siendo la **contraseña compartida** del panel anterior ([Panel /admin](03-panel-admin.md)).

## Cómo está construido

```
src/content/hub.ts              # módulos: KPIs, paneles, tablas, filtros, formularios, roles, permisos
src/layouts/Hub.astro           # acceso, sidebar, header, breadcrumbs, avisos, confirmación
src/components/hub/ModuloVista.astro   # pinta un módulo completo desde su configuración
src/components/hub/Panel.astro  # bloques de insight: barras, comparación, serie, lista
src/pages/admin/index.astro     # dashboard
src/pages/admin/[slug].astro    # un módulo por ruta (generado desde `modulos`)
src/pages/admin/equipo.astro    # equipo y roles
src/lib/admin.ts                # Firebase Auth + lectura/borrado (sin cambios)
src/lib/hub/sesion.ts           # avisa a las páginas cuando hay sesión
src/lib/hub/vivo.ts             # métricas y series reales (inscripciones, aliados)
src/lib/hub/registros.ts        # tablas en vivo: buscar, filtrar, ordenar, exportar, borrar
src/lib/hub/ponentes.ts         # Ponentes: galería, crear/editar/borrar en Firestore, exportar
src/lib/hub/ui.ts               # avisos (toast) y diálogo de confirmación
src/styles/hub.css              # estilos del Hub (prefijo .hb-)
```

- **Sin dependencias nuevas:** TypeScript sin framework, gráficos en HTML/CSS, Firestore *lite*.
- **Para agregar un campo, columna, filtro, estado o KPI** se edita solo `src/content/hub.ts`.
- **Un KPI o panel real** se agrega con `vivo: '<clave>'` y su cálculo en `metricas()` / `series()` de `vivo.ts`.

### Diseño

Mantiene la identidad de [DESIGN.md](../DESIGN.md), adaptada al trabajo diario:

- **Color:** sidebar Índigo como estructura y superficies Marfil. Magenta solo en el botón de acción principal de cada tabla. Verde solo sobre Índigo (etiqueta «en vivo»).
- **Tipografía:** Luckiest Guy solo en títulos de módulo y cifras de KPI; Cabin en todo lo demás, a 15 px para dar densidad.
- **Indicadores:** una franja única, no tarjetas sueltas. Los bloques de insight van en una retícula de 3 columnas (2 en tablet, 1 en móvil).
- **Formularios:** se abren en un panel lateral (`<dialog>`); las acciones destructivas siempre piden confirmación.
- **Móvil:** bajo 960 px el sidebar pasa a un menú lateral.

## Decisiones tomadas

| Tema | Decisión |
| --- | --- |
| Acceso (fase 2) | **Google Sign-In + lista blanca**: solo entra quien un Administrador agregó en Equipo, con un rol |
| Archivos | **Enlaces a Google Drive** (comprobantes, contratos, fotos, logos). El plan Spark no permite Cloud Storage para buckets nuevos |
| Stack | Se mantiene Astro estático + Firebase. Sin servidor: los permisos viven en `firestore.rules` |
| Participantes | No hay otro formulario: se leen las colecciones `inscripciones` y `aliados` que ya existen |

## Modelo de datos previsto (fase 2)

Todas las colecciones nuevas llevan los mismos campos de control:

- `eventoId: 'hj-2027'`, para gestionar varios eventos.
- `creado` y `actualizado` (`serverTimestamp`).
- `actualizadoPor` (uid de quien hizo el cambio).
- `archivado: bool`. Se archiva en lugar de borrar.

| Colección | Campos principales | Relaciones |
| --- | --- | --- |
| `miembros/{uid}` | `nombre`, `correo`, `rol` (`superadmin` \| `admin` \| `staff`), `activo` | — |
| `organizaciones` | `nombre`, `nombreClave` (normalizado, evita duplicados), `tipo`, `sector`, `web`, `logo` (Drive), `contacto`, `descripcion`, `notas` | ← sponsors |
| `ponentes` **(ya existe)** | `nombres`, `apellidos`, `cargo`, `organizacion`, `foto` (Drive), `linkedin`, `bio`, `participa` (`Charla` \| `Dinámica` \| `Charla y dinámica` \| `Panel`), `tema`, `publicar` (bool), `correo`, `telefono`, `notas`, `eventoId`, `actualizado` | — |
| `sponsors` | `organizacionId`, `postulacionId` (opcional, de `aliados`), `contacto`, `correo`, `telefono`, `estado` (`conversacion` \| `confirmado` \| `pagado` \| `descartado`), `aporte`, `comprometido`, `especie[]` (`descripcion`, `valorEstimado`), `propuesta` (Drive), `notas` | → organización; ← ingresos |
| `ingresos` | `concepto`, `categoria`, `sponsorId`, `monto`, `fecha`, `estado` (`comprometido` \| `recibido` \| `anulado`), `medio`, `comprobante` (Drive), `notas` | → sponsor |
| `gastos` | `concepto`, `categoria`, `proveedor`, `presupuestado`, `pagado`, `fecha`, `estado` (`presupuestado` \| `pendiente` \| `pagado` \| `anulado`), `comprobante` (Drive), `notas` | — |
| `*/{id}/historial` | `cuando`, `quien`, `accion`, `antes`, `despues` | una por cambio |

### Reglas financieras

- **Saldo disponible = ingresos `recibido` − gastos `pagado`.** Lo comprometido («por cobrar») se muestra aparte y nunca suma al saldo.
- **Lo recaudado de un sponsor** no se escribe a mano: es la suma de sus ingresos `recibido` (`sponsorId`).
- Los aportes **en especie** van en `sponsors.especie[]`, separados del dinero.
- **Nada financiero se borra** (`delete: if false`). Un movimiento erróneo pasa a `anulado` y queda en el historial.

### Roles y permisos (se aplicarán en `firestore.rules`)

| Rol | Quién | Puede |
| --- | --- | --- |
| Super admin | Dos personas | Todo, más agregar o quitar miembros y dar o quitar el rol de Administrador |
| Administrador | Equipo organizador | Todas las secciones salvo Equipo: ver, crear, editar y exportar |
| Staff | Voluntarios del día | **Próximamente (se construye aparte):** solo check-in de participantes, sin finanzas ni datos de contacto |

- Cada regla lee el rol con `get(/databases/$(database)/documents/miembros/$(request.auth.uid)).data.rol`, sin servidor ni *custom claims*.
- **Solo un Super admin escribe en `miembros`**, así nadie puede subirse de rol por su cuenta.
- **Trazabilidad:** toda escritura en una colección del Hub debe crear en el mismo *batch* su entrada de `historial` (lo exige `existsAfter()`).
- **Los formularios públicos no cambian:** los bloques `create` de `inscripciones` y `aliados` se mantienen tal cual.

## Rendimiento

- **La landing no carga nada del Hub.** Son páginas aparte bajo `/admin`. La landing pesa ~30 KB comprimida (sin imágenes ni fuentes), y Firebase solo se descarga cuando alguien envía un formulario.
- **Cada página del Hub pesa ~80 KB comprimida, casi todo Firebase.** Es el mismo archivo en todas las páginas, así que se descarga una vez y queda en caché un año.
- **Lo que crece con el tiempo son las lecturas de Firestore:** cada vez que se abre una página con datos en vivo se leen todas las inscripciones y postulaciones. Con ~400 registros no se nota. El plan Spark permite 50 000 lecturas al día. Si crece mucho, se cachea entre páginas o se pagina.

## Siguiente fase

1. Acceso con Google y colección `miembros` (con su página Equipo funcional), y reglas por rol.
2. Conectar Finanzas y Sponsors (prioridad), luego Organizaciones: alta, edición, archivo, historial y exportación.
3. Check-in del Staff (se diseña aparte).
4. Convertir una postulación web de sponsor o comunidad en organización y oportunidad con un clic.
5. Pruebas de reglas con el emulador de Firestore (`firebase emulators:start`).

## Para el CMS (cuando se construya)

- **Ponentes:** el CMS lee de `ponentes` solo los documentos con `publicar == true`, y solo los campos públicos: `nombres`, `apellidos`, `cargo`, `organizacion`, `foto`, `linkedin`, `bio`, `participa` y `tema`.
- **Nunca se publican** `correo`, `telefono` ni `notas`.
- Las reglas actuales no dejan leer `ponentes` al público. Como las reglas no pueden ocultar campos, la publicación tendrá que copiar los campos públicos a una colección pública aparte (por ejemplo, `publico_ponentes`).
