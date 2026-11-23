// Event Management Hub (/admin): estructura de módulos, indicadores, tablas y formularios.
// Es la "fuente de verdad" de la interfaz: cada módulo se pinta desde aquí con ModuloVista.astro.
// Fase 1: solo estructura. Lo marcado con `vivo` ya lee datos reales de Firestore
// (inscripciones y postulaciones de la web); el resto se conectará en la siguiente fase.
// Diseño completo y modelo de datos: docs/07-event-hub.md.

export const hubEvento = {
  id: 'hj-2027',
  nombre: 'Hatun Joven 2027',
  fecha: '6 MAR 2027',
  fechaISO: '2027-03-06T09:00:00-05:00',
  ciudad: 'Jauja',
};

// ---------- Tipos ----------
/** Fuentes que ya existen en Firestore y se leen de verdad. */
export type Vivo = 'inscripciones' | 'sponsor' | 'comunidad';

export type Kpi = {
  label: string;
  detalle?: string;
  /** Clave de métrica real (ver src/lib/hub/vivo.ts). Sin ella, el valor se muestra como «—». */
  vivo?: string;
  /** Valor ya conocido (p. ej. sacado del contenido publicado). */
  valor?: string;
  /** Métrica de los ponentes guardados en Firestore (ver src/lib/hub/ponentes.ts). */
  prog?: 'ponentes' | 'charlas' | 'dinamicas';
};

export type Panel =
  | { tipo: 'barras'; titulo: string; nota?: string; items: string[]; vivo?: string; vacio?: string; ancho?: 2 }
  | { tipo: 'comparacion'; titulo: string; nota?: string; items: string[]; series: [string, string]; ancho?: 2 }
  | { tipo: 'lista'; titulo: string; nota?: string; vacio: string; ancho?: 2 }
  | { tipo: 'serie'; titulo: string; nota?: string; vivo: string; vacio: string; ancho?: 2 | 3 };

export type Campo = {
  id: string;
  label: string;
  tipo: 'texto' | 'area' | 'select' | 'fecha' | 'hora' | 'numero' | 'moneda' | 'url' | 'correo' | 'tel' | 'enlace' | 'casilla';
  opciones?: string[];
  ayuda?: string;
  requerido?: boolean;
  completo?: boolean; // ocupa las dos columnas
};
export type Seccion = { titulo: string; campos: Campo[] };
export type Filtro = { label: string; opciones: string[] };

export type Tabla = {
  id: string;
  titulo: string;
  /** Columnas de la vista previa; las tablas `vivo` definen sus columnas en src/lib/hub/registros.ts. */
  columnas?: string[];
  vivo?: Vivo;
  buscar: string;
  filtros?: Filtro[];
  vacio: string;
  accion?: string; // texto del botón "Nuevo …"
  form?: Seccion[];
  /** Ya lee y guarda en Firestore con su propio script (no es vista previa). Se muestra como galería. */
  conectado?: 'ponentes';
  /** Texto bajo la barra de herramientas. */
  nota?: string;
};

export type Modulo = {
  slug: string; // '' = dashboard
  titulo: string; // Luckiest Guy: corto
  nav: string;
  descripcion: string;
  kpis: Kpi[];
  paneles: Panel[];
  tablas: Tabla[];
};

// ---------- Catálogos ----------
export const estados = {
  sponsor: ['En conversación', 'Confirmado', 'Pagado', 'Descartado'],
  ingreso: ['Comprometido', 'Recibido', 'Anulado'],
  gasto: ['Presupuestado', 'Pendiente de pago', 'Pagado', 'Anulado'],
};

export const participaciones = ['Charla', 'Dinámica', 'Charla y dinámica', 'Panel'];
const tiposOrg = ['Empresa', 'Institución pública', 'Startup', 'Universidad', 'Organización o comunidad'];
const colaboracion = ['Monetario', 'En especie', 'Mixto'];
export const categoriasIngreso = ['Sponsors', 'Inscripciones', 'Donaciones', 'Alianzas', 'Otros ingresos'];
export const categoriasGasto = ['Logística', 'Alimentación', 'Transporte', 'Hospedaje', 'Marketing', 'Materiales', 'Producción', 'Tecnología', 'Otros gastos'];
const mediosPago = ['Transferencia', 'Yape / Plin', 'Depósito', 'Efectivo', 'Otro'];

