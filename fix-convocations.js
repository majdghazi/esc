import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9xPsE6tpiA2PRKrSXLgM2g4OVgYsxNL8",
  authDomain: "ih-app-b8d8a.firebaseapp.com",
  projectId: "ih-app-b8d8a",
  storageBucket: "ih-app-b8d8a.firebasestorage.app",
  messagingSenderId: "807620143387",
  appId: "1:807620143387:web:98bd92997dde9b3d060bbe",
  measurementId: "G-DR7FPKF7J8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Matchs où le coach a envoyé les convocations (d'après Google Sheet)
const matchsAvecConvocationsEnvoyees = ["1", "2", "3", "4", "5", "6"];

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixConvocations() {
  console.log('🔧 Correction des convocations...\n');

  try {
    // Récupérer toutes les convocations
    const querySnapshot = await getDocs(collection(db, 'convocations'));
    let count = 0;

    for (const document of querySnapshot.docs) {
      const data = document.data();
      const matchId = data.id_match;

      // Si le match fait partie de ceux où le coach a envoyé, ajouter coach_a_envoye: true
      const coachAEnvoye = matchsAvecConvocationsEnvoyees.includes(matchId);

      await updateDoc(doc(db, 'convocations', document.id), {
        coach_a_envoye: coachAEnvoye
      });

      count++;
      console.log(`✅ Convocation ${document.id}: coach_a_envoye = ${coachAEnvoye}`);
      await delay(50);
    }

    console.log(`\n✅ ${count} convocations corrigées !\n`);
    process.exit(0);
  } catch (error) {
    console.error('❌ ERREUR:', error);
    process.exit(1);
  }
}

fixConvocations();
