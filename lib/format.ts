export function formatCurrencyInINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // To avoid decimal places
  }).format(amount);
}

export function getInitialsFromName(name: string) {
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    // Take the first letter of the first and last name parts
    const initials =
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
    return initials.toUpperCase();
  } else if (nameParts.length === 1) {
    // If there is only one part, just return the first letter of this part
    return nameParts[0].charAt(0).toUpperCase();
  }
  return '';
}

export function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  // const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
