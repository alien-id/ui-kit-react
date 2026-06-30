import { act, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { Tabbar } from './tabbar';

let root: Root;
let host: HTMLElement;

function Harness() {
  const [value, setValue] = useState('all');
  return (
    <Tabbar
      tabs={[
        { value: 'all', label: 'All' },
        { value: 'surveys', label: 'Surveys' },
        { value: 'videos', label: 'Videos' },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
});

test('keyboard nav: roving tabindex + arrow wrap-around + Home/End', async () => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => {
    root.render(<Harness />);
  });

  const all = page.getByRole('tab', { name: 'All' });
  const surveys = page.getByRole('tab', { name: 'Surveys' });
  const videos = page.getByRole('tab', { name: 'Videos' });

  // roving tabindex: only the selected tab is in the tab order
  await expect.element(all).toHaveAttribute('aria-selected', 'true');
  await expect.element(all).toHaveAttribute('tabindex', '0');
  await expect.element(surveys).toHaveAttribute('tabindex', '-1');

  (all.element() as HTMLElement).focus();
  await userEvent.keyboard('{ArrowRight}');
  await expect.element(surveys).toHaveAttribute('aria-selected', 'true');

  // wrap forward off the end: videos -> all
  await userEvent.keyboard('{ArrowRight}{ArrowRight}');
  await expect.element(all).toHaveAttribute('aria-selected', 'true');

  // wrap backward off the start: all -> videos
  await userEvent.keyboard('{ArrowLeft}');
  await expect.element(videos).toHaveAttribute('aria-selected', 'true');

  await userEvent.keyboard('{Home}');
  await expect.element(all).toHaveAttribute('aria-selected', 'true');
  await userEvent.keyboard('{End}');
  await expect.element(videos).toHaveAttribute('aria-selected', 'true');
});

test('value matching no tab keeps the first tab keyboard-reachable', async () => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => {
    root.render(
      <Tabbar
        tabs={[
          { value: 'all', label: 'All' },
          { value: 'surveys', label: 'Surveys' },
        ]}
        value="nonexistent"
        onChange={() => {}}
      />,
    );
  });

  // WAI-ARIA requires exactly one tab in the tab order. With nothing selected,
  // the first tab must stay focusable or the control is unreachable by Tab.
  const all = page.getByRole('tab', { name: 'All' });
  await expect.element(all).toHaveAttribute('tabindex', '0');
  await expect.element(all).toHaveAttribute('aria-selected', 'false');
  await expect
    .element(page.getByRole('tab', { name: 'Surveys' }))
    .toHaveAttribute('tabindex', '-1');
});
