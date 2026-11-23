// Tablas en vivo: inscripciones y postulaciones (sponsor / comunidad) que llegan desde la web.
// Heredado del panel anterior: buscar, filtrar por edad, ordenar, exportar a Excel y borrar.
// Los datos los escribe cualquier visitante: se pintan SIEMPRE con textContent.
import { borrar, type Registro } from '../admin';
import type { Vivo } from '../../content/hub';
import { cargar, enRango, edadDe, pintarTodo, type Datos } from './vivo';
import { confirmar, toast } from './ui';

type Col = { t: string; v: (r: Registro) => string; tipo?: 'wsp' | 'mail' | 'largo'; orden?: (r: Registro) => number | string };

const fecha = (d: Date | null) => d ? d.toLocaleString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
const txt = (v: unknown) => (v == null || v === '' ? '—' : String(v));
export const nombreCompleto = (r: Registro) =>
  [r.nombres, r.apellidoPaterno, r.apellidoMaterno].filter(Boolean).join(' ') || txt(r.nombre);

const colFecha: Col = { t: 'Fecha', v: (r) => fecha(r.creado), orden: (r) => r.creado?.getTime() ?? 0 };
const colsAliado: Col[] = [
  colFecha,
  { t: 'Organización', v: (r) => txt(r.organizacion) },
  { t: 'Contacto', v: (r) => txt(r.contacto) },
  { t: 'Cargo', v: (r) => txt(r.cargo) },
  { t: 'Correo', v: (r) => txt(r.correo), tipo: 'mail' },
  { t: 'Celular', v: (r) => txt(r.celular), tipo: 'wsp' },
  { t: 'Mensaje', v: (r) => txt(r.mensaje), tipo: 'largo' },
];

const columnas: Record<Vivo, Col[]> = {
  inscripciones: [
    colFecha,
    { t: 'Nombre completo', v: nombreCompleto },
    { t: 'Edad', v: (r) => txt(r.edad), orden: edadDe },
    { t: 'Colegio o institución', v: (r) => txt(r.colegio) },
    { t: 'Celular', v: (r) => txt(r.celular), tipo: 'wsp' },
    { t: 'Comparte con aliados', v: (r) => (r.compartirAliados ? 'Sí' : 'No') },
    { t: 'Adulto responsable', v: (r) => (edadDe(r) < 14 ? (r.autorizacionAdulto ? 'Sí' : 'No') : '—') },
  ],
  sponsor: colsAliado,
  comunidad: colsAliado,
};

const filas = (d: Datos, vivo: Vivo) => (vivo === 'inscripciones' ? d.inscripciones : d.aliados.filter((a) => a.tipo === vivo));
const filtroEdad: Record<string, (r: Registro) => boolean> = {
  'De 14 a 20 años': enRango,
  'Fuera de 14 a 20': (r) => !enRango(r),
  'Menores de 18': (r) => edadDe(r) < 18,
};

