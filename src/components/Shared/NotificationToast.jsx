import React from 'react';

const NotificationToast = ({ message, type, onClose }) => {
  const colors = {
    success: { bg: '#10b981', icon: '✓' },
    error: { bg: '#ef4444', icon: '✕' },
    info: { bg: '#ff8800', icon: 'ℹ' }
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      zIndex: 9999,
      background: colors[type].bg,
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      minWidth: '300px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{colors[type].icon}</div>
      <div style={{flex: 1, fontWeight: '600'}}>{message}</div>
      <button 
        onClick={onClose}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default NotificationToast;