import React from 'react';
import { formaterDate } from '../../utils/dateFormatter';
import { getCouleurEquipe } from '../../utils/colors';

const MatchDetail = ({
  match,
  user,
  onBack,
  onMarquerJoue,
  onRepasserAttente,
  noteEquipe,
  isNextMatch = true,
  children
}) => {
  return (
    <div style={{background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '1.5rem'}}>
      <button onClick={onBack} style={{marginBottom: '1rem', color: '#ff8800', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>
        ← Retour aux matchs
      </button>
      <div style={{marginBottom: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap'}}>
          <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: match.statut === 'joue' ? '#1f2937' : '#fff7ed', color: match.statut === 'joue' ? 'white' : '#ff8800'}}>
            {match.statut === 'joue' ? 'JOUÉ' : 'À VENIR'}
          </span>
          <span style={{color: '#6b7280'}}>{formaterDate(match.date)}</span>
        </div>
        <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>{match.adversaire}</h2>
        {match.statut === 'joue' && noteEquipe && (
          <div style={{background: getCouleurEquipe(noteEquipe).bg, color: 'white', padding: '1.5rem', borderRadius: '1rem', margin: '1.5rem 0', textAlign: 'center', boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.3)'}}>
            <div style={{fontSize: '1rem', opacity: 0.9, marginBottom: '0.5rem'}}>{getCouleurEquipe(noteEquipe).emoji} {getCouleurEquipe(noteEquipe).text}</div>
            <div style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.25rem'}}>{noteEquipe}/10</div>
            <div style={{fontSize: '0.875rem', opacity: 0.8}}>Note moyenne de l'équipe</div>
          </div>
        )}
        <p style={{color: '#6b7280', marginTop: '0.25rem'}}>
          {match.domicile ? 'Domicile' : 'Extérieur'}
          {match.statut === 'joue' && ` • Score: ${match.scoreEquipe || 0} - ${match.scoreAdversaire || 0}`}
        </p>
        {user.role === 'coach' && match.statut === 'avenir' && (
          <>
            {!isNextMatch && (
              <div style={{background: '#fef3c7', border: '2px solid #fbbf24', padding: '0.75rem', borderRadius: '0.5rem', marginTop: '1rem', fontSize: '0.875rem', color: '#92400e'}}>
                <strong>⚠️ Information :</strong> Vous devez d'abord marquer le match précédent comme joué
              </div>
            )}
            <button
              onClick={isNextMatch ? () => onMarquerJoue(match.id) : undefined}
              disabled={!isNextMatch}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: isNextMatch ? '#10b981' : '#e5e7eb',
                color: isNextMatch ? 'white' : '#9ca3af',
                border: 'none',
                cursor: isNextMatch ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: '600',
                opacity: isNextMatch ? 1 : 0.6
              }}
            >
              ✓ Marquer comme joué
            </button>
          </>
        )}
        {user.role === 'coach' && match.statut === 'joue' && (
          <button
            onClick={() => onRepasserAttente(match.id)}
            style={{marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#6b7280', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.875rem'}}
          >
            ⟲ Repasser en attente
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default MatchDetail;