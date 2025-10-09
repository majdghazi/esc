const useNotesJoueurs = () => {
    const setNoteJoueur = (matchId, joueurId, noteValue, notes, setNotes, setEditingNote) => {
      const newNotes = notes.filter(n => !(n.id_match === matchId && n.id_joueur === joueurId));
      newNotes.push({ id_match: matchId, id_joueur: joueurId, note: parseFloat(noteValue) });
      setNotes(newNotes);
      setEditingNote(null);
    };
  
    const setButsJoueur = (matchId, joueurId, butsValue, buteurs, setButeurs) => {
      const newButeurs = buteurs.filter(b => !(b.id_match === matchId && b.id_joueur === joueurId));
      if (butsValue !== '' && butsValue !== null && butsValue !== undefined) {
        const buts = parseInt(butsValue);
        if (buts >= 0) {
          newButeurs.push({ id_match: matchId, id_joueur: joueurId, buts: buts });
        }
      }
      setButeurs(newButeurs);
    };
  
    const saveNote = (joueurId, selectedMatch, noteInputs, setNoteInputs, notes, setNotes, setEditingNote, showNotification) => {
      const noteValue = noteInputs[joueurId];
  
      if (noteValue === '' || noteValue === null || noteValue === undefined) {
        const newNotes = notes.filter(n => !(n.id_match === selectedMatch && n.id_joueur === joueurId));
        setNotes(newNotes);
        setEditingNote(null);
        setNoteInputs({ ...noteInputs, [joueurId]: '' });
      } else if (noteValue >= 1 && noteValue <= 9) {
        setNoteJoueur(selectedMatch, joueurId, noteValue, notes, setNotes, setEditingNote);
        setNoteInputs({ ...noteInputs, [joueurId]: '' });
      } else {
        showNotification('La note doit être comprise entre 1 et 9', 'error');
      }
    };
  
    const saveButs = (joueurId, selectedMatch, butInputs, setButInputs, buteurs, setButeurs, showNotification) => {
      const butsValue = butInputs[joueurId];
  
      if (butsValue === '' || butsValue === null || butsValue === undefined) {
        const newButeurs = buteurs.filter(b => !(b.id_match === selectedMatch && b.id_joueur === joueurId));
        setButeurs(newButeurs);
        setButInputs({ ...butInputs, [joueurId]: '' });
      } else {
        const buts = parseInt(butsValue);
        if (buts >= 0 && buts <= 15) {
          setButsJoueur(selectedMatch, joueurId, butsValue, buteurs, setButeurs);
          setButInputs({ ...butInputs, [joueurId]: '' });
        } else {
          showNotification('Le nombre de buts doit être compris entre 0 et 15', 'error');
        }
      }
    };
  
    const saveTemps = (joueurId, selectedMatch, tempsInputs, setTempsInputs, tempsDeJeu, setTempsDeJeu, showNotification) => {
      const tempsValue = tempsInputs[joueurId];
  
      if (tempsValue === '' || tempsValue === null || tempsValue === undefined) {
        const newTemps = tempsDeJeu.filter(t => !(t.id_match === selectedMatch && t.id_joueur === joueurId));
        setTempsDeJeu(newTemps);
        setTempsInputs({ ...tempsInputs, [joueurId]: '' });
      } else {
        const temps = parseInt(tempsValue);
        if (temps >= 0 && temps <= 120) {
          const newTemps = tempsDeJeu.filter(t => !(t.id_match === selectedMatch && t.id_joueur === joueurId));
          newTemps.push({ id_match: selectedMatch, id_joueur: joueurId, temps: temps });
          setTempsDeJeu(newTemps);
          setTempsInputs({ ...tempsInputs, [joueurId]: '' });
        } else {
          showNotification('Le temps de jeu doit être compris entre 0 et 120 minutes', 'error');
        }
      }
    };
  
    const savePasses = (joueurId, selectedMatch, passesInputs, setPassesInputs, passesD, setPassesD, showNotification) => {
      const passesValue = passesInputs[joueurId];
  
      if (passesValue === '' || passesValue === null || passesValue === undefined) {
        const newPasses = passesD.filter(p => !(p.id_match === selectedMatch && p.id_joueur === joueurId));
        setPassesD(newPasses);
        setPassesInputs({ ...passesInputs, [joueurId]: '' });
      } else {
        const passes = parseInt(passesValue);
        if (passes >= 0 && passes <= 30) {
          const newPasses = passesD.filter(p => !(p.id_match === selectedMatch && p.id_joueur === joueurId));
          newPasses.push({ id_match: selectedMatch, id_joueur: joueurId, passes: passes });
          setPassesD(newPasses);
          setPassesInputs({ ...passesInputs, [joueurId]: '' });
        } else {
          showNotification('Le nombre de passes D doit être compris entre 0 et 30', 'error');
        }
      }
    };
  
    return {
      setNoteJoueur,
      setButsJoueur,
      saveNote,
      saveButs,
      saveTemps,
      savePasses
    };
  };
  
  export default useNotesJoueurs;