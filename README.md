# Alien UI Kit (React)

[![Publish](https://github.com/alien-id/ui-kit-react/actions/workflows/publish.yml/badge.svg)](https://github.com/alien-id/ui-kit-react/actions/workflows/publish.yml)
[![npm](https://img.shields.io/npm/v/@alien-id/ui-kit-react.svg)](https://www.npmjs.com/package/@alien-id/ui-kit-react)

React component library for building Alien miniapps. Ships accessible, themeable UI primitives with tree-shakeable ESM + CJS output.

## Storybook

Browse every component and its variants in the live Storybook:

📚 **https://main.dlgfhi9w9fg6u.amplifyapp.com**

## Installation

```bash
bun add @alien-id/ui-kit-react
# or
npm install @alien-id/ui-kit-react
```

Import styles once in your app entry:

```tsx
import "@alien-id/ui-kit-react/styles.css";
```

## Components

| Component | Description |
|-----------|-------------|
| **Buttons** | Primary, Secondary, Tertiary, and Tinted variants |
| **Input** | Basic text input |
| **FloatingLabelInput** | Input with animated floating label |
| **Textarea** | Accessible textarea with character counter and scroll fade |
| **BottomSheet** | Draggable bottom sheet built on `vaul-base` |
| **PriceChart** | Interactive area chart with period selection (separate subpath — see below) |

### PriceChart

Imported from a separate subpath so the rest of the kit stays importable in any environment:

```tsx
import { PriceChart } from "@alien-id/ui-kit-react/chart";
import "@alien-id/ui-kit-react/chart.css";
```

Its `@unovis` dependency uses extensionless directory imports that Node's strict ESM rejects, so the chart must be consumed through a bundler (Vite, webpack, Next, esbuild) — raw Node ESM / non-transpiled SSR is unsupported. Quarantining it here keeps the main entry safe to import everywhere.

## Theming

Theming is driven by CSS custom properties. See [`styles/global.css`](./styles/global.css) for the full list of available variables.

## Development

```bash
bun install
bun run storybook   # run Storybook locally at :6006
bun run test        # run the Vitest suite
bun run build       # build ESM + CJS + styles
```
