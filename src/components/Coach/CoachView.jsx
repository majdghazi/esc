import React, { useState } from 'react';
import CoachHeader from './CoachHeader';
import NavigationTabs from './NavigationTabs';
import MatchsList from './MatchsList';
import MatchDetail from './MatchDetail';
import JoueursList from './JoueursList';
import EvaluationsView from './EvaluationsView';
import ConvocationsList from './ConvocationsList';
import SimpleLineChart from '../Shared/SimpleLineChart';
import { getNoteEquipe } from '../../utils/noteCalculator';
import { isConvoque, getStatutConvocation, getNote } from '../../utils/convocationHelpers';
import { getButs, getTemps, getPasses } from '../../utils/statsCalculator';
import { getCouleurNote } from '../../utils/colors';
import { getTexteNote } from '../../utils/noteCalculator';
import { getGraphDataEquipe } from '../../utils/noteCalculator';



const CoachView = ({
  user,
  joueurs,
  matchs,
  convocations,
  notes,
  buteurs,
  tempsDeJeu,
  passesD,
  evaluationsCoach,
  selectedMatch,
  setSelectedMatch,
  noteInputs,
  setNoteInputs,
  butInputs,
  setButInputs,
  tempsInputs,
  setTempsInputs,
  passesInputs,
  setPassesInputs,
  editingNote,
  setEditingNote,
  handleNoteChange,
  handleButsChange,
  handleTempsChange,
  handlePassesChange,
  convoquerJoueur,
  deconvoquerJoueur,
  marquerCommeJoue,
  repasserEnAttente,
  saveNote,
  saveButs,
  saveTemps,
  savePasses,
  setNotes,
  setButeurs,
  setTempsDeJeu,
  setPassesD,
  onLogout
}) => {
  const [view, setView] = useState('matchs');

  const matchEnCours = matchs.find(m => m.id === selectedMatch);
  const joueursList = joueurs.filter(j => j.role === 'joueur');
  const noteEquipe = matchEnCours ? getNoteEquipe(notes, matchEnCours.id) : null;
  const graphDataEquipe = getGraphDataEquipe(notes, matchs);
  return (
    <div style={{minHeight: '100vh', background: '#f9fafb'}}>
      <CoachHeader user={user} notes={notes} onLogout={onLogout} />

      <div style={{maxWidth: '72rem', margin: '1.5rem auto', padding: '0 1rem', paddingBottom: '2rem'}}>
        {!selectedMatch && (
          <NavigationTabs
            view={view}
            setView={setView}
            matchsCount={matchs.length}
            joueursCount={joueursList.length}
          />
        )}
{graphDataEquipe.length > 0 && (
  <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
    <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>
      📈 Évolution de l'équipe
    </h2>
    <SimpleLineChart data={graphDataEquipe} />
  </div>
)}
        {view === 'matchs' && !selectedMatch && (
          <MatchsList
            matchs={matchs}
            notes={notes}
            onSelectMatch={setSelectedMatch}
          />
        )}

        {view === 'matchs' && selectedMatch && matchEnCours && (
          <MatchDetail
            match={matchEnCours}
            user={user}
            onBack={() => setSelectedMatch(null)}
            onMarquerJoue={marquerCommeJoue}
            onRepasserAttente={repasserEnAttente}
            noteEquipe={noteEquipe}
          >
            {matchEnCours.statut === 'avenir' && (
              <ConvocationsList
                matchId={selectedMatch}
                joueurs={joueursList}
                convocations={convocations}
                onConvoquer={convoquerJoueur}
                onDeconvoquer={deconvoquerJoueur}
              />
            )}

{matchEnCours.statut === 'joue' && (
  <>
    <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>Joueurs convoqués</h3>

    <div style={{display: 'grid', gap: '0.5rem'}}>
      {joueursList.map(joueur => {
                const convoque = isConvoque(convocations, selectedMatch, joueur.id);
                const note = getNote(notes, selectedMatch, joueur.id);
                const buts = getButs(buteurs, selectedMatch, joueur.id);
                const temps = getTemps(tempsDeJeu, selectedMatch, joueur.id);
                const passes = getPasses(passesD, selectedMatch, joueur.id);
                const isEditing = editingNote === joueur.id;

                if (matchEnCours.statut === 'joue' && !convoque) return null;

                return (
                  <div key={joueur.id} style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', flexWrap: 'wrap'}}>
                    <div style={{flex: '1 1 150px'}}>
                      <p style={{fontWeight: '600', color: '#1f2937', margin: 0}}>{joueur.nom}</p>
                      <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>@{joueur.username}</p>
                    </div>

                    {matchEnCours.statut === 'joue' && (user.role === 'coach' || user.role === 'coach_adjoint') && (
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
                        {!isEditing && (note || buts > 0 || temps > 0 || passes > 0) ? (
                          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
                            {note && (
                              <span style={{background: getCouleurNote(note).bg, color: getCouleurNote(note).color, padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem'}}>
                                {getCouleurNote(note).emoji} {note}/10 • {getTexteNote(note)}
                              </span>
                            )}
                            {buts > 0 && (
                              <span style={{background: '#fff7ed', color: '#9a3412', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem'}}>
                                ⚽ {buts} but{buts > 1 ? 's' : ''}
                              </span>
                            )}
                            {temps > 0 && (
                              <span style={{background: '#f3f4f6', color: '#1f2937', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem'}}>
                                ⏱️ {temps} min
                              </span>
                            )}
                            {passes > 0 && (
                              <span style={{background: '#dbeafe', color: '#1e40af', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem'}}>
                                🎯 {passes} passes D
                              </span>
                            )}
                            <button
                              onClick={() => {
                                setEditingNote(joueur.id);
                                setNoteInputs({ ...noteInputs, [joueur.id]: note });
                                setButInputs({ ...butInputs, [joueur.id]: buts || '' });
                                setTempsInputs({ ...tempsInputs, [joueur.id]: temps || '' });
                                setPassesInputs({ ...passesInputs, [joueur.id]: passes || '' });
                              }}
                              style={{background: '#6b7280', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem'}}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => {
                                const newNotes = notes.filter(n => !(n.id_match === selectedMatch && n.id_joueur === joueur.id));
                                setNotes(newNotes);
                                const newButeurs = buteurs.filter(b => !(b.id_match === selectedMatch && b.id_joueur === joueur.id));
                                setButeurs(newButeurs);
                                const newTemps = tempsDeJeu.filter(t => !(t.id_match === selectedMatch && t.id_joueur === joueur.id));
                                setTempsDeJeu(newTemps);
                                const newPasses = passesD.filter(p => !(p.id_match === selectedMatch && p.id_joueur === joueur.id));
                                setPassesD(newPasses);
                              }}
                              style={{background: '#dc2626', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem'}}
                            >
                              🗑️
                            </button>
                          </div>
                        ) : (
                          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                            <input
                              type="number"
                              min="1"
                              max="9"
                              step="0.5"
                              placeholder="Note"
                              value={noteInputs[joueur.id] ?? ''}
                              onChange={(e) => handleNoteChange(joueur.id, e.target.value)}
                              disabled={user.role === 'coach_adjoint'}
                              style={{width: '4.5rem', padding: '0.5rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem'}}
                            />
                            <input
                              type="number"
                              min="0"
                              max="15"
                              placeholder="Buts"
                              value={butInputs[joueur.id] ?? ''}
                              onChange={(e) => handleButsChange(joueur.id, e.target.value)}
                              style={{width: '4rem', padding: '0.5rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem'}}
                            />
                            <input
                              type="number"
                              min="0"
                              max="120"
                              placeholder="Temps"
                              value={tempsInputs[joueur.id] ?? ''}
                              onChange={(e) => handleTempsChange(joueur.id, e.target.value)}
                              style={{width: '5rem', padding: '0.5rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem'}}
                            />
                            <input
                              type="number"
                              min="0"
                              max="30"
                              placeholder="Passes D"
                              value={passesInputs[joueur.id] ?? ''}
                              onChange={(e) => handlePassesChange(joueur.id, e.target.value)}
                              style={{width: '6rem', padding: '0.5rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem'}}
                            />
                            <button
                              onClick={() => {
                                saveNote(joueur.id);
                                saveButs(joueur.id);
                                saveTemps(joueur.id);
                                savePasses(joueur.id);
                              }}
                              style={{background: '#ff8800', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem'}}
                            >
                              OK
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
            })}
            </div>
          </>
        )}
      </MatchDetail>
        )}

        {view === 'evaluations' && (
          <EvaluationsView user={user} evaluationsCoach={evaluationsCoach} />
        )}

        {view === 'joueurs' && (
          <JoueursList
            joueurs={joueursList}
            notes={notes}
            convocations={convocations}
            buteurs={buteurs}
            tempsDeJeu={tempsDeJeu}
            passesD={passesD}
          />
        )}
      </div>
    </div>
  );
};

export default CoachView;