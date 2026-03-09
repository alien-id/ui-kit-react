import type { Meta, StoryObj } from '@storybook/react-vite';
import { FloatingLabelInput } from './floating-label-input';

const meta: Meta<typeof FloatingLabelInput> = {
  title: 'Components/FloatingLabelInput',
  component: FloatingLabelInput,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingLabelInput>;

export const Default: Story = {
  args: {
    id: 'default',
    label: 'Email address',
    style: { color: '#fff' },
  },
};

export const WithValue: Story = {
  args: {
    id: 'with-value',
    label: 'Email address',
    defaultValue: 'hello@alien.com',
    style: { color: '#fff' },
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    label: 'Email address',
    disabled: true,
    style: { color: '#fff' },
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 360,
      }}
    >
      <FloatingLabelInput
        id="s-empty"
        label="Empty"
        style={{ color: '#fff' }}
      />
      <FloatingLabelInput
        id="s-filled"
        label="With value"
        defaultValue="hello@alien.com"
        style={{ color: '#fff' }}
      />
      <FloatingLabelInput
        id="s-disabled"
        label="Disabled"
        disabled
        style={{ color: '#fff' }}
      />
    </div>
  ),
};
