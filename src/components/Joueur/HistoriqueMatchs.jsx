import React from 'react';
import { formaterDate } from '../../utils/dateFormatter';
import { getCouleurNote, getCouleurEquipe } from '../../utils/colors';
import { getNoteEquipe } from '../../utils/noteCalculator';
import { getButs, getTemps, getPasses } from '../../utils/statsCalculator';

const HistoriqueMatchs = ({ notes, matchs, buteurs, tempsDeJeu, passesD, userId }) => {
  if (notes.length === 0) {
    return (
      <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
        <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Historique</h2>
        <div style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>
          <p>Aucune note enregistrée.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
      <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Historique</h2>
      <div style={{display: 'grid', gap: '0.75rem'}}>
        {notes.sort((a, b) => b.id_match - a.id_match).map((n, idx) => {
          const match = matchs.find(m => m.id === n.id_match);
          const butsDuMatch = getButs(buteurs, match.id, userId);
          const tempsDuMatch = getTemps(tempsDeJeu, match.id, userId);
          const passesDuMatch = getPasses(passesD, match.id, userId);
          const noteEquipe = getNoteEquipe(notes, match.id);

          return (
            <div key={idx} style={{padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem'}}>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem'}}>
                    <div>
                      <p style={{fontWeight: '600', color: '#1f2937', margin: 0}}>{match?.adversaire}</p>
                      <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>
                        {formaterDate(match?.date)} • Score: {match?.scoreEquipe || 0} - {match?.scoreAdversaire || 0}
                      </p>
                    </div>
                    <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.25rem'}}>
                      {match?.scoreEquipe > match?.scoreAdversaire && (
                        <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: '#dcfce7', color: '#166534', minWidth: '85px', textAlign: 'center', display: 'inline-block'}}>
                          ✓ Victoire
                        </span>
                      )}
                      {match?.scoreEquipe < match?.scoreAdversaire && (
                        <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: '#fee2e2', color: '#dc2626', minWidth: '85px', textAlign: 'center', display: 'inline-block'}}>
                          ✗ Défaite
                        </span>
                      )}
                      {match?.scoreEquipe === match?.scoreAdversaire && (
                        <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: '#f3f4f6', color: '#6b7280', minWidth: '85px', textAlign: 'center', display: 'inline-block'}}>
                          = Nul
                        </span>
                      )}
                    </div>
                    <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
                      {match.statut === 'joue' && noteEquipe && (
                        <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: getCouleurEquipe(noteEquipe).bg, color: 'white', minWidth: '120px', textAlign: 'center', display: 'inline-block'}}>
                          {getCouleurEquipe(noteEquipe).emoji} Équipe: {noteEquipe}/10
                        </span>
                      )}
                      <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: getCouleurNote(n.note).bg, color: 'white', minWidth: '120px', textAlign: 'center', display: 'inline-block'}}>
                        {getCouleurNote(n.note).emoji} Joueur: {n.note}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {(butsDuMatch > 0 || tempsDuMatch > 0 || passesDuMatch > 0) && (
                <div style={{marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                  {butsDuMatch > 0 && (
                    <span style={{background: '#fff7ed', color: '#9a3412', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', minWidth: '75px', textAlign: 'center', display: 'inline-block'}}>
                      ⚽ {butsDuMatch} but{butsDuMatch > 1 ? 's' : ''}
                    </span>
                  )}
                  {tempsDuMatch > 0 && (
                    <span style={{background: '#f3f4f6', color: '#1f2937', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', minWidth: '75px', textAlign: 'center', display: 'inline-block'}}>
                      ⏱️ {tempsDuMatch} min
                    </span>
                  )}
                  {passesDuMatch > 0 && (
                    <span style={{background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', minWidth: '100px', textAlign: 'center', display: 'inline-block'}}>
                      🎯 {passesDuMatch} passes D
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoriqueMatchs;