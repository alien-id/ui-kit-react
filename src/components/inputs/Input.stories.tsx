import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    style: { color: '#fff' },
  },
};

export const WithLabel: Story = {
  args: {
    defaultValue: 'Hello world',
    style: { color: '#fff' },
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    style: { color: '#fff' },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    style: { color: '#fff' },
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': 'true',
    defaultValue: 'Invalid value',
    style: { color: '#fff' },
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 320,
      }}
    >
      <Input placeholder="Default" style={{ color: '#fff' }} />
      <Input defaultValue="With value" style={{ color: '#fff' }} />
      <Input type="password" placeholder="Password" style={{ color: '#fff' }} />
      <Input disabled placeholder="Disabled" style={{ color: '#fff' }} />
      <Input
        aria-invalid="true"
        defaultValue="Invalid"
        style={{ color: '#fff' }}
      />
    </div>
  ),
};
