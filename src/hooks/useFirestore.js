import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const useFirestore = (user) => {
  const [joueurs, setJoueurs] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [convocations, setConvocations] = useState([]);
  const [notes, setNotes] = useState([]);
  const [buteurs, setButeurs] = useState([]);
  const [tempsDeJeu, setTempsDeJeu] = useState([]);
  const [passesD, setPassesD] = useState([]);
  const [evaluationsCoach, setEvaluationsCoach] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionJoueurEnCours, setActionJoueurEnCours] = useState(false);

  const isInitialLoad = useRef(true);

  // Lire une collection Firestore
  const lireCollection = async (nomCollection) => {
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
  };

  // Écrire une collection Firestore (SAFE: sync intelligent sans suppression massive)
  const ecrireCollection = async (nomCollection, donnees) => {
    try {
      console.log(`💾 Sync ${nomCollection}: ${donnees.length} éléments`);

      // PROTECTION: Ne JAMAIS traiter un tableau vide
      if (!donnees || donnees.length === 0) {
        console.error(`⚠️ BLOQUÉ: Tentative d'écriture de ${nomCollection} vide`);
        return;
      }

      // Lire les documents existants
      const querySnapshot = await getDocs(collection(db, nomCollection));
      const existingDocs = new Map();
      querySnapshot.forEach((docSnapshot) => {
        existingDocs.set(docSnapshot.id, docSnapshot.data());
      });

      // Construire la liste des IDs actuels
      const newIds = new Set();
      const writePromises = [];

      // Écrire/Mettre à jour les documents
      donnees.forEach((item, index) => {
        const docId = item.id || item.docId || `doc_${index}`;
        newIds.add(docId);

        const docData = { ...item };
        delete docData.docId; // Nettoyer le champ docId avant l'écriture

        writePromises.push(setDoc(doc(db, nomCollection, docId), docData));
      });

      await Promise.all(writePromises);

      // Supprimer UNIQUEMENT les documents qui ne sont plus dans la nouvelle liste
      // ET seulement s'il y en a moins de 10% à supprimer (sécurité)
      const toDelete = [];
      existingDocs.forEach((_, docId) => {
        if (!newIds.has(docId)) {
          toDelete.push(docId);
        }
      });

      if (toDelete.length > 0) {
        const deleteRatio = toDelete.length / existingDocs.size;
        if (deleteRatio > 0.1) {
          console.error(`⚠️ SÉCURITÉ: Tentative de suppression de ${(deleteRatio * 100).toFixed(0)}% des docs dans ${nomCollection} - BLOQUÉ`);
        } else {
          const deletePromises = toDelete.map(docId =>
            deleteDoc(doc(db, nomCollection, docId))
          );
          await Promise.all(deletePromises);
          console.log(`🗑️  ${nomCollection}: ${toDelete.length} docs obsolètes supprimés`);
        }
      }

      console.log(`✅ ${nomCollection} synchronisé: ${donnees.length} docs`);
    } catch (error) {
      console.error(`❌ Erreur écriture ${nomCollection}:`, error);
    }
  };

  const chargerDonnees = async () => {
    setLoading(true);
    try {
      const [joueursData, matchsData, convocsData, notesData, buteursData, tempsData, passesData, evaluationsData] = await Promise.all([
        lireCollection('joueurs'),
        lireCollection('matchs'),
        lireCollection('convocations'),
        lireCollection('notes'),
        lireCollection('buteurs'),
        lireCollection('temps_de_jeu'),
        lireCollection('passes_d'),
        lireCollection('evaluations_coach')
      ]);

      console.log('📥 Données chargées depuis Firebase:', {
        joueurs: joueursData.length,
        matchs: matchsData.length,
        convocations: convocsData.length,
        notes: notesData.length,
        buteurs: buteursData.length,
        tempsDeJeu: tempsData.length,
        passesD: passesData.length,
        evaluationsCoach: evaluationsData.length
      });

      setJoueurs(joueursData);
      setMatchs(matchsData);
      setConvocations(convocsData);
      setNotes(notesData);
      setButeurs(buteursData);
      setTempsDeJeu(tempsData);
      setPassesD(passesData);
      setEvaluationsCoach(evaluationsData);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
      isInitialLoad.current = false;
    }
  };

  // Auto-save Convocations
  useEffect(() => {
    if (!isInitialLoad.current && user && convocations.length > 0) {
      if (user.role === 'coach' || user.role === 'coach_adjoint') {
        ecrireCollection('convocations', convocations); // minuscule
      } else if (user.role === 'joueur' && actionJoueurEnCours) {
        ecrireCollection('convocations', convocations); // minuscule
        setActionJoueurEnCours(false);
      }
    } else if (!isInitialLoad.current && user && convocations.length === 0) {
      console.error('⚠️ ALERTE: Tentative d\'écriture de convocations vides BLOQUÉE');
    }
  }, [convocations, user, actionJoueurEnCours]);

  // Auto-save Notes
  useEffect(() => {
    if (!isInitialLoad.current && user?.role === 'coach' && notes.length > 0) {
      ecrireCollection('notes', notes);
    } else if (!isInitialLoad.current && user?.role === 'coach' && notes.length === 0) {
      console.error('⚠️ ALERTE: Tentative d\'écriture de notes vides BLOQUÉE');
    }
  }, [notes, user]);

  // Auto-save Buteurs
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && buteurs.length > 0) {
      ecrireCollection('buteurs', buteurs);
    } else if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && buteurs.length === 0) {
      console.error('⚠️ ALERTE: Tentative d\'écriture de buteurs vides BLOQUÉE');
    }
  }, [buteurs, user]);

  // Auto-save Temps de jeu
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && tempsDeJeu.length > 0) {
      ecrireCollection('temps_de_jeu', tempsDeJeu);
    } else if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && tempsDeJeu.length === 0) {
      console.error('⚠️ ALERTE: Tentative d\'écriture de temps_de_jeu vides BLOQUÉE');
    }
  }, [tempsDeJeu, user]);

  // Auto-save Passes D
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && passesD.length > 0) {
      ecrireCollection('passes_d', passesD);
    } else if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && passesD.length === 0) {
      console.error('⚠️ ALERTE: Tentative d\'écriture de passes_d vides BLOQUÉE');
    }
  }, [passesD, user]);

  // Auto-save Matchs
  useEffect(() => {
    if (!isInitialLoad.current && user?.role === 'coach' && matchs.length > 0) {
      console.log('💾 Sauvegarde Matchs:', matchs.length, 'matchs');
      ecrireCollection('matchs', matchs);
    } else if (!isInitialLoad.current && user?.role === 'coach' && matchs.length === 0) {
      console.error('⚠️ ALERTE: Tentative d\'écriture de matchs vides BLOQUÉE');
    }
  }, [matchs, user]);

  // Auto-save Evaluations
  useEffect(() => {
    if (!isInitialLoad.current && user?.role === 'joueur' && evaluationsCoach.length > 0) {
      ecrireCollection('evaluations_coach', evaluationsCoach);
    } else if (!isInitialLoad.current && user?.role === 'joueur' && evaluationsCoach.length === 0) {
      console.error('⚠️ ALERTE: Tentative d\'écriture de evaluations_coach vides BLOQUÉE');
    }
  }, [evaluationsCoach, user]);

  return {
    joueurs,
    setJoueurs,
    matchs,
    setMatchs,
    convocations,
    setConvocations,
    notes,
    setNotes,
    buteurs,
    setButeurs,
    tempsDeJeu,
    setTempsDeJeu,
    passesD,
    setPassesD,
    evaluationsCoach,
    setEvaluationsCoach,
    loading,
    chargerDonnees,
    actionJoueurEnCours,
    setActionJoueurEnCours
  };
};

export default useFirestore;
