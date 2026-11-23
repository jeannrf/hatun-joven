// Panel /admin: inicio de sesión con Firebase Auth y lectura de registros.
// La contraseña NO vive en el código: la valida Firebase. Las reglas de Firestore
// solo permiten leer/borrar a la cuenta de ADMIN_EMAIL.
import { app } from './firebase';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore, collection, getDocs, deleteDoc, doc, query, orderBy, setDoc, addDoc, serverTimestamp } from 'firebase/firestore/lite';

export const ADMIN_EMAIL = 'admin@hatun-joven.web.app';

const auth = getAuth(app);
const db = getFirestore(app);

export const entrar = (password: string) => signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
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

export const borrar = (coleccion: 'inscripciones' | 'aliados', id: string) => deleteDoc(doc(db, coleccion, id));

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

const sello = (p: PonenteDatos) => ({ ...p, eventoId: EVENTO_ID, actualizado: serverTimestamp() });

/** Crea (sin id) o reemplaza (con id) un ponente. Devuelve su id. */
export async function guardarPonente(id: string | null, p: PonenteDatos): Promise<string> {
  if (id) { await setDoc(doc(db, 'ponentes', id), sello(p)); return id; }
  return (await addDoc(collection(db, 'ponentes'), sello(p))).id;
}

export const borrarPonente = (id: string) => deleteDoc(doc(db, 'ponentes', id));
