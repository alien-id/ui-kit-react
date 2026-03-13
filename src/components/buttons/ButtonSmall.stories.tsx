import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonSmall } from './button-small';
import {
  PrimaryButtonSmall,
  SecondaryButtonSmall,
  TertiaryButtonSmall,
  TintedButtonSmall,
} from './index';

const meta: Meta<typeof ButtonSmall> = {
  title: 'Components/ButtonSmall',
  component: ButtonSmall,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'tinted'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonSmall>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Small',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Small',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Small',
  },
};

export const Tinted: Story = {
  args: {
    variant: 'tinted',
    children: 'Tinted Small',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <PrimaryButtonSmall>Primary</PrimaryButtonSmall>
      <SecondaryButtonSmall>Secondary</SecondaryButtonSmall>
      <TertiaryButtonSmall>Tertiary</TertiaryButtonSmall>
      <TintedButtonSmall>Tinted</TintedButtonSmall>
      <PrimaryButtonSmall disabled>Disabled</PrimaryButtonSmall>
    </div>
  ),
};
