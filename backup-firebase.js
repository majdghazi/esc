import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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

// Fonction pour lire une collection
async function lireCollection(nomCollection) {
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

async function backupFirebase() {
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const backupDir = path.join(process.cwd(), 'backups');

  // Créer le dossier backups s'il n'existe pas
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  console.log(`🔄 Démarrage du backup Firebase - ${timestamp}\n`);

  try {
    // Lire toutes les collections
    const [joueurs, users, matchs, convocations, notes, buteurs, tempsDeJeu, passesD, evaluationsCoach] = await Promise.all([
      lireCollection('joueurs'),
      lireCollection('users'),
      lireCollection('matchs'),
      lireCollection('convocations'),
      lireCollection('notes'),
      lireCollection('buteurs'),
      lireCollection('temps_de_jeu'),
      lireCollection('passes_d'),
      lireCollection('evaluations_coach')
    ]);

    const backup = {
      timestamp,
      collections: {
        joueurs,
        users,
        matchs,
        convocations,
        notes,
        buteurs,
        temps_de_jeu: tempsDeJeu,
        passes_d: passesD,
        evaluations_coach: evaluationsCoach
      },
      stats: {
        joueurs: joueurs.length,
        users: users.length,
        matchs: matchs.length,
        convocations: convocations.length,
        notes: notes.length,
        buteurs: buteurs.length,
        temps_de_jeu: tempsDeJeu.length,
        passes_d: passesD.length,
        evaluations_coach: evaluationsCoach.length
      }
    };

    // Sauvegarder dans un fichier JSON
    const filename = `backup-${timestamp}.json`;
    const filepath = path.join(backupDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(backup, null, 2));

    console.log('✅ Backup réussi !');
    console.log(`📁 Fichier: ${filename}`);
    console.log('\n📊 Statistiques:');
    console.log(`- ${backup.stats.joueurs} joueurs`);
    console.log(`- ${backup.stats.users} users`);
    console.log(`- ${backup.stats.matchs} matchs`);
    console.log(`- ${backup.stats.convocations} convocations`);
    console.log(`- ${backup.stats.notes} notes`);
    console.log(`- ${backup.stats.buteurs} buteurs`);
    console.log(`- ${backup.stats.temps_de_jeu} temps de jeu`);
    console.log(`- ${backup.stats.passes_d} passes décisives`);
    console.log(`- ${backup.stats.evaluations_coach} évaluations coach`);

    // Garder seulement les 30 derniers backups
    const files = fs.readdirSync(backupDir)
      .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (files.length > 30) {
      const toDelete = files.slice(30);
      toDelete.forEach(file => {
        fs.unlinkSync(path.join(backupDir, file));
        console.log(`🗑️  Ancien backup supprimé: ${file}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ ERREUR:', error);
    process.exit(1);
  }
}

backupFirebase();
