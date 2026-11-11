// Conexión a Firebase. La configuración web no es secreta (va al navegador);
// la seguridad la ponen las reglas de firestore.rules.
// Usa Firestore "lite" (solo escrituras puntuales, sin tiempo real) para pesar poco en móvil.
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';

const config = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = getApps()[0] ?? initializeApp(config);
export const db = getFirestore(app);

/** Guarda un registro en una colección; el sello de tiempo lo pone el servidor. */
export function guardar(coleccion: 'inscripciones' | 'aliados', datos: Record<string, unknown>) {
  return addDoc(collection(db, coleccion), { ...datos, creado: serverTimestamp() });
}
