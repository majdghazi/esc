export const getMoyenneJoueur = (notes, joueurId) => {
    const notesJoueur = notes.filter(n => n.id_joueur === joueurId && n.note);
    if (notesJoueur.length === 0) return '-';
    
    const moyenne = notesJoueur.reduce((sum, n) => sum + n.note, 0) / notesJoueur.length;
    return moyenne.toFixed(1);
  };
  
  export const getGraphData = (notes, matchs, joueurId) => {
    const mesNotes = notes.filter(n => n.id_joueur === joueurId && n.note);
    
    return mesNotes.map(n => {
      const match = matchs.find(m => m.id === n.id_match);
      return {
        match: match?.adversaire?.substring(0, 12) || 'Match',
        note: n.note
      };
    });
  };