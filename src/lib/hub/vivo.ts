// Datos reales que ya existen en Firestore (formularios de la web) y las métricas que salen de ellos.
// Todo lo demás del Hub se mostrará como «—» hasta que su módulo se conecte.
import { listar, type Registro } from '../admin';

export type Datos = { inscripciones: Registro[]; aliados: Registro[] };

let cache: Promise<Datos> | null = null;
export function cargar(forzar = false): Promise<Datos> {
  if (!cache || forzar) {
    cache = Promise.all([listar('inscripciones'), listar('aliados')]).then(([inscripciones, aliados]) => ({ inscripciones, aliados }));
    cache.catch(() => (cache = null));
  }
  return cache;
}

export const edadDe = (r: Registro) => Number(r.edad);
export const enRango = (r: Registro) => edadDe(r) >= 14 && edadDe(r) <= 20;
const DIA = 864e5;

/** Métricas por clave (las mismas que `vivo` en src/content/hub.ts). */
export function metricas(d: Datos): Record<string, number> {
  const i = d.inscripciones, a = d.aliados;
  const semana = Date.now() - 7 * DIA;
  const reciente = (r: Registro) => !!r.creado && r.creado.getTime() >= semana;
  return {
    inscritos: i.length,
    enRango: i.filter(enRango).length,
    menores: i.filter((r) => edadDe(r) < 18).length,
    semana: i.filter(reciente).length,
    comparten: i.filter((r) => r.compartirAliados).length,
    postulaciones: a.length,
    sponsors: a.filter((x) => x.tipo === 'sponsor').length,
    comunidades: a.filter((x) => x.tipo === 'comunidad').length,
    postulacionesSemana: a.filter(reciente).length,
  };
}

type Par = [string, number];

// Registros por semana (lunes a domingo), del primero a hoy, máximo las últimas 12.
function porSemana(lista: Registro[]): Par[] {
  const lunes = (t: number) => { const f = new Date(t); f.setHours(0, 0, 0, 0); f.setDate(f.getDate() - ((f.getDay() + 6) % 7)); return f.getTime(); };
  const fechas = lista.map((r) => r.creado?.getTime()).filter((t): t is number => !!t);
  const semanas: Par[] = [];
  if (!fechas.length) return semanas;
  const hoy = lunes(Date.now());
  const inicio = Math.max(lunes(Math.min(...fechas)), hoy - 11 * 7 * DIA);
  // Se avanza con setDate para no desfasarse en cambios de horario.
  for (const f = new Date(inicio); f.getTime() <= hoy; f.setDate(f.getDate() + 7)) {
    const t = f.getTime(), fin = new Date(t); fin.setDate(fin.getDate() + 7);
    const label = f.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }).replace('.', '');
    semanas.push([label, fechas.filter((x) => x >= t && x < fin.getTime()).length]);
  }
  return semanas;
}

/** Series y distribuciones para los paneles `vivo`. */
export function series(d: Datos): Record<string, Par[]> {
  const i = d.inscripciones;
  return {
    edades: [
      ['Menos de 14', i.filter((r) => edadDe(r) < 14).length],
      ['14 a 17', i.filter((r) => edadDe(r) >= 14 && edadDe(r) <= 17).length],
      ['18 a 20', i.filter((r) => edadDe(r) >= 18 && edadDe(r) <= 20).length],
      ['Más de 20', i.filter((r) => edadDe(r) > 20).length],
    ],
    semanas: porSemana(i),
    postulacionesSemanas: porSemana(d.aliados),
    postulacionesTipo: [
      ['Sponsor', d.aliados.filter((x) => x.tipo === 'sponsor').length],
      ['Comunidad aliada', d.aliados.filter((x) => x.tipo === 'comunidad').length],
    ],
  };
}

// ---------- Pintado (siempre con textContent: los datos vienen de formularios públicos) ----------
const n = (v: number) => v.toLocaleString('es-PE');

export function pintarKpis(m: Record<string, number>) {
  document.querySelectorAll<HTMLElement>('[data-kpi]').forEach((el) => {
    const v = m[el.dataset.kpi!];
    if (v != null) el.textContent = n(v);
  });
}

export function pintarBarras(ul: HTMLElement, pares: Par[]) {
  const max = Math.max(1, ...pares.map((p) => p[1]));
  ul.replaceChildren(...pares.map(([label, v]) => {
    const li = document.createElement('li');
    const l = document.createElement('span'); l.className = 'hb-barras__l'; l.textContent = label; l.title = label;
    const t = document.createElement('span'); t.className = 'hb-barras__t';
    const f = document.createElement('span'); f.className = 'hb-barras__f'; f.style.setProperty('--v', String(v / max));
    t.append(f);
    const c = document.createElement('span'); c.className = 'hb-barras__n'; c.textContent = n(v);
    li.append(l, t, c);
    return li;
  }));
  if (!pares.length) {
    const li = document.createElement('li'); li.className = 'hb-vacio'; li.textContent = 'Sin datos todavía.'; ul.append(li);
  }
}

export function pintarSerie(el: HTMLElement, pares: Par[]) {
  const vacio = el.querySelector<HTMLElement>('.hb-vacio');
  el.querySelector('.hb-serie__cols')?.remove();
  if (!pares.length) { if (vacio) { vacio.hidden = false; vacio.textContent = el.dataset.vacio ?? 'Sin datos todavía.'; } return; }
  if (vacio) vacio.hidden = true;
  const max = Math.max(1, ...pares.map((p) => p[1]));
  const cols = document.createElement('div'); cols.className = 'hb-serie__cols';
  cols.setAttribute('role', 'img');
  cols.setAttribute('aria-label', pares.map(([l, v]) => `${l}: ${v}`).join(', '));
  for (const [label, v] of pares) {
    const c = document.createElement('div'); c.className = 'hb-serie__c';
    const num = document.createElement('span'); num.className = 'hb-serie__n'; num.textContent = n(v);
    const bar = document.createElement('span'); bar.className = 'hb-serie__b'; bar.style.setProperty('--v', String(v / max));
    const l = document.createElement('span'); l.className = 'hb-serie__l'; l.textContent = label;
    c.append(num, bar, l); cols.append(c);
  }
  el.append(cols);
}

/** Llena todo lo marcado con data-kpi / data-vivo en la página. */
export async function pintarTodo(forzar = false) {
  const d = await cargar(forzar);
  pintarKpis(metricas(d));
  const s = series(d);
  document.querySelectorAll<HTMLElement>('ul[data-vivo]').forEach((ul) => pintarBarras(ul, s[ul.dataset.vivo!] ?? []));
  document.querySelectorAll<HTMLElement>('.hb-serie[data-vivo]').forEach((el) => pintarSerie(el, s[el.dataset.vivo!] ?? []));
  return d;
}