const notas: Campo = { id: 'notas', label: 'Observaciones internas', tipo: 'area', completo: true, ayuda: 'Nunca se publican.' };

const drive = (label: string): Campo => ({ id: 'enlace', label, tipo: 'enlace', completo: true, ayuda: 'Enlace a la carpeta de Google Drive del equipo.' });

// ---------- Módulos ----------
export const dashboard: Modulo = {
  slug: '',
  titulo: 'Estado del evento',
  nav: 'Dashboard',
  descripcion: 'Lo esencial de Hatun Joven 2027: dinero, sponsors, ponentes e inscripciones.',
  kpis: [
    { label: 'Saldo', detalle: 'recibido − gastado (S/)' },
    { label: 'Recaudado', detalle: 'ingresos recibidos (S/)' },
    { label: 'Gastado', detalle: 'gastos pagados (S/)' },
    { label: 'De sponsors', detalle: 'recaudado de sponsors (S/)' },
    { label: 'Sponsors', detalle: 'confirmados' },
    { label: 'Ponentes', detalle: 'charlas y dinámicas', prog: 'ponentes' },
    { label: 'Postulaciones', detalle: 'sponsors y comunidades', vivo: 'postulaciones' },
    { label: 'Inscritos', detalle: 'desde el formulario web', vivo: 'inscritos' },
  ],
  paneles: [
    { tipo: 'barras', titulo: 'Dinero del evento', items: ['Presupuesto', 'Recibido', 'Por cobrar', 'Gastado'], nota: 'Lo que falta cobrar no es dinero en caja.' },
    { tipo: 'barras', titulo: 'Recaudado por sponsor', items: [], vacio: 'Los sponsors con dinero recibido aparecerán aquí.', ancho: 2 },
  ],
  tablas: [],
};

