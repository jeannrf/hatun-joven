// Sesión del Hub: avisa a cada página cuando hay una cuenta con acceso.
// Fase 1: la misma cuenta del panel anterior (ver src/lib/admin.ts).
// Fase 2: Google Sign-In + lista blanca `miembros/{uid}` con rol (docs/07-event-hub.md).
import { alCambiarSesion } from '../admin';
import type { User } from 'firebase/auth';

let actual: User | null = null;
const suscritos: ((u: User) => void)[] = [];

alCambiarSesion((u) => {
  actual = u;
  if (u) suscritos.forEach((f) => f(u));
});

/** Ejecuta `cb` cuando haya sesión (de inmediato si ya la hay). */
export function enSesion(cb: (u: User) => void) {
  suscritos.push(cb);
  if (actual) cb(actual);
}
