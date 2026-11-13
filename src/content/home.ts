// Todo el texto del Home vive aquí (RNF-11). Fuente: brochure Hatun Joven vía SRS.
// Lo marcado "por confirmar" corresponde a las preguntas abiertas del SRS, sección 7.

export const evento = {
  fechaISO: '2027-03-06T09:00:00-05:00',
  fechaCorta: '6 MAR 2027',
  fechaLarga: 'Sábado 6 de marzo de 2027',
  ciudad: 'Jauja',
};

export const nav = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Evento', href: '#evento' },
  { label: 'Cronograma', href: '#cronograma' },
  { label: 'Aliados', href: '#aliados' },
  { label: 'Preguntas', href: '#preguntas' },
];

export const hero = {
  bajada:
    'Un movimiento de liderazgo e impacto social juvenil en la Primera Capital Histórica del Perú.',
  // `modal` abre el formulario; `href` es el destino si no hay JavaScript.
  ctaPrimario: { label: 'Inscríbete', href: '#inscribete', modal: 'inscripcion' },
  ctaSecundario: { label: 'Sé aliado', href: '#aliados', modal: 'sponsor' },
};

export const nosotros = {
  titulo: 'Salimos de Jauja. Volvemos por Jauja.',
  texto:
    'Somos un movimiento de jóvenes migrantes jaujinos que salieron a estudiar y trabajar, y hoy vuelven para crear oportunidades en su tierra.',
  puenteIntro: 'Tendemos un puente entre la juventud rural y las oportunidades en',
  campos: ['Tecnología', 'Emprendimiento', 'Activismo', 'Ciencia', 'Sociedad'],
  lema: ['Conoce', 'Conecta', 'Crea'],
};

// Métricas por confirmar (SRS pregunta 7).
export const impacto = {
  titulo: 'Ya lo hicimos antes',
  cifras: [
    { valor: 25, prefijo: '+', sufijo: '', label: 'Eventos', detalle: 'Hackathons, congresos y ponencias.' },
    { valor: 4.8, prefijo: '', sufijo: 'k', label: 'Asistentes', detalle: 'Personas que vivieron nuestros eventos.', decimales: 1 },
    { valor: 30, prefijo: '+', sufijo: '', label: 'Organizaciones', detalle: 'Aliadas que han sumado a nuestros encuentros.' },
  ],
  // Texto genérico: el número de miembros cambia con el tiempo.
  equipo: { antes: 'Detrás hay un equipo de jóvenes', destacado: 'en Lima y en Jauja', despues: '.' },
};

// Versión general del minuto a minuto del equipo (bloques agrupados, no cada ponencia).
export const cronograma = {
  titulo: 'Un día entero para ti',
  bloques: [
    { inicio: '9:00', fin: '9:30', actividad: 'Check-in de participantes' },
    { inicio: '9:30', fin: '10:20', actividad: 'Bienvenida e inauguración' },
    { inicio: '10:20', fin: '11:00', actividad: 'Ecosistema de Juventudes' },
    { inicio: '11:00', fin: '11:45', actividad: 'Dinámica del Pasaporte', destacado: true },
    { inicio: '11:45', fin: '13:00', actividad: 'Ecosistema de Emprendimiento' },
    { inicio: '13:00', fin: '14:00', actividad: 'Almuerzo' },
    { inicio: '14:00', fin: '15:40', actividad: 'Dinámicas con agrupaciones juveniles', destacado: true },
    { inicio: '15:40', fin: '16:40', actividad: 'Charlas de liderazgo y panel' },
    { inicio: '16:40', fin: '17:00', actividad: 'Cierre y círculos con ponentes' },
  ],
};

export const cierre = {
  titulo: '¿Te vemos en Jauja?',
  hashtag: '#HatunJoven',
};

export const modales = {
  inscripcion: {
    titulo: 'Inscríbete al encuentro',
    bajada: 'Sábado 6 de marzo de 2027 · Jauja.',
    exitoTitulo: '¡Nos vemos en Jauja!',
    exito: 'Ya estás inscrito. El equipo de Hatun Joven se comunicará contigo con los detalles.',
  },
  sponsor: {
    titulo: 'Postula como sponsor',
    bajada: 'Para organizaciones que quieren apoyar el encuentro y llegar a la juventud de Jauja.',
    exitoTitulo: '¡Gracias por sumarte!',
    exito: 'Recibimos tu postulación. El equipo de Hatun Joven se comunicará contigo muy pronto.',
    cruce: '¿Eres una agrupación estudiantil o juvenil? Postula como comunidad aliada',
  },
  comunidad: {
    titulo: '¿Quieres ser comunidad aliada?',
    bajada: 'Para agrupaciones estudiantiles o juveniles que quieren sumarse al movimiento y co-organizar el encuentro.',
    exitoTitulo: '¡Gracias por sumarte!',
    exito: 'Recibimos tu postulación. El equipo de Hatun Joven se comunicará contigo muy pronto.',
    cruce: '¿Representas a una organización? Postula como sponsor',
  },
  consentimiento:
    'Acepto el tratamiento de mis datos personales para gestionar mi participación en Hatun Joven, conforme a la Ley N.º 29733.',
};


// SRS 5: el evento.
export const encuentro = {
  titulo: 'El encuentro',
  bajada: 'Un día entero en Jauja para conocer, conectar y crear con jóvenes de toda la provincia.',
  horario: '9:00 – 17:00',
  zonas: [
    { numero: '400', unidad: 'personas', nombre: 'Zona 1 · Escenario principal', detalle: 'Keynotes, paneles y pitching.' },
    { numero: '15+', unidad: 'stands', nombre: 'Zona 2 · Feria de agrupaciones', detalle: 'Comunidades y organizaciones juveniles con sus propuestas.' },
  ],
};

// SRS 4 y 9: por qué sumarse como aliado (metas del encuentro, no resultados).
export const aliados = {
  titulo: 'Llega a la juventud de Jauja',
  bajada: 'Hatun Joven reúne en un solo día a jóvenes de toda la provincia. Esta es nuestra meta para el 6 de marzo:',
  metas: [
    { valor: '+350', texto: 'jóvenes de 14 a 20 años' },
    { valor: '89', texto: 'comunidades campesinas y centros poblados' },
    { valor: '34', texto: 'distritos: toda la provincia de Jauja' },
  ],
  caminos: [
    { modal: 'sponsor', titulo: 'Sponsor', texto: 'Para organizaciones que quieren apoyar el encuentro y llegar a la juventud de Jauja.', cta: 'Postula como sponsor' },
    { modal: 'comunidad', titulo: 'Comunidad aliada', texto: 'Para agrupaciones estudiantiles o juveniles que quieren sumarse al movimiento y co-organizar el encuentro.', cta: 'Postula como comunidad' },
  ],
};

// RF-14: preguntas frecuentes pensadas para jóvenes de Jauja que quieren participar.
// Solo hechos confirmados. Pendiente de confirmar para agregar: refrigerio, certificado, qué llevar.
export const preguntas = {
  titulo: 'Preguntas frecuentes',
  items: [
    { p: '¿Quién puede ir?', r: 'Jóvenes de 14 a 20 años, de cualquiera de los 34 distritos de la provincia de Jauja. No importa si eres de la ciudad o de una comunidad.' },
    { p: '¿Cuánto cuesta?', r: 'Nada, es gratis. Solo tienes que inscribirte.' },
    { p: '¿Necesito saber de tecnología o emprendimiento?', r: 'No. Vienes a conocer: vas a escuchar a jóvenes que salieron de Jauja a estudiar y trabajar, y a descubrir oportunidades en tecnología, emprendimiento, activismo, ciencia y sociedad.' },
    { p: '¿Qué voy a hacer ese día?', r: 'Escucharás charlas y paneles en el escenario principal y recorrerás todos los stands de la feria de agrupaciones juveniles. El detalle por hora está en el cronograma.' },
    { p: '¿Cuándo es?', r: 'El sábado 6 de marzo de 2027, en Jauja. El check-in empieza a las 9:00 y terminamos a las 17:00.' },
    { p: '¿Cómo me inscribo?', r: 'Toca «Inscríbete» y llena tus nombres, apellidos, edad, colegio y celular. Te toma un minuto.' },
    { p: '¿Cómo sé que quedé inscrito?', r: 'Al enviar el formulario verás un mensaje de confirmación, y el equipo te escribirá al celular que registraste.' },
  ],
};

// RF-11 / RF-13: completar cuando el equipo confirme los canales; lo vacío no se muestra.
export const contacto = {
  whatsapp: '', // solo dígitos con código de país, p. ej. '51987654321'
  correo: '',
  redes: [
    { id: 'instagram', nombre: 'Instagram', url: 'https://www.instagram.com/hatunjoven/' },
    { id: 'facebook', nombre: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61595895055797' },
    { id: 'tiktok', nombre: 'TikTok', url: 'https://www.tiktok.com/@hatun.joven' },
    { id: 'linkedin', nombre: 'LinkedIn', url: 'https://www.linkedin.com/company/hatun-joven/' },
  ] as { id: 'instagram' | 'facebook' | 'tiktok' | 'linkedin'; nombre: string; url: string }[],
};
