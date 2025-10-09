import React, { useEffect } from 'react';

// Hooks personnalisés
import useAuth from './hooks/useAuth';
import useNotification from './hooks/useNotification';
import useGoogleSheets from './hooks/useGoogleSheets';
import useMatchManagement from './hooks/useMatchManagement';
import useEvaluations from './hooks/useEvaluations';
import usePlayerStats from './hooks/usePlayerStats';
import useConvocations from './hooks/useConvocations';
import useNotesJoueurs from './hooks/useNotesJoueurs';

// Composants partagés
import NotificationToast from './components/Shared/NotificationToast';
import LoadingScreen from './components/Shared/LoadingScreen';
import ScoreModal from './components/Shared/ScoreModal';

// Composants Auth
import LoginForm from './components/Auth/LoginForm';

// Composants Coach
import CoachView from './components/Coach/CoachView';

// Composants Joueur
import JoueurView from './components/Joueur/JoueurView';

function App() {
  // Auth
  const {
    user,
    setUser,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    handleLogin: performLogin,
    handleLogout,
    loadUserFromStorage
  } = useAuth();

  // Notifications
  const { notification, showNotification } = useNotification();

  // Google Sheets
  const {
    joueurs,
    matchs,
    setMatchs,
    convocations,
    setConvocations,
    notes,
    setNotes,
    buteurs,
    setButeurs,
    tempsDeJeu,
    setTempsDeJeu,
    passesD,
    setPassesD,
    evaluationsCoach,
    setEvaluationsCoach,
    loading,
    chargerDonnees,
    actionJoueurEnCours,
    setActionJoueurEnCours
  } = useGoogleSheets(user);  // ← AJOUTE (user) ICI !

  // Match Management
  const {
    selectedMatch,
    setSelectedMatch,
    showScoreModal,
    setShowScoreModal,
    matchToPlay,
    scoreEquipeInput,
    setScoreEquipeInput,
    scoreAdversaireInput,
    setScoreAdversaireInput,
    marquerCommeJoue,
    confirmerScoreEtJouer,
    repasserEnAttente
  } = useMatchManagement();

  // Evaluations
  const {
    evalIsma,
    setEvalIsma,
    evalAdam,
    setEvalAdam,
    loadEvaluations,
    saveEvaluationIsma,
    saveEvaluationAdam
  } = useEvaluations();

  // Player Stats
  const {
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
    handlePassesChange
  } = usePlayerStats();

  // Convocations
  const {
    convoquerJoueur,
    deconvoquerJoueur,
    accepterConvocation,
    refuserConvocation
  } = useConvocations();

  // Notes Joueurs
  const {
    saveNote,
    saveButs,
    saveTemps,
    savePasses
  } = useNotesJoueurs();

  // Charger les données au démarrage
  useEffect(() => {
    chargerDonnees();
    loadUserFromStorage();
  }, []);



  // Charger les évaluations du joueur
  useEffect(() => {
    loadEvaluations(user, evaluationsCoach);
  }, [user, evaluationsCoach]);

  // Gestion du login
  const handleLogin = () => {
    performLogin(joueurs, showNotification);
  };

  // Gestion logout avec reset
  const logout = () => {
    handleLogout();
    setSelectedMatch(null);
  };

  // Loading screen
  if (loading) {
    return (
      <>
        {notification && <NotificationToast message={notification.message} type={notification.type} onClose={() => showNotification(null)} />}
        <LoadingScreen />
      </>
    );
  }

  // Login screen
  if (!user) {
    return (
      <>
        {notification && <NotificationToast message={notification.message} type={notification.type} onClose={() => showNotification(null)} />}
        <LoginForm
          loginUsername={loginUsername}
          setLoginUsername={setLoginUsername}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          onLogin={handleLogin}
        />
      </>
    );
  }

  // Coach/Coach Adjoint View
  if (user.role === 'coach' || user.role === 'coach_adjoint') {
    return (
      <>
        {notification && <NotificationToast message={notification.message} type={notification.type} onClose={() => showNotification(null)} />}
        <CoachView
          user={user}
          joueurs={joueurs}
          matchs={matchs}
          setMatchs={setMatchs}
          convocations={convocations}
          setConvocations={setConvocations}
          notes={notes}
          setNotes={setNotes}
          buteurs={buteurs}
          setButeurs={setButeurs}
          tempsDeJeu={tempsDeJeu}
          setTempsDeJeu={setTempsDeJeu}
          passesD={passesD}
          setPassesD={setPassesD}
          evaluationsCoach={evaluationsCoach}
          selectedMatch={selectedMatch}
          setSelectedMatch={setSelectedMatch}
          noteInputs={noteInputs}
          setNoteInputs={setNoteInputs}
          butInputs={butInputs}
          setButInputs={setButInputs}
          tempsInputs={tempsInputs}
          setTempsInputs={setTempsInputs}
          passesInputs={passesInputs}
          setPassesInputs={setPassesInputs}
          editingNote={editingNote}
          setEditingNote={setEditingNote}
          handleNoteChange={handleNoteChange}
          handleButsChange={handleButsChange}
          handleTempsChange={handleTempsChange}
          handlePassesChange={handlePassesChange}
          convoquerJoueur={(matchId, joueurId) => convoquerJoueur(matchId, joueurId, convocations, setConvocations)}
          deconvoquerJoueur={(matchId, joueurId) => deconvoquerJoueur(matchId, joueurId, convocations, setConvocations)}
          marquerCommeJoue={(matchId) => marquerCommeJoue(matchId, matchs)}
          repasserEnAttente={(matchId) => repasserEnAttente(matchId, matchs, setMatchs, notes)}
          saveNote={(joueurId) => saveNote(joueurId, selectedMatch, noteInputs, setNoteInputs, notes, setNotes, setEditingNote, showNotification)}
          saveButs={(joueurId) => saveButs(joueurId, selectedMatch, butInputs, setButInputs, buteurs, setButeurs, showNotification)}
          saveTemps={(joueurId) => saveTemps(joueurId, selectedMatch, tempsInputs, setTempsInputs, tempsDeJeu, setTempsDeJeu, showNotification)}
          savePasses={(joueurId) => savePasses(joueurId, selectedMatch, passesInputs, setPassesInputs, passesD, setPassesD, showNotification)}
          onLogout={logout}
        />
        <ScoreModal
          show={showScoreModal}
          match={matchToPlay}
          scoreEquipe={scoreEquipeInput}
          scoreAdversaire={scoreAdversaireInput}
          onScoreEquipeChange={setScoreEquipeInput}
          onScoreAdversaireChange={setScoreAdversaireInput}
          onConfirm={() => confirmerScoreEtJouer(matchs, setMatchs, showNotification)}
          onCancel={() => setShowScoreModal(false)}
        />
      </>
    );
  }

  // Joueur View
  return (
    <>
      {notification && <NotificationToast message={notification.message} type={notification.type} onClose={() => showNotification(null)} />}
      <JoueurView
        user={user}
        matchs={matchs}
        convocations={convocations}
        setConvocations={setConvocations}
        notes={notes}
        buteurs={buteurs}
        tempsDeJeu={tempsDeJeu}
        passesD={passesD}
        evaluationsCoach={evaluationsCoach}
        setEvaluationsCoach={setEvaluationsCoach}
        evalIsma={evalIsma}
        setEvalIsma={setEvalIsma}
        evalAdam={evalAdam}
        setEvalAdam={setEvalAdam}
        accepterConvocation={(matchId, joueurId) => accepterConvocation(matchId, joueurId, user, convocations, setConvocations, setActionJoueurEnCours)}
        refuserConvocation={(matchId, joueurId) => refuserConvocation(matchId, joueurId, user, convocations, setConvocations, setActionJoueurEnCours)}
        saveEvaluationIsma={() => saveEvaluationIsma(user, evaluationsCoach, setEvaluationsCoach, showNotification)}
        saveEvaluationAdam={() => saveEvaluationAdam(user, evaluationsCoach, setEvaluationsCoach, showNotification)}
        onLogout={logout}
      />
    </>
  );
}

export default App;