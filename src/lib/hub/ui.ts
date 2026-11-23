// Piezas de interfaz compartidas del Hub: avisos breves y confirmación de acciones destructivas.
// El marcado (#hb-toasts, #hb-confirmar) vive en src/layouts/Hub.astro.

export function toast(texto: string, tipo: 'ok' | 'error' | 'info' = 'ok') {
  const zona = document.getElementById('hb-toasts');
  if (!zona) return;
  const t = document.createElement('p');
  t.className = `hb-toast hb-toast--${tipo}`;
  t.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
  t.textContent = texto;
  zona.append(t);
  setTimeout(() => t.remove(), 4500);
}

/** Diálogo de confirmación; resuelve `true` solo si se pulsa la acción. */
export function confirmar(opts: { titulo: string; texto: string; accion: string }): Promise<boolean> {
  const d = document.getElementById('hb-confirmar') as HTMLDialogElement;
  d.querySelector('[data-t]')!.textContent = opts.titulo;
  d.querySelector('[data-x]')!.textContent = opts.texto;
  d.querySelector<HTMLButtonElement>('[value=si]')!.textContent = opts.accion;
  d.returnValue = '';
  d.showModal();
  return new Promise((ok) => d.addEventListener('close', () => ok(d.returnValue === 'si'), { once: true }));
}
