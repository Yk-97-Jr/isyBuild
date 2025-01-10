export const formatDate = (dateString: string | null | undefined, locale = 'fr-FR'): string => {
  // If the dateString is null or undefined, return a fallback string
  if (!dateString) {
    return 'N/A'; // Return "N/A" for null or undefined
  }

  // Try to create a Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Date invalide'; // Return "Date invalide" for invalid dates
  }

  // Check if seconds are present in the input string
  const includeSeconds = dateString.includes('T') && dateString.split('T')[1]?.includes(':');

  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...(includeSeconds && { second: '2-digit' }), // Conditionally add seconds
  });
};
