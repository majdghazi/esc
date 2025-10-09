import { useState, useEffect, useRef } from 'react';
import { lireGoogleSheets, ecrireGoogleSheets } from '../services/googleSheetsService';
import { demoJoueurs, demoMatchs } from '../constants/demoData';

const useGoogleSheets = (user) => {
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

  const chargerDonnees = async () => {
    setLoading(true);
    const [joueursData, matchsData, convocsData, notesData, buteursData, tempsData, passesData, evaluationsData] = await Promise.all([
      lireGoogleSheets('Joueurs'),
      lireGoogleSheets('Matchs'),
      lireGoogleSheets('Convocations'),
      lireGoogleSheets('Notes'),
      lireGoogleSheets('Buteurs'),
      lireGoogleSheets('TempsDeJeu'),
      lireGoogleSheets('PassesD'),
      lireGoogleSheets('EvaluationsCoach')
    ]);

    setJoueurs(joueursData.length > 0 ? joueursData : demoJoueurs);
    setMatchs(matchsData.length > 0 ? matchsData : demoMatchs);
    setConvocations(convocsData);
    setNotes(notesData);
    setButeurs(buteursData);
    setTempsDeJeu(tempsData);
    setPassesD(passesData);
    setEvaluationsCoach(evaluationsData);

    setLoading(false);
    isInitialLoad.current = false;
  };

  // Auto-save Convocations
  useEffect(() => {
    if (!isInitialLoad.current && user && convocations.length > 0) {
      if (user.role === 'coach' || user.role === 'coach_adjoint') {
        ecrireGoogleSheets('Convocations', convocations);
      } else if (user.role === 'joueur' && actionJoueurEnCours) {
        ecrireGoogleSheets('Convocations', convocations);
        setActionJoueurEnCours(false);
      }
    }
  }, [convocations, user, actionJoueurEnCours]);

  // Auto-save Notes
  useEffect(() => {
    if (!isInitialLoad.current && user?.role === 'coach' && notes.length > 0) {
      ecrireGoogleSheets('Notes', notes);
    }
  }, [notes, user]);

  // Auto-save Buteurs
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && buteurs.length > 0) {
      ecrireGoogleSheets('Buteurs', buteurs);
    }
  }, [buteurs, user]);

  // Auto-save Temps de jeu
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && tempsDeJeu.length > 0) {
      ecrireGoogleSheets('TempsDeJeu', tempsDeJeu);
    }
  }, [tempsDeJeu, user]);

  // Auto-save Passes D
  useEffect(() => {
    if (!isInitialLoad.current && (user?.role === 'coach' || user?.role === 'coach_adjoint') && passesD.length > 0) {
      ecrireGoogleSheets('PassesD', passesD);
    }
  }, [passesD, user]);

  // Auto-save Matchs
  useEffect(() => {
    if (!isInitialLoad.current && user?.role === 'coach' && matchs.length > 0) {
      ecrireGoogleSheets('Matchs', matchs);
    }
  }, [matchs, user]);

  // Auto-save Evaluations
  useEffect(() => {
    if (!isInitialLoad.current && user?.role === 'joueur' && evaluationsCoach.length > 0) {
      ecrireGoogleSheets('EvaluationsCoach', evaluationsCoach);
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

export default useGoogleSheets;