import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={{minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{textAlign: 'center', color: 'white'}}>
        <img src="/logo_IH.png" alt="ESC Cappelle" style={{height: '120px', width: 'auto', marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(255, 136, 0, 0.5))'}} />
        <div style={{fontSize: '3rem', marginBottom: '1rem'}}>⚽</div>
        <p style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Chargement...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;