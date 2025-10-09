import React from 'react';
import { getNoteGeneraleEquipe } from '../../utils/noteCalculator';
import { getCouleurEquipe } from '../../utils/colors';

const JoueurHeader = ({ user, notes, onLogout }) => {
  const noteEquipe = getNoteGeneraleEquipe(notes);

  return (
    <div style={{background: '#000000', color: 'white', padding: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)', borderBottom: '3px solid #ff8800'}}>
      <div style={{maxWidth: '64rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <img src="/logo_IH.png" alt="ESC Cappelle" style={{height: '60px', width: 'auto'}} />
          <div>
            <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>Mon Espace Joueur</h1>
            <p style={{margin: 0, color: '#ff8800', fontWeight: '600'}}>
              ESC Cappelle - {user.nom}
              {noteEquipe && (
                <span style={{marginLeft: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: getCouleurEquipe(noteEquipe).bg, color: 'white'}}>
                  {getCouleurEquipe(noteEquipe).emoji} Équipe: {noteEquipe}/10
                </span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button onClick={() => window.location.reload()} style={{background: '#6b7280', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', color: 'white', cursor: 'pointer', fontWeight: '600', marginRight: '0.5rem'}}>
            Actualiser
          </button>
          <button onClick={onLogout} style={{background: '#ff8800', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', color: 'white', cursor: 'pointer', fontWeight: '600'}}>
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoueurHeader;