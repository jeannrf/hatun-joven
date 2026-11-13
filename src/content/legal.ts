// Páginas legales. Texto revisable por el equipo.
// Si cambia qué datos se piden, con quién se comparten o cuánto se guardan, actualizar la página y `actualizada`.

// Política de privacidad (Ley N.º 29733 y su reglamento).
export const privacidad = {
  titulo: 'Política de privacidad',
  actualizada: '13 de noviembre de 2026',
  // Fecha límite de conservación: un año después del encuentro.
  conservacionHasta: '6 de marzo de 2028',
};

// Reglas para participar en el encuentro (fotos, convivencia, cambios, responsabilidad).
export const condiciones = {
  titulo: 'Condiciones de participación',
  actualizada: '13 de noviembre de 2026',
};

// Canal de contacto de las páginas legales: el correo si existe; si no, Instagram.
import { contacto } from './home';
const insta = contacto.redes.find((r) => r.id === 'instagram');
export const canalLegal = contacto.correo
  ? { href: `mailto:${contacto.correo}`, texto: contacto.correo }
  : { href: insta?.url ?? '/', texto: 'mensaje directo a @hatunjoven en Instagram' };
