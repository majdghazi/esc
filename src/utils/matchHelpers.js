export const getMatchResultat = (match) => {
    if (match.statut !== 'joue') return null;
    
    if (match.scoreEquipe > match.scoreAdversaire) return 'Victoire';
    if (match.scoreEquipe < match.scoreAdversaire) return 'Défaite';
    return 'Nul';
  };
  
  export const getProchainMatch = (matchs) => {
    // Filtrer les matchs à venir et les trier par date
    const matchsAvenir = matchs
      .filter(m => m.statut === 'avenir')
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Retourner le premier (le plus proche)
    return matchsAvenir[0];
  };