export const modulos: Modulo[] = [
  {
    slug: 'ponentes',
    titulo: 'Ponentes y dinámicas',
    nav: 'Ponentes',
    descripcion: 'Data room de las personas que darán charlas o harán dinámicas: foto, nombre, cargo y de qué tratará. De aquí podrá leer el CMS.',
    kpis: [
      { label: 'Ponentes', prog: 'ponentes' },
      { label: 'Dan charla', detalle: 'charla o panel', prog: 'charlas' },
      { label: 'Hacen dinámica', prog: 'dinamicas' },
    ],
    paneles: [],
    tablas: [{
      id: 'ponentes',
      titulo: 'Ponentes',
      conectado: 'ponentes',
      buscar: 'Buscar por nombre, organización o tema…',
      filtros: [{ label: 'Participa en', opciones: participaciones }],
      vacio: 'Todavía no hay ponentes. Agrega el primero con «Nuevo ponente».',
      accion: 'Nuevo ponente',
      form: [
        { titulo: 'Persona', campos: [
          { id: 'nombres', label: 'Nombres', tipo: 'texto', requerido: true },
          { id: 'apellidos', label: 'Apellidos', tipo: 'texto', requerido: true },
          { id: 'cargo', label: 'Cargo', tipo: 'texto' },
          { id: 'organizacion', label: 'Organización', tipo: 'texto' },
          { id: 'foto', label: 'Fotografía', tipo: 'enlace', completo: true, ayuda: 'Enlace de Google Drive. Compártela como «Cualquier persona con el enlace» para que se vea.' },
          { id: 'linkedin', label: 'LinkedIn', tipo: 'url' },
          { id: 'bio', label: 'Biografía corta', tipo: 'area', completo: true },
        ] },
        { titulo: 'Qué hará', campos: [
          { id: 'participa', label: 'Participa en', tipo: 'select', opciones: participaciones, requerido: true },
          { id: 'tema', label: 'Tema de su charla o dinámica', tipo: 'texto' },
          { id: 'publicar', label: 'Aprobado para mostrarse en la web', tipo: 'casilla', ayuda: 'El futuro CMS solo podrá publicar a los ponentes marcados.' },
        ] },
        { titulo: 'Contacto (privado, nunca se publica)', campos: [
          { id: 'correo', label: 'Correo', tipo: 'correo' },
          { id: 'telefono', label: 'Teléfono', tipo: 'tel' },
          notas,
        ] },
      ],
    }],
  },
  {
    slug: 'postulaciones',
    titulo: 'Postulaciones',
    nav: 'Postulaciones',
    descripcion: 'Lo que llega desde el formulario «Sé aliado» de la web. Aquí solo se revisa: los montos y acuerdos se registran en Sponsors y Organizaciones.',
    kpis: [
      { label: 'Postulaciones', vivo: 'postulaciones' },
      { label: 'Sponsors', detalle: 'quieren aportar', vivo: 'sponsors' },
      { label: 'Comunidades', detalle: 'quieren ser aliadas', vivo: 'comunidades' },
      { label: 'Últimos 7 días', vivo: 'postulacionesSemana' },
    ],
    paneles: [
      { tipo: 'serie', titulo: 'Postulaciones por semana', vivo: 'postulacionesSemanas', vacio: 'Aún no hay postulaciones.', ancho: 2 },
      { tipo: 'barras', titulo: 'Por tipo', items: ['Sponsor', 'Comunidad aliada'], vivo: 'postulacionesTipo' },
    ],
    tablas: [
      { id: 'post-sponsors', titulo: 'Sponsors', vivo: 'sponsor', buscar: 'Buscar por organización o contacto…', vacio: 'Nadie ha postulado como sponsor todavía.' },
      { id: 'post-comunidades', titulo: 'Comunidades', vivo: 'comunidad', buscar: 'Buscar por organización o contacto…', vacio: 'Nadie ha postulado como comunidad aliada todavía.' },
    ],
  },
  {
    slug: 'organizaciones',
    titulo: 'Organizaciones aliadas',
    nav: 'Organizaciones',
    descripcion: 'Data room del equipo: una sola ficha por empresa, universidad, institución o comunidad aliada.',
    kpis: [
      { label: 'Aliadas' },
      { label: 'Con ponentes' },
      { label: 'Son sponsor' },
    ],
    paneles: [
      { tipo: 'barras', titulo: 'Por tipo', items: tiposOrg, ancho: 2 },
    ],
    tablas: [
      {
        id: 'organizaciones',
        titulo: 'Directorio',
        columnas: ['Organización', 'Tipo', 'Sector', 'Contacto', 'Ponentes', 'Sponsor'],
        buscar: 'Buscar por nombre o sector…',
        filtros: [{ label: 'Tipo', opciones: tiposOrg }],
        vacio: 'Todavía no hay organizaciones registradas.',
        accion: 'Nueva organización',
        form: [
          { titulo: 'Organización', campos: [
            { id: 'nombre', label: 'Nombre', tipo: 'texto', requerido: true, ayuda: 'Se avisa si ya existe una con nombre parecido.' },
            { id: 'tipo', label: 'Tipo', tipo: 'select', opciones: tiposOrg, requerido: true },
            { id: 'sector', label: 'Sector', tipo: 'texto' },
            { id: 'web', label: 'Página web', tipo: 'url' },
            { id: 'logo', label: 'Logo', tipo: 'enlace', ayuda: 'Enlace de Drive.' },
            { id: 'contacto', label: 'Persona de contacto', tipo: 'texto', ayuda: 'Nombre, correo o celular.' },
            { id: 'descripcion', label: 'Descripción', tipo: 'area', completo: true },
            notas,
          ] },
        ],
      },
    ],
  },
  {
    slug: 'sponsors',
    titulo: 'Sponsors',
    nav: 'Sponsors',
    descripcion: 'Data room del equipo: lo que cada sponsor se comprometió a dar, lo que ya llegó y lo que aporta en especie.',
    kpis: [
      { label: 'Recaudado', detalle: 'S/ · ya recibido' },
      { label: 'Por cobrar', detalle: 'S/ · comprometido, aún no llega' },
      { label: 'En especie', detalle: 'aportes valorizados (S/)' },
      { label: 'Confirmados' },
    ],
    paneles: [
      { tipo: 'barras', titulo: 'Recaudado por sponsor', items: [], vacio: 'Cada sponsor con lo que ya pagó, de mayor a menor.', ancho: 2 },
      { tipo: 'comparacion', titulo: 'Comprometido y recibido', items: ['Monetario', 'En especie'], series: ['Comprometido', 'Recibido'] },
    ],
    tablas: [
      {
        id: 'sponsors',
        titulo: 'Sponsors',
        columnas: ['Organización', 'Contacto', 'Aporte', 'Comprometido (S/)', 'Recibido (S/)', 'En especie', 'Estado'],
        buscar: 'Buscar por organización o contacto…',
        filtros: [{ label: 'Estado', opciones: estados.sponsor }, { label: 'Aporte', opciones: colaboracion }],
        vacio: 'Todavía no hay sponsors registrados.',
        accion: 'Nuevo sponsor',
        form: [
          { titulo: 'Sponsor', campos: [
            { id: 'organizacion', label: 'Organización', tipo: 'select', opciones: [], requerido: true, ayuda: 'Se elige de Organizaciones.' },
            { id: 'postulacion', label: 'Viene de una postulación web', tipo: 'select', opciones: [], ayuda: 'Opcional: enlaza la postulación para no volver a escribir el contacto.' },
            { id: 'contacto', label: 'Persona de contacto', tipo: 'texto' },
            { id: 'correo', label: 'Correo', tipo: 'correo' },
            { id: 'telefono', label: 'Teléfono', tipo: 'tel' },
            { id: 'estado', label: 'Estado', tipo: 'select', opciones: estados.sponsor, requerido: true },
            { id: 'colaboracion', label: 'Tipo de aporte', tipo: 'select', opciones: colaboracion },
          ] },
          { titulo: 'Aporte', campos: [
            { id: 'comprometido', label: 'Monto comprometido (S/)', tipo: 'moneda', ayuda: 'Promesa: no cuenta como dinero recibido.' },
            { id: 'recibido', label: 'Monto recibido (S/)', tipo: 'moneda', ayuda: 'Se calcula desde los ingresos de Finanzas de este sponsor.' },
            { id: 'especie', label: 'Aportes en especie', tipo: 'area', completo: true, ayuda: 'Qué aportan y su valor estimado, separado del dinero.' },
            { id: 'propuesta', label: 'Propuesta o acuerdo', tipo: 'enlace', completo: true, ayuda: 'Enlace de Drive.' },
            notas,
          ] },
        ],
      },
    ],
  },
  {
    slug: 'finanzas',
    titulo: 'Finanzas',
    nav: 'Finanzas',
    descripcion: 'Presupuesto, ingresos y gastos del evento. Solo cuenta como dinero lo que ya se recibió o se pagó.',
    kpis: [
      { label: 'Saldo disponible', detalle: 'recibido − gastado (S/)' },
      { label: 'Ingresos recibidos', detalle: 'S/ · dinero en caja' },
      { label: 'Por cobrar', detalle: 'S/ · comprometido' },
      { label: 'Gastos pagados', detalle: 'S/' },
      { label: 'Por pagar', detalle: 'S/ · gastos pendientes' },
      { label: 'Presupuesto', detalle: 'gastos previstos (S/)' },
    ],
    paneles: [
      { tipo: 'comparacion', titulo: 'Presupuesto vs gastado por categoría', items: categoriasGasto, series: ['Presupuestado', 'Gastado'], ancho: 2 },
      { tipo: 'barras', titulo: 'Ingresos recibidos por fuente', items: categoriasIngreso },
    ],
    tablas: [
      {
        id: 'ingresos',
        titulo: 'Ingresos',
        columnas: ['Fecha', 'Concepto', 'Fuente', 'Categoría', 'Monto (S/)', 'Estado', 'Medio', 'Comprobante'],
        buscar: 'Buscar por concepto o fuente…',
        filtros: [{ label: 'Categoría', opciones: categoriasIngreso }, { label: 'Estado', opciones: estados.ingreso }],
        vacio: 'Todavía no hay ingresos registrados.',
        accion: 'Registrar ingreso',
        form: [
          { titulo: 'Ingreso', campos: [
            { id: 'concepto', label: 'Concepto', tipo: 'texto', requerido: true, completo: true },
            { id: 'categoria', label: 'Categoría', tipo: 'select', opciones: categoriasIngreso, requerido: true },
            { id: 'sponsor', label: 'Sponsor u organización', tipo: 'select', opciones: [], ayuda: 'Así suma a lo recaudado de ese sponsor.' },
            { id: 'monto', label: 'Monto (S/)', tipo: 'moneda', requerido: true },
            { id: 'fecha', label: 'Fecha', tipo: 'fecha', requerido: true },
            { id: 'estado', label: 'Estado', tipo: 'select', opciones: estados.ingreso.slice(0, 2), requerido: true, ayuda: 'Solo «Recibido» suma al saldo.' },
            { id: 'medio', label: 'Medio de pago', tipo: 'select', opciones: mediosPago },
            drive('Comprobante'),
            notas,
          ] },
        ],
      },
      {
        id: 'gastos',
        titulo: 'Gastos',
        columnas: ['Fecha', 'Concepto', 'Categoría', 'Presupuestado (S/)', 'Pagado (S/)', 'Proveedor', 'Estado', 'Comprobante'],
        buscar: 'Buscar por concepto o proveedor…',
        filtros: [{ label: 'Categoría', opciones: categoriasGasto }, { label: 'Estado', opciones: estados.gasto }],
        vacio: 'Todavía no hay gastos registrados.',
        accion: 'Registrar gasto',
        form: [
          { titulo: 'Gasto', campos: [
            { id: 'concepto', label: 'Concepto', tipo: 'texto', requerido: true, completo: true },
            { id: 'categoria', label: 'Categoría', tipo: 'select', opciones: categoriasGasto, requerido: true },
            { id: 'proveedor', label: 'Proveedor', tipo: 'texto' },
            { id: 'presupuestado', label: 'Monto presupuestado (S/)', tipo: 'moneda' },
            { id: 'pagado', label: 'Monto pagado (S/)', tipo: 'moneda', ayuda: 'Solo lo efectivamente pagado.' },
            { id: 'fecha', label: 'Fecha', tipo: 'fecha', requerido: true },
            { id: 'estado', label: 'Estado', tipo: 'select', opciones: estados.gasto.slice(0, 3), requerido: true },
            drive('Comprobante o factura'),
            notas,
          ] },
        ],
      },
    ],
  },
  {
    slug: 'participantes',
    titulo: 'Participantes',
    nav: 'Participantes',
    descripcion: 'Inscripciones que llegan desde el formulario de la web. Aquí no se inscribe a nadie: solo se consulta, exporta y depura.',
    kpis: [
      { label: 'Inscritos', vivo: 'inscritos' },
      { label: 'De 14 a 20 años', detalle: 'público objetivo', vivo: 'enRango' },
      { label: 'Menores de 18', detalle: 'datos protegidos', vivo: 'menores' },
      { label: 'Últimos 7 días', vivo: 'semana' },
      { label: 'Comparten con aliados', detalle: 'autorización opcional', vivo: 'comparten' },
    ],
    paneles: [
      { tipo: 'serie', titulo: 'Inscripciones por semana', vivo: 'semanas', vacio: 'Aún no hay inscripciones.', ancho: 2 },
      { tipo: 'barras', titulo: 'Por edad', items: ['Menos de 14', '14 a 17', '18 a 20', 'Más de 20'], vivo: 'edades' },
    ],
    tablas: [{ id: 'inscripciones', titulo: 'Inscripciones', vivo: 'inscripciones', buscar: 'Buscar por nombre, colegio o celular…', filtros: [{ label: 'Edad', opciones: ['De 14 a 20 años', 'Fuera de 14 a 20', 'Menores de 18'] }], vacio: 'No hay inscripciones todavía.' }],
  },
];

