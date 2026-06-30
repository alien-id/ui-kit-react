// tsdown (unbundle) emits one CSS file per component; concatenate them into the
// two consumer-facing stylesheets. Chart CSS is kept separate so the main
// styles.css matches the JS quarantine — chart ships as its own ./chart entry.
// global.css (design tokens) leads both so each stylesheet is self-contained.
import { Glob } from 'bun';

const GLOBAL = 'dist/styles/global.css';

const join = async (files: string[]) =>
  (await Promise.all(files.map((f) => Bun.file(f).text()))).join('\n');

const all = (await Array.fromAsync(new Glob('components/*/*.css').scan('dist')))
  .sort()
  .map((f) => `dist/${f}`);
const isChart = (f: string) => f.includes('/charts/');

await Bun.write('dist/style.css', await join([GLOBAL, ...all.filter((f) => !isChart(f))]));
await Bun.write('dist/chart.css', await join([GLOBAL, ...all.filter(isChart)]));