/** Conecta una sección .hb-tabla[data-vivo] con sus datos. */
export function montarTabla(sec: HTMLElement) {
  const vivo = sec.dataset.vivo as Vivo;
  const cols = columnas[vivo];
  const buscar = sec.querySelector<HTMLInputElement>('[data-buscar]')!;
  const edad = sec.querySelector<HTMLSelectElement>('[data-filtro="Edad"]');
  const estado = sec.querySelector<HTMLElement>('[data-estado]')!;
  const thead = sec.querySelector('thead')!, tbody = sec.querySelector('tbody')!;
  const vacio = sec.dataset.vacio ?? 'No hay registros todavía.';
  let datos: Datos | null = null;
  let orden = { i: 0, asc: false }; // por defecto: más recientes primero

  function visibles(): Registro[] {
    if (!datos) return [];
    const q = buscar.value.trim().toLowerCase();
    const f = edad?.value ? filtroEdad[edad.value] : null;
    const col = cols[orden.i];
    const clave = col.orden ?? ((r: Registro) => col.v(r).toLowerCase());
    return filas(datos, vivo)
      .filter((r) => !f || f(r))
      .filter((r) => !q || cols.some((c) => c.v(r).toLowerCase().includes(q)))
      .sort((a, b) => { const x = clave(a), y = clave(b); return (x < y ? -1 : x > y ? 1 : 0) * (orden.asc ? 1 : -1); });
  }

  function cabecera() {
    const tr = document.createElement('tr');
    cols.forEach((c, i) => {
      const th = document.createElement('th'); th.scope = 'col';
      th.setAttribute('aria-sort', i === orden.i ? (orden.asc ? 'ascending' : 'descending') : 'none');
      const b = document.createElement('button'); b.type = 'button'; b.className = 'hb-orden'; b.textContent = c.t;
      b.addEventListener('click', () => { orden = { i, asc: orden.i === i ? !orden.asc : true }; pintar(); });
      th.append(b); tr.append(th);
    });
    const th = document.createElement('th'); th.scope = 'col'; th.innerHTML = '<span class="sr-only">Acciones</span>'; tr.append(th);
    thead.replaceChildren(tr);
  }

  function pintar() {
    cabecera();
    const lista = visibles();
    tbody.replaceChildren();
    for (const r of lista) {
      const tr = document.createElement('tr');
      if (vivo === 'inscripciones' && !enRango(r)) { tr.className = 'fuera-rango'; tr.title = 'Fuera del rango de 14 a 20 años'; }
      for (const c of cols) {
        const td = document.createElement('td');
        const val = c.v(r);
        if (c.tipo === 'wsp' && val !== '—') {
          const a = document.createElement('a'); a.href = `https://wa.me/51${val.replace(/\D/g, '').replace(/^51/, '')}`; a.target = '_blank'; a.rel = 'noopener'; a.textContent = val; td.append(a);
        } else if (c.tipo === 'mail' && val !== '—') {
          const a = document.createElement('a'); a.href = `mailto:${val}`; a.textContent = val; td.append(a);
        } else {
          td.textContent = val;
          if (c.tipo === 'largo') { td.className = 'largo'; td.title = val; }
        }
        tr.append(td);
      }
      const td = document.createElement('td'); td.className = 'hb-acc';
      const b = document.createElement('button'); b.type = 'button'; b.className = 'hb-borrar'; b.textContent = 'Borrar';
      b.addEventListener('click', () => quitar(r));
      td.append(b); tr.append(td);
      tbody.append(tr);
    }
    if (!lista.length) {
      const tr = document.createElement('tr'); const td = document.createElement('td');
      td.colSpan = cols.length + 1; td.className = 'hb-vacio';
      td.textContent = datos && filas(datos, vivo).length ? 'Ningún registro coincide con la búsqueda.' : vacio;
      tr.append(td); tbody.append(tr);
    }
    const total = datos ? filas(datos, vivo).length : 0;
    estado.textContent = lista.length !== total ? `Mostrando ${lista.length} de ${total}.` : `${total} registro${total === 1 ? '' : 's'}.`;
  }

  async function quitar(r: Registro) {
    const quien = vivo === 'inscripciones' ? nombreCompleto(r) : txt(r.organizacion);
    const si = await confirmar({ titulo: '¿Borrar este registro?', texto: `Se borrará el registro de «${quien}». No se puede deshacer.`, accion: 'Borrar' });
    if (!si || !datos) return;
    try {
      await borrar(vivo === 'inscripciones' ? 'inscripciones' : 'aliados', r.id);
      if (vivo === 'inscripciones') datos.inscripciones = datos.inscripciones.filter((x) => x.id !== r.id);
      else datos.aliados = datos.aliados.filter((x) => x.id !== r.id);
      pintar();
      toast('Registro borrado.');
    } catch (e) { console.error(e); toast('No se pudo borrar el registro.', 'error'); }
  }

  // Exportar a Excel: CSV con ; y BOM para que Excel en español lo abra bien. Exporta lo que se ve.
  function exportar() {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const lineas = [cols.map((c) => esc(c.t)).join(';'), ...visibles().map((r) => cols.map((c) => esc(c.v(r))).join(';'))];
    const blob = new Blob(['﻿' + lineas.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `hatun-joven-${vivo}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(a.href);
  }

  async function traer(forzar = false) {
    estado.textContent = 'Cargando…';
    try {
      datos = forzar ? await pintarTodo(true) : await cargar();
      pintar();
    } catch (e) {
      console.error(e);
      estado.textContent = 'No se pudieron cargar los registros. Revisa tu conexión o vuelve a entrar.';
    }
  }

  buscar.addEventListener('input', pintar);
  edad?.addEventListener('change', pintar);
  sec.querySelector('[data-recargar]')?.addEventListener('click', () => traer(true));
  sec.querySelector('[data-exportar]')?.addEventListener('click', exportar);
  traer();
}
