// Panel /admin: inicio de sesión con Firebase Auth y lectura de registros.
// La contraseña NO vive en el código: la valida Firebase. Las reglas de Firestore
// solo permiten leer/borrar a la cuenta de ADMIN_EMAIL.
// Trazabilidad: cada cambio (crear, editar, borrar) se guarda en el mismo batch que su
// entrada de `historial`; firestore.rules rechaza el cambio si falta esa entrada.
import { app } from './firebase';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, query, orderBy, limit, setDoc, writeBatch, serverTimestamp } from 'firebase/firestore/lite';

export const ADMIN_EMAIL = 'admin@hatun-joven.web.app';

const auth = getAuth(app);
const db = getFirestore(app);

export async function entrar(password: string) {
  const cred = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
  // Si el registro del acceso falla, igual se entra: no es un cambio de datos.
  setDoc(doc(collection(db, 'historial')), asiento({ accion: 'entrar', seccion: 'hub', registroId: cred.user.uid, registro: 'Inició sesión' }))
    .catch((e) => console.error('historial', e));
  return cred;
}
export const salir = () => signOut(auth);
export const alCambiarSesion = (cb: (u: User | null) => void) => onAuthStateChanged(auth, cb);

export type Registro = { id: string; creado: Date | null } & Record<string, unknown>;

export async function listar(coleccion: 'inscripciones' | 'aliados'): Promise<Registro[]> {
  const snap = await getDocs(query(collection(db, coleccion), orderBy('creado', 'desc')));
  return snap.docs.map((d) => {
    const data = d.data() as Record<string, any>;
    return { ...data, id: d.id, creado: data.creado?.toDate ? data.creado.toDate() : null };
  });
}

// ---------- Historial (colección `historial`) ----------
// Una entrada por movimiento. Nadie puede editarla ni borrarla (ni siquiera un Super admin).
export type Seccion = 'ponentes' | 'inscripciones' | 'aliados' | 'hub';
export type Accion = 'crear' | 'editar' | 'borrar' | 'entrar';
export type Cambio = { campo: string; antes: string; despues: string };
export type Movimiento = {
  id: string; accion: Accion; seccion: Seccion; registroId: string; registro: string; cambios: Cambio[];
  uid: string; correo: string; nombre: string; ruta: string; dispositivo: string; cuando: Date | null;
};

/** Navegador y sistema, p. ej. «Chrome · Android». Sirve para saber desde dónde se hizo el cambio. */
function dispositivo(): string {
  const ua = navigator.userAgent;
  const nav = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox'
    : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Otro navegador';
  const so = /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS' : /Windows/.test(ua) ? 'Windows'
    : /Mac OS/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'Otro sistema';
  return `${nav} · ${so}`;
}

const corto = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

function asiento(m: { accion: Accion; seccion: Seccion; registroId: string; registro: string; cambios?: Cambio[] }) {
  const u = auth.currentUser;
  if (!u) throw new Error('Sin sesión');
  return {
    ...m,
    registro: corto(m.registro, 200),
    cambios: (m.cambios ?? []).slice(0, 30).map((c) => ({ campo: c.campo, antes: corto(c.antes, 300), despues: corto(c.despues, 300) })),
    uid: u.uid,
    correo: u.email ?? '',
    nombre: corto(u.displayName ?? '', 120),
    ruta: corto(location.pathname, 200),
    dispositivo: dispositivo(),
    cuando: serverTimestamp(),
  };
}

/** Id fijo de la entrada de un borrado: así las reglas pueden exigir que exista. */
const idBorrado = (seccion: Seccion, id: string) => `borrar_${seccion}_${id}`;

async function borrarConHistorial(seccion: Exclude<Seccion, 'hub'>, id: string, registro: string) {
  const b = writeBatch(db);
  b.delete(doc(db, seccion, id));
  b.set(doc(db, 'historial', idBorrado(seccion, id)), asiento({ accion: 'borrar', seccion, registroId: id, registro }));
  await b.commit();
}

export async function listarHistorial(max = 500): Promise<Movimiento[]> {
  const snap = await getDocs(query(collection(db, 'historial'), orderBy('cuando', 'desc'), limit(max)));
  return snap.docs.map((d) => {
    const data = d.data() as Record<string, any>;
    return { ...data, id: d.id, cambios: data.cambios ?? [], cuando: data.cuando?.toDate ? data.cuando.toDate() : null } as Movimiento;
  });
}

/** `registro`: cómo se verá en el historial (sin datos personales de menores). */
export const borrar = (coleccion: 'inscripciones' | 'aliados', id: string, registro: string) => borrarConHistorial(coleccion, id, registro);

// ---------- Ponentes y dinámicas (colección `ponentes`) ----------
// Data room del equipo. Solo la cuenta del panel lee y escribe; firestore.rules valida los campos.
export const EVENTO_ID = 'hj-2027';
export const CAMPOS_PONENTE = [
  'nombres', 'apellidos', 'cargo', 'organizacion', 'foto', 'linkedin', 'bio',
  'participa', 'tema', 'publicar', 'correo', 'telefono', 'notas',
] as const;
export type PonenteDatos = { [K in (typeof CAMPOS_PONENTE)[number]]: K extends 'publicar' ? boolean : string };
export type Ponente = PonenteDatos & { id: string };

export async function listarPonentes(): Promise<Ponente[]> {
  const snap = await getDocs(collection(db, 'ponentes'));
  return snap.docs.map((d) => ({ ...(d.data() as PonenteDatos), id: d.id }));
}

const nombrePonente = (p: PonenteDatos) => `${p.nombres} ${p.apellidos}`.trim();
const valor = (v: unknown) => (typeof v === 'boolean' ? (v ? 'Sí' : 'No') : String(v ?? ''));

/** Campos que cambian entre dos versiones de un ponente. */
export function cambiosPonente(antes: PonenteDatos | null, despues: PonenteDatos): Cambio[] {
  return CAMPOS_PONENTE
    .filter((k) => valor(antes?.[k]) !== valor(despues[k]))
    .map((k) => ({ campo: k, antes: antes ? valor(antes[k]) : '', despues: valor(despues[k]) }));
}

/** Crea (antes = null) o reemplaza un ponente, y deja su entrada en el historial. Devuelve su id. */
export async function guardarPonente(antes: Ponente | null, p: PonenteDatos): Promise<string> {
  const ref = antes ? doc(db, 'ponentes', antes.id) : doc(collection(db, 'ponentes'));
  const log = doc(collection(db, 'historial'));
  const b = writeBatch(db);
  // `cambio` apunta a la entrada del historial: firestore.rules exige que se cree en este mismo batch.
  b.set(ref, { ...p, eventoId: EVENTO_ID, actualizado: serverTimestamp(), cambio: log.id });
  b.set(log, asiento({ accion: antes ? 'editar' : 'crear', seccion: 'ponentes', registroId: ref.id, registro: nombrePonente(p), cambios: cambiosPonente(antes, p) }));
  await b.commit();
  return ref.id;
}

export const borrarPonente = (p: Ponente) => borrarConHistorial('ponentes', p.id, nombrePonente(p));
