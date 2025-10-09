export const getCouleurNote = (note) => {
    if (note >= 7) return { bg: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: 'white', emoji: '🔥' };
    if (note >= 5) return { bg: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)', color: 'white', emoji: '👍' };
    return { bg: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)', color: 'white', emoji: '💪' };
  };
  
  export const getCouleurEquipe = (note) => {
    if (note >= 7) return { bg: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: 'white', emoji: '🏆', text: 'Excellente performance !' };
    if (note >= 5) return { bg: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)', color: 'white', emoji: '⚽', text: 'Performance correcte' };
    return { bg: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)', color: 'white', emoji: '💪', text: 'À améliorer ensemble' };
  };
  
  export const getCouleurEvaluation = (note) => {
    if (note >= 8) return { 
      bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
      color: 'white', 
      emoji: '🔥',
      text: 'Excellent',
      border: '#059669'
    };
    if (note >= 6.5) return { 
      bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
      color: 'white', 
      emoji: '⭐',
      text: 'Très bien',
      border: '#2563eb'
    };
    if (note >= 5) return { 
      bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
      color: 'white', 
      emoji: '👍',
      text: 'Bien',
      border: '#d97706'
    };
    return { 
      bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
      color: 'white', 
      emoji: '💪',
      text: 'À améliorer',
      border: '#dc2626'
    };
  };