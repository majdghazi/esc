import React from 'react';

const LoginForm = ({ 
  loginUsername, 
  setLoginUsername, 
  loginPassword, 
  setLoginPassword, 
  onLogin 
}) => {
  return (
    <div style={{minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
      <div style={{background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(255, 136, 0, 0.5)', padding: '2.5rem', width: '100%', maxWidth: '28rem', border: '2px solid #ff8800'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <img src="/logonoir_IH.png" alt="ESC Cappelle" style={{height: '100px', width: 'auto', marginBottom: '1rem'}} />
          <h1 style={{fontSize: '2rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem'}}>ESC Cappelle</h1>
          <p style={{color: '#ff8800', fontWeight: '600'}}>Équipe Séniors D3 - Équipe B</p>
        </div>

        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>Identifiant</label>
          <input
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onLogin()}
            style={{width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', fontSize: '1rem'}}
            placeholder="Votre pseudo"
          />
        </div>

        <div style={{marginBottom: '1.5rem'}}>
          <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>Mot de passe</label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onLogin()}
            style={{width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', fontSize: '1rem'}}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={onLogin}
          style={{width: '100%', background: '#ff8800', color: 'white', padding: '0.875rem', borderRadius: '0.75rem', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '1rem'}}
        >
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default LoginForm;