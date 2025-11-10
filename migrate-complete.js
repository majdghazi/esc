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

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// DONNÉES JOUEURS (27 joueurs + users)
const joueursData = [
  {id: "1", nom: "Isma", username: "Isma", password: "Imna0305", role: "coach"},
  {id: "2", nom: "Hicham", username: "Hicham", password: "Majd0303", role: "joueur"},
  {id: "3", nom: "Allan D", username: "AllanD", password: "Cappelle5678", role: "joueur"},
  {id: "4", nom: "Allan T", username: "AllanT", password: "Cappelle9012", role: "joueur"},
  {id: "5", nom: "Babak", username: "Babak", password: "Cappelle3456", role: "joueur"},
  {id: "6", nom: "Ben", username: "Ben", password: "Cappelle7890", role: "gardien"},
  {id: "7", nom: "Bob", username: "Bob", password: "Cappelle2345", role: "joueur"},
  {id: "8", nom: "Chico", username: "Chico", password: "Cappelle6789", role: "joueur"},
  {id: "9", nom: "Christopher", username: "Christopher", password: "Cappelle0123", role: "joueur"},
  {id: "10", nom: "Iheb", username: "Iheb", password: "Cappelle4567", role: "joueur"},
  {id: "11", nom: "Jason", username: "Jason", password: "Cappelle8901", role: "joueur"},
  {id: "12", nom: "Jordan", username: "Jordan", password: "Cappelle2346", role: "joueur"},
  {id: "13", nom: "Kevin", username: "Kevin", password: "Cappelle6780", role: "joueur"},
  {id: "14", nom: "Lionel", username: "Lionel", password: "Cappelle0124", role: "joueur"},
  {id: "15", nom: "Ludovic", username: "Ludovic", password: "Cappelle4568", role: "joueur"},
  {id: "16", nom: "Mathis", username: "Mathis", password: "Cappelle8902", role: "joueur"},
  {id: "17", nom: "Mohamed", username: "Mohamed", password: "Cappelle2347", role: "joueur"},
  {id: "18", nom: "Nolan", username: "Nolan", password: "Cappelle6781", role: "joueur"},
  {id: "19", nom: "Pierre", username: "Pierre", password: "Cappelle0125", role: "joueur"},
  {id: "20", nom: "Ringo", username: "Ringo", password: "Cappelle4569", role: "joueur"},
  {id: "21", nom: "Ryan", username: "Ryan", password: "Cappelle8903", role: "joueur"},
  {id: "22", nom: "Sanchez", username: "Sanchez", password: "Cappelle2348", role: "joueur"},
  {id: "23", nom: "Thomas", username: "Thomas", password: "Cappelle6782", role: "joueur"},
  {id: "24", nom: "Tonio", username: "Tonio", password: "Cappelle0126", role: "joueur"},
  {id: "25", nom: "Zak", username: "Zak", password: "Cappelle4570", role: "joueur"},
  {id: "26", nom: "AllanG", username: "AllanG", password: "Cappelle1177", role: "joueur"},
  {id: "27", nom: "Adam", username: "Adam", password: "Cappelle0404", role: "coach_adjoint"}
];

