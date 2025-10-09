import { useState } from 'react';

const useMatchManagement = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [matchToPlay, setMatchToPlay] = useState(null);
  const [scoreEquipeInput, setScoreEquipeInput] = useState('');
  const [scoreAdversaireInput, setScoreAdversaireInput] = useState('');

  const marquerCommeJoue = (matchId, matchs) => {
    const match = matchs.find(m => m.id === matchId);
    setMatchToPlay(match);
    setScoreEquipeInput('');
    setScoreAdversaireInput('');
    setShowScoreModal(true);
  };

  const confirmerScoreEtJouer = (matchs, setMatchs, showNotification) => {
    if (scoreEquipeInput === '' || scoreAdversaireInput === '') {
      showNotification('Veuillez saisir les deux scores', 'error');
      return;
    }

    const newMatchs = matchs.map(m =>
      m.id === matchToPlay.id
        ? { ...m, statut: 'joue', scoreEquipe: parseInt(scoreEquipeInput), scoreAdversaire: parseInt(scoreAdversaireInput) }
        : m
    );
    setMatchs(newMatchs);
    setShowScoreModal(false);
    setMatchToPlay(null);
  };

  const repasserEnAttente = (matchId, matchs, setMatchs, notes) => {
    const hasNotes = notes.some(n => n.id_match === matchId);

    if (hasNotes) {
      const confirmer = window.confirm('ATTENTION : Ce match a déjà des notes enregistrées. Si vous le repassez en attente, les notes ne seront pas supprimées mais le match redeviendra modifiable. Continuer ?');
      if (!confirmer) return;
    }

    const newMatchs = matchs.map(m =>
      m.id === matchId
        ? { ...m, statut: 'avenir', scoreEquipe: 0, scoreAdversaire: 0 }
        : m
    );
    setMatchs(newMatchs);
  };

  return {
    selectedMatch,
    setSelectedMatch,
    showScoreModal,
    setShowScoreModal,
    matchToPlay,
    scoreEquipeInput,
    setScoreEquipeInput,
    scoreAdversaireInput,
    setScoreAdversaireInput,
    marquerCommeJoue,
    confirmerScoreEtJouer,
    repasserEnAttente
  };
};

export default useMatchManagement;