import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Configuration Firebase avec FALLBACK
// En LOCAL (npm start) : utilise .env.local → Firebase DEV
// En PRODUCTION (Vercel) : utilise variables Vercel OU valeurs par défaut PROD
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD9xPsE6tpiA2PRKrSXLgM2g4OVgYsxNL8",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "ih-app-b8d8a.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "ih-app-b8d8a",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "ih-app-b8d8a.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "807620143387",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:807620143387:web:98bd92997dde9b3d060bbe",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-DR7FPKF7J8"
};

// Log pour vérifier quel environnement est utilisé
console.log(`🔥 Firebase connecté à: ${firebaseConfig.projectId}`);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