// DONNÉES MATCHS (18 matchs)
const matchsData = [
  {id: "1", date: "2025-09-06T22:00:00.000Z", adversaire: "ARMBOUTS CAPPEL US", domicile: false, statut: "joue", scoreEquipe: 5, scoreAdversaire: 1},
  {id: "2", date: "2025-09-20T22:00:00.000Z", adversaire: "MONTS DE FLANDRE US 2", domicile: true, statut: "joue", scoreEquipe: 6, scoreAdversaire: 2},
  {id: "3", date: "2025-10-04T22:00:00.000Z", adversaire: "DUNKERQUE USL 3", domicile: false, statut: "joue", scoreEquipe: 0, scoreAdversaire: 6},
  {id: "4", date: "2025-10-18T22:00:00.000Z", adversaire: "WALLON CAPPEL US", domicile: true, statut: "joue", scoreEquipe: 0, scoreAdversaire: 3},
  {id: "5", date: "2025-11-01T23:00:00.000Z", adversaire: "HAZEBROUCK AS CHTS", domicile: false, statut: "joue", scoreEquipe: 0, scoreAdversaire: 13},
  {id: "6", date: "2025-11-08T23:00:00.000Z", adversaire: "LEFFRINCKOUCKE US 2", domicile: true, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "7", date: "2025-11-22T23:00:00.000Z", adversaire: "BOURBOURG SC 2", domicile: false, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "8", date: "2025-12-06T23:00:00.000Z", adversaire: "PONT DE NIEPPE AS", domicile: false, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "9", date: "2025-12-13T23:00:00.000Z", adversaire: "STEENE FC", domicile: true, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "10", date: "2026-02-07T23:00:00.000Z", adversaire: "STEENE FC", domicile: false, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "11", date: "2026-02-14T23:00:00.000Z", adversaire: "ARMBOUTS CAPPEL US", domicile: true, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "12", date: "2026-02-21T23:00:00.000Z", adversaire: "MONTS DE FLANDRE US 2", domicile: false, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "13", date: "2026-03-07T23:00:00.000Z", adversaire: "DUNKERQUE USL 3", domicile: true, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "14", date: "2026-03-14T23:00:00.000Z", adversaire: "WALLON CAPPEL US", domicile: false, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "15", date: "2026-04-11T22:00:00.000Z", adversaire: "LEFFRINCKOUCKE US 2", domicile: true, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "16", date: "2026-04-25T22:00:00.000Z", adversaire: "PONT DE NIEPPE AS", domicile: true, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "17", date: "2026-05-09T22:00:00.000Z", adversaire: "HAZEBROUCK AS CHTS", domicile: true, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0},
  {id: "18", date: "2026-05-16T22:00:00.000Z", adversaire: "BOURBOURG SC 2", domicile: true, statut: "avenir", scoreEquipe: 0, scoreAdversaire: 0}
];

// CONVOCATIONS
const convocationsData = [
  {id_match: "1", id_joueur: "6", est_convoque: true, statut: "en_attente", coach_a_envoye: true},
  {id_match: "1", id_joueur: "7", est_convoque: true, statut: "en_attente", coach_a_envoye: true},
  {id_match: "1", id_joueur: "19", est_convoque: true, statut: "en_attente", coach_a_envoye: true},
  {id_match: "1", id_joueur: "20", est_convoque: true, statut: "en_attente", coach_a_envoye: true},
  {id_match: "1", id_joueur: "9", est_convoque: true, statut: "en_attente"},
  {id_match: "1", id_joueur: "13", est_convoque: true, statut: "en_attente"},
  {id_match: "1", id_joueur: "11", est_convoque: true, statut: "en_attente"},
  {id_match: "1", id_joueur: "4", est_convoque: true, statut: "en_attente"},
  {id_match: "1", id_joueur: "3", est_convoque: true, statut: "en_attente"},
  {id_match: "1", id_joueur: "2", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "6", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "7", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "20", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "9", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "25", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "11", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "10", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "5", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "2", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "4", est_convoque: true, statut: "en_attente"},
  {id_match: "2", id_joueur: "8", est_convoque: true, statut: "en_attente"},
  {id_match: "3", id_joueur: "5", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "6", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "7", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "8", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "9", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "10", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "20", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "2", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "11", est_convoque: true, statut: "accepte"},
  {id_match: "3", id_joueur: "26", est_convoque: true, statut: "en_attente"},
  {id_match: "4", id_joueur: "2", est_convoque: true, statut: "accepte"},
  {id_match: "4", id_joueur: "5", est_convoque: true, statut: "en_attente"},
  {id_match: "4", id_joueur: "6", est_convoque: true, statut: "accepte"},
  {id_match: "4", id_joueur: "7", est_convoque: true, statut: "accepte"},
  {id_match: "4", id_joueur: "9", est_convoque: true, statut: "accepte"},
  {id_match: "4", id_joueur: "10", est_convoque: true, statut: "accepte"},
  {id_match: "4", id_joueur: "16", est_convoque: true, statut: "accepte"},
  {id_match: "4", id_joueur: "20", est_convoque: true, statut: "accepte"},
  {id_match: "4", id_joueur: "26", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "5", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "6", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "8", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "9", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "10", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "11", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "16", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "19", est_convoque: true, statut: "en_attente"},
  {id_match: "5", id_joueur: "20", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "18", est_convoque: true, statut: "accepte"},
  {id_match: "5", id_joueur: "21", est_convoque: true, statut: "accepte"},
  {id_match: "6", id_joueur: "9", est_convoque: true, statut: "en_attente"},
  {id_match: "6", id_joueur: "11", est_convoque: true, statut: "accepte"},
  {id_match: "6", id_joueur: "16", est_convoque: true, statut: "accepte"},
  {id_match: "6", id_joueur: "20", est_convoque: true, statut: "accepte"},
  {id_match: "6", id_joueur: "24", est_convoque: true, statut: "en_attente"},
  {id_match: "6", id_joueur: "26", est_convoque: true, statut: "accepte"},
  {id_match: "6", id_joueur: "8", est_convoque: true, statut: "en_attente"},
  {id_match: "6", id_joueur: "19", est_convoque: true, statut: "en_attente"},
  {id_match: "6", id_joueur: "18", est_convoque: true, statut: "accepte"}
];

