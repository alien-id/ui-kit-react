import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/chart.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  treeshake: true,
  // Preserve per-module structure so a consumer's bundler can drop unused
  // components: importing PrimaryButton must NOT pull vaul-base (BottomSheet's
  // dep). A single bundle can't separate them; per-module output can.
  unbundle: true,
  target: 'esnext',
});
