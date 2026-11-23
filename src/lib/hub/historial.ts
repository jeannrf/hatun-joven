// Historial del Hub (colección `historial`): tabla con búsqueda, filtros y exportación.
// Se pinta SIEMPRE con textContent (los valores vienen de lo que escribió el equipo).
import { listarHistorial, type Movimiento } from '../admin';
import { modulos } from '../../content/hub';
import { toast } from './ui';

const ACCION: Record<string, string> = { crear: 'Creó', editar: 'Editó', borrar: 'Borró', entrar: 'Inició sesión' };
const SECCION: Record<string, string> = { ponentes: 'Ponentes', inscripciones: 'Participantes', aliados: 'Postulaciones', hub: 'Acceso al Hub' };

// Nombre legible de cada campo, tomado de los formularios de src/content/hub.ts.
const etiquetas: Record<string, string> = Object.fromEntries(
  modulos.flatMap((m) => m.tablas.flatMap((t) => (t.form ?? []).flatMap((s) => s.campos.map((c) => [c.id, c.label])))),
);

const fecha = (d: Date | null) => d ? d.toLocaleString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '—';
const quien = (m: Movimiento) => m.nombre || m.correo || '—';
const campo = (k: string) => etiquetas[k] ?? k;
const vacio = (s: string) => (s === '' ? '(vacío)' : `«${s}»`);
const detalle = (m: Movimiento) =>
  m.accion === 'editar' ? m.cambios.map((c) => `${campo(c.campo)}: ${vacio(c.antes)} → ${vacio(c.despues)}`)
  : m.accion === 'crear' ? [m.cambios.map((c) => campo(c.campo)).join(', ')].filter(Boolean)
  : [];

export async function montarHistorial() {
  const sec = document.getElementById('tabla-historial')!;
  const tbody = sec.querySelector('tbody')!;
  const estado = sec.querySelector<HTMLElement>('[data-estado]')!;
  const buscar = sec.querySelector<HTMLInputElement>('[data-buscar]')!;
  const f = (k: string) => sec.querySelector<HTMLSelectElement>(`[data-filtro="${k}"]`)!;
  const fAccion = f('accion'), fSeccion = f('seccion'), fQuien = f('quien');
  let lista: Movimiento[] = [];
  const MAX = 500;

  const visibles = () => {
    const q = buscar.value.trim().toLowerCase();
    return lista
      .filter((m) => !fAccion.value || ACCION[m.accion] === fAccion.value)
      .filter((m) => !fSeccion.value || SECCION[m.seccion] === fSeccion.value)
      .filter((m) => !fQuien.value || quien(m) === fQuien.value)
      .filter((m) => !q || [quien(m), m.correo, m.registro, ...detalle(m)].some((x) => x.toLowerCase().includes(q)));
  };

  function pintar() {
    const vis = visibles();
    tbody.replaceChildren();
    for (const m of vis) {
      const tr = document.createElement('tr');
      const celda = (t: string, cls?: string) => { const td = document.createElement('td'); td.textContent = t; if (cls) td.className = cls; tr.append(td); return td; };
      celda(fecha(m.cuando), 'hb-t__nowrap');
      const q = celda(quien(m)); if (m.nombre && m.correo) q.title = m.correo;
      const a = document.createElement('td'); const tag = document.createElement('span');
      tag.className = `hb-ficha__tag hb-accion hb-accion--${m.accion}`; tag.textContent = ACCION[m.accion] ?? m.accion;
      a.append(tag); tr.append(a);
      celda(SECCION[m.seccion] ?? m.seccion);
      celda(m.registro || '—');
      const d = document.createElement('td'); d.className = 'hb-t__cambios';
      const lineas = detalle(m);
      if (!lineas.length) d.textContent = '—';
      else if (m.accion === 'crear') d.textContent = `Con: ${lineas[0]}`;
      else { const ul = document.createElement('ul'); lineas.forEach((l) => { const li = document.createElement('li'); li.textContent = l; ul.append(li); }); d.append(ul); }
      tr.append(d);
      const de = celda(m.dispositivo || '—', 'hb-t__nowrap'); if (m.ruta) de.title = m.ruta;
      tbody.append(tr);
    }
    if (!vis.length) {
      const tr = document.createElement('tr'); const td = document.createElement('td');
      td.colSpan = 7; td.className = 'hb-vacio';
      td.textContent = lista.length ? 'Ningún movimiento coincide con la búsqueda.' : 'Todavía no hay movimientos. Aparecerán aquí en cuanto alguien cree, edite o borre un registro.';
      tr.append(td); tbody.append(tr);
    }
    const tope = lista.length >= MAX ? ` (los ${MAX} más recientes)` : '';
    estado.textContent = vis.length !== lista.length ? `Mostrando ${vis.length} de ${lista.length}${tope}.` : `${lista.length} movimiento${lista.length === 1 ? '' : 's'}${tope}.`;
  }

  function personas() {
    const actual = fQuien.value;
    const nombres = [...new Set(lista.map(quien))].sort((a, b) => a.localeCompare(b, 'es'));
    fQuien.replaceChildren(new Option('Persona: todas', ''), ...nombres.map((n) => new Option(n, n)));
    fQuien.value = nombres.includes(actual) ? actual : '';
  }

  function exportar() {
    const esc = (s: string) => `"${(s ?? '').replace(/"/g, '""')}"`;
    const cab = ['Fecha y hora', 'Persona', 'Correo', 'Acción', 'Sección', 'Registro', 'Qué cambió', 'Dispositivo', 'Página'];
    const filas = visibles().map((m) => [fecha(m.cuando), quien(m), m.correo, ACCION[m.accion] ?? m.accion, SECCION[m.seccion] ?? m.seccion, m.registro, detalle(m).join(' | '), m.dispositivo, m.ruta]);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + [cab, ...filas].map((r) => r.map(esc).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = `hatun-joven-historial-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(a.href);
  }

  async function traer() {
    estado.textContent = 'Cargando…';
    try { lista = await listarHistorial(MAX); personas(); pintar(); }
    catch (e) { console.error(e); estado.textContent = 'No se pudo leer el historial. Revisa tu conexión o vuelve a entrar.'; toast('No se pudo leer el historial.', 'error'); }
  }

  buscar.addEventListener('input', pintar);
  [fAccion, fSeccion, fQuien].forEach((s) => s.addEventListener('change', pintar));
  sec.querySelector('[data-recargar]')!.addEventListener('click', traer);
  sec.querySelector('[data-exportar]')!.addEventListener('click', exportar);
  await traer();
}
