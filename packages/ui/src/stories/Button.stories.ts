/* eslint-disable unicorn/filename-case */
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';

const meta = {
  title: 'MenuBoss/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
    width: '86px'
  }
};
