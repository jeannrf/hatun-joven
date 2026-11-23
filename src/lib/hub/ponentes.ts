// Ponentes y dinámicas: data room de las personas que dan charlas o hacen dinámicas (colección `ponentes`).
// - Galería con foto, nombre, cargo, qué hará; Editar y Borrar en cada ficha.
// - Formulario en panel lateral (#cajon-ponentes) para crear o editar.
// - Actualiza los indicadores [data-prog] (también el del Dashboard).
// Todo se pinta con textContent; las fotos son enlaces de Google Drive.
import { listarPonentes, guardarPonente, borrarPonente, CAMPOS_PONENTE, type PonenteDatos, type Ponente } from '../admin';
import { confirmar, toast } from './ui';

const vacio = (): PonenteDatos => Object.fromEntries(CAMPOS_PONENTE.map((k) => [k, k === 'publicar' ? false : ''])) as PonenteDatos;
const nombre = (p: PonenteDatos) => `${p.nombres} ${p.apellidos}`.trim();
const daCharla = (p: PonenteDatos) => ['Charla', 'Charla y dinámica', 'Panel'].includes(p.participa);
const haceDinamica = (p: PonenteDatos) => ['Dinámica', 'Charla y dinámica'].includes(p.participa);

/** Un enlace de Drive («compartir») no se puede mostrar como imagen; su miniatura sí. */
export function urlFoto(enlace: string): string | null {
  const v = enlace.trim();
  if (!v) return null;
  const id = v.match(/\/file\/d\/([\w-]+)/)?.[1] ?? v.match(/[?&]id=([\w-]+)/)?.[1];
  if (id && v.includes('drive.google.com')) return `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
  return /^https:\/\//.test(v) ? v : null;
}

function pintarKpis(lista: Ponente[]) {
  const v: Record<string, number> = {
    ponentes: lista.length,
    charlas: lista.filter(daCharla).length,
    dinamicas: lista.filter(haceDinamica).length,
  };
  document.querySelectorAll<HTMLElement>('[data-prog]').forEach((el) => { el.textContent = String(v[el.dataset.prog!] ?? '—'); });
}

function retrato(p: PonenteDatos): HTMLElement {
  const caja = document.createElement('div'); caja.className = 'hb-ficha__foto';
  const iniciales = () => {
    caja.replaceChildren();
    const s = document.createElement('span');
    s.textContent = (p.nombres[0] ?? '') + (p.apellidos[0] ?? '');
    caja.append(s);
  };
  const url = urlFoto(p.foto);
  if (!url) { iniciales(); return caja; }
  const img = document.createElement('img');
  img.src = url; img.alt = ''; img.loading = 'lazy'; img.referrerPolicy = 'no-referrer';
  img.addEventListener('error', iniciales); // enlace sin permiso público o roto
  caja.append(img);
  return caja;
}

function montarGaleria(sec: HTMLElement, estado: { lista: Ponente[] }, recargar: () => Promise<void>) {
  const ul = sec.querySelector<HTMLElement>('[data-galeria]')!;
  const est = sec.querySelector<HTMLElement>('[data-estado]')!;
  const buscar = sec.querySelector<HTMLInputElement>('[data-buscar]')!;
  const fPart = sec.querySelector<HTMLSelectElement>('[data-filtro="Participa en"]');
  const vacioTxt = sec.dataset.vacio ?? 'Todavía no hay ponentes.';
  const dlg = document.getElementById('cajon-ponentes') as HTMLDialogElement;
  const form = dlg.querySelector('form')!;
  const titulo = dlg.querySelector('h2')!;
  const error = dlg.querySelector<HTMLElement>('[data-form-error]')!;
  const campo = (k: string) => form.querySelector<HTMLInputElement>(`#f-ponentes-${k}`)!;
  let editando: Ponente | null = null;

  const visibles = () => {
    const q = buscar.value.trim().toLowerCase();
    return estado.lista
      .filter((p) => !fPart?.value || p.participa === fPart.value)
      .filter((p) => !q || [nombre(p), p.organizacion, p.cargo, p.tema].some((x) => x.toLowerCase().includes(q)))
      .sort((a, b) => nombre(a).localeCompare(nombre(b), 'es'));
  };

  function pintar() {
    const lista = visibles();
    ul.replaceChildren();
    for (const p of lista) {
      const li = document.createElement('li'); li.className = 'hb-ficha';
      const cuerpo = document.createElement('div'); cuerpo.className = 'hb-ficha__cuerpo';
      const n = document.createElement('h3'); n.textContent = nombre(p);
      const c = document.createElement('p'); c.className = 'hb-ficha__cargo'; c.textContent = [p.cargo, p.organizacion].filter(Boolean).join(' · ') || '—';
      const q = document.createElement('p'); q.className = 'hb-ficha__que';
      const tag = document.createElement('span'); tag.className = 'hb-ficha__tag'; tag.textContent = p.participa;
      q.append(tag, document.createTextNode(p.tema ? ` ${p.tema}` : ''));
      cuerpo.append(n, c, q);
      if (p.publicar) { const w = document.createElement('p'); w.className = 'hb-ficha__web'; w.textContent = '✓ Aprobado para la web'; cuerpo.append(w); }
      const acc = document.createElement('div'); acc.className = 'hb-ficha__acc';
      if (p.linkedin) { const a = document.createElement('a'); a.href = p.linkedin; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'LinkedIn'; acc.append(a); }
      const e = document.createElement('button'); e.type = 'button'; e.className = 'hb-editar'; e.textContent = 'Ver y editar';
      e.addEventListener('click', () => abrir(p));
      const b = document.createElement('button'); b.type = 'button'; b.className = 'hb-borrar'; b.textContent = 'Borrar';
      b.addEventListener('click', () => quitar(p));
      acc.append(e, b);
      li.append(retrato(p), cuerpo, acc);
      ul.append(li);
    }
    if (!lista.length) {
      const li = document.createElement('li'); li.className = 'hb-vacio hb-vacio--bloque';
      li.textContent = estado.lista.length ? 'Ningún ponente coincide con la búsqueda.' : vacioTxt;
      ul.append(li);
    }
    est.textContent = lista.length !== estado.lista.length ? `Mostrando ${lista.length} de ${estado.lista.length}.` : '';
  }

  function abrir(p: Ponente | null) {
    editando = p;
    titulo.textContent = p ? nombre(p) : 'Nuevo ponente';
    const d = p ?? vacio();
    for (const k of CAMPOS_PONENTE) {
      const el = campo(k); if (!el) continue;
      if (k === 'publicar') el.checked = !!d.publicar; else el.value = String(d[k] ?? '');
      el.removeAttribute('aria-invalid');
    }
    error.textContent = '';
    if (!dlg.open) dlg.showModal();
  }

  function leer(): PonenteDatos | null {
    const d = vacio();
    for (const k of CAMPOS_PONENTE) {
      const el = campo(k); if (!el) continue;
      if (k === 'publicar') d.publicar = el.checked; else (d as Record<string, unknown>)[k] = el.value.trim();
    }
    const errores: [string, string][] = [];
    if (!d.nombres) errores.push(['nombres', 'Escribe los nombres.']);
    if (!d.apellidos) errores.push(['apellidos', 'Escribe los apellidos.']);
    if (!d.participa) errores.push(['participa', 'Elige si da charla o dinámica.']);
    if (d.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo)) errores.push(['correo', 'Revisa el correo.']);
    for (const k of ['foto', 'linkedin'] as const) if (d[k] && !/^https:\/\//.test(d[k])) errores.push([k, 'Los enlaces deben empezar con https://']);
    for (const k of CAMPOS_PONENTE) campo(k)?.removeAttribute('aria-invalid');
    errores.forEach(([k]) => campo(k)?.setAttribute('aria-invalid', 'true'));
    error.textContent = errores.map((e) => e[1]).join(' ');
    if (errores.length) { campo(errores[0][0])?.focus(); return null; }
    return d;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const d = leer(); if (!d) return;
    const btn = form.querySelector<HTMLButtonElement>('[type=submit]')!;
    btn.disabled = true; btn.textContent = 'Guardando…';
    try {
      await guardarPonente(editando?.id ?? null, d);
      dlg.close();
      toast(editando ? 'Ponente actualizado.' : 'Ponente agregado.');
      await recargar();
    } catch (err) {
      console.error(err);
      error.textContent = 'No se pudo guardar. Revisa tu conexión o vuelve a entrar.';
    } finally { btn.disabled = false; btn.textContent = 'Guardar'; }
  });

  async function quitar(p: Ponente) {
    const si = await confirmar({ titulo: '¿Borrar este ponente?', texto: `Se borrará la ficha de «${nombre(p)}». No se puede deshacer.`, accion: 'Borrar' });
    if (!si) return;
    try { await borrarPonente(p.id); toast('Ponente borrado.'); await recargar(); }
    catch (err) { console.error(err); toast('No se pudo borrar.', 'error'); }
  }

  function exportar() {
    const cols: [string, (p: Ponente) => string][] = [
      ['Nombres', (p) => p.nombres], ['Apellidos', (p) => p.apellidos], ['Cargo', (p) => p.cargo], ['Organización', (p) => p.organizacion],
      ['Participa en', (p) => p.participa], ['Tema', (p) => p.tema], ['Correo', (p) => p.correo], ['Teléfono', (p) => p.telefono],
      ['LinkedIn', (p) => p.linkedin], ['Foto', (p) => p.foto], ['Aprobado para la web', (p) => (p.publicar ? 'Sí' : 'No')],
    ];
    const esc = (s: string) => `"${(s ?? '').replace(/"/g, '""')}"`;
    const lineas = [cols.map((c) => esc(c[0])).join(';'), ...visibles().map((p) => cols.map((c) => esc(c[1](p))).join(';'))];
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + lineas.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = `hatun-joven-ponentes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(a.href);
  }

  document.querySelector('[data-abrir="cajon-ponentes"]')?.addEventListener('click', () => abrir(null));
  buscar.addEventListener('input', pintar);
  fPart?.addEventListener('change', pintar);
  sec.querySelector('[data-exportar]')?.addEventListener('click', exportar);
  return pintar;
}

/** Conecta lo que haya en la página: galería de ponentes e indicadores. */
export async function montarPonentes() {
  const sec = document.querySelector<HTMLElement>('.hb-tabla[data-conectado="ponentes"]');
  const estado = { lista: [] as Ponente[] };
  let pintar: (() => void) | null = null;

  async function recargar() {
    try { estado.lista = await listarPonentes(); }
    catch (e) {
      console.error(e);
      if (sec) {
        sec.querySelector<HTMLElement>('[data-estado]')!.textContent = 'No se pudieron leer los ponentes. Revisa tu conexión o vuelve a entrar.';
        sec.querySelector('[data-galeria]')?.replaceChildren();
      }
      return;
    }
    pintarKpis(estado.lista);
    pintar?.();
  }

  if (sec) pintar = montarGaleria(sec, estado, recargar);
  await recargar();
}
