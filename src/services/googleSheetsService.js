const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwnbaQ2YswMJZD8Mvxe1f25k07hcmsQeX-wHLVBko-O2AiaxJb8dQ6XGnEO6ph8ad6V/exec';

export const lireGoogleSheets = async (onglet) => {
  try {
    const response = await fetch(`${SCRIPT_URL}?sheet=${onglet}`);
    const data = await response.json();
    return data.error ? [] : data;
  } catch (error) {
    console.error(`Erreur lecture ${onglet}:`, error);
    return [];
  }
};

export const ecrireGoogleSheets = async (onglet, donnees) => {
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