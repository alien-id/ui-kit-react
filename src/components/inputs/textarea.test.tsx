import { act, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { Textarea } from './textarea';

let root: Root;
let host: HTMLElement;

function mount(node: React.ReactNode) {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  return act(async () => {
    root.render(node);
  });
}

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
});

test('uncontrolled: counter starts from defaultValue and tracks typing', async () => {
  await mount(<Textarea showCount maxLength={1000} defaultValue="hi" />);

  await expect.element(page.getByText('2/1000')).toBeInTheDocument();

  const ta = page.getByRole('textbox');
  await userEvent.type(ta, 'ya');
  await expect.element(page.getByText('4/1000')).toBeInTheDocument();
});

test('no counter rendered unless showCount is set', async () => {
  await mount(<Textarea maxLength={1000} defaultValue="hi" />);
  expect(document.body.textContent).not.toContain('/1000');
});

test('controlled: counter reflects the value prop', async () => {
  function Controlled() {
    const [v, setV] = useState('hello');
    return (
      <Textarea
        showCount
        maxLength={1000}
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
    );
  }
  await mount(<Controlled />);
  await expect.element(page.getByText('5/1000')).toBeInTheDocument();

  await userEvent.type(page.getByRole('textbox'), '!');
  await expect.element(page.getByText('6/1000')).toBeInTheDocument();
});

test('showCount without maxLength shows a bare count', async () => {
  await mount(<Textarea showCount defaultValue="abc" />);
  await expect.element(page.getByText('3')).toBeInTheDocument();
});
