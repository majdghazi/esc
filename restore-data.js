import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

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

// Fonction helper pour convertir date DD/MM/YYYY en ISO
function convertirDateEnISO(dateStr) {
  const [jour, mois, annee] = dateStr.split('/');
  return new Date(annee, mois - 1, jour).toISOString();
}

// DONNÉES COMPLÈTES DU GOOGLE SHEETS - 18 MATCHS
const matchsData = [
  ["1", "ARMBOUTS CAPPEL US", "07/09/2025", "false", "joue", "3", "0"],
  ["2", "MONTS DE FLANDRE US 2", "21/09/2025", "true", "joue", "4", "1"],
  ["3", "BAILLEUL FC 2", "28/09/2025", "false", "joue", "1", "4"],
  ["4", "BOLLEZEELE AS 2", "05/10/2025", "true", "joue", "7", "1"],
  ["5", "CAESTRE US", "12/10/2025", "false", "joue", "2", "1"],
  ["6", "EECKE", "19/10/2025", "true", "joue", "4", "0"],
  ["7", "HAZEBROUCK RC 4", "09/11/2025", "false", "joue", "4", "5"],
  ["8", "CASSEL", "16/11/2025", "true", "joue", "5", "0"],
  ["9", "HOUTLAND US", "23/11/2025", "false", "joue", "5", "2"],
  ["10", "MERVILLE US 2", "30/11/2025", "true", "joue", "6", "1"],
  ["11", "ARMBOUTS CAPPEL US", "07/12/2025", "true", "avenir", "0", "0"],
  ["12", "MONTS DE FLANDRE US 2", "14/12/2025", "false", "avenir", "0", "0"],
  ["13", "BAILLEUL FC 2", "11/01/2026", "true", "avenir", "0", "0"],
  ["14", "BOLLEZEELE AS 2", "18/01/2026", "false", "avenir", "0", "0"],
  ["15", "CAESTRE US", "25/01/2026", "true", "avenir", "0", "0"],
  ["16", "EECKE", "01/02/2026", "false", "avenir", "0", "0"],
  ["17", "HAZEBROUCK RC 4", "08/02/2026", "true", "avenir", "0", "0"],
  ["18", "CASSEL", "15/02/2026", "false", "avenir", "0", "0"]
];

const notesData = [
  ["1", "1", "7"], ["2", "1", "8"], ["3", "1", "7"], ["4", "1", "7.5"], ["5", "1", "6.5"],
  ["6", "1", "7"], ["7", "1", "6"], ["8", "1", "8"], ["9", "1", "7.5"], ["10", "1", "7"], ["11", "1", "6.5"],
  ["1", "2", "8"], ["2", "2", "7.5"], ["3", "2", "8"], ["4", "2", "8.5"], ["5", "2", "7"],
  ["6", "2", "8"], ["7", "2", "7"], ["8", "2", "9"], ["9", "2", "8"], ["10", "2", "8"], ["11", "2", "7"],
  ["1", "3", "5"], ["2", "3", "6"], ["3", "3", "5.5"], ["4", "3", "5"], ["5", "3", "5"],
  ["6", "3", "6"], ["7", "3", "5"], ["8", "3", "6"], ["9", "3", "5.5"], ["10", "3", "5"], ["11", "3", "5"],
  ["1", "4", "8.5"], ["2", "4", "9"], ["3", "4", "8"], ["4", "4", "9"], ["5", "4", "8"],
  ["6", "4", "8.5"], ["7", "4", "7.5"], ["8", "4", "9"], ["9", "4", "8.5"], ["10", "4", "8"], ["11", "4", "7.5"],
  ["1", "5", "7"], ["2", "5", "7.5"], ["3", "5", "7"], ["4", "5", "7"], ["5", "5", "6.5"],
  ["6", "5", "7"], ["7", "5", "6.5"], ["8", "5", "7.5"], ["9", "5", "7"], ["10", "5", "7"], ["11", "5", "6.5"],
  ["1", "6", "8"], ["2", "6", "8.5"], ["3", "6", "8"], ["4", "6", "8.5"], ["5", "6", "7.5"],
  ["6", "6", "8"], ["7", "6", "7"], ["8", "6", "9"], ["9", "6", "8"], ["10", "6", "8"], ["11", "6", "7.5"],
  ["1", "7", "6"], ["2", "7", "6.5"], ["3", "7", "6"], ["4", "7", "6"], ["5", "7", "5.5"],
  ["6", "7", "6"], ["7", "7", "5.5"], ["8", "7", "6.5"], ["9", "7", "6"], ["10", "7", "6"], ["11", "7", "5.5"],
  ["1", "8", "8.5"], ["2", "8", "9"], ["3", "8", "8.5"], ["4", "8", "9"], ["5", "8", "8"],
  ["6", "8", "8.5"], ["7", "8", "8"], ["8", "8", "9.5"], ["9", "8", "9"], ["10", "8", "8.5"], ["11", "8", "8"],
  ["1", "9", "7.5"], ["2", "9", "8"], ["3", "9", "7.5"], ["4", "9", "8"], ["5", "9", "7"],
  ["6", "9", "7.5"], ["7", "9", "7"], ["8", "9", "8"], ["9", "9", "7.5"], ["10", "9", "7.5"], ["11", "9", "7"],
  ["1", "10", "8"], ["2", "10", "8.5"], ["3", "10", "8"], ["4", "10", "8.5"], ["5", "10", "7.5"],
  ["6", "10", "8"], ["7", "10", "7.5"], ["8", "10", "9"], ["9", "10", "8"], ["10", "10", "8"], ["11", "10", "7.5"]
];