// NOTES
const notesData = [
  {id_match: "1", id_joueur: "6", note: 8.5},
  {id_match: "1", id_joueur: "13", note: 6},
  {id_match: "1", id_joueur: "7", note: 6},
  {id_match: "1", id_joueur: "19", note: 6},
  {id_match: "1", id_joueur: "9", note: 6.5},
  {id_match: "1", id_joueur: "3", note: 5.5},
  {id_match: "1", id_joueur: "2", note: 7.5},
  {id_match: "1", id_joueur: "4", note: 6},
  {id_match: "2", id_joueur: "2", note: 8.5},
  {id_match: "2", id_joueur: "4", note: 6.5},
  {id_match: "2", id_joueur: "5", note: 6.5},
  {id_match: "2", id_joueur: "6", note: 8},
  {id_match: "2", id_joueur: "7", note: 7},
  {id_match: "2", id_joueur: "9", note: 6.5},
  {id_match: "2", id_joueur: "10", note: 8},
  {id_match: "2", id_joueur: "25", note: 5.5},
  {id_match: "2", id_joueur: "8", note: 6.5},
  {id_match: "2", id_joueur: "11", note: 7},
  {id_match: "1", id_joueur: "11", note: 7.3},
  {id_match: "3", id_joueur: "5", note: 5.5},
  {id_match: "3", id_joueur: "6", note: 6.5},
  {id_match: "3", id_joueur: "7", note: 5.5},
  {id_match: "3", id_joueur: "8", note: 5},
  {id_match: "3", id_joueur: "9", note: 6},
  {id_match: "3", id_joueur: "10", note: 5.5},
  {id_match: "3", id_joueur: "11", note: 5.5},
  {id_match: "3", id_joueur: "20", note: 5.5},
  {id_match: "3", id_joueur: "26", note: 5},
  {id_match: "3", id_joueur: "2", note: 6},
  {id_match: "4", id_joueur: "10", note: 5},
  {id_match: "4", id_joueur: "16", note: 5.5},
  {id_match: "4", id_joueur: "20", note: 5},
  {id_match: "4", id_joueur: "9", note: 6},
  {id_match: "4", id_joueur: "7", note: 5},
  {id_match: "4", id_joueur: "2", note: 6.5},
  {id_match: "4", id_joueur: "5", note: 5},
  {id_match: "4", id_joueur: "6", note: 7.5},
  {id_match: "4", id_joueur: "26", note: 6},
  {id_match: "5", id_joueur: "19", note: 4},
  {id_match: "5", id_joueur: "16", note: 4.5},
  {id_match: "5", id_joueur: "18", note: 4},
  {id_match: "5", id_joueur: "10", note: 3},
  {id_match: "5", id_joueur: "9", note: 5},
  {id_match: "5", id_joueur: "8", note: 2.5},
  {id_match: "5", id_joueur: "6", note: 7},
  {id_match: "5", id_joueur: "5", note: 3},
  {id_match: "5", id_joueur: "20", note: 5.5},
  {id_match: "5", id_joueur: "11", note: 4},
  {id_match: "2", id_joueur: "20", note: 6.5},
  {id_match: "1", id_joueur: "20", note: 6}
];

// BUTEURS
const buteursData = [
  {id_match: "1", id_joueur: "9", nombre_de_buts: 1},
  {id_match: "2", id_joueur: "2", nombre_de_buts: 1},
  {id_match: "2", id_joueur: "4", nombre_de_buts: 1},
  {id_match: "1", id_joueur: "2", nombre_de_buts: 2},
  {id_match: "1", id_joueur: "20", nombre_de_buts: 1}
];

