export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const formattedDate = formatDate(date); // Formatting the date
  return `${formattedDate} ${hours}:${minutes}`;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const currentYear = new Date().getFullYear(); // Get current year
  if (year === currentYear) return `${month}-${day}`; // Format: MM-DD
  return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}
