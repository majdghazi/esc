import React from 'react';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div style={{position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
      <div style={{background: 'white', borderRadius: '0.75rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '1.5rem', maxWidth: '28rem', width: '90%'}}>
        <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1f2937'}}>{title}</h3>
        <p style={{color: '#6b7280', marginBottom: '1.5rem'}}>{message}</p>
        <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'flex-end'}}>
          <button
            onClick={onCancel}
            style={{padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#e5e7eb', color: '#1f2937', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600'}}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            style={{padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#dc2626', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600'}}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
