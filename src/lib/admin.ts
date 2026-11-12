// Panel /admin: inicio de sesión con Firebase Auth y lectura de registros.
// La contraseña NO vive en el código: la valida Firebase. Las reglas de Firestore
// solo permiten leer/borrar a la cuenta de ADMIN_EMAIL.
import { app } from './firebase';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore, collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore/lite';

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
