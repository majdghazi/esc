import React from 'react';

const StatsCard = ({ icon, label, value, bgColor = '#f3f4f6', textColor = '#1f2937' }) => {
  return (
    <div style={{background: bgColor, padding: '1rem', borderRadius: '0.5rem', textAlign: 'center'}}>
      <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{icon}</div>
      <p style={{color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.25rem', margin: 0}}>{label}</p>
      <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: textColor, margin: 0}}>{value}</p>
    </div>
  );
};

export default StatsCard;