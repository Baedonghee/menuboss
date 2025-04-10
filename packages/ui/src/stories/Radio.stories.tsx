/* eslint-disable unicorn/filename-case */
/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../components';

const meta = {
  title: 'MenuBoss/Radio',
  component: Radio,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true
  }
};
