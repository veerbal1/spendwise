export function formatCurrencyInINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // To avoid decimal places
  }).format(amount);
}
