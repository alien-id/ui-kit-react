import type { TimePeriod } from './types';

export const DEFAULT_COLOR = '#2979FF';

export const PERIOD_LABELS: Record<TimePeriod, string> = {
  '1H': 'Today',
  '1D': 'Today',
  '1W': 'This week',
  '1M': 'This month',
};

export const PERIOD_TIME_FORMAT: Record<
  TimePeriod,
  Intl.DateTimeFormatOptions
> = {
  '1H': { hour: '2-digit', minute: '2-digit' },
  '1D': { hour: '2-digit', minute: '2-digit' },
  '1W': { month: 'short', day: 'numeric' },
  '1M': { month: 'short', day: 'numeric' },
};
