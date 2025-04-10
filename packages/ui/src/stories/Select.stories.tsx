/* eslint-disable unicorn/filename-case */
/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components';

const meta = {
  title: 'MenuBoss/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Select>;

export default meta;

const list = [
  {
    value: 'test1',
    name: 'test1'
  },
  {
    value: 'test2',
    name: 'test2'
  }
];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    list,
    width: '147px',
    placeholder: 'Placeholder'
  }
};
