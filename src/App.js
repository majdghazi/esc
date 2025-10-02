import React, { useState, useEffect } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwnbaQ2YswMJZD8Mvxe1f25k07hcmsQeX-wHLVBko-O2AiaxJb8dQ6XGnEO6ph8ad6V/exec';

const lireGoogleSheets = async (onglet) => {
  try {
    const response = await fetch(`${SCRIPT_URL}?sheet=${onglet}`);
    const data = await response.json();
    return data.error ? [] : data;
  } catch (error) {
    console.error(`Erreur lecture ${onglet}:`, error);
    return [];
  }
};

const ecrireGoogleSheets = async (onglet, donnees) => {
  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: onglet, data: donnees })
    });
  } catch (error) {
    console.error(`Erreur écriture ${onglet}:`, error);
  }
};

const formaterDate = (dateStr) => {
  if (!dateStr) return '';
  if (dateStr.includes('/')) return dateStr;
  const date = new Date(dateStr);
  const jour = String(date.getDate()).padStart(2, '0');
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const annee = date.getFullYear();
  return `${jour}/${mois}/${annee}`;
};

const demoJoueurs = [
  { id: '1', nom: 'Isma', username: 'Isma', password: 'Coach2025', role: 'coach' },
  { id: '2', nom: 'Hicham', username: 'Hicham', password: 'Cappelle1234', role: 'joueur' },
  { id: '3', nom: 'Allan D', username: 'AllanD', password: 'Cappelle5678', role: 'joueur' },
  { id: '4', nom: 'Allan T', username: 'AllanT', password: 'Cappelle9012', role: 'joueur' },
  { id: '5', nom: 'Babak', username: 'Babak', password: 'Cappelle3456', role: 'joueur' },
  { id: '6', nom: 'Ben', username: 'Ben', password: 'Cappelle7890', role: 'joueur' },
  { id: '7', nom: 'Bob', username: 'Bob', password: 'Cappelle2345', role: 'joueur' },
  { id: '8', nom: 'Chico', username: 'Chico', password: 'Cappelle6789', role: 'joueur' },
  { id: '9', nom: 'Christopher', username: 'Christopher', password: 'Cappelle0123', role: 'joueur' },
  { id: '10', nom: 'Iheb', username: 'Iheb', password: 'Cappelle4567', role: 'joueur' },
  { id: '11', nom: 'Jason', username: 'Jason', password: 'Cappelle8901', role: 'joueur' },
  { id: '12', nom: 'Jordan', username: 'Jordan', password: 'Cappelle2346', role: 'joueur' },
  { id: '13', nom: 'Kevin', username: 'Kevin', password: 'Cappelle6780', role: 'joueur' },
  { id: '14', nom: 'Lionel', username: 'Lionel', password: 'Cappelle0124', role: 'joueur' },
  { id: '15', nom: 'Ludovic', username: 'Ludovic', password: 'Cappelle4568', role: 'joueur' },
  { id: '16', nom: 'Mathis', username: 'Mathis', password: 'Cappelle8902', role: 'joueur' },
  { id: '17', nom: 'Mohamed', username: 'Mohamed', password: 'Cappelle2347', role: 'joueur' },
  { id: '18', nom: 'Nolan', username: 'Nolan', password: 'Cappelle6781', role: 'joueur' },
  { id: '19', nom: 'Pierre', username: 'Pierre', password: 'Cappelle0125', role: 'joueur' },
  { id: '20', nom: 'Ringo', username: 'Ringo', password: 'Cappelle4569', role: 'joueur' },
  { id: '21', nom: 'Ryan', username: 'Ryan', password: 'Cappelle8903', role: 'joueur' },
  { id: '22', nom: 'Sanchez', username: 'Sanchez', password: 'Cappelle2348', role: 'joueur' },
  { id: '23', nom: 'Thomas', username: 'Thomas', password: 'Cappelle6782', role: 'joueur' },
  { id: '24', nom: 'Tonio', username: 'Tonio', password: 'Cappelle0126', role: 'joueur' },
  { id: '25', nom: 'Zak', username: 'Zak', password: 'Cappelle4570', role: 'joueur' }
];

