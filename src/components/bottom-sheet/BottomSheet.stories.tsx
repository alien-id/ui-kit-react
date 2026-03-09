import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomSheet } from '.';
import { Button } from '../buttons/button';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const WithTrigger: Story = {
  render: () => (
    <BottomSheet
      renderTrigger={(props) => (
        <Button {...props} variant="primary">
          Open Bottom Sheet
        </Button>
      )}
    >
      <BottomSheet.Title style={{ color: '#fff' }}>
        Sheet Title
      </BottomSheet.Title>
      <BottomSheet.Description style={{ color: '#fff' }}>
        This is a demo of the BottomSheet component. Drag the handle or tap
        outside to close.
      </BottomSheet.Description>
      <div
        style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}
      >
        <BottomSheet.Close
          render={(props) => (
            <Button {...props} variant="primary">
              Got it
            </Button>
          )}
        />
      </div>
    </BottomSheet>
  ),
};
