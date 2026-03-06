# @alien_org/react-ui-kit

UI components for Alien miniapps.

## Installation

```bash
bun add @alien_org/react-ui-kit
# or
npm install @alien_org/react-ui-kit
```

Import styles in your app entry:

```tsx
import "@alien_org/react-ui-kit/styles.css";
```

## Components

### BottomSheet

Built on `vaul-base`. Sub-components `Close`, `Title`, and `Description` are available.

```tsx
import { BottomSheet } from "@alien_org/react-ui-kit";

function App() {
  return (
    <BottomSheet
      renderTrigger={(props) => (
        <button {...props} type="button">
          Open Bottom Sheet
        </button>
      )}
    >
      <BottomSheet.Title>Hello</BottomSheet.Title>
      <BottomSheet.Description>
        Drag the handle or tap outside to close.
      </BottomSheet.Description>
      <BottomSheet.Close
        render={(props) => <button {...props}>Got it</button>}
      />
    </BottomSheet>
  );
}
```

| Prop | Type | Description |
| --- | --- | --- |
| `renderTrigger` | `(props) => ReactNode` | Render prop for the trigger element. |
| `children` | `ReactNode` | Content inside the drawer. |
| `open` | `boolean` | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | Called when the open state changes. |
| `dismissible` | `boolean` | Whether the drawer can be dismissed. |

### Buttons

```tsx
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  TintedButton,
} from "@alien_org/react-ui-kit";

<PrimaryButton>Primary</PrimaryButton>
<SecondaryButton>Secondary</SecondaryButton>
<TertiaryButton>Tertiary</TertiaryButton>
<TintedButton>Tinted</TintedButton>
```

All button variants accept standard `<button>` HTML attributes.

### PriceChart

Interactive area chart for displaying price data with period selection.

```tsx
import { PriceChart } from "@alien_org/react-ui-kit";

<PriceChart
  data={[
    { timestamp: "2025-01-01T00:00:00Z", value: 100 },
    { timestamp: "2025-01-01T01:00:00Z", value: 105 },
  ]}
  label="Bitcoin"
  currency="USD"
  color="#F7931A"
/>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `PriceChartDataPoint[]` | — | Array of `{ timestamp, value }` objects. |
| `height` | `number` | `200` | Chart height in pixels. |
| `label` | `string` | — | Label displayed below the value. |
| `currency` | `string` | — | Currency label next to the value. |
| `color` | `string` | `#2979FF` | Accent color for the chart line and gradient. |
| `activePeriod` | `TimePeriod` | — | Controlled active period. |
| `periods` | `TimePeriod[]` | `['1H','1D','1W','1M']` | Available period buttons. |
| `onPeriodChange` | `(period) => void` | — | Called when a period button is clicked. |
| `onDataPointClick` | `(point) => void` | — | Called when a data point is clicked. |
| `formatValue` | `(value) => string` | — | Custom value formatter. |
| `showPeriodChange` | `boolean` | `true` | Show/hide period selector and change indicator. |

## Notes

- **Styles are required.** Import `@alien_org/react-ui-kit/styles.css` in your app entry.
- CSS custom properties are used for theming — see `styles/global.css` for available variables.
