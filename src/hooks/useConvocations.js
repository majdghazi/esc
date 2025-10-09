const useConvocations = () => {
    const convoquerJoueur = (matchId, joueurId, convocations, setConvocations) => {
      const newConvocs = [...convocations];
      newConvocs.push({ id_match: matchId, id_joueur: joueurId, convoque: true, statut: 'en_attente' });
      setConvocations(newConvocs);
    };
  
    const deconvoquerJoueur = (matchId, joueurId, convocations, setConvocations) => {
      const newConvocs = convocations.filter(c => !(c.id_match === matchId && c.id_joueur === joueurId));
      setConvocations(newConvocs);
    };
  
    const accepterConvocation = (matchId, joueurId, user, convocations, setConvocations, setActionJoueurEnCours) => {
      const newConvocs = convocations.map(c =>
        c.id_match === matchId && c.id_joueur === joueurId
          ? { ...c, statut: 'accepte' }
          : c
      );
      setConvocations(newConvocs);
      if (user?.role === 'joueur' && user.id === joueurId) {
        setActionJoueurEnCours(true);
      }
    };
  
    const refuserConvocation = (matchId, joueurId, user, convocations, setConvocations, setActionJoueurEnCours) => {
      const newConvocs = convocations.map(c =>
        c.id_match === matchId && c.id_joueur === joueurId
          ? { ...c, statut: 'refuse' }
          : c
      );
      setConvocations(newConvocs);
      if (user?.role === 'joueur' && user.id === joueurId) {
        setActionJoueurEnCours(true);
      }
    };
  
    return {
      convoquerJoueur,
      deconvoquerJoueur,
      accepterConvocation,
      refuserConvocation
    };
  };
  
  export default useConvocations;