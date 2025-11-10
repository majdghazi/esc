import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

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

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteCollection(collectionName) {
  console.log(`🗑️  Suppression de la collection "${collectionName}"...`);
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let count = 0;

    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, collectionName, document.id));
      count++;
      await delay(100); // Délai pour éviter la saturation
    }

    console.log(`✅ ${count} documents supprimés de "${collectionName}"\n`);
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression de "${collectionName}":`, error.message);
  }
}

async function nettoyerFirebase() {
  console.log('🧹 NETTOYAGE COMPLET DE FIREBASE\n');
  console.log('⚠️  ATTENTION : Toutes les données vont être supprimées !\n');

  const collections = [
    'matchs',
    'notes',
    'buteurs',
    'temps_de_jeu',
    'passes_d',
    'convocations',
    'evaluations',
    'evaluations_coach',
    'joueurs',
    'stats',
    'users'
  ];

  for (const collectionName of collections) {
    await deleteCollection(collectionName);
    await delay(500); // Pause entre chaque collection
  }

  console.log('✅ ✅ ✅ NETTOYAGE TERMINÉ ! ✅ ✅ ✅');
  console.log('\n🔄 Vous pouvez maintenant lancer le script de restauration avec :');
  console.log('   node restore-data.js\n');

  process.exit(0);
}

nettoyerFirebase().catch(error => {
  console.error('❌ ERREUR CRITIQUE:', error);
  process.exit(1);
});
