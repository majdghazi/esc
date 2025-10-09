import React from 'react';

const JoueurTabs = ({ view, setView }) => {
  return (
    <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
      <button
        onClick={() => setView('stats')}
        style={{
          flex: '1 1 200px',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          background: view === 'stats' || !view ? '#ff8800' : 'white',
          color: view === 'stats' || !view ? 'white' : '#1f2937',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        📊 Mes Stats
      </button>
      <button
        onClick={() => setView('evaluer')}
        style={{
          flex: '1 1 200px',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          background: view === 'evaluer' ? '#ff8800' : 'white',
          color: view === 'evaluer' ? 'white' : '#1f2937',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        ⭐ Evaluer les coachs
      </button>
    </div>
  );
};

export default JoueurTabs;