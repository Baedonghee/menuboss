/* eslint-disable unicorn/filename-case */
/* eslint-disable react/react-in-jsx-scope */
import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';

import { theme } from '@repo/ui/theme';
import { Input } from '../components';
import { CheckFilled } from '../components/SVG/icons';

const meta = {
  title: 'MenuBoss/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Input>;

export default meta;

export const Default = () => {
  const { register } = useForm();

  return (
    <Input
      type="text"
      name="name"
      register={register}
      placeholder="test"
      size="l"
      icon={<CheckFilled width="16" height="16" color={theme.color.green500} />}
      success="success"
      iconAlign="right"
    />
  );
};
