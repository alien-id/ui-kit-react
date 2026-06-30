# @alien-id/ui-kit-react

UI components for Alien miniapps.

## Installation

```bash
bun add @alien-id/ui-kit-react
# or
npm install @alien-id/ui-kit-react
```

Import styles in your app entry:

```tsx
import "@alien-id/ui-kit-react/styles.css";
```

## Storybook

Browse all components and their variants in the live Storybook:

**https://main.d1duwphdfo3vec.amplifyapp.com**

To run Storybook locally:

```bash
npm run storybook
```

## Components

- **Buttons** — Primary, Secondary, Tertiary, Tinted variants
- **Input** — Basic text input
- **FloatingLabelInput** — Input with animated floating label
- **BottomSheet** — Draggable bottom sheet built on vaul-base
- **PriceChart** — Interactive area chart with period selection. Imported from a separate subpath so the rest of the kit stays importable in any environment:

  ```tsx
  import { PriceChart } from "@alien-id/ui-kit-react/chart";
  import "@alien-id/ui-kit-react/chart.css";
  ```

  Its `@unovis` dependency uses extensionless directory imports that Node's strict ESM rejects, so the chart must be consumed through a bundler (Vite, webpack, Next, esbuild) — raw Node ESM / non-transpiled SSR is unsupported. Quarantining it here keeps the main entry safe to import everywhere (the rest of the package tree-shakes on its own via per-module output, so this split is about ESM compatibility, not bundle size).

See the [Storybook](https://main.d1duwphdfo3vec.amplifyapp.com) for live examples, props, and usage.

## Theming

CSS custom properties are used for theming — see `styles/global.css` for available variables.
