import React from 'react';
import { formaterDate } from '../../utils/dateFormatter';
import { getNoteEquipe } from '../../utils/noteCalculator';
import { getCouleurEquipe } from '../../utils/colors';
import { getMatchResultat } from '../../utils/matchHelpers';

const MatchsList = ({ matchs, notes, onSelectMatch }) => {
  return (
    <div style={{display: 'grid', gap: '1rem'}}>
      {matchs.map(match => {
        const resultat = getMatchResultat(match);

        return (
          <div key={match.id} onClick={() => onSelectMatch(match.id)} style={{background: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap'}}>
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: match.statut === 'joue' ? '#1f2937' : '#fff7ed', color: match.statut === 'joue' ? 'white' : '#ff8800'}}>
                    {match.statut === 'joue' ? 'JOUÉ' : 'À VENIR'}
                  </span>
                  {match.statut === 'joue' && resultat && (
                    <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: resultat === 'Victoire' ? '#dcfce7' : resultat === 'Défaite' ? '#fee2e2' : '#f3f4f6', color: resultat === 'Victoire' ? '#166534' : resultat === 'Défaite' ? '#dc2626' : '#6b7280'}}>
                      {resultat}
                    </span>
                  )}
                  {match.statut === 'joue' && getNoteEquipe(notes, match.id) && (
                    <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: getCouleurEquipe(getNoteEquipe(notes, match.id)).bg, color: 'white'}}>
                      {getCouleurEquipe(getNoteEquipe(notes, match.id)).emoji} Équipe: {getNoteEquipe(notes, match.id)}/10
                    </span>
                  )}
                  <span style={{fontSize: '0.875rem', color: '#6b7280'}}>{formaterDate(match.date)}</span>
                </div>
                <h3 style={{fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937', margin: 0}}>{match.adversaire}</h3>
                <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem'}}>
                  {match.domicile === 'true' ? '🏠 Domicile' : '✈️ Extérieur'}
                  {match.statut === 'joue' && ` • Score: ${match.scoreEquipe || 0} - ${match.scoreAdversaire || 0}`}
                </p>
              </div>
              <div style={{fontSize: '1.5rem', color: '#ff8800'}}>→</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchsList;