# @alien-id/react-ui-kit

UI components for Alien miniapps.

## Storybook

Browse all components and their variants in the live Storybook:

**https://main.d1duwphdfo3vec.amplifyapp.com**

To run Storybook locally:

```bash
npm run storybook
```

## Installation

```bash
bun add @alien-id/react-ui-kit
# or
npm install @alien-id/react-ui-kit
```

Import styles in your app entry:

```tsx
import "@alien-id/react-ui-kit/styles.css";
```

## Components

- **Buttons** — Primary, Secondary, Tertiary, Tinted variants
- **Input** — Basic text input
- **FloatingLabelInput** — Input with animated floating label
- **BottomSheet** — Draggable bottom sheet built on vaul-base
- **PriceChart** — Interactive area chart with period selection

See the [Storybook](https://main.d1duwphdfo3vec.amplifyapp.com) for live examples, props, and usage.

## Theming

CSS custom properties are used for theming — see `styles/global.css` for available variables.
