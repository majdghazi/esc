import React from 'react';
import { calculerMoyenne } from '../../utils/noteCalculator';

const EvaluationCoach = ({ 
  coachNom, 
  coachId, 
  evaluation, 
  setEvaluation, 
  onSave, 
  bgColor = '#ff8800',
  borderColor = '#ff8800'
}) => {
  const moyenne = calculerMoyenne(evaluation);

  return (
    <div style={{background: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
        <div style={{fontSize: '2rem'}}>{coachId === '1' ? '⚽' : '🎯'}</div>
        <div>
          <h3 style={{fontWeight: 'bold', color: '#1f2937', margin: 0, fontSize: '1.125rem'}}>{coachNom}</h3>
          <p style={{color: '#6b7280', margin: 0, fontSize: '0.875rem'}}>
            {coachId === '1' ? 'Coach principal' : 'Coach adjoint'}
          </p>
        </div>
      </div>

      <div style={{display: 'grid', gap: '1rem'}}>
        <div style={{background: '#f9fafb', padding: '1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb'}}>
          <div style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <div style={{fontSize: '1.75rem'}}>🏋️</div>
            <div style={{flex: 1}}>
              <div style={{color: '#1f2937', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                ENTRAÎNEMENTS
              </div>
              <div style={{color: '#6b7280', fontSize: '0.7rem', marginTop: '0.125rem'}}>Organisation, pertinence, intérêt des séances</div>
            </div>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            step="0.5"
            placeholder="Note /10"
            value={evaluation.entrainements}
            onChange={(e) => setEvaluation({...evaluation, entrainements: e.target.value})}
            style={{width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold', background: '#ffffff', color: '#1f2937'}}
          />
        </div>

        <div style={{background: '#f9fafb', padding: '1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb'}}>
          <div style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <div style={{fontSize: '1.75rem'}}>⚽</div>
            <div style={{flex: 1}}>
              <div style={{color: '#1f2937', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                COACHING MATCH
              </div>
              <div style={{color: '#6b7280', fontSize: '0.7rem', marginTop: '0.125rem'}}>Tactique, changements, lecture du jeu</div>
            </div>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            step="0.5"
            placeholder="Note /10"
            value={evaluation.coaching}
            onChange={(e) => setEvaluation({...evaluation, coaching: e.target.value})}
            style={{width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold', background: '#ffffff', color: '#1f2937'}}
          />
        </div>

        <div style={{background: '#f9fafb', padding: '1.25rem', borderRadius: '0.75rem', border: '2px solid #e5e7eb'}}>
          <div style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <div style={{fontSize: '1.75rem'}}>🤝</div>
            <div style={{flex: 1}}>
              <div style={{color: '#1f2937', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                RELATION JOUEURS
              </div>
              <div style={{color: '#6b7280', fontSize: '0.7rem', marginTop: '0.125rem'}}>Communication, écoute, motivation</div>
            </div>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            step="0.5"
            placeholder="Note /10"
            value={evaluation.relation}
            onChange={(e) => setEvaluation({...evaluation, relation: e.target.value})}
            style={{width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold', background: '#ffffff', color: '#1f2937'}}
          />
        </div>

        {moyenne && (
          <div style={{background: '#1f2937', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center'}}>
            <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem'}}>
              Note globale moyenne
            </div>
            <div style={{fontSize: '4rem', fontWeight: 'bold', color: 'white', lineHeight: '1'}}>{moyenne}</div>
          </div>
        )}

        <button
          onClick={onSave}
          style={{background: '#1f2937', color: 'white', padding: '1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
        >
          Sauvegarder mes notes
        </button>
      </div>
    </div>
  );
};

export default EvaluationCoach;