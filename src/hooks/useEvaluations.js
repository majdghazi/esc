import { useState } from 'react';
import { calculerMoyenne } from '../utils/noteCalculator';

const useEvaluations = () => {
  const [evalIsma, setEvalIsma] = useState({ entrainements: '', coaching: '', relation: '' });
  const [evalAdam, setEvalAdam] = useState({ entrainements: '', coaching: '', relation: '' });

  const loadEvaluations = (user, evaluationsCoach) => {
    if (user?.role === 'joueur' && evaluationsCoach.length > 0) {
      const evalExistanteIsma = evaluationsCoach.find(
        e => e.id_joueur === user.id && (e.id_coach === '1' || e.id_coach === 1)
      );

      if (evalExistanteIsma) {
        setEvalIsma({
          entrainements: String(evalExistanteIsma.entrainements || evalExistanteIsma.communication || ''),
          coaching: String(evalExistanteIsma.coaching || evalExistanteIsma.tactique || ''),
          relation: String(evalExistanteIsma.relation || evalExistanteIsma.respect || '')
        });
      }

      const evalExistanteAdam = evaluationsCoach.find(
        e => e.id_joueur === user.id && (e.id_coach === '27' || e.id_coach === 27)
      );

      if (evalExistanteAdam) {
        setEvalAdam({
          entrainements: String(evalExistanteAdam.entrainements || evalExistanteAdam.communication || ''),
          coaching: String(evalExistanteAdam.coaching || evalExistanteAdam.tactique || ''),
          relation: String(evalExistanteAdam.relation || evalExistanteAdam.respect || '')
        });
      }
    }
  };

  const saveEvaluationIsma = (user, evaluationsCoach, setEvaluationsCoach, showNotification) => {
    const newEvaluations = evaluationsCoach.filter(e => !(e.id_joueur === user.id && (e.id_coach === '1' || e.id_coach === 1)));
    const moyenneCalculee = calculerMoyenne(evalIsma);

    if (moyenneCalculee) {
      newEvaluations.push({
        id: Date.now().toString(),
        id_joueur: user.id,
        id_coach: 1,
        entrainements: parseFloat(evalIsma.entrainements) || 0,
        coaching: parseFloat(evalIsma.coaching) || 0,
        relation: parseFloat(evalIsma.relation) || 0,
        note_globale: parseFloat(moyenneCalculee).toFixed(1),
        derniere_modification: new Date().toISOString()
      });

      setEvaluationsCoach(newEvaluations);
      showNotification('Évaluation d\'Isma sauvegardée !', 'success');
    }
  };

  const saveEvaluationAdam = (user, evaluationsCoach, setEvaluationsCoach, showNotification) => {
    const newEvaluations = evaluationsCoach.filter(e => !(e.id_joueur === user.id && (e.id_coach === '27' || e.id_coach === 27)));
    const moyenneCalculee = calculerMoyenne(evalAdam);

    if (moyenneCalculee) {
      newEvaluations.push({
        id: Date.now().toString(),
        id_joueur: user.id,
        id_coach: 27,
        entrainements: parseFloat(evalAdam.entrainements) || 0,
        coaching: parseFloat(evalAdam.coaching) || 0,
        relation: parseFloat(evalAdam.relation) || 0,
        note_globale: parseFloat(moyenneCalculee).toFixed(1),
        derniere_modification: new Date().toISOString()
      });

      setEvaluationsCoach(newEvaluations);
      showNotification('Évaluation d\'Adam sauvegardée !', 'success');
    }
  };

  return {
    evalIsma,
    setEvalIsma,
    evalAdam,
    setEvalAdam,
    loadEvaluations,
    saveEvaluationIsma,
    saveEvaluationAdam
  };
};

export default useEvaluations;