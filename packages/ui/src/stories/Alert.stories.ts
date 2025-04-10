/* eslint-disable unicorn/filename-case */
import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from '../components';

const meta = {
  title: 'MenuBoss/Alert',
  component: Alert,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    language: 'en',
    alertType: 'alert',
    confirmText: 'OK',
    description: 'description',
    title: 'title',
    type: 'check'
  }
};
