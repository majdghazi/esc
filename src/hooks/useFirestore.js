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

  // Écrire une collection Firestore (remplacement complet)
  const ecrireCollection = async (nomCollection, donnees) => {
    try {
      // Supprimer tous les documents existants
      const querySnapshot = await getDocs(collection(db, nomCollection));
      const deletePromises = [];
      querySnapshot.forEach((docSnapshot) => {
        deletePromises.push(deleteDoc(doc(db, nomCollection, docSnapshot.id)));
      });
      await Promise.all(deletePromises);

      // Ajouter les nouvelles données
      const writePromises = [];
      donnees.forEach((item, index) => {
        const docId = item.id || item.docId || `doc_${index}`;
        const docData = { ...item };
        delete docData.docId; // Nettoyer le champ docId avant l'écriture
        writePromises.push(setDoc(doc(db, nomCollection, docId), docData));
      });
      await Promise.all(writePromises);
    } catch (error) {
      console.error(`Erreur écriture ${nomCollection}:`, error);
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
    }
  }, [convocations, user, actionJoueurEnCours]);

  // Auto-save Notes
  useEffect(() => {
    if (!isInitialLoad.current && user?.role === 'coach' && notes.length > 0) {
      ecrireCollection('notes', notes);
    }
  }, [notes, user]);

  // Auto-save Buteurs
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && buteurs.length > 0) {
      ecrireCollection('buteurs', buteurs);
    }
  }, [buteurs, user]);

  // Auto-save Temps de jeu
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && tempsDeJeu.length > 0) {
      ecrireCollection('temps_de_jeu', tempsDeJeu);
    }
  }, [tempsDeJeu, user]);

  // Auto-save Passes D
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && passesD.length > 0) {
      ecrireCollection('passes_d', passesD);
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
