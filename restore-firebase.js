import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

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

async function restaurerBackup(backupFile) {
  console.log(`🔄 Restauration du backup: ${backupFile}\n`);

  try {
    // Lire le fichier de backup
    const backupPath = path.join(process.cwd(), 'backups', backupFile);
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

    console.log(`📅 Date du backup: ${backupData.timestamp}`);
    console.log('📊 Contenu du backup:');
    Object.entries(backupData.stats).forEach(([key, value]) => {
      console.log(`- ${key}: ${value}`);
    });
    console.log('\n⚠️  Cette opération va ÉCRASER les données actuelles !');
    console.log('Démarrage de la restauration dans 3 secondes...\n');

    await delay(3000);

    // Restaurer chaque collection
    const collections = backupData.collections;

    // Joueurs
    console.log('👤 Restauration des joueurs...');
    for (const item of collections.joueurs) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'joueurs', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.joueurs.length} joueurs restaurés\n`);

    // Users
    console.log('🔐 Restauration des users...');
    for (const item of collections.users) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'users', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.users.length} users restaurés\n`);

    // Matchs
    console.log('⚽ Restauration des matchs...');
    for (const item of collections.matchs) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'matchs', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.matchs.length} matchs restaurés\n`);

    // Convocations
    console.log('📢 Restauration des convocations...');
    for (const item of collections.convocations) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'convocations', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.convocations.length} convocations restaurées\n`);

    // Notes
    console.log('📝 Restauration des notes...');
    for (const item of collections.notes) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'notes', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.notes.length} notes restaurées\n`);

    // Buteurs
    console.log('⚽ Restauration des buteurs...');
    for (const item of collections.buteurs) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'buteurs', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.buteurs.length} buteurs restaurés\n`);

    // Temps de jeu
    console.log('⏱️  Restauration du temps de jeu...');
    for (const item of collections.temps_de_jeu) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'temps_de_jeu', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.temps_de_jeu.length} temps de jeu restaurés\n`);

    // Passes D
    console.log('🎯 Restauration des passes décisives...');
    for (const item of collections.passes_d) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'passes_d', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.passes_d.length} passes décisives restaurées\n`);

    // Évaluations coach
    console.log('⭐ Restauration des évaluations coach...');
    for (const item of collections.evaluations_coach) {
      const { docId, ...data } = item;
      await setDoc(doc(db, 'evaluations_coach', docId), data);
      await delay(50);
    }
    console.log(`✅ ${collections.evaluations_coach.length} évaluations coach restaurées\n`);

    console.log('\n✅ ✅ ✅ RESTAURATION COMPLÈTE TERMINÉE ! ✅ ✅ ✅\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERREUR:', error);
    process.exit(1);
  }
}

// Utilisation: node restore-firebase.js <nom-du-fichier-backup>
const backupFile = process.argv[2];

if (!backupFile) {
  console.error('❌ Erreur: Veuillez spécifier le fichier de backup');
  console.log('Usage: node restore-firebase.js backup-2025-11-11T12-00-00.json');
  process.exit(1);
}

restaurerBackup(backupFile);
