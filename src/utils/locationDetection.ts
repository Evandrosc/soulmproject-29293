export async function detectUserCity(): Promise<string> {
  // Detecta cidade pelo IP usando ipapi.co
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.city || 'sua cidade';
  } catch (error) {
    console.log('Não foi possível detectar cidade pelo IP');
    return 'sua cidade';
  }
}
