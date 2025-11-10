const useConvocations = () => {
    const convoquerJoueur = (matchId, joueurId, convocations, setConvocations) => {
      const newConvocs = [...convocations];
      newConvocs.push({ id_match: matchId, id_joueur: joueurId, est_convoque: true, statut: 'en_attente', coach_a_envoye: true });
      setConvocations(newConvocs);
    };
  
    const deconvoquerJoueur = (matchId, joueurId, convocations, setConvocations) => {
      const newConvocs = convocations.filter(c => !(c.id_match === matchId && c.id_joueur === joueurId));
      setConvocations(newConvocs);
    };
  
    const accepterConvocation = (matchId, joueurId, user, convocations, setConvocations) => {
      const newConvocs = convocations.map(c =>
        c.id_match === matchId && c.id_joueur === joueurId
          ? { ...c, statut: 'accepte' }
          : c
      );
      setConvocations(newConvocs);
    };
  
    const refuserConvocation = (matchId, joueurId, user, convocations, setConvocations) => {
      const newConvocs = convocations.map(c =>
        c.id_match === matchId && c.id_joueur === joueurId
          ? { ...c, statut: 'refuse' }
          : c
      );
      setConvocations(newConvocs);
    };
  
    return {
      convoquerJoueur,
      deconvoquerJoueur,
      accepterConvocation,
      refuserConvocation
    };
  };
  
  export default useConvocations;