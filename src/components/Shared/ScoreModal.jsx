import React from 'react';

const ScoreModal = ({ 
  show, 
  match, 
  scoreEquipe, 
  scoreAdversaire, 
  onScoreEquipeChange, 
  onScoreAdversaireChange, 
  onConfirm, 
  onCancel 
}) => {
  if (!show) return null;

  return (
    <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
      <div style={{background: 'white', borderRadius: '1rem', padding: '2rem', maxWidth: '28rem', width: '90%'}}>
        <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Match joué - Saisir le score</h3>
        <p style={{marginBottom: '1.5rem', color: '#6b7280'}}>{match?.adversaire}</p>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem'}}>
          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>ESC Cappelle</label>
            <input
              type="number"
              min="0"
              value={scoreEquipe}
              onChange={(e) => onScoreEquipeChange(e.target.value)}
              style={{width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold'}}
              placeholder="0"
            />
          </div>
          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>Adversaire</label>
            <input
              type="number"
              min="0"
              value={scoreAdversaire}
              onChange={(e) => onScoreAdversaireChange(e.target.value)}
              style={{width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold'}}
              placeholder="0"
            />
          </div>
        </div>
        
        <div style={{display: 'flex', gap: '0.75rem'}}>
          <button
            onClick={onCancel}
            style={{flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #6b7280', background: 'white', color: '#6b7280', cursor: 'pointer', fontWeight: '600'}}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            style={{flex: 1, padding: '0.75rem', borderRadius: '0.5rem', background: '#ff8800', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '600'}}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;