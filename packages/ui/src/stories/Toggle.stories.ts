/* eslint-disable unicorn/filename-case */
/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import Toggle from '../components/Toggle';

const meta = {
  title: 'MenuBoss/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true
  }
};
