import { parseDate } from 'chrono-node';

export { parseDate };

export function formatDateToYMD(date: Date): string {
  const d = date.getUTCDate();
  const m = date.getUTCMonth() + 1; // month from 0 to 11
  const y = date.getUTCFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
