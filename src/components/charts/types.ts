export interface PriceChartDataPoint {
  timestamp: string | number;
  value: number;
}

export type TimePeriod = '1H' | '1D' | '1W' | '1M';

export interface PriceChartProps {
  data: PriceChartDataPoint[];
  height?: number;
  label?: string;
  currency?: string;
  activePeriod?: TimePeriod;
  periods?: TimePeriod[];
  onPeriodChange?: (period: TimePeriod) => void;
  onDataPointClick?: (point: PriceChartDataPoint) => void;
  formatValue?: (value: number) => string;
  color?: string;
  className?: string;
  showPeriodChange?: boolean;
}
