'use client';

import { memo, useCallback, useId, useRef, useState } from 'react';

import { VisArea, VisXYContainer } from '@unovis/react';
import { CurveType } from '@unovis/ts';
import { cn } from '../../helpers/cn';
import { DEFAULT_COLOR, PERIOD_LABELS } from './const';
import { defaultFormatValue, formatTimestamp } from './helpers';
import './price-chart.css';
import type { PriceChartDataPoint, PriceChartProps, TimePeriod } from './types';

export const PriceChart = memo(
  ({
    data,
    height = 200,
    label,
    currency,
    activePeriod: controlledPeriod,
    periods = ['1H', '1D', '1W', '1M'],
    onPeriodChange,
    onDataPointClick,
    formatValue = defaultFormatValue,
    color = DEFAULT_COLOR,
    className,
    showPeriodChange = true,
  }: PriceChartProps) => {
    const id = useId();
    const safeId = id.replace(/:/g, '');
    const gradientId = `price-chart-gradient-${safeId}`;

    const [internalPeriod, setInternalPeriod] = useState<TimePeriod>('1D');
    const activePeriod = controlledPeriod ?? internalPeriod;
    const lastHoveredDatum = useRef<PriceChartDataPoint | null>(null);
    const chartRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const crosshairRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLSpanElement>(null);
    const changeRef = useRef<HTMLSpanElement>(null);
    const periodLabelRef = useRef<HTMLSpanElement>(null);

    const handlePeriodChange = useCallback(
      (period: TimePeriod) => {
        setInternalPeriod(period);
        onPeriodChange?.(period);
      },
      [onPeriodChange],
    );

    const x = useCallback((_d: PriceChartDataPoint, i: number) => i, []);
    const y = useCallback((d: PriceChartDataPoint) => d.value, []);

    const lastPoint = data.length ? data[data.length - 1] : null;
    const firstValue = data[0]?.value ?? 0;

    const getDisplayInfo = useCallback(
      (point: PriceChartDataPoint | null) => {
        const displayPoint = point ?? lastPoint;
        const displayValue = displayPoint
          ? formatValue(displayPoint.value)
          : '—';
        const changePercent =
          displayPoint && data.length >= 2 && firstValue !== 0
            ? ((displayPoint.value - firstValue) / firstValue) * 100
            : 0;
        const isPositive = changePercent >= 0;
        const periodLabel = point
          ? formatTimestamp(point.timestamp, activePeriod)
          : (PERIOD_LABELS[activePeriod] ?? activePeriod);
        return { displayValue, changePercent, isPositive, periodLabel };
      },
      [lastPoint, firstValue, data.length, formatValue, activePeriod],
    );

    const updateHeader = useCallback(
      (point: PriceChartDataPoint | null) => {
        const { displayValue, changePercent, isPositive, periodLabel } =
          getDisplayInfo(point);

        if (valueRef.current) {
          valueRef.current.textContent = `${displayValue} ${currency || ''}`;
        }
        if (changeRef.current) {
          changeRef.current.textContent = `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`;
          changeRef.current.className = cn(
            'alien-price-chart-change-text',
            isPositive
              ? 'alien-price-chart-change-text--positive'
              : 'alien-price-chart-change-text--negative',
          );
        }
        if (periodLabelRef.current) {
          periodLabelRef.current.textContent = periodLabel;
        }
      },
      [getDisplayInfo, currency],
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const chart = chartRef.current;
        if (!chart || data.length < 2) return;

        const rect = chart.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
        const idx = Math.round(ratio * (data.length - 1));
        const datum = data[idx];
        if (!datum) return;

        lastHoveredDatum.current = datum;
        updateHeader(datum);

        const snappedX = (idx / (data.length - 1)) * rect.width;

        const line = crosshairRef.current;
        if (line) {
          line.style.left = `${snappedX}px`;
          line.style.opacity = '1';
        }

        const overlay = overlayRef.current;
        if (overlay) {
          overlay.style.left = `${snappedX}px`;
          overlay.style.width = `${rect.width - snappedX}px`;
          overlay.style.opacity = '1';
        }

        const dot = dotRef.current;
        if (dot) {
          const maxValue = Math.max(...data.map((d) => d.value));
          const yPixel =
            height - (height - 10) * (datum.value / (maxValue || 1));
          dot.style.left = `${snappedX - 4}px`;
          dot.style.top = `${yPixel - 4}px`;
          dot.style.opacity = '1';
        }
      },
      [data, height, updateHeader],
    );

    const handleMouseLeave = useCallback(() => {
      lastHoveredDatum.current = null;
      updateHeader(null);

      const line = crosshairRef.current;
      if (line) line.style.opacity = '0';
      const overlay = overlayRef.current;
      if (overlay) overlay.style.opacity = '0';
      const dot = dotRef.current;
      if (dot) dot.style.opacity = '0';
    }, [updateHeader]);

    const handleChartClick = useCallback(() => {
      if (lastHoveredDatum.current && onDataPointClick) {
        onDataPointClick(lastHoveredDatum.current);
      }
    }, [onDataPointClick]);

    const handleChartKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleChartClick();
        }
      },
      [handleChartClick],
    );

    const initial = getDisplayInfo(null);

    return (
      <div className={cn('alien-price-chart', className)}>
        <div className="alien-price-chart-header">
          <div className="alien-price-chart-info">
            <span ref={valueRef} className="alien-price-chart-value">
              {initial.displayValue} {currency || ''}
            </span>
            {label && <span className="alien-price-chart-label">{label}</span>}
          </div>
          <div
            className={cn(
              'alien-price-chart-stats',
              showPeriodChange
                ? 'alien-price-chart-stats--end'
                : 'alien-price-chart-stats--start',
            )}
          >
            {showPeriodChange && (
              <div className="alien-price-chart-change">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="10"
                    fill={initial.isPositive ? color : '#F43F5D'}
                    fillOpacity="0.16"
                  />
                  {initial.isPositive ? (
                    <path
                      d="M7 13L13 7M13 7H8M13 7V12"
                      stroke={color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M7 7L13 13M13 13H8M13 13V8"
                      stroke="#F43F5D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>

                <span
                  ref={changeRef}
                  className={cn(
                    'alien-price-chart-change-text',
                    initial.isPositive
                      ? 'alien-price-chart-change-text--positive'
                      : 'alien-price-chart-change-text--negative',
                  )}
                >
                  {initial.isPositive ? '+' : ''}
                  {initial.changePercent.toFixed(2)}%
                </span>
              </div>
            )}
            <span
              ref={periodLabelRef}
              className="alien-price-chart-period-label"
            >
              {initial.periodLabel}
            </span>
          </div>
        </div>

        <button
          ref={chartRef}
          className="alien-price-chart-area"
          type="button"
          tabIndex={0}
          onClick={handleChartClick}
          onKeyDown={handleChartKeyDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <VisXYContainer
            data={data}
            height={height}
            padding={{ top: 10, bottom: 0, left: 0, right: 0 }}
            autoMargin={false}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            svgDefs={`
            <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
            </linearGradient>
          `}
          >
            <VisArea
              x={x}
              y={y}
              color={`url(#${gradientId})`}
              curveType={CurveType.MonotoneX}
              line={true}
              lineColor={color}
              lineWidth={2.5}
              opacity={1}
            />
          </VisXYContainer>
          <div
            ref={crosshairRef}
            className="alien-price-chart-crosshair"
            style={{
              background: 'rgba(141,141,141,0.24)',
              opacity: 0,
              transition: 'none',
            }}
          />
          <div
            ref={overlayRef}
            className="alien-price-chart-overlay"
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              opacity: 0,
              transition: 'none',
            }}
          />
          <div
            ref={dotRef}
            className="alien-price-chart-dot"
            style={{ background: color, opacity: 0, transition: 'none' }}
          />
        </button>

        {periods.length > 0 && (
          <div className="alien-price-chart-periods">
            {periods.map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => handlePeriodChange(period)}
                className={cn(
                  'alien-price-chart-period-btn',
                  activePeriod === period &&
                    'alien-price-chart-period-btn--active',
                )}
              >
                {period}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

PriceChart.displayName = 'PriceChart';
