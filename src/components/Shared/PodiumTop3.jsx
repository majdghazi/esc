import React from 'react';
import { getMoyenneJoueur } from '../../utils/playerActions';
import { getTotalButs, getTotalTemps, getTotalPasses } from '../../utils/statsCalculator';

const PodiumTop3 = ({ joueurs, notes, buteurs, tempsDeJeu, passesD }) => {
  // Fonction pour calculer le score de classement d'un joueur
  const calculerScore = (joueur) => {
    const moyenne = getMoyenneJoueur(notes, joueur.id);
    if (moyenne === '-') return null;

    const noteFloat = parseFloat(moyenne);
    const totalButs = getTotalButs(buteurs, joueur.id);
    const totalTemps = getTotalTemps(tempsDeJeu, joueur.id);
    const totalPasses = getTotalPasses(passesD, joueur.id);

    // Calculer le nombre de matchs joués par ce joueur
    const nbMatchsJoues = notes.filter(n => n.id_joueur === joueur.id && n.note).length;

    // Temps maximum possible = nombre de matchs × 90 minutes
    const tempsMaxPossible = nbMatchsJoues * 90;

    // Note temps sur 10 : (temps joué / temps max possible) × 10
    // Exemple : 318 min sur 4 matchs (360 min max) = (318/360) × 10 = 8.8/10
    const noteTempsSur10 = tempsMaxPossible > 0 ? (totalTemps / tempsMaxPossible) * 10 : 0;

    // Si c'est un gardien (role === 'gardien')
    if (joueur.role === 'gardien') {
      // Formule gardien : Note 60% + Temps 40%
      const score = (noteFloat * 0.6) + (noteTempsSur10 * 0.4);
      return score;
    }

    // Formule joueur normal : Note 50% + Buts 20% + Passes D 15% + Temps 15%
    const score = (noteFloat * 0.5) + (totalButs * 0.2) + (totalPasses * 0.15) + (noteTempsSur10 * 0.15);
    return score;
  };

  // Calculer le score et la moyenne pour chaque joueur
  const joueursAvecScore = joueurs
    .map(joueur => ({
      ...joueur,
      score: calculerScore(joueur),
      moyenne: getMoyenneJoueur(notes, joueur.id)
    }))
    .filter(j => j.score !== null)
    .sort((a, b) => b.score - a.score);

  const top3 = joueursAvecScore.slice(0, 3);

  if (top3.length === 0) {
    return (
      <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
        <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>
          🏆 Podium TOP 3 des meilleurs joueurs
        </h2>
        <div style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>
          <p>Aucune note disponible pour le moment.</p>
        </div>
      </div>
    );
  }

  const getMedalColor = (position) => {
    if (position === 0) return { bg: '#fef3c7', border: '#fbbf24', medal: '🥇' };
    if (position === 1) return { bg: '#e5e7eb', border: '#9ca3af', medal: '🥈' };
    if (position === 2) return { bg: '#fed7aa', border: '#fb923c', medal: '🥉' };
  };

  const getHeightClass = (position) => {
    if (position === 0) return '10rem';
    if (position === 1) return '8rem';
    if (position === 2) return '6rem';
  };

  return (
    <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
      <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>
        🏆 Podium TOP 3 des meilleurs joueurs
      </h2>

      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
        {/* 2ème place */}
        {top3[1] && (
          <div style={{flex: '0 1 150px', textAlign: 'center'}}>
            <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>{getMedalColor(1).medal}</div>
            <div style={{
              background: getMedalColor(1).bg,
              border: `3px solid ${getMedalColor(1).border}`,
              borderRadius: '1rem',
              padding: '1rem',
              height: getHeightClass(1),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem'}}>
                {top3[1].moyenne}
              </div>
              <div style={{fontSize: '0.875rem', color: '#6b7280', fontWeight: '600'}}>
                {top3[1].nom}
              </div>
            </div>
          </div>
        )}

        {/* 1ère place */}
        {top3[0] && (
          <div style={{flex: '0 1 150px', textAlign: 'center'}}>
            <div style={{fontSize: '4rem', marginBottom: '0.5rem'}}>{getMedalColor(0).medal}</div>
            <div style={{
              background: getMedalColor(0).bg,
              border: `3px solid ${getMedalColor(0).border}`,
              borderRadius: '1rem',
              padding: '1rem',
              height: getHeightClass(0),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem'}}>
                {top3[0].moyenne}
              </div>
              <div style={{fontSize: '0.875rem', color: '#6b7280', fontWeight: '600'}}>
                {top3[0].nom}
              </div>
            </div>
          </div>
        )}

        {/* 3ème place */}
        {top3[2] && (
          <div style={{flex: '0 1 150px', textAlign: 'center'}}>
            <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>{getMedalColor(2).medal}</div>
            <div style={{
              background: getMedalColor(2).bg,
              border: `3px solid ${getMedalColor(2).border}`,
              borderRadius: '1rem',
              padding: '1rem',
              height: getHeightClass(2),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem'}}>
                {top3[2].moyenne}
              </div>
              <div style={{fontSize: '0.875rem', color: '#6b7280', fontWeight: '600'}}>
                {top3[2].nom}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem'}}>
        Classement basé sur : Note (50%), Buts (20%), Passes D (15%), Temps de jeu (15%)
      </div>
    </div>
  );
};

export default PodiumTop3;
