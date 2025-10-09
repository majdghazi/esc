import React from 'react';

const EvaluationsView = ({ user, evaluationsCoach }) => {
  const mesEvaluations = evaluationsCoach.filter(e => e.id_coach === user.id);
  const nbEvaluations = mesEvaluations.length;

  if (nbEvaluations === 0) {
    return (
      <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
        <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Mes évaluations reçues</h2>
        <div style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>
          <p>Aucune évaluation reçue pour le moment.</p>
        </div>
      </div>
    );
  }

  const moyennes = {
    entrainements: (mesEvaluations.reduce((sum, e) => sum + (e.entrainements || e.communication || 0), 0) / nbEvaluations).toFixed(2),
    coaching: (mesEvaluations.reduce((sum, e) => sum + (e.coaching || e.tactique || 0), 0) / nbEvaluations).toFixed(2),
    relation: (mesEvaluations.reduce((sum, e) => sum + (e.relation || e.respect || 0), 0) / nbEvaluations).toFixed(2),
    globale: (mesEvaluations.reduce((sum, e) => sum + (e.note_globale || 0), 0) / nbEvaluations).toFixed(2)
  };

  return (
    <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
      <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Mes évaluations reçues</h2>

      <div style={{background: '#fff7ed', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '2px solid #ff8800'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#ff8800', marginBottom: '0rem'}}>
            {moyennes.globale}
          </div>
          <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>/10</div>
          <div style={{fontSize: '1rem', color: '#6b7280'}}>
            Note globale moyenne ({nbEvaluations} évaluation{nbEvaluations > 1 ? 's' : ''})
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
        <div style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'}}>
          <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>⚽️</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0rem'}}>
            {moyennes.entrainements}
          </div>
          <div style={{fontSize: '0.875rem', color: 'white', opacity: 0.7, marginBottom: '0.5rem'}}>/10</div>
          <div style={{fontSize: '0.875rem', color: 'white', opacity: 0.9, fontWeight: '600'}}>Entraînements</div>
        </div>

        <div style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'}}>
          <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>🧠</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0rem'}}>
            {moyennes.coaching}
          </div>
          <div style={{fontSize: '0.875rem', color: 'white', opacity: 0.7, marginBottom: '0.5rem'}}>/10</div>
          <div style={{fontSize: '0.875rem', color: 'white', opacity: 0.9, fontWeight: '600'}}>Coaching match</div>
        </div>

        <div style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'}}>
          <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>🤝</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0rem'}}>
            {moyennes.relation}
          </div>
          <div style={{fontSize: '0.875rem', color: 'white', opacity: 0.7, marginBottom: '0.5rem'}}>/10</div>
          <div style={{fontSize: '0.875rem', color: 'white', opacity: 0.9, fontWeight: '600'}}>Relation joueurs</div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationsView;