import React from 'react';

const NavigationTabs = ({ view, setView, matchsCount, joueursCount }) => {
  return (
    <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
      <button
        onClick={() => setView('matchs')}
        style={{
          flex: '1 1 200px',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          background: view === 'matchs' ? '#ff8800' : 'white',
          color: view === 'matchs' ? 'white' : '#1f2937',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        📅 Matchs ({matchsCount})
      </button>
      <button
        onClick={() => setView('joueurs')}
        style={{
          flex: '1 1 200px',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          background: view === 'joueurs' ? '#ff8800' : 'white',
          color: view === 'joueurs' ? 'white' : '#1f2937',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        👥 Joueurs ({joueursCount})
      </button>
      <button
        onClick={() => setView('evaluations')}
        style={{
          flex: '1 1 200px',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          background: view === 'evaluations' ? '#ff8800' : 'white',
          color: view === 'evaluations' ? 'white' : '#1f2937',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        ⭐ Mes évaluations
      </button>
    </div>
  );
};

export default NavigationTabs;