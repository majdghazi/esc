export const calculerMoyenne = (evaluation) => {
    const notes = [evaluation.entrainements, evaluation.coaching, evaluation.relation].filter(n => n !== '' && !isNaN(n));
    if (notes.length === 0) return '';
    const moyenne = notes.reduce((sum, note) => sum + parseFloat(note), 0) / notes.length;
    return moyenne.toFixed(1);
  };
  
  export const getNoteEquipe = (notes, matchId) => {
    const notesMatch = notes.filter(n => n.id_match === matchId && n.note);
    if (notesMatch.length === 0) return null;
    
    const moyenne = notesMatch.reduce((sum, n) => sum + n.note, 0) / notesMatch.length;
    return moyenne.toFixed(1);
  };
  
  export const getNoteGeneraleEquipe = (notes) => {
    const toutesLesNotes = notes.filter(n => n.note);
    if (toutesLesNotes.length === 0) return null;
    
    const moyenne = toutesLesNotes.reduce((sum, n) => sum + n.note, 0) / toutesLesNotes.length;
    return moyenne.toFixed(1);
  };
  
  export const getTexteNote = (note) => {
    if (note >= 8) return 'Exceptionnel';
    if (note >= 7) return 'Très bien';
    if (note >= 6) return 'Bien';
    if (note >= 5) return 'Correct';
    return 'À améliorer';
  };

  export const getGraphDataEquipe = (notes, matchs) => {
    const matchsJoues = matchs.filter(m => m.statut === 'joue').sort((a, b) => a.id - b.id);
    
    return matchsJoues.map(match => {
      const noteEquipe = getNoteEquipe(notes, match.id);
      return {
        match: match.adversaire.substring(0, 15),
        note: noteEquipe ? parseFloat(noteEquipe) : null
      };
    }).filter(d => d.note !== null);
  };