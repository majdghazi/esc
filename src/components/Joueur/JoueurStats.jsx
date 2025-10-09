import React from 'react';
import StatsCard from '../Shared/StatsCard';
import { getCouleurNote } from '../../utils/colors';

const JoueurStats = ({ 
  matchsJoues, 
  moyenne, 
  convocations, 
  buts, 
  temps, 
  passes 
}) => {
  return (
    <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
      <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Mes statistiques</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', textAlign: 'center'}}>
        <StatsCard icon="🎮" label="Matchs" value={matchsJoues} bgColor="#f3f4f6" />
        
        <div style={{background: '#fff7ed', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center'}}>
          <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>⭐</div>
          <p style={{color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.25rem', margin: 0}}>Moyenne</p>
          <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: moyenne !== '-' ? getCouleurNote(parseFloat(moyenne)).bg : '#ff8800', margin: 0}}>
            {moyenne !== '-' ? `${getCouleurNote(parseFloat(moyenne)).emoji} ${moyenne}` : moyenne}
          </p>
        </div>

        <StatsCard icon="📋" label="Convocs" value={convocations} bgColor="#f3f4f6" />
        <StatsCard icon="⚽" label="Buts" value={buts} bgColor="#fff7ed" textColor="#ff8800" />
        <StatsCard icon="⏱️" label="Temps (min)" value={temps} bgColor="#f3f4f6" />
        <StatsCard icon="🎯" label="Passes D" value={passes} bgColor="#dbeafe" textColor="#1e40af" />
      </div>
    </div>
  );
};

export default JoueurStats;