// TEMPS DE JEU
const tempsDeJeuData = [
  {id_match: "1", id_joueur: "6", minutes_jouees: 90},
  {id_match: "1", id_joueur: "13", minutes_jouees: 60},
  {id_match: "1", id_joueur: "7", minutes_jouees: 60},
  {id_match: "1", id_joueur: "19", minutes_jouees: 90},
  {id_match: "1", id_joueur: "9", minutes_jouees: 90},
  {id_match: "1", id_joueur: "3", minutes_jouees: 45},
  {id_match: "1", id_joueur: "4", minutes_jouees: 60},
  {id_match: "2", id_joueur: "2", minutes_jouees: 90},
  {id_match: "2", id_joueur: "4", minutes_jouees: 65},
  {id_match: "2", id_joueur: "5", minutes_jouees: 90},
  {id_match: "2", id_joueur: "6", minutes_jouees: 90},
  {id_match: "2", id_joueur: "7", minutes_jouees: 90},
  {id_match: "2", id_joueur: "9", minutes_jouees: 90},
  {id_match: "2", id_joueur: "10", minutes_jouees: 90},
  {id_match: "2", id_joueur: "25", minutes_jouees: 45},
  {id_match: "2", id_joueur: "8", minutes_jouees: 45},
  {id_match: "2", id_joueur: "11", minutes_jouees: 45},
  {id_match: "1", id_joueur: "11", minutes_jouees: 70},
  {id_match: "1", id_joueur: "2", minutes_jouees: 70},
  {id_match: "3", id_joueur: "5", minutes_jouees: 35},
  {id_match: "3", id_joueur: "6", minutes_jouees: 90},
  {id_match: "3", id_joueur: "7", minutes_jouees: 60},
  {id_match: "3", id_joueur: "8", minutes_jouees: 30},
  {id_match: "3", id_joueur: "9", minutes_jouees: 90},
  {id_match: "3", id_joueur: "10", minutes_jouees: 70},
  {id_match: "3", id_joueur: "11", minutes_jouees: 70},
  {id_match: "3", id_joueur: "20", minutes_jouees: 90},
  {id_match: "3", id_joueur: "26", minutes_jouees: 30},
  {id_match: "3", id_joueur: "2", minutes_jouees: 83},
  {id_match: "4", id_joueur: "10", minutes_jouees: 60},
  {id_match: "4", id_joueur: "16", minutes_jouees: 30},
  {id_match: "4", id_joueur: "20", minutes_jouees: 90},
  {id_match: "4", id_joueur: "9", minutes_jouees: 90},
  {id_match: "4", id_joueur: "7", minutes_jouees: 90},
  {id_match: "4", id_joueur: "2", minutes_jouees: 75},
  {id_match: "4", id_joueur: "5", minutes_jouees: 45},
  {id_match: "4", id_joueur: "6", minutes_jouees: 90},
  {id_match: "4", id_joueur: "26", minutes_jouees: 45},
  {id_match: "5", id_joueur: "19", minutes_jouees: 90},
  {id_match: "5", id_joueur: "16", minutes_jouees: 90},
  {id_match: "5", id_joueur: "18", minutes_jouees: 30},
  {id_match: "5", id_joueur: "10", minutes_jouees: 90},
  {id_match: "5", id_joueur: "9", minutes_jouees: 90},
  {id_match: "5", id_joueur: "8", minutes_jouees: 90},
  {id_match: "5", id_joueur: "6", minutes_jouees: 90},
  {id_match: "5", id_joueur: "5", minutes_jouees: 90},
  {id_match: "5", id_joueur: "20", minutes_jouees: 90},
  {id_match: "5", id_joueur: "11", minutes_jouees: 65},
  {id_match: "1", id_joueur: "20", minutes_jouees: 90}
];

// PASSES DÉCISIVES
const passesDData = [
  {id_match: "1", id_joueur: "9", nombre_passes_d: 1},
  {id_match: "2", id_joueur: "2", nombre_passes_d: 2},
  {id_match: "2", id_joueur: "5", nombre_passes_d: 1},
  {id_match: "2", id_joueur: "11", nombre_passes_d: 3},
  {id_match: "1", id_joueur: "11", nombre_passes_d: 2},
  {id_match: "5", id_joueur: "11", nombre_passes_d: 1},
  {id_match: "2", id_joueur: "20", nombre_passes_d: 1},
  {id_match: "1", id_joueur: "20", nombre_passes_d: 1}
];

