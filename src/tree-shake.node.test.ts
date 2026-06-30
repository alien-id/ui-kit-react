import { build } from 'esbuild';
import { expect, test } from 'vitest';

// Bundle a virtual entry that re-exports ONE symbol from the source barrel and
// report which node_modules actually end up SHIPPED in the output.
// NOTE: must read metafile.outputs[file].inputs (what's emitted), NOT
// metafile.inputs (every file *parsed* to do tree-shaking, which includes
// modules that get dropped). react is external (peer dep).
async function shipped(entryCode: string): Promise<string[]> {
  const result = await build({
    stdin: { contents: entryCode, resolveDir: process.cwd(), loader: 'js' },
    bundle: true,
    write: false,
    metafile: true,
    format: 'esm',
    logLevel: 'silent',
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    loader: { '.css': 'empty' },
  });
  const out = Object.values(result.metafile.outputs)[0];
  // Fail loud: an empty list would make every "ships no X" assertion pass
  // vacuously, hiding a real bundle leak instead of catching it.
  if (!out) throw new Error('esbuild emitted no output');
  return Object.keys(out.inputs);
}

test('PrimaryButton-only import ships no vaul-base and no @unovis', async () => {
  const files = await shipped("export { PrimaryButton } from './src/index.ts'");
  expect(files.some((f) => f.includes('vaul-base'))).toBe(false);
  expect(files.some((f) => f.includes('unovis'))).toBe(false);
});

test('BottomSheet import DOES ship vaul-base (it uses it)', async () => {
  const files = await shipped("export { BottomSheet } from './src/index.ts'");
  expect(files.some((f) => f.includes('vaul-base'))).toBe(true);
});

test('chart subpath ships @unovis; main entry never does', async () => {
  const chart = await shipped("export { PriceChart } from './src/chart.ts'");
  expect(chart.some((f) => f.includes('unovis'))).toBe(true);

  const main = await shipped("export * from './src/index.ts'");
  expect(main.some((f) => f.includes('unovis'))).toBe(false);
});
