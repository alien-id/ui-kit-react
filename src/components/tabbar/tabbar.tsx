import '../../styles/global.css';
import './tabbar.css';
import { useRef } from 'react';
import { cn } from '../../helpers/cn';
import type { TabbarProps } from './types';

export const Tabbar = <T extends string = string>({
  tabs,
  value,
  onChange,
  className,
  ...props
}: TabbarProps<T>) => {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // WAI-ARIA tabs pattern: arrows/Home/End move focus and activate (automatic activation).
  const select = (index: number) => {
    const tab = tabs[index];
    if (!tab) return;
    onChange(tab.value);
    refs.current[index]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = tabs.length - 1;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        select(i === last ? 0 : i + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        select(i === 0 ? last : i - 1);
        break;
      case 'Home':
        e.preventDefault();
        select(0);
        break;
      case 'End':
        e.preventDefault();
        select(last);
        break;
    }
  };

  // Roving tabindex needs exactly one tab in the tab order. If `value` matches
  // no tab, keep the first one focusable so the control stays keyboard-reachable.
  const focusIndex = Math.max(
    0,
    tabs.findIndex((t) => t.value === value),
  );

  return (
    <div role="tablist" className={cn('alien-tabbar', className)} {...props}>
      {tabs.map((tab, i) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={i === focusIndex ? 0 : -1}
            className={cn(
              'alien-tabbar-tab',
              selected && 'alien-tabbar-tab-active',
            )}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