// ÉVALUATIONS COACH
const evaluationsCoachData = [
  {id: "1759923570827", id_joueur: "2", id_coach: "1", entrainements: 8, coaching: 5.5, relation: 9, note_globale: 7.5, derniere_modification: "2025-10-08T11:39:30.827Z"},
  {id: "1759929154994", id_joueur: "7", id_coach: "1", entrainements: 8, coaching: 6.5, relation: 8, note_globale: 7.5, derniere_modification: "2025-10-08T13:12:34.994Z"},
  {id: "1759929233350", id_joueur: "6", id_coach: "1", entrainements: 7, coaching: 7, relation: 6, note_globale: 6.67, derniere_modification: "2025-10-08T13:13:53.350Z"},
  {id: "1759929259811", id_joueur: "6", id_coach: "27", entrainements: 6, coaching: 6, relation: 4, note_globale: 5.33, derniere_modification: "2025-10-08T13:14:19.811Z"},
  {id: "1759930625670", id_joueur: "21", id_coach: "1", entrainements: 8, coaching: 9, relation: 9, note_globale: 8.67, derniere_modification: "2025-10-08T13:37:05.670Z"},
  {id: "1759930633085", id_joueur: "21", id_coach: "27", entrainements: 8.5, coaching: 7, relation: 7, note_globale: 7.5, derniere_modification: "2025-10-08T13:37:13.085Z"},
  {id: "1759930738726", id_joueur: "7", id_coach: "27", entrainements: 5, coaching: 3.28, relation: 4.17, note_globale: 4.15, derniere_modification: "2025-10-08T13:38:58.726Z"},
  {id: "1759930889034", id_joueur: "9", id_coach: "1", entrainements: 8, coaching: 6.5, relation: 10, note_globale: 8.17, derniere_modification: "2025-10-08T13:41:29.034Z"},
  {id: "1759930891269", id_joueur: "9", id_coach: "27", entrainements: 8, coaching: 5.5, relation: 5, note_globale: 6.17, derniere_modification: "2025-10-08T13:41:31.269Z"},
  {id: "1759951497524", id_joueur: "25", id_coach: "1", entrainements: 8, coaching: 6, relation: 8, note_globale: 7.33, derniere_modification: "2025-10-08T19:24:57.525Z"},
  {id: "1759951526058", id_joueur: "25", id_coach: "27", entrainements: 7, coaching: 8, relation: 6, note_globale: 7, derniere_modification: "2025-10-08T19:25:26.058Z"},
  {id: "1759958542851", id_joueur: "11", id_coach: "1", entrainements: 8.5, coaching: 5.5, relation: 9, note_globale: 7.67, derniere_modification: "2025-10-08T21:22:22.851Z"},
  {id: "1761223982628", id_joueur: "20", id_coach: "27", entrainements: 7, coaching: 4, relation: 4, note_globale: 5, derniere_modification: "2025-10-23T12:53:02.628Z"},
  {id: "1761224002825", id_joueur: "20", id_coach: "1", entrainements: 8, coaching: 4, relation: 6, note_globale: 6, derniere_modification: "2025-10-23T12:53:22.825Z"},
  {id: "1762158134718", id_joueur: "11", id_coach: "27", entrainements: 7, coaching: 6, relation: 4, note_globale: 5.67, derniere_modification: "2025-11-03T08:22:14.718Z"},
  {id: "1762428998315", id_joueur: "2", id_coach: "27", entrainements: 7, coaching: 5, relation: 5, note_globale: 5.67, derniere_modification: "2025-11-06T11:36:38.315Z"}
];