// ---------- Equipo y roles ----------
export const roles = ['Super admin', 'Administrador', 'Staff'];

export const equipo: Modulo = {
  slug: 'equipo',
  titulo: 'Equipo y roles',
  nav: 'Equipo y roles',
  descripcion: 'Quién entra al Hub y con qué rol. Cada persona entra con su cuenta de Google y solo si un Super admin la agregó aquí.',
  kpis: [],
  paneles: [],
  tablas: [{
    id: 'miembros',
    titulo: 'Miembros',
    columnas: ['Nombre', 'Cuenta de Google', 'Rol', 'Último acceso', 'Estado'],
    buscar: 'Buscar por nombre o correo…',
    filtros: [{ label: 'Rol', opciones: roles }],
    vacio: 'Hoy el Hub usa la cuenta compartida del equipo. Los miembros con nombre y rol se agregan en la siguiente etapa.',
    accion: 'Agregar miembro',
    form: [{ titulo: 'Miembro', campos: [
      { id: 'nombre', label: 'Nombre', tipo: 'texto', requerido: true },
      { id: 'correo', label: 'Cuenta de Google', tipo: 'correo', requerido: true, ayuda: 'Con este correo entrará al Hub.' },
      { id: 'rol', label: 'Rol', tipo: 'select', opciones: roles.slice(1), requerido: true, ayuda: 'Solo un Super admin puede dar o quitar el rol de Administrador.' },
    ] }],
  }],
};

