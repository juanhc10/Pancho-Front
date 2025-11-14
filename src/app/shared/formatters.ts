export function formatLanguage(idioma: string): string {
  if (!idioma) return '';
  let corrected = idioma.toUpperCase();
  if (corrected === 'ESPANIOL') {
    corrected = 'ESPAÑOL';
  }
  const lower = corrected.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
