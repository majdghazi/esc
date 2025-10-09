export const isConvoque = (convocations, matchId, joueurId) => {
    return convocations.some(c => c.id_match === matchId && c.id_joueur === joueurId && c.convoque);
  };
  
  export const getStatutConvocation = (convocations, matchId, joueurId) => {
    const convoc = convocations.find(c => c.id_match === matchId && c.id_joueur === joueurId && c.convoque);
    return convoc?.statut || null;
  };
  
  export const getNote = (notes, matchId, joueurId) => {
    const note = notes.find(n => n.id_match === matchId && n.id_joueur === joueurId);
    return note?.note;
  };