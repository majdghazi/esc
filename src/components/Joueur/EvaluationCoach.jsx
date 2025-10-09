import React from 'react';
import { calculerMoyenne } from '../../utils/noteCalculator';
import { getCouleurEvaluation } from '../../utils/colors';

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
    <div style={{background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', padding: '1.5rem', borderRadius: '1rem', border: `2px solid ${borderColor}`, boxShadow: `0 8px 25px rgba(255, 136, 0, 0.3)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
        <div style={{fontSize: '3rem'}}>{coachId === '1' ? '⚽' : '🎯'}</div>
        <div>
          <h3 style={{fontWeight: 'bold', color: 'white', margin: 0, fontSize: '1.25rem'}}>{coachNom}</h3>
          <p style={{color: borderColor, margin: 0, fontSize: '0.875rem'}}>
            {coachId === '1' ? 'Coach principal' : 'Coach adjoint'}
          </p>
        </div>
      </div>

      <div style={{display: 'grid', gap: '1rem'}}>
        <div style={{background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '0.75rem', border: `1px solid rgba(255, 136, 0, 0.2)`}}>
          <div style={{marginBottom: '0.75rem'}}>
            <div style={{color: 'white', fontWeight: '600', marginBottom: '0.25rem'}}>⚽️ Qualité des entraînements</div>
            <div style={{color: '#9ca3af', fontSize: '0.75rem'}}>Organisation, pertinence, intérêt des séances</div>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            step="0.5"
            placeholder="Note /10"
            value={evaluation.entrainements}
            onChange={(e) => setEvaluation({...evaluation, entrainements: e.target.value})}
            style={{width: '100%', padding: '0.75rem', border: `2px solid ${borderColor}`, borderRadius: '0.5rem', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold', background: '#1f2937', color: 'white'}}
          />
        </div>

        <div style={{background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '0.75rem', border: `1px solid rgba(255, 136, 0, 0.2)`}}>
          <div style={{marginBottom: '0.75rem'}}>
            <div style={{color: 'white', fontWeight: '600', marginBottom: '0.25rem'}}>🧠 Coaching en match</div>
            <div style={{color: '#9ca3af', fontSize: '0.75rem'}}>Tactique, changements, lecture du jeu</div>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            step="0.5"
            placeholder="Note /10"
            value={evaluation.coaching}
            onChange={(e) => setEvaluation({...evaluation, coaching: e.target.value})}
            style={{width: '100%', padding: '0.75rem', border: `2px solid ${borderColor}`, borderRadius: '0.5rem', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold', background: '#1f2937', color: 'white'}}
          />
        </div>

        <div style={{background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '0.75rem', border: `1px solid rgba(255, 136, 0, 0.2)`}}>
          <div style={{marginBottom: '0.75rem'}}>
            <div style={{color: 'white', fontWeight: '600', marginBottom: '0.25rem'}}>🤝 Relation avec les joueurs</div>
            <div style={{color: '#9ca3af', fontSize: '0.75rem'}}>Communication, écoute, motivation</div>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            step="0.5"
            placeholder="Note /10"
            value={evaluation.relation}
            onChange={(e) => setEvaluation({...evaluation, relation: e.target.value})}
            style={{width: '100%', padding: '0.75rem', border: `2px solid ${borderColor}`, borderRadius: '0.5rem', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold', background: '#1f2937', color: 'white'}}
          />
        </div>

        {moyenne && (
          <div style={{background: getCouleurEvaluation(parseFloat(moyenne)).bg, padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)', border: `2px solid ${getCouleurEvaluation(parseFloat(moyenne)).border}`}}>
            <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{getCouleurEvaluation(parseFloat(moyenne)).emoji}</div>
            <div style={{fontSize: '3.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0rem'}}>{moyenne}</div>
            <div style={{fontSize: '0.875rem', color: 'white', opacity: 0.8, marginBottom: '0.5rem'}}>/10</div>
            <div style={{fontSize: '1rem', color: 'white', opacity: 0.9, fontWeight: '600'}}>{getCouleurEvaluation(parseFloat(moyenne)).text}</div>
          </div>
        )}

        <button
          onClick={onSave}
          style={{background: `linear-gradient(135deg, ${bgColor} 0%, #ff6600 100%)`, color: 'white', padding: '1rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', boxShadow: `0 4px 15px rgba(255, 136, 0, 0.4)`}}
        >
          💾 Sauvegarder mes notes
        </button>
      </div>
    </div>
  );
};

export default EvaluationCoach;