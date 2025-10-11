export function getTodayDateStr() {
  // Format: yyyy-mm-dd
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function formatDate(dateStr) {
  if (!dateStr) dateStr = getTodayDateStr();
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

export function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}