/** Qué puede hacer cada rol (se aplicará en firestore.rules, no solo en la interfaz). */
export const rolesInfo: { rol: string; quien: string; puede: string[]; proximamente?: boolean }[] = [
  { rol: 'Super admin', quien: 'Dos personas', puede: ['Todo lo del Administrador', 'Agregar o quitar miembros', 'Dar o quitar el rol de Administrador'] },
  { rol: 'Administrador', quien: 'El equipo organizador', puede: ['Dashboard, Ponentes, Participantes, Postulaciones, Organizaciones, Sponsors y Finanzas', 'Crear y editar registros', 'Exportar a Excel', 'Ver el historial de cambios'] },
  { rol: 'Staff', quien: 'Voluntarios del día', puede: ['Solo el check-in de participantes', 'Sin acceso a finanzas ni a datos de contacto'], proximamente: true },
];

/** Navegación lateral. `pronto`: sección anunciada que aún no existe. */
export const navegacion: { grupo: string; items: { slug: string; label: string; vivo?: boolean; pronto?: boolean }[] }[] = [
  { grupo: '', items: [{ slug: '', label: 'Dashboard' }] },
  { grupo: 'Evento', items: [{ slug: 'ponentes', label: 'Ponentes' }, { slug: 'participantes', label: 'Participantes', vivo: true }] },
  { grupo: 'Alianzas y dinero', items: [{ slug: 'postulaciones', label: 'Postulaciones', vivo: true }, { slug: 'organizaciones', label: 'Organizaciones' }, { slug: 'sponsors', label: 'Sponsors' }, { slug: 'finanzas', label: 'Finanzas' }] },
  { grupo: 'Web', items: [{ slug: 'contenido', label: 'Contenido', pronto: true }] },
  { grupo: 'Sistema', items: [{ slug: 'equipo', label: 'Equipo y roles' }, { slug: 'historial', label: 'Historial' }] },
];
