import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: { control: 'text' },
    showCount: { control: 'boolean' },
    maxLength: { control: 'number' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Briefly describe what happened or what's not working",
    rows: 6,
    style: { color: '#fff', maxWidth: 353 },
  },
};

export const WithCounter: Story = {
  args: {
    placeholder: "Briefly describe what happened or what's not working",
    showCount: true,
    maxLength: 1000,
    rows: 6,
    style: { color: '#fff', maxWidth: 353 },
  },
};

export const Filled: Story = {
  args: {
    showCount: true,
    maxLength: 1000,
    rows: 6,
    defaultValue:
      'The app keeps freezing on the home screen when I open the notifications tab. Sometimes it takes 5–10 seconds to respond, and other times it crashes completely.',
    style: { color: '#fff', maxWidth: 353 },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
    rows: 6,
    style: { color: '#fff', maxWidth: 353 },
  },
};
