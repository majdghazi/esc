import React, { useState } from 'react';
import JoueurHeader from './JoueurHeader';
import JoueurTabs from './JoueurTabs';
import ProchainMatchCard from './ProchainMatchCard';
import JoueurStats from './JoueurStats';
import HistoriqueMatchs from './HistoriqueMatchs';
import EvaluationCoach from './EvaluationCoach';
import SimpleLineChart from '../Shared/SimpleLineChart';
import { getProchainMatch } from '../../utils/matchHelpers';
import { getMoyenneJoueur, getGraphData } from '../../utils/playerActions';
import { getTotalButs, getTotalTemps, getTotalPasses } from '../../utils/statsCalculator';

const JoueurView = ({
  user,
  matchs,
  convocations,
  notes,
  buteurs,
  tempsDeJeu,
  passesD,
  evaluationsCoach,
  evalIsma,
  setEvalIsma,
  evalAdam,
  setEvalAdam,
  accepterConvocation,
  refuserConvocation,
  saveEvaluationIsma,
  saveEvaluationAdam,
  onLogout
}) => {
  const [view, setView] = useState('stats');

  const prochainMatch = getProchainMatch(matchs);
  const convocationProchainMatch = prochainMatch && convocations.find(c => c.id_match === prochainMatch.id && c.id_joueur === user.id && c.convoque);

  const mesConvocations = convocations.filter(c => c.id_joueur === user.id && c.convoque);
  const mesNotes = notes.filter(n => n.id_joueur === user.id && n.note);
  const mesButs = getTotalButs(buteurs, user.id);
  const monTemps = getTotalTemps(tempsDeJeu, user.id);
  const mesPasses = getTotalPasses(passesD, user.id);
  const moyenne = getMoyenneJoueur(notes, user.id);
  const graphData = getGraphData(notes, matchs, user.id);

  return (
    <div style={{minHeight: '100vh', background: '#f9fafb'}}>
      <JoueurHeader user={user} notes={notes} onLogout={onLogout} />

      <div style={{maxWidth: '64rem', margin: '1.5rem auto', padding: '0 1rem', paddingBottom: '2rem'}}>
        <JoueurTabs view={view} setView={setView} />

        {view === 'evaluer' && (
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
            <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Evaluer les coachs</h2>
            <p style={{color: '#6b7280', marginBottom: '1.5rem'}}>Donnez votre avis sur le travail de vos coachs (notes de 1 à 10)</p>

            <div style={{display: 'grid', gap: '1.5rem'}}>
              <EvaluationCoach
                coachNom="Isma"
                coachId="1"
                evaluation={evalIsma}
                setEvaluation={setEvalIsma}
                onSave={saveEvaluationIsma}
                bgColor="#ff8800"
                borderColor="#ff8800"
              />

              <EvaluationCoach
                coachNom="Adam"
                coachId="27"
                evaluation={evalAdam}
                setEvaluation={setEvalAdam}
                onSave={saveEvaluationAdam}
                bgColor="#3b82f6"
                borderColor="#3b82f6"
              />
            </div>
          </div>
        )}

        {(view === 'stats' || !view) && (
          <>
            {prochainMatch && (
              <ProchainMatchCard
                match={prochainMatch}
                convocation={convocationProchainMatch}
                onAccepter={() => accepterConvocation(prochainMatch.id, user.id)}
                onRefuser={() => refuserConvocation(prochainMatch.id, user.id)}
              />
            )}

            <JoueurStats
              matchsJoues={mesNotes.length}
              moyenne={moyenne}
              convocations={mesConvocations.length}
              buts={mesButs}
              temps={monTemps}
              passes={mesPasses}
            />

            {graphData.length > 0 && (
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
                <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>
                  📈 Ma progression
                </h2>
                <SimpleLineChart data={graphData} />
              </div>
            )}

            <HistoriqueMatchs
              notes={mesNotes}
              matchs={matchs}
              buteurs={buteurs}
              tempsDeJeu={tempsDeJeu}
              passesD={passesD}
              userId={user.id}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default JoueurView;