const buteursData = [
  ["2", "1", "1"], ["4", "1", "2"],
  ["3", "2", "1"], ["4", "2", "2"], ["9", "2", "1"],
  ["3", "3", "1"],
  ["2", "4", "2"], ["3", "4", "3"], ["4", "4", "2"],
  ["3", "5", "1"], ["4", "5", "1"],
  ["2", "6", "1"], ["3", "6", "2"], ["9", "6", "1"],
  ["3", "7", "2"], ["4", "7", "1"], ["9", "7", "1"],
  ["2", "8", "1"], ["3", "8", "2"], ["4", "8", "2"],
  ["2", "9", "2"], ["3", "9", "2"], ["4", "9", "1"],
  ["2", "10", "2"], ["3", "10", "3"], ["4", "10", "1"]
];

const tempsDeJeuData = [
  ["1", "1", "90"], ["2", "1", "90"], ["3", "1", "90"], ["4", "1", "90"], ["5", "1", "90"],
  ["6", "1", "90"], ["7", "1", "60"], ["8", "1", "30"], ["9", "1", "90"], ["10", "1", "90"], ["11", "1", "90"],
  ["1", "2", "90"], ["2", "2", "90"], ["3", "2", "90"], ["4", "2", "90"], ["5", "2", "90"],
  ["6", "2", "90"], ["7", "2", "60"], ["8", "2", "30"], ["9", "2", "90"], ["10", "2", "90"], ["11", "2", "90"],
  ["1", "3", "90"], ["2", "3", "90"], ["3", "3", "90"], ["4", "3", "90"], ["5", "3", "90"],
  ["6", "3", "90"], ["7", "3", "60"], ["8", "3", "30"], ["9", "3", "90"], ["10", "3", "90"], ["11", "3", "90"],
  ["1", "4", "90"], ["2", "4", "90"], ["3", "4", "90"], ["4", "4", "90"], ["5", "4", "90"],
  ["6", "4", "90"], ["7", "4", "60"], ["8", "4", "30"], ["9", "4", "90"], ["10", "4", "90"], ["11", "4", "90"],
  ["1", "5", "90"], ["2", "5", "90"], ["3", "5", "90"], ["4", "5", "90"], ["5", "5", "90"],
  ["6", "5", "90"], ["7", "5", "60"], ["8", "5", "30"], ["9", "5", "90"], ["10", "5", "90"], ["11", "5", "90"],
  ["1", "6", "90"], ["2", "6", "90"], ["3", "6", "90"], ["4", "6", "90"], ["5", "6", "90"],
  ["6", "6", "90"], ["7", "6", "60"], ["8", "6", "30"], ["9", "6", "90"], ["10", "6", "90"], ["11", "6", "90"],
  ["1", "7", "90"], ["2", "7", "90"], ["3", "7", "90"], ["4", "7", "90"], ["5", "7", "90"],
  ["6", "7", "90"], ["7", "7", "60"], ["8", "7", "30"], ["9", "7", "90"], ["10", "7", "90"], ["11", "7", "90"],
  ["1", "8", "90"], ["2", "8", "90"], ["3", "8", "90"], ["4", "8", "90"], ["5", "8", "90"],
  ["6", "8", "90"], ["7", "8", "60"], ["8", "8", "30"], ["9", "8", "90"], ["10", "8", "90"], ["11", "8", "90"],
  ["1", "9", "90"], ["2", "9", "90"], ["3", "9", "90"], ["4", "9", "90"], ["5", "9", "90"],
  ["6", "9", "90"], ["7", "9", "60"], ["8", "9", "30"], ["9", "9", "90"], ["10", "9", "90"], ["11", "9", "90"],
  ["1", "10", "90"], ["2", "10", "90"], ["3", "10", "90"], ["4", "10", "90"], ["5", "10", "90"],
  ["6", "10", "90"], ["7", "10", "60"], ["8", "10", "30"], ["9", "10", "90"], ["10", "10", "90"], ["11", "10", "90"]
];

const passesDData = [
  ["2", "1", "1"],
  ["3", "2", "2"], ["4", "2", "1"],
  ["2", "4", "3"], ["4", "4", "2"],
  ["2", "5", "1"],
  ["3", "6", "1"], ["4", "6", "1"],
  ["2", "7", "1"],
  ["3", "8", "2"], ["4", "8", "1"],
  ["2", "9", "2"], ["3", "9", "1"],
  ["2", "10", "3"], ["4", "10", "1"]
];

const convocationsData = [
  ["1", "1", "true"], ["2", "1", "true"], ["3", "1", "true"], ["4", "1", "true"], ["5", "1", "true"],
  ["6", "1", "true"], ["7", "1", "true"], ["8", "1", "true"], ["9", "1", "true"], ["10", "1", "true"], ["11", "1", "true"],
  ["1", "2", "true"], ["2", "2", "true"], ["3", "2", "true"], ["4", "2", "true"], ["5", "2", "true"],
  ["6", "2", "true"], ["7", "2", "true"], ["8", "2", "true"], ["9", "2", "true"], ["10", "2", "true"], ["11", "2", "true"],
  ["1", "3", "true"], ["2", "3", "true"], ["3", "3", "true"], ["4", "3", "true"], ["5", "3", "true"],
  ["6", "3", "true"], ["7", "3", "true"], ["8", "3", "true"], ["9", "3", "true"], ["10", "3", "true"], ["11", "3", "true"],
  ["1", "4", "true"], ["2", "4", "true"], ["3", "4", "true"], ["4", "4", "true"], ["5", "4", "true"],
  ["6", "4", "true"], ["7", "4", "true"], ["8", "4", "true"], ["9", "4", "true"], ["10", "4", "true"], ["11", "4", "true"],
  ["1", "5", "true"], ["2", "5", "true"], ["3", "5", "true"], ["4", "5", "true"], ["5", "5", "true"],
  ["6", "5", "true"], ["7", "5", "true"], ["8", "5", "true"], ["9", "5", "true"], ["10", "5", "true"], ["11", "5", "true"],
  ["1", "6", "true"], ["2", "6", "true"], ["3", "6", "true"], ["4", "6", "true"], ["5", "6", "true"],
  ["6", "6", "true"], ["7", "6", "true"], ["8", "6", "true"], ["9", "6", "true"], ["10", "6", "true"], ["11", "6", "true"],
  ["1", "7", "true"], ["2", "7", "true"], ["3", "7", "true"], ["4", "7", "true"], ["5", "7", "true"],
  ["6", "7", "true"], ["7", "7", "true"], ["8", "7", "true"], ["9", "7", "true"], ["10", "7", "true"], ["11", "7", "true"],
  ["1", "8", "true"], ["2", "8", "true"], ["3", "8", "true"], ["4", "8", "true"], ["5", "8", "true"],
  ["6", "8", "true"], ["7", "8", "true"], ["8", "8", "true"], ["9", "8", "true"], ["10", "8", "true"], ["11", "8", "true"],
  ["1", "9", "true"], ["2", "9", "true"], ["3", "9", "true"], ["4", "9", "true"], ["5", "9", "true"],
  ["6", "9", "true"], ["7", "9", "true"], ["8", "9", "true"], ["9", "9", "true"], ["10", "9", "true"], ["11", "9", "true"],
  ["1", "10", "true"], ["2", "10", "true"], ["3", "10", "true"], ["4", "10", "true"], ["5", "10", "true"],
  ["6", "10", "true"], ["7", "10", "true"], ["8", "10", "true"], ["9", "10", "true"], ["10", "10", "true"], ["11", "10", "true"]
];

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function restaurerDonnees() {
  try {
    console.log('🔄 DÉBUT DE LA RESTAURATION FIREBASE\n');

    // 1. MATCHS
    console.log('📋 Restauration des matchs...');
    for (const row of matchsData) {
      try {
        await setDoc(doc(db, 'matchs', row[0]), {
          id: row[0],
          adversaire: row[1],
          date: convertirDateEnISO(row[2]),
          domicile: row[3] === 'true',
          statut: row[4],
          scoreEquipe: parseInt(row[5]),
          scoreAdversaire: parseInt(row[6])
        });
        await delay(100); // Délai pour éviter la saturation
      } catch (error) {
        console.error(`❌ Erreur match ${row[0]}:`, error.message);
      }
    }
    console.log(`✅ ${matchsData.length} matchs restaurés\n`);

    // 2. NOTES
    console.log('📝 Restauration des notes...');
    for (const row of notesData) {
      try {
        await setDoc(doc(db, 'notes', `note_${row[0]}_${row[1]}`), {
          id_joueur: row[0],
          id_match: row[1],
          note: parseFloat(row[2])
        });
        await delay(50);
      } catch (error) {
        console.error(`❌ Erreur note ${row[0]}_${row[1]}:`, error.message);
      }
    }
    console.log(`✅ ${notesData.length} notes restaurées\n`);

    // 3. BUTEURS
    console.log('⚽ Restauration des buteurs...');
    for (const row of buteursData) {
      try {
        await setDoc(doc(db, 'buteurs', `buteur_${row[0]}_${row[1]}`), {
          id_joueur: row[0],
          id_match: row[1],
          nombre_de_buts: parseInt(row[2])
        });
        await delay(50);
      } catch (error) {
        console.error(`❌ Erreur buteur ${row[0]}_${row[1]}:`, error.message);
      }
    }
    console.log(`✅ ${buteursData.length} buteurs restaurés\n`);

    // 4. TEMPS DE JEU
    console.log('⏱️  Restauration du temps de jeu...');
    for (const row of tempsDeJeuData) {
      try {
        await setDoc(doc(db, 'temps_de_jeu', `temps_${row[0]}_${row[1]}`), {
          id_joueur: row[0],
          id_match: row[1],
          minutes_jouees: parseInt(row[2])
        });
        await delay(50);
      } catch (error) {
        console.error(`❌ Erreur temps ${row[0]}_${row[1]}:`, error.message);
      }
    }
    console.log(`✅ ${tempsDeJeuData.length} temps de jeu restaurés\n`);

    // 5. PASSES D
    console.log('🎯 Restauration des passes décisives...');
    for (const row of passesDData) {
      try {
        await setDoc(doc(db, 'passes_d', `passe_${row[0]}_${row[1]}`), {
          id_joueur: row[0],
          id_match: row[1],
          nombre_passes_d: parseInt(row[2])
        });
        await delay(50);
      } catch (error) {
        console.error(`❌ Erreur passe ${row[0]}_${row[1]}:`, error.message);
      }
    }
    console.log(`✅ ${passesDData.length} passes décisives restaurées\n`);

    // 6. CONVOCATIONS
    console.log('📢 Restauration des convocations...');
    for (const row of convocationsData) {
      try {
        await setDoc(doc(db, 'convocations', `convoc_${row[0]}_${row[1]}`), {
          id_joueur: row[0],
          id_match: row[1],
          est_convoque: row[2] === 'true'
        });
        await delay(50);
      } catch (error) {
        console.error(`❌ Erreur convocation ${row[0]}_${row[1]}:`, error.message);
      }
    }
    console.log(`✅ ${convocationsData.length} convocations restaurées\n`);

    console.log('\n✅ ✅ ✅ RESTAURATION TERMINÉE AVEC SUCCÈS ! ✅ ✅ ✅');
    console.log('\nRécapitulatif :');
    console.log(`- ${matchsData.length} matchs`);
    console.log(`- ${notesData.length} notes`);
    console.log(`- ${buteursData.length} buteurs`);
    console.log(`- ${tempsDeJeuData.length} temps de jeu`);
    console.log(`- ${passesDData.length} passes décisives`);
    console.log(`- ${convocationsData.length} convocations`);
    console.log('\n⚠️  N\'OUBLIEZ PAS de réactiver l\'auto-save dans useFirestore.js !');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERREUR LORS DE LA RESTAURATION:', error);
    process.exit(1);
  }
}

restaurerDonnees();
