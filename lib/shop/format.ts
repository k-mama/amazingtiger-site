export function formatMoney(amount: number, numberLocale: string): string {
  return amount.toLocaleString(numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
