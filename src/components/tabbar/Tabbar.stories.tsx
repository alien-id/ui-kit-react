import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabbar } from './tabbar';

const meta: Meta<typeof Tabbar> = {
  title: 'Components/Tabbar',
  component: Tabbar,
};

export default meta;
type Story = StoryObj<typeof Tabbar>;

const tabs = [
  { value: 'all', label: 'All' },
  { value: 'surveys', label: 'Surveys' },
  { value: 'videos', label: 'Videos' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('all');
    return <Tabbar tabs={tabs} value={value} onChange={setValue} />;
  },
};
