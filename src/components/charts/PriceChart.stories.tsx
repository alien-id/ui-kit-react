import type { Meta, StoryObj } from '@storybook/react-vite';
import { PriceChart } from './index';
import type { PriceChartDataPoint } from './types';

function generateData(
  points: number,
  base: number,
  volatility: number,
): PriceChartDataPoint[] {
  const now = Date.now();
  let value = base;
  return Array.from({ length: points }, (_, i) => {
    value += (Math.random() - 0.48) * volatility;
    value = Math.max(value * 0.5, value);
    return {
      timestamp: new Date(now - (points - i) * 60_000).toISOString(),
      value: Math.round(value * 100) / 100,
    };
  });
}

const sampleData = generateData(60, 67_420, 150);

const meta: Meta<typeof PriceChart> = {
  title: 'Components/PriceChart',
  component: PriceChart,
  argTypes: {
    color: { control: 'color' },
    height: { control: { type: 'range', min: 100, max: 400 } },
    showPeriodChange: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, background: '#000', borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PriceChart>;

export const Default: Story = {
  args: {
    data: sampleData,
    label: 'Bitcoin',
    currency: 'USD',
    color: '#F7931A',
    height: 200,
  },
};

export const CustomColor: Story = {
  args: {
    data: generateData(60, 3_820, 25),
    label: 'Ethereum',
    currency: 'USD',
    color: '#627EEA',
    height: 200,
  },
};

export const NoPeriodChange: Story = {
  args: {
    data: sampleData,
    label: 'Bitcoin',
    currency: 'USD',
    color: '#F7931A',
    showPeriodChange: false,
  },
};
