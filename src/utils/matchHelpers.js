export const getMatchResultat = (match) => {
    if (match.statut !== 'joue') return null;
    
    if (match.scoreEquipe > match.scoreAdversaire) return 'Victoire';
    if (match.scoreEquipe < match.scoreAdversaire) return 'Défaite';
    return 'Nul';
  };
  
  export const getProchainMatch = (matchs) => {
    return matchs.find(m => m.statut === 'avenir');
  };