import React from 'react';
import { isConvoque, getStatutConvocation } from '../../utils/convocationHelpers';

const ConvocationsList = ({ 
  matchId, 
  joueurs, 
  convocations, 
  onConvoquer, 
  onDeconvoquer 
}) => {
  const joueursConvoques = joueurs.filter(j => isConvoque(convocations, matchId, j.id)).length;
  const joueursEnAttente = joueurs.filter(j => getStatutConvocation(convocations, matchId, j.id) === 'en_attente').length;
  const joueursAcceptes = joueurs.filter(j => getStatutConvocation(convocations, matchId, j.id) === 'accepte').length;
  const joueursRefuses = joueurs.filter(j => getStatutConvocation(convocations, matchId, j.id) === 'refuse').length;

  return (
    <div style={{marginBottom: '1rem'}}>
      <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem'}}>Gestion des convocations</h3>
      <div style={{display: 'flex', gap: '1rem', fontSize: '0.875rem', flexWrap: 'wrap', marginBottom: '1rem'}}>
        <span style={{background: '#fff7ed', color: '#9a3412', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '600'}}>
          ⏳ En attente: {joueursEnAttente}
        </span>
        <span style={{background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '600'}}>
          ✓ Acceptées: {joueursAcceptes}
        </span>
        <span style={{background: '#fee2e2', color: '#dc2626', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '600'}}>
          ✗ Refusées: {joueursRefuses}
        </span>
      </div>

      <div style={{display: 'grid', gap: '0.5rem'}}>
        {joueurs.map(joueur => {
          const convoque = isConvoque(convocations, matchId, joueur.id);
          const statut = getStatutConvocation(convocations, matchId, joueur.id);

          return (
            <div key={joueur.id} style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', flexWrap: 'wrap'}}>
              <div style={{flex: '1 1 150px'}}>
                <p style={{fontWeight: '600', color: '#1f2937', margin: 0}}>{joueur.nom}</p>
                <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>@{joueur.username}</p>
              </div>

              <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
                {!convoque ? (
                  <button
                    onClick={() => onConvoquer(matchId, joueur.id)}
                    style={{padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #ff8800', cursor: 'pointer', background: '#ff8800', color: 'white', fontWeight: '700', fontSize: '0.875rem', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(255, 136, 0, 0.3)'}}
                  >
                    ✓ Convoquer
                  </button>
                ) : (
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
                    {statut === 'en_attente' && (
                      <span style={{background: '#fff7ed', color: '#9a3412', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: '600', fontSize: '0.875rem'}}>
                        ⏳ En attente
                      </span>
                    )}
                    {statut === 'accepte' && (
                      <span style={{background: '#dcfce7', color: '#166534', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: '600', fontSize: '0.875rem'}}>
                        ✓ Acceptée
                      </span>
                    )}
                    {statut === 'refuse' && (
                      <span style={{background: '#fee2e2', color: '#dc2626', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: '600', fontSize: '0.875rem'}}>
                        ✗ Refusée
                      </span>
                    )}
                    <button
                      onClick={() => onDeconvoquer(matchId, joueur.id)}
                      style={{padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #6b7280', cursor: 'pointer', background: '#6b7280', color: 'white', fontWeight: '600', fontSize: '0.75rem'}}
                    >
                      ✕ Annuler
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConvocationsList;