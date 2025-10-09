import React from 'react';
import { formaterDate } from '../../utils/dateFormatter';

const ProchainMatchCard = ({ 
  match, 
  convocation, 
  onAccepter, 
  onRefuser 
}) => {
  const getCardStyle = () => {
    if (convocation?.statut === 'accepte') {
      return { background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: 'white' };
    }
    if (convocation?.statut === 'refuse') {
      return { background: 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)', color: 'white' };
    }
    if (convocation) {
      return { background: 'linear-gradient(90deg, #ff8800 0%, #ff6600 100%)', color: 'white' };
    }
    return { background: 'white', color: '#1f2937', border: '2px solid #e5e7eb' };
  };

  return (
    <div style={{...getCardStyle(), padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
      <div style={{fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', opacity: 0.9}}>
        📅 Prochain match
      </div>
      <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem'}}>{match.adversaire}</h2>
      <p style={{marginBottom: '1rem', opacity: 0.9}}>
        {formaterDate(match.date)} - {match.domicile === 'true' ? 'Domicile' : 'Extérieur'}
      </p>

      {!convocation && (
        <div style={{fontSize: '1.125rem', fontWeight: 'bold'}}>
          ✕ Non convoqué
        </div>
      )}

      {convocation?.statut === 'en_attente' && (
        <div>
          <div style={{fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem'}}>
            ⏳ Convocation en attente
          </div>
          <div style={{display: 'flex', gap: '0.75rem'}}>
            <button
              onClick={onAccepter}
              style={{flex: 1, background: '#10b981', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600'}}
            >
              ✓ Accepter
            </button>
            <button
              onClick={onRefuser}
              style={{flex: 1, background: '#dc2626', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600'}}
            >
              ✕ Refuser
            </button>
          </div>
        </div>
      )}

      {convocation?.statut === 'accepte' && (
        <div style={{fontSize: '1.125rem', fontWeight: 'bold'}}>
          ✓ Convocation acceptée
        </div>
      )}

      {convocation?.statut === 'refuse' && (
        <div style={{fontSize: '1.125rem', fontWeight: 'bold'}}>
          ✗ Convocation refusée
        </div>
      )}
    </div>
  );
};

export default ProchainMatchCard;