import { useState } from 'react';

const usePlayerStats = () => {
  const [noteInputs, setNoteInputs] = useState({});
  const [butInputs, setButInputs] = useState({});
  const [tempsInputs, setTempsInputs] = useState({});
  const [passesInputs, setPassesInputs] = useState({});
  const [editingNote, setEditingNote] = useState(null);

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

  return {
    noteInputs,
    setNoteInputs,
    butInputs,
    setButInputs,
    tempsInputs,
    setTempsInputs,
    passesInputs,
    setPassesInputs,
    editingNote,
    setEditingNote,
    handleNoteChange,
    handleButsChange,
    handleTempsChange,
    handlePassesChange
  };
};

export default usePlayerStats;