/*export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const formattedDate = formatDate(date); // Formatting the date
  return `${formattedDate} ${hours}:${minutes}`;
}*/

export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  const amPM = hours >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM
  const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
  const formattedDate = formatDate(date); // Formatting the date
  return `${formattedDate} ${formattedHours}:${minutes} ${amPM}`; // Include AM/PM 
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
