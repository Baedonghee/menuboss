/* eslint-disable unicorn/filename-case */
/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from '../components';

const meta = {
  title: 'MenuBoss/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'test',
    checked: true
  }
};

export const Circle: Story = {
  args: {
    name: 'test',
    checked: true,
    type: 'square',
    children: 'label'
  }
};
