export const getTotalButs = (buteurs, joueurId) => {
    return buteurs
      .filter(b => b.id_joueur === joueurId)
      .reduce((sum, b) => sum + b.nombre_de_buts, 0);
  };

  export const getTotalTemps = (tempsDeJeu, joueurId) => {
    return tempsDeJeu
      .filter(t => t.id_joueur === joueurId)
      .reduce((sum, t) => sum + t.minutes_jouees, 0);
  };

  export const getTotalPasses = (passesD, joueurId) => {
    return passesD
      .filter(p => p.id_joueur === joueurId)
      .reduce((sum, p) => sum + p.nombre_passes_d, 0);
  };

  export const getButs = (buteurs, matchId, joueurId) => {
    const but = buteurs.find(b => b.id_match === matchId && b.id_joueur === joueurId);
    return but?.nombre_de_buts || 0;
  };

  export const getTemps = (tempsDeJeu, matchId, joueurId) => {
    const temps = tempsDeJeu.find(t => t.id_match === matchId && t.id_joueur === joueurId);
    return temps?.minutes_jouees || 0;
  };

  export const getPasses = (passesD, matchId, joueurId) => {
    const passes = passesD.find(p => p.id_match === matchId && p.id_joueur === joueurId);
    return passes?.nombre_passes_d || 0;
  };