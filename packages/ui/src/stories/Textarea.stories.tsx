/* eslint-disable unicorn/filename-case */
/* eslint-disable react/react-in-jsx-scope */
import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';
import { Textarea } from '../components';

const meta = {
  title: 'MenuBoss/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Textarea>;

export default meta;

export const Default = () => {
  const { register } = useForm();

  return <Textarea name="name" register={register} placeholder="test" />;
};