async function migrerTout() {
  console.log('🚀 MIGRATION COMPLÈTE VERS FIREBASE\n');

  try {
    // 1. JOUEURS
    console.log('👤 Migration des joueurs...');
    for (const joueur of joueursData) {
      await setDoc(doc(db, 'joueurs', joueur.id), {
        id: joueur.id,
        nom: joueur.nom,
        username: joueur.username,
        password: joueur.password,
        role: joueur.role
      });
      await delay(50);
    }
    console.log(`✅ ${joueursData.length} joueurs migrés\n`);

    // 2. USERS
    console.log('🔐 Migration des users...');
    for (const user of joueursData) {
      await setDoc(doc(db, 'users', user.id), {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        nom: user.nom
      });
      await delay(50);
    }
    console.log(`✅ ${joueursData.length} users migrés\n`);

    // 3. MATCHS
    console.log('⚽ Migration des matchs...');
    for (const match of matchsData) {
      await setDoc(doc(db, 'matchs', match.id), match);
      await delay(50);
    }
    console.log(`✅ ${matchsData.length} matchs migrés\n`);

    // 4. CONVOCATIONS
    console.log('📢 Migration des convocations...');
    for (const convoc of convocationsData) {
      const docId = `convoc_${convoc.id_joueur}_${convoc.id_match}`;
      await setDoc(doc(db, 'convocations', docId), {
        id_match: convoc.id_match,
        id_joueur: convoc.id_joueur,
        est_convoque: convoc.est_convoque,
        statut: convoc.statut,
        coach_a_envoye: convoc.coach_a_envoye || false
      });
      await delay(50);
    }
    console.log(`✅ ${convocationsData.length} convocations migrées\n`);

    // 5. NOTES
    console.log('📝 Migration des notes...');
    for (const note of notesData) {
      const docId = `note_${note.id_joueur}_${note.id_match}`;
      await setDoc(doc(db, 'notes', docId), {
        id_match: note.id_match,
        id_joueur: note.id_joueur,
        note: note.note
      });
      await delay(50);
    }
    console.log(`✅ ${notesData.length} notes migrées\n`);

    // 6. BUTEURS
    console.log('⚽ Migration des buteurs...');
    for (const buteur of buteursData) {
      const docId = `buteur_${buteur.id_joueur}_${buteur.id_match}`;
      await setDoc(doc(db, 'buteurs', docId), {
        id_match: buteur.id_match,
        id_joueur: buteur.id_joueur,
        nombre_de_buts: buteur.nombre_de_buts
      });
      await delay(50);
    }
    console.log(`✅ ${buteursData.length} buteurs migrés\n`);

    // 7. TEMPS DE JEU
    console.log('⏱️  Migration du temps de jeu...');
    for (const temps of tempsDeJeuData) {
      const docId = `temps_${temps.id_joueur}_${temps.id_match}`;
      await setDoc(doc(db, 'temps_de_jeu', docId), {
        id_match: temps.id_match,
        id_joueur: temps.id_joueur,
        minutes_jouees: temps.minutes_jouees
      });
      await delay(50);
    }
    console.log(`✅ ${tempsDeJeuData.length} temps de jeu migrés\n`);

    // 8. PASSES D
    console.log('🎯 Migration des passes décisives...');
    for (const passe of passesDData) {
      const docId = `passe_${passe.id_joueur}_${passe.id_match}`;
      await setDoc(doc(db, 'passes_d', docId), {
        id_match: passe.id_match,
        id_joueur: passe.id_joueur,
        nombre_passes_d: passe.nombre_passes_d
      });
      await delay(50);
    }
    console.log(`✅ ${passesDData.length} passes décisives migrées\n`);

    // 9. ÉVALUATIONS COACH
    console.log('⭐ Migration des évaluations coach...');
    for (const evaluation of evaluationsCoachData) {
      await setDoc(doc(db, 'evaluations_coach', evaluation.id), {
        id: evaluation.id,
        id_joueur: evaluation.id_joueur,
        id_coach: evaluation.id_coach,
        entrainements: evaluation.entrainements,
        coaching: evaluation.coaching,
        relation: evaluation.relation,
        note_globale: evaluation.note_globale,
        derniere_modification: evaluation.derniere_modification
      });
      await delay(50);
    }
    console.log(`✅ ${evaluationsCoachData.length} évaluations coach migrées\n`);

    console.log('\n✅ ✅ ✅ MIGRATION COMPLÈTE TERMINÉE ! ✅ ✅ ✅\n');
    console.log('Récapitulatif :');
    console.log(`- ${joueursData.length} joueurs`);
    console.log(`- ${joueursData.length} users`);
    console.log(`- ${matchsData.length} matchs`);
    console.log(`- ${convocationsData.length} convocations`);
    console.log(`- ${notesData.length} notes`);
    console.log(`- ${buteursData.length} buteurs`);
    console.log(`- ${tempsDeJeuData.length} temps de jeu`);
    console.log(`- ${passesDData.length} passes décisives`);
    console.log(`- ${evaluationsCoachData.length} évaluations coach`);
    console.log('\n🎉 Votre base de données Firebase est maintenant complète !');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERREUR:', error);
    process.exit(1);
  }
}

migrerTout();
