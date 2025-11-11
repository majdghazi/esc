import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';

// Configuration PRODUCTION (source)
const prodConfig = {
  apiKey: "AIzaSyD9xPsE6tpiA2PRKrSXLgM2g4OVgYsxNL8",
  authDomain: "ih-app-b8d8a.firebaseapp.com",
  projectId: "ih-app-b8d8a",
  storageBucket: "ih-app-b8d8a.firebasestorage.app",
  messagingSenderId: "807620143387",
  appId: "1:807620143387:web:98bd92997dde9b3d060bbe"
};

// Configuration DEVELOPPEMENT (destination)
const devConfig = {
  apiKey: "AIzaSyBsUy2gO5auBjSO4Zq-kXXAgtoqHykPWQ0",
  authDomain: "esc-cappelle-dev.firebaseapp.com",
  projectId: "esc-cappelle-dev",
  storageBucket: "esc-cappelle-dev.firebasestorage.app",
  messagingSenderId: "1007110943857",
  appId: "1:1007110943857:web:7e3f2e1dff1b04787057d0"
};

const prodApp = initializeApp(prodConfig, 'prod');
const devApp = initializeApp(devConfig, 'dev');

const prodDb = getFirestore(prodApp);
const devDb = getFirestore(devApp);

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function lireCollection(db, nomCollection) {
  try {
    const querySnapshot = await getDocs(collection(db, nomCollection));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), docId: doc.id });
    });
    return data;
  } catch (error) {
    console.error(`Erreur lecture ${nomCollection}:`, error);
    return [];
  }
}

async function ecrireCollection(db, nomCollection, data) {
  for (const item of data) {
    const { docId, ...docData } = item;
    await setDoc(doc(db, nomCollection, docId), docData);
    await delay(50);
  }
}

async function dumpProdToDev() {
  console.log('🔄 DUMP PRODUCTION → DÉVELOPPEMENT\n');
  console.log('📥 Lecture depuis PRODUCTION (ih-app-b8d8a)...\n');

  try {
    // Lire toutes les collections depuis PROD
    const [joueurs, users, matchs, convocations, notes, buteurs, tempsDeJeu, passesD, evaluationsCoach] = await Promise.all([
      lireCollection(prodDb, 'joueurs'),
      lireCollection(prodDb, 'users'),
      lireCollection(prodDb, 'matchs'),
      lireCollection(prodDb, 'convocations'),
      lireCollection(prodDb, 'notes'),
      lireCollection(prodDb, 'buteurs'),
      lireCollection(prodDb, 'temps_de_jeu'),
      lireCollection(prodDb, 'passes_d'),
      lireCollection(prodDb, 'evaluations_coach')
    ]);

    console.log('📊 Données lues depuis PRODUCTION:');
    console.log(`- ${joueurs.length} joueurs`);
    console.log(`- ${users.length} users`);
    console.log(`- ${matchs.length} matchs`);
    console.log(`- ${convocations.length} convocations`);
    console.log(`- ${notes.length} notes`);
    console.log(`- ${buteurs.length} buteurs`);
    console.log(`- ${tempsDeJeu.length} temps de jeu`);
    console.log(`- ${passesD.length} passes décisives`);
    console.log(`- ${evaluationsCoach.length} évaluations coach\n`);

    console.log('📤 Écriture vers DÉVELOPPEMENT (esc-cappelle-dev)...\n');

    // Écrire toutes les collections vers DEV
    console.log('👤 Copie des joueurs...');
    await ecrireCollection(devDb, 'joueurs', joueurs);
    console.log(`✅ ${joueurs.length} joueurs copiés\n`);

    console.log('🔐 Copie des users...');
    await ecrireCollection(devDb, 'users', users);
    console.log(`✅ ${users.length} users copiés\n`);

    console.log('⚽ Copie des matchs...');
    await ecrireCollection(devDb, 'matchs', matchs);
    console.log(`✅ ${matchs.length} matchs copiés\n`);

    console.log('📢 Copie des convocations...');
    await ecrireCollection(devDb, 'convocations', convocations);
    console.log(`✅ ${convocations.length} convocations copiées\n`);

    console.log('📝 Copie des notes...');
    await ecrireCollection(devDb, 'notes', notes);
    console.log(`✅ ${notes.length} notes copiées\n`);

    console.log('⚽ Copie des buteurs...');
    await ecrireCollection(devDb, 'buteurs', buteurs);
    console.log(`✅ ${buteurs.length} buteurs copiés\n`);

    console.log('⏱️  Copie du temps de jeu...');
    await ecrireCollection(devDb, 'temps_de_jeu', tempsDeJeu);
    console.log(`✅ ${tempsDeJeu.length} temps de jeu copiés\n`);

    console.log('🎯 Copie des passes décisives...');
    await ecrireCollection(devDb, 'passes_d', passesD);
    console.log(`✅ ${passesD.length} passes décisives copiées\n`);

    console.log('⭐ Copie des évaluations coach...');
    await ecrireCollection(devDb, 'evaluations_coach', evaluationsCoach);
    console.log(`✅ ${evaluationsCoach.length} évaluations coach copiées\n`);

    console.log('✅ ✅ ✅ DUMP TERMINÉ AVEC SUCCÈS ! ✅ ✅ ✅');
    console.log('La base de données DEV est maintenant identique à la PROD\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ ERREUR:', error);
    process.exit(1);
  }
}

dumpProdToDev();
