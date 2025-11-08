import React from 'react';
import { getCouleurNote } from '../../utils/colors';
import { getMoyenneJoueur } from '../../utils/playerActions';
import { getTotalButs, getTotalTemps, getTotalPasses } from '../../utils/statsCalculator';

const JoueursList = ({ joueurs, notes, convocations, buteurs, tempsDeJeu, passesD }) => {
  // Fonction pour calculer le score de classement d'un joueur
  const calculerScore = (joueur) => {
    const moyenne = getMoyenneJoueur(notes, joueur.id);
    if (moyenne === '-') return -1; // Les joueurs sans notes seront en dernier

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
      return (noteFloat * 0.6) + (noteTempsSur10 * 0.4);
    }

    // Formule joueur normal : Note 50% + Buts 20% + Passes D 15% + Temps 15%
    return (noteFloat * 0.5) + (totalButs * 0.2) + (totalPasses * 0.15) + (noteTempsSur10 * 0.15);
  };

  // Trier les joueurs par score décroissant (du meilleur au moins bon)
  const joueursTries = [...joueurs].sort((a, b) => calculerScore(b) - calculerScore(a));

  return (
    <div style={{display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
      {joueursTries.map(joueur => {
        const moyenne = getMoyenneJoueur(notes, joueur.id);
        const nbConvocs = convocations.filter(c => c.id_joueur === joueur.id && c.est_convoque).length;
        const totalButs = getTotalButs(buteurs, joueur.id);
        const totalTemps = getTotalTemps(tempsDeJeu, joueur.id);
        const totalPasses = getTotalPasses(passesD, joueur.id);
        const notesJoueur = notes.filter(n => n.id_joueur === joueur.id && n.note);

        return (
          <div key={joueur.id} style={{background: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
            <div style={{marginBottom: '0.75rem'}}>
              <div style={{marginBottom: '0.5rem'}}>
                <h3 style={{fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937', margin: 0}}>{joueur.nom}</h3>
                <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>@{joueur.username}</p>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '0.75rem'}}>
                <div style={{textAlign: 'center', background: '#fff7ed', padding: '0.75rem', borderRadius: '0.5rem'}}>
                  <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Moyenne</p>
                  <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: moyenne !== '-' ? getCouleurNote(parseFloat(moyenne)).bg : '#ff8800', margin: 0}}>
                    {moyenne !== '-' ? `${getCouleurNote(parseFloat(moyenne)).emoji} ${moyenne}` : moyenne}
                  </p>
                </div>
                <div style={{textAlign: 'center', background: '#fff7ed', padding: '0.75rem', borderRadius: '0.5rem'}}>
                  <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Buts</p>
                  <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff8800', margin: 0}}>{totalButs}</p>
                </div>
                <div style={{textAlign: 'center', background: '#f3f4f6', padding: '0.75rem', borderRadius: '0.5rem'}}>
                  <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Temps (min)</p>
                  <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>{totalTemps}</p>
                </div>
                <div style={{textAlign: 'center', background: '#dbeafe', padding: '0.75rem', borderRadius: '0.5rem'}}>
                  <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Passes D</p>
                  <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af', margin: 0}}>{totalPasses}</p>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.5rem', fontSize: '0.875rem', flexWrap: 'wrap'}}>
              <div style={{background: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '9999px'}}>
                <span style={{color: '#1f2937', fontWeight: '600'}}>{notesJoueur.length} matchs</span>
              </div>
              <div style={{background: '#fff7ed', padding: '0.25rem 0.75rem', borderRadius: '9999px'}}>
                <span style={{color: '#9a3412', fontWeight: '600'}}>{nbConvocs} convocs</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JoueursList;