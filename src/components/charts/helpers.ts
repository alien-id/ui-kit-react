import { PERIOD_TIME_FORMAT } from './const';
import type { TimePeriod } from './types';

export function formatTimestamp(
  timestamp: string | number,
  period?: TimePeriod,
): string {
  if (typeof timestamp === 'number') return String(timestamp);
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return String(timestamp);
  const opts = period ? PERIOD_TIME_FORMAT[period] : undefined;
  return date.toLocaleString(undefined, opts);
}

export const defaultFormatValue = (v: number) =>
  v < 0.01 && v > 0 ? v.toFixed(6) : v.toFixed(2);
