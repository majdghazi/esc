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
    entrainements: (mesEvaluations.reduce((sum, e) => sum + (e.entrainements || e.communication || 0), 0) / nbEvaluations).toFixed(1),
    coaching: (mesEvaluations.reduce((sum, e) => sum + (e.coaching || e.tactique || 0), 0) / nbEvaluations).toFixed(1),
    relation: (mesEvaluations.reduce((sum, e) => sum + (e.relation || e.respect || 0), 0) / nbEvaluations).toFixed(1),
    globale: (mesEvaluations.reduce((sum, e) => sum + (e.note_globale || 0), 0) / nbEvaluations).toFixed(1)
  };

  return (
    <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
      <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Mes évaluations reçues</h2>

      <div style={{background: '#1f2937', padding: '2rem', borderRadius: '0.75rem', marginBottom: '1.5rem'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem'}}>
            Note globale moyenne
          </div>
          <div style={{fontSize: '4.5rem', fontWeight: 'bold', color: 'white', lineHeight: '1'}}>
            {moyennes.globale}
          </div>
          <div style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', fontWeight: '500', marginTop: '0.75rem'}}>
            {nbEvaluations} évaluation{nbEvaluations > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem'}}>
        <div style={{background: '#f9fafb', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', border: '2px solid #e5e7eb'}}>
          <div style={{fontSize: '2.5rem', marginBottom: '0.75rem'}}>🏋️</div>
          <div style={{fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem'}}>Entraînements</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937'}}>
            {moyennes.entrainements}
          </div>
        </div>

        <div style={{background: '#f9fafb', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', border: '2px solid #e5e7eb'}}>
          <div style={{fontSize: '2.5rem', marginBottom: '0.75rem'}}>⚽</div>
          <div style={{fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem'}}>Coaching match</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937'}}>
            {moyennes.coaching}
          </div>
        </div>

        <div style={{background: '#f9fafb', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', border: '2px solid #e5e7eb'}}>
          <div style={{fontSize: '2.5rem', marginBottom: '0.75rem'}}>🤝</div>
          <div style={{fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem'}}>Relation joueurs</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937'}}>
            {moyennes.relation}
          </div>
        </div>
      </div>

      <div style={{textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', padding: '0.5rem', background: '#f9fafb', borderRadius: '0.375rem'}}>
        Toutes les notes sont sur 10
      </div>
    </div>
  );
};

export default EvaluationsView;