const demoMatchs = [
  { id: '1', date: '07/09/2025', adversaire: 'ARMBOUTS CAPPEL US', domicile: 'false', statut: 'joue', scoreEquipe: 5, scoreAdversaire: 1 },
  { id: '2', date: '21/09/2025', adversaire: 'MONTS DE FLANDRE US 2', domicile: 'true', statut: 'joue', scoreEquipe: 6, scoreAdversaire: 2 },
  { id: '3', date: '05/10/2025', adversaire: 'DUNKERQUE USL 3', domicile: 'false', statut: 'avenir' },
  { id: '4', date: '19/10/2025', adversaire: 'WALLON CAPPEL US', domicile: 'true', statut: 'avenir' },
  { id: '5', date: '02/11/2025', adversaire: 'HAZEBROUCK AS CHTS', domicile: 'false', statut: 'avenir' },
  { id: '6', date: '09/11/2025', adversaire: 'LEFFRINCKOUCKE US 2', domicile: 'true', statut: 'avenir' },
  { id: '7', date: '23/11/2025', adversaire: 'BOURBOURG SC 2', domicile: 'false', statut: 'avenir' },
  { id: '8', date: '07/12/2025', adversaire: 'PONT DE NIEPPE AS', domicile: 'false', statut: 'avenir' },
  { id: '9', date: '14/12/2025', adversaire: 'STEENE FC', domicile: 'true', statut: 'avenir' },
  { id: '10', date: '08/02/2026', adversaire: 'STEENE FC', domicile: 'false', statut: 'avenir' },
  { id: '11', date: '15/02/2026', adversaire: 'ARMBOUTS CAPPEL US', domicile: 'true', statut: 'avenir' },
  { id: '12', date: '22/02/2026', adversaire: 'MONTS DE FLANDRE US 2', domicile: 'false', statut: 'avenir' },
  { id: '13', date: '08/03/2026', adversaire: 'DUNKERQUE USL 3', domicile: 'true', statut: 'avenir' },
  { id: '14', date: '15/03/2026', adversaire: 'WALLON CAPPEL US', domicile: 'false', statut: 'avenir' },
  { id: '15', date: '12/04/2026', adversaire: 'LEFFRINCKOUCKE US 2', domicile: 'false', statut: 'avenir' },
  { id: '16', date: '26/04/2026', adversaire: 'PONT DE NIEPPE AS', domicile: 'true', statut: 'avenir' },
  { id: '17', date: '10/05/2026', adversaire: 'HAZEBROUCK AS CHTS', domicile: 'true', statut: 'avenir' },
  { id: '18', date: '17/05/2026', adversaire: 'BOURBOURG SC 2', domicile: 'true', statut: 'avenir' }
];



const SimpleLineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const width = 600;
  const height = 250;
  const padding = 50;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const maxNote = 10;
  const points = data.map((item, index) => {
    const x = padding + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const y = height - padding - (item.note / maxNote) * chartHeight;
    return { x, y, note: item.note, match: item.match };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg width="100%" height="250" viewBox={`0 0 ${width} ${height}`} style={{maxWidth: '100%'}}>
      {[0, 2.5, 5, 7.5, 10].map(val => {
        const y = height - padding - (val / maxNote) * chartHeight;
        return (
          <g key={val}>
            <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e5e7eb" strokeDasharray="3,3" />
            <text x={padding - 10} y={y + 5} textAnchor="end" fontSize="12" fill="#6b7280">{val}</text>
          </g>
        );
      })}

      <path d={pathData} fill="none" stroke="#ff8800" strokeWidth="3" />

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#ff8800" />
          <title>{`${p.match}: ${p.note}/10`}</title>
        </g>
      ))}

      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#1f2937" strokeWidth="2" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#1f2937" strokeWidth="2" />
    </svg>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [joueurs, setJoueurs] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [convocations, setConvocations] = useState([]);
  const [notes, setNotes] = useState([]);
  const [buteurs, setButeurs] = useState([]);
  const [tempsDeJeu, setTempsDeJeu] = useState([]);
  const [passesD, setPassesD] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [view, setView] = useState('matchs');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [noteInputs, setNoteInputs] = useState({});
  const [butInputs, setButInputs] = useState({});
  const [tempsInputs, setTempsInputs] = useState({});
  const [passesInputs, setPassesInputs] = useState({});
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chargerDonnees = async () => {
      setLoading(true);
      const [joueursData, matchsData, convocsData, notesData, buteursData, tempsData, passesData] = await Promise.all([
        lireGoogleSheets('Joueurs'),
        lireGoogleSheets('Matchs'),
        lireGoogleSheets('Convocations'),
        lireGoogleSheets('Notes'),
        lireGoogleSheets('Buteurs'),
        lireGoogleSheets('TempsDeJeu'),
        lireGoogleSheets('PassesD')
      ]);
      
      setJoueurs(joueursData.length > 0 ? joueursData : demoJoueurs);
      setMatchs(matchsData.length > 0 ? matchsData : demoMatchs);
      setConvocations(convocsData);
      setNotes(notesData);
      setButeurs(buteursData);
      setTempsDeJeu(tempsData);
      setPassesD(passesData);
      
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      setLoading(false);
      isInitialLoad.current = false;
    };
    
    chargerDonnees();
  }, []);

  const isInitialLoad = React.useRef(true);

  useEffect(() => {
    if (!isInitialLoad.current && convocations.length > 0) {
      ecrireGoogleSheets('Convocations', convocations);
    }
  }, [convocations]);
  
  useEffect(() => {
    if (!isInitialLoad.current) {
      ecrireGoogleSheets('Notes', notes);
    }
  }, [notes]);
  
  useEffect(() => {
    if (!isInitialLoad.current) {
      ecrireGoogleSheets('Buteurs', buteurs);
    }
  }, [buteurs]);

  useEffect(() => {
    if (!isInitialLoad.current) {
      ecrireGoogleSheets('TempsDeJeu', tempsDeJeu);
    }
  }, [tempsDeJeu]);

  useEffect(() => {
    if (!isInitialLoad.current) {
      ecrireGoogleSheets('PassesD', passesD);
    }
  }, [passesD]);

  const handleLogin = () => {
    const joueur = joueurs.find(j => j.username === loginUsername && j.password === loginPassword);
    if (joueur) {
      setUser(joueur);
      localStorage.setItem('currentUser', JSON.stringify(joueur));
    } else {
      alert('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setSelectedMatch(null);
    setLoginUsername('');
    setLoginPassword('');
    setView('matchs');
  };

  const convoquerJoueur = (matchId, joueurId) => {
    const newConvocs = [...convocations];
    newConvocs.push({ id_match: matchId, id_joueur: joueurId, convoque: true });
    setConvocations(newConvocs);
  };

  const deconvoquerJoueur = (matchId, joueurId) => {
    const newConvocs = convocations.filter(c => !(c.id_match === matchId && c.id_joueur === joueurId));
    setConvocations(newConvocs);
  };

  const setNoteJoueur = (matchId, joueurId, noteValue) => {
    const newNotes = notes.filter(n => !(n.id_match === matchId && n.id_joueur === joueurId));
    newNotes.push({ id_match: matchId, id_joueur: joueurId, note: parseFloat(noteValue) });
    setNotes(newNotes);
    setEditingNote(null);
  };

  const setButsJoueur = (matchId, joueurId, butsValue) => {
    const newButeurs = buteurs.filter(b => !(b.id_match === matchId && b.id_joueur === joueurId));
    if (butsValue !== '' && butsValue !== null && butsValue !== undefined) {
      const buts = parseInt(butsValue);
      if (buts >= 0) {
        newButeurs.push({ id_match: matchId, id_joueur: joueurId, buts: buts });
      }
    }
    setButeurs(newButeurs);
  };

  const handleNoteChange = (joueurId, value) => {
    setNoteInputs({ ...noteInputs, [joueurId]: value });
  };

  const handleButsChange = (joueurId, value) => {
    setButInputs({ ...butInputs, [joueurId]: value });
  };

  const handleTempsChange = (joueurId, value) => {
    setTempsInputs({ ...tempsInputs, [joueurId]: value });
  };

  const handlePassesChange = (joueurId, value) => {
    setPassesInputs({ ...passesInputs, [joueurId]: value });
  };

  const saveNote = (joueurId) => {
    const noteValue = noteInputs[joueurId];
    
    if (noteValue === '' || noteValue === null || noteValue === undefined) {
      const newNotes = notes.filter(n => !(n.id_match === selectedMatch && n.id_joueur === joueurId));
      setNotes(newNotes);
      setEditingNote(null);
      setNoteInputs({ ...noteInputs, [joueurId]: '' });
    }
    else if (noteValue >= 1 && noteValue <= 9) {
      setNoteJoueur(selectedMatch, joueurId, noteValue);
      setNoteInputs({ ...noteInputs, [joueurId]: '' });
    }
    else {
      alert('La note doit être comprise entre 1 et 9');
    }
  };

  const saveButs = (joueurId) => {
    const butsValue = butInputs[joueurId];
    
    if (butsValue === '' || butsValue === null || butsValue === undefined) {
      const newButeurs = buteurs.filter(b => !(b.id_match === selectedMatch && b.id_joueur === joueurId));
      setButeurs(newButeurs);
      setButInputs({ ...butInputs, [joueurId]: '' });
    }
    else {
      const buts = parseInt(butsValue);
      if (buts >= 0 && buts <= 15) {
        setButsJoueur(selectedMatch, joueurId, butsValue);
        setButInputs({ ...butInputs, [joueurId]: '' });
      } else {
        alert('Le nombre de buts doit être compris entre 0 et 15');
      }
    }
  };

  const saveTemps = (joueurId) => {
    const tempsValue = tempsInputs[joueurId];
    
    if (tempsValue === '' || tempsValue === null || tempsValue === undefined) {
      const newTemps = tempsDeJeu.filter(t => !(t.id_match === selectedMatch && t.id_joueur === joueurId));
      setTempsDeJeu(newTemps);
      setTempsInputs({ ...tempsInputs, [joueurId]: '' });
    }
    else {
      const temps = parseInt(tempsValue);
      if (temps >= 0 && temps <= 120) {
        const newTemps = tempsDeJeu.filter(t => !(t.id_match === selectedMatch && t.id_joueur === joueurId));
        newTemps.push({ id_match: selectedMatch, id_joueur: joueurId, temps: temps });
        setTempsDeJeu(newTemps);
        setTempsInputs({ ...tempsInputs, [joueurId]: '' });
      } else {
        alert('Le temps de jeu doit être compris entre 0 et 120 minutes');
      }
    }
  };
  
  const savePasses = (joueurId) => {
    const passesValue = passesInputs[joueurId];
    
    if (passesValue === '' || passesValue === null || passesValue === undefined) {
      const newPasses = passesD.filter(p => !(p.id_match === selectedMatch && p.id_joueur === joueurId));
      setPassesD(newPasses);
      setPassesInputs({ ...passesInputs, [joueurId]: '' });
    }
    else {
      const passes = parseInt(passesValue);
      if (passes >= 0 && passes <= 30) {
        const newPasses = passesD.filter(p => !(p.id_match === selectedMatch && p.id_joueur === joueurId));
        newPasses.push({ id_match: selectedMatch, id_joueur: joueurId, passes: passes });
        setPassesD(newPasses);
        setPassesInputs({ ...passesInputs, [joueurId]: '' });
      } else {
        alert('Le nombre de passes D doit être compris entre 0 et 30');
      }
    }
  };

  const isConvoque = (matchId, joueurId) => {
    return convocations.some(c => c.id_match === matchId && c.id_joueur === joueurId && c.convoque);
  };

  const getNote = (matchId, joueurId) => {
    const note = notes.find(n => n.id_match === matchId && n.id_joueur === joueurId);
    return note?.note;
  };

  const getButs = (matchId, joueurId) => {
    const but = buteurs.find(b => b.id_match === matchId && b.id_joueur === joueurId);
    return but?.buts || 0;
  };

  const getTemps = (matchId, joueurId) => {
    const temps = tempsDeJeu.find(t => t.id_match === matchId && t.id_joueur === joueurId);
    return temps?.temps || 0;
  };
  
  const getPasses = (matchId, joueurId) => {
    const passes = passesD.find(p => p.id_match === matchId && p.id_joueur === joueurId);
    return passes?.passes || 0;
  };

  const getTotalButs = (joueurId) => {
    return buteurs
      .filter(b => b.id_joueur === joueurId)
      .reduce((sum, b) => sum + b.buts, 0);
  };
  const getTotalTemps = (joueurId) => {
    return tempsDeJeu
      .filter(t => t.id_joueur === joueurId)
      .reduce((sum, t) => sum + t.temps, 0);
  };
  
  const getTotalPasses = (joueurId) => {
    return passesD
      .filter(p => p.id_joueur === joueurId)
      .reduce((sum, p) => sum + p.passes, 0);
  };

  if (loading) {
    return (
      <div style={{minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center', color: 'white'}}>
          <img src="/logo_esc.png" alt="ESC Cappelle" style={{height: '120px', width: 'auto', marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(255, 136, 0, 0.5))'}} />
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>⚽</div>
          <p style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Chargement...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div style={{minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
        <div style={{background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(255, 136, 0, 0.5)', padding: '2.5rem', width: '100%', maxWidth: '28rem', border: '2px solid #ff8800'}}>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <img src="/logo_esc.png" alt="ESC Cappelle" style={{height: '100px', width: 'auto', marginBottom: '1rem'}} />
            <h1 style={{fontSize: '2rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem'}}>ESC Cappelle</h1>
            <p style={{color: '#ff8800', fontWeight: '600'}}>Équipe Séniors D3 - Équipe B</p>
          </div>
  
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>Identifiant</label>
            <input
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', fontSize: '1rem'}}
              placeholder="Votre pseudo"
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>Mot de passe</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', fontSize: '1rem'}}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            style={{width: '100%', background: '#ff8800', color: 'white', padding: '0.875rem', borderRadius: '0.75rem', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '1rem'}}
          >
            Se connecter
          </button>

          <div style={{marginTop: '1.5rem', padding: '1rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.75rem'}}>
            <p style={{fontSize: '0.875rem', color: '#9a3412', lineHeight: '1.5'}}>
              <strong>Mode démo</strong><br/>
              Coach: Isma / Coach2025<br/>
              Joueur: Hicham / Cappelle1234
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (user.role === 'coach') {
    const matchEnCours = matchs.find(m => m.id === selectedMatch);
    const joueursList = joueurs.filter(j => j.role === 'joueur');

    return (
      <div style={{minHeight: '100vh', background: '#f9fafb'}}>
       <div style={{background: '#000000', color: 'white', padding: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)', borderBottom: '3px solid #ff8800'}}>
  <div style={{maxWidth: '72rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <img src="/logo_esc.png" alt="ESC Cappelle" style={{height: '60px', width: 'auto'}} />
      <div>
        <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>Interface Coach</h1>
        <p style={{margin: 0, color: '#ff8800', fontWeight: '600'}}>ESC Cappelle - {user.nom}</p>
      </div>
    </div>
            <div>
              <button onClick={() => window.location.reload()} style={{background: '#6b7280', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', color: 'white', cursor: 'pointer', fontWeight: '600', marginRight: '0.5rem'}}>
                Actualiser
              </button>
              <button onClick={handleLogout} style={{background: '#ff8800', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', color: 'white', cursor: 'pointer', fontWeight: '600'}}>
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        <div style={{maxWidth: '72rem', margin: '1.5rem auto', padding: '0 1rem', paddingBottom: '2rem'}}>
          {!selectedMatch && (
            <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
              <button
                onClick={() => setView('matchs')}
                style={{flex: '1 1 200px', padding: '0.75rem', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer', background: view === 'matchs' ? '#ff8800' : 'white', color: view === 'matchs' ? 'white' : '#1f2937', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}
              >
                📅 Matchs ({matchs.length})
              </button>
              <button
                onClick={() => setView('joueurs')}
                style={{flex: '1 1 200px', padding: '0.75rem', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer', background: view === 'joueurs' ? '#ff8800' : 'white', color: view === 'joueurs' ? 'white' : '#1f2937', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}
              >
                👥 Joueurs ({joueursList.length})
              </button>
            </div>
          )}

          {view === 'matchs' && !selectedMatch && (
            <div style={{display: 'grid', gap: '1rem'}}>
              {matchs.map(match => {
                const resultat = match.statut === 'joue' ? 
                  (match.scoreEquipe > match.scoreAdversaire ? 'Victoire' : 
                   match.scoreEquipe < match.scoreAdversaire ? 'Défaite' : 'Nul') : null;

                return (
                  <div key={match.id} onClick={() => setSelectedMatch(match.id)} style={{background: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div style={{flex: 1}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap'}}>
                          <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: match.statut === 'joue' ? '#1f2937' : '#fff7ed', color: match.statut === 'joue' ? 'white' : '#ff8800'}}>
                            {match.statut === 'joue' ? 'JOUÉ' : 'À VENIR'}
                          </span>
                          {match.statut === 'joue' && resultat && (
                            <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: resultat === 'Victoire' ? '#dcfce7' : resultat === 'Défaite' ? '#fee2e2' : '#f3f4f6', color: resultat === 'Victoire' ? '#166534' : resultat === 'Défaite' ? '#dc2626' : '#6b7280'}}>
                              {resultat}
                            </span>
                          )}
                          <span style={{fontSize: '0.875rem', color: '#6b7280'}}>{formaterDate(match.date)}</span>
                        </div>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937', margin: 0}}>{match.adversaire}</h3>
                        <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem'}}>
                          {match.domicile === 'true' ? '🏠 Domicile' : '✈️ Extérieur'}
                          {match.statut === 'joue' && ` • Score: ${match.scoreEquipe} - ${match.scoreAdversaire}`}
                        </p>
                      </div>
                      <div style={{fontSize: '1.5rem', color: '#ff8800'}}>→</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {view === 'matchs' && selectedMatch && matchEnCours && (
            <div style={{background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '1.5rem'}}>
              <button onClick={() => setSelectedMatch(null)} style={{marginBottom: '1rem', color: '#ff8800', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>
                ← Retour aux matchs
              </button>
              <div style={{marginBottom: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap'}}>
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', background: matchEnCours.statut === 'joue' ? '#1f2937' : '#fff7ed', color: matchEnCours.statut === 'joue' ? 'white' : '#ff8800'}}>
                    {matchEnCours.statut === 'joue' ? 'JOUÉ' : 'À VENIR'}
                  </span>
                  <span style={{color: '#6b7280'}}>{formaterDate(matchEnCours.date)}</span>
                </div>
                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>{matchEnCours.adversaire}</h2>
                <p style={{color: '#6b7280', marginTop: '0.25rem'}}>
                  {matchEnCours.domicile === 'true' ? 'Domicile' : 'Extérieur'}
                  {matchEnCours.statut === 'joue' && ` • Score: ${matchEnCours.scoreEquipe} - ${matchEnCours.scoreAdversaire}`}
                </p>
              </div>

              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>
                {matchEnCours.statut === 'joue' ? 'Joueurs convoqués' : `Sélection des joueurs (${joueursList.filter(j => isConvoque(selectedMatch, j.id)).length}/${joueursList.length})`}
              </h3>

              <div style={{display: 'grid', gap: '0.5rem'}}>
                {joueursList.map(joueur => {
                  const convoque = isConvoque(selectedMatch, joueur.id);
                  const note = getNote(selectedMatch, joueur.id);
                  const buts = getButs(selectedMatch, joueur.id);
                  const temps = getTemps(selectedMatch, joueur.id);
                  const passes = getPasses(selectedMatch, joueur.id);
                  const isEditing = editingNote === joueur.id;
                  
                  if (matchEnCours.statut === 'joue' && !convoque) return null;
                  
                  return (
                    <div key={joueur.id} style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', flexWrap: 'wrap'}}>
                      <div style={{flex: '1 1 150px'}}>
                        <p style={{fontWeight: '600', color: '#1f2937', margin: 0}}>{joueur.nom}</p>
                        <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>@{joueur.username}</p>
                      </div>
                      {matchEnCours.statut === 'avenir' && (
  <div style={{display: 'flex', gap: '0.5rem'}}>
    {!convoque ? (
      <button
        onClick={() => convoquerJoueur(selectedMatch, joueur.id)}
        style={{padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #ff8800', cursor: 'pointer', background: '#ff8800', color: 'white', fontWeight: '700', fontSize: '0.875rem', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(255, 136, 0, 0.3)'}}
      >
        ✓ Convoquer
      </button>
    ) : (
      <button
        onClick={() => deconvoquerJoueur(selectedMatch, joueur.id)}
        style={{padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: '2px solid #000000', cursor: 'pointer', background: '#000000', color: 'white', fontWeight: '700', fontSize: '0.875rem', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}
      >
        ✕ Déconvoquer
      </button>
    )}
  </div>
)}

{matchEnCours.statut === 'joue' && (
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
   {!isEditing && (note || buts > 0 || temps > 0 || passes > 0) ? (
  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
    {note && (
      <span style={{background: '#ff8800', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem'}}>{note}/10</span>
    )}
    {buts > 0 && (
      <span style={{background: '#fff7ed', color: '#9a3412', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem'}}>
        ⚽ {buts} but{buts > 1 ? 's' : ''}
      </span>
    )}
    {temps > 0 && (
      <span style={{background: '#f3f4f6', color: '#1f2937', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem'}}>
        ⏱️ {temps} min
      </span>
    )}
    {passes > 0 && (
      <span style={{background: '#dbeafe', color: '#1e40af', padding: '0.5rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem'}}>
        🎯 {passes} passes D
      </span>
    )}
                            <button
  onClick={() => {
    setEditingNote(joueur.id);
    setNoteInputs({ ...noteInputs, [joueur.id]: note });
    setButInputs({ ...butInputs, [joueur.id]: buts || '' });
    setTempsInputs({ ...tempsInputs, [joueur.id]: temps || '' });
    setPassesInputs({ ...passesInputs, [joueur.id]: passes || '' });
  }}
  style={{background: '#6b7280', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem'}}
>
  ✏️
</button>
<button
  onClick={() => {
    const newNotes = notes.filter(n => !(n.id_match === selectedMatch && n.id_joueur === joueur.id));
    setNotes(newNotes);
    const newButeurs = buteurs.filter(b => !(b.id_match === selectedMatch && b.id_joueur === joueur.id));
    setButeurs(newButeurs);
    const newTemps = tempsDeJeu.filter(t => !(t.id_match === selectedMatch && t.id_joueur === joueur.id));
    setTempsDeJeu(newTemps);
    const newPasses = passesD.filter(p => !(p.id_match === selectedMatch && p.id_joueur === joueur.id));
    setPassesD(newPasses);
  }}
  style={{background: '#dc2626', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem'}}
>
  🗑️
</button>
                            </div>
                        ) : (
                          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                            <input
                              type="number"
                              min="1"
                              max="9"
                              step="0.5"
                              placeholder="Note"
                              value={noteInputs[joueur.id] ?? ''}
                              onChange={(e) => handleNoteChange(joueur.id, e.target.value)}
                              style={{width: '4.5rem', padding: '0.5rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem'}}
                            />
                            <input
                              type="number"
                              min="0"
                              max="15"
                              placeholder="Buts"
                              value={butInputs[joueur.id] ?? ''}
                              onChange={(e) => handleButsChange(joueur.id, e.target.value)}
                              style={{width: '4rem', padding: '0.5rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem'}}
                            />
                            <input
                              type="number"
                              min="0"
                              max="120"
                              placeholder="Temps"
                              value={tempsInputs[joueur.id] ?? ''}
                              onChange={(e) => handleTempsChange(joueur.id, e.target.value)}
                              style={{width: '5rem', padding: '0.5rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem'}}
                            />
                            <input
                              type="number"
                              min="0"
                              max="30"
                              placeholder="Passes D"
                              value={passesInputs[joueur.id] ?? ''}
                              onChange={(e) => handlePassesChange(joueur.id, e.target.value)}
                              style={{width: '6rem', padding: '0.5rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem'}}
                            />
                            <button
                              onClick={() => {
                                saveNote(joueur.id);
                                saveButs(joueur.id);
                                saveTemps(joueur.id);
                                savePasses(joueur.id);
                              }}
                              style={{background: '#ff8800', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem'}}
                            >
                              OK
                            </button>
                          </div>
                        )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === 'joueurs' && (
            <div style={{display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
              {joueursList.map(joueur => {
                const notesJoueur = notes.filter(n => n.id_joueur === joueur.id && n.note);
                const moyenne = notesJoueur.length > 0
                  ? (notesJoueur.reduce((sum, n) => sum + n.note, 0) / notesJoueur.length).toFixed(1)
                  : '-';
                const nbConvocs = convocations.filter(c => c.id_joueur === joueur.id && c.convoque).length;
                const totalButs = getTotalButs(joueur.id);
                const totalTemps = getTotalTemps(joueur.id);
                const totalPasses = getTotalPasses(joueur.id);
                
                return (
                  <div key={joueur.id} style={{background: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
                    <div style={{marginBottom: '0.75rem'}}>
                      <div style={{marginBottom: '0.5rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937', margin: 0}}>{joueur.nom}</h3>
                        <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>@{joueur.username}</p>
                      </div>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '0.75rem'}}>
                        <div style={{textAlign: 'center', background: '#fff7ed', padding: '0.75rem', borderRadius: '0.5rem'}}>
                          <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Moyenne</p>
                          <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff8800', margin: 0}}>{moyenne}</p>
                        </div>
                        <div style={{textAlign: 'center', background: '#fff7ed', padding: '0.75rem', borderRadius: '0.5rem'}}>
                          <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Buts</p>
                          <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff8800', margin: 0}}>{totalButs}</p>
                        </div>
                        <div style={{textAlign: 'center', background: '#f3f4f6', padding: '0.75rem', borderRadius: '0.5rem'}}>
                          <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Temps (min)</p>
                          <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>{totalTemps}</p>
                        </div>
                        <div style={{textAlign: 'center', background: '#dbeafe', padding: '0.75rem', borderRadius: '0.5rem'}}>
                          <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Passes D</p>
                          <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af', margin: 0}}>{totalPasses}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: '0.5rem', fontSize: '0.875rem', flexWrap: 'wrap'}}>
                      <div style={{background: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '9999px'}}>
                        <span style={{color: '#1f2937', fontWeight: '600'}}>{notesJoueur.length} matchs</span>
                      </div>
                      <div style={{background: '#fff7ed', padding: '0.25rem 0.75rem', borderRadius: '9999px'}}>
                        <span style={{color: '#9a3412', fontWeight: '600'}}>{nbConvocs} convocs</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  const mesConvocations = convocations.filter(c => c.id_joueur === user.id && c.convoque);
  const mesNotes = notes.filter(n => n.id_joueur === user.id && n.note);
  const mesButs = getTotalButs(user.id);
  const monTemps = getTotalTemps(user.id);
  const mesPasses = getTotalPasses(user.id);
  
  const moyenne = mesNotes.length > 0
    ? (mesNotes.reduce((sum, n) => sum + n.note, 0) / mesNotes.length).toFixed(1)
    : '-';

  const prochainMatch = matchs.find(m => m.statut === 'avenir');
  const suisConvoqueProchainMatch = prochainMatch && mesConvocations.some(c => c.id_match === prochainMatch.id);

  const graphData = mesNotes.map(n => {
    const match = matchs.find(m => m.id === n.id_match);
    return {
      match: match?.adversaire?.substring(0, 12) || 'Match',
      note: n.note
    };
  });

  return (
    <div style={{minHeight: '100vh', background: '#f9fafb'}}>
      <div style={{background: '#000000', color: 'white', padding: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)', borderBottom: '3px solid #ff8800'}}>
  <div style={{maxWidth: '64rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <img src="/logo_esc.png" alt="ESC Cappelle" style={{height: '60px', width: 'auto'}} />
      <div>
        <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>Mon Espace Joueur</h1>
        <p style={{margin: 0, color: '#ff8800', fontWeight: '600'}}>ESC Cappelle - {user.nom}</p>
      </div>
    </div>
          <div>
            <button onClick={() => window.location.reload()} style={{background: '#6b7280', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', color: 'white', cursor: 'pointer', fontWeight: '600', marginRight: '0.5rem'}}>
              Actualiser
            </button>
            <button onClick={handleLogout} style={{background: '#ff8800', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', color: 'white', cursor: 'pointer', fontWeight: '600'}}>
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth: '64rem', margin: '1.5rem auto', padding: '0 1rem', paddingBottom: '2rem'}}>
        {prochainMatch && (
          <div style={{padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem', background: suisConvoqueProchainMatch ? 'linear-gradient(90deg, #ff8800 0%, #ff6600 100%)' : 'white', color: suisConvoqueProchainMatch ? 'white' : '#1f2937', border: suisConvoqueProchainMatch ? 'none' : '2px solid #e5e7eb'}}>
            <div style={{fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', opacity: 0.9}}>
              📅 Prochain match
            </div>
            <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem'}}>{prochainMatch.adversaire}</h2>
            <p style={{marginBottom: '1rem', opacity: 0.9}}>{formaterDate(prochainMatch.date)} - {prochainMatch.domicile === 'true' ? 'Domicile' : 'Extérieur'}</p>
            <div style={{fontSize: '1.125rem', fontWeight: 'bold'}}>
              {suisConvoqueProchainMatch ? '✓ Vous êtes convoqué' : '✕ Non convoqué'}
            </div>
          </div>
        )}

        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
          <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Mes statistiques</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.75rem', textAlign: 'center'}}>
  <div style={{background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem'}}>
    <p style={{color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.25rem'}}>Matchs</p>
    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>{mesNotes.length}</p>
  </div>
  <div style={{background: '#fff7ed', padding: '1rem', borderRadius: '0.5rem'}}>
    <p style={{color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.25rem'}}>Moyenne</p>
    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff8800', margin: 0}}>{moyenne}</p>
  </div>
  <div style={{background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem'}}>
    <p style={{color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.25rem'}}>Convocs</p>
    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>{mesConvocations.length}</p>
  </div>
  <div style={{background: '#fff7ed', padding: '1rem', borderRadius: '0.5rem'}}>
    <p style={{color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.25rem'}}>Buts</p>
    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff8800', margin: 0}}>{mesButs}</p>
  </div>
  <div style={{background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem'}}>
    <p style={{color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.25rem'}}>Temps (min)</p>
    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>{monTemps}</p>
  </div>
  <div style={{background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem'}}>
    <p style={{color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.25rem'}}>Passes D</p>
    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af', margin: 0}}>{mesPasses}</p>
  </div>
</div>
        </div>

        {graphData.length > 0 && (
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem'}}>
            <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>
              📈 Ma progression
            </h2>
            <SimpleLineChart data={graphData} />
          </div>
        )}

        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
          <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>Historique</h2>
          {mesNotes.length === 0 ? (
            <div style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>
              <p>Aucune note enregistrée.</p>
            </div>
          ) : (
            <div style={{display: 'grid', gap: '0.75rem'}}>
{mesNotes.sort((a, b) => b.id_match - a.id_match).map((n, idx) => {
  const match = matchs.find(m => m.id === n.id_match);
  const butsDuMatch = getButs(match.id, user.id);
  const tempsDuMatch = getTemps(match.id, user.id);
  const passesDuMatch = getPasses(match.id, user.id);
  return (
    <div key={idx} style={{padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem'}}>
        <div>
          <p style={{fontWeight: '600', color: '#1f2937', margin: 0}}>{match?.adversaire}</p>
          <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>{formaterDate(match?.date)}</p>
        </div>
        <span style={{background: '#ff8800', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold'}}>
          {n.note}/10
        </span>
      </div>
      {(butsDuMatch > 0 || tempsDuMatch > 0 || passesDuMatch > 0) && (
        <div style={{marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          {butsDuMatch > 0 && (
            <span style={{background: '#fff7ed', color: '#9a3412', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600'}}>
              ⚽ {butsDuMatch} but{butsDuMatch > 1 ? 's' : ''}
            </span>
          )}
          {tempsDuMatch > 0 && (
            <span style={{background: '#f3f4f6', color: '#1f2937', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600'}}>
              ⏱️ {tempsDuMatch} min
            </span>
          )}
          {passesDuMatch > 0 && (
            <span style={{background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600'}}>
              🎯 {passesDuMatch} passes D
            </span>
          )}
        </div>
      )}
    </div>
  );
})}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;