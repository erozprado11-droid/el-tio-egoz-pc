// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase-config'; // Importas la config de arriba

// Inicializamos la app
const app = initializeApp(firebaseConfig);

// Exportamos los servicios que vas a usar en toda tu app
export const db = getFirestore(app);
export const auth = getAuth(app);