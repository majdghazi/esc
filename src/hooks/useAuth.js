import { useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = (joueurs, showNotification) => {
    const joueur = joueurs.find(j => j.username === loginUsername && j.password === loginPassword);
    if (joueur) {
      setUser(joueur);
      localStorage.setItem('currentUser', JSON.stringify(joueur));
    } else {
      showNotification('Identifiants incorrects', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setLoginUsername('');
    setLoginPassword('');
  };

  const loadUserFromStorage = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  return {
    user,
    setUser,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    handleLogin,
    handleLogout,
    loadUserFromStorage
  };
};

export default useAuth;