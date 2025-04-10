/* eslint-disable unicorn/filename-case */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';
import { UnderlineInput } from '../components';

const meta = {
  title: 'MenuBoss/UnderlineInput',
  component: UnderlineInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof UnderlineInput>;

export default meta;

export const Default = () => {
  const { register } = useForm();
  const [isFocus, setFocus] = useState(false);

  return (
    <UnderlineInput
      type="text"
      name="name"
      register={register}
      placeholder="test"
      width="216px"
      handleFocus={() => console.log('handleFocus')}
      isFocus={isFocus}
      onBlur={() => console.log('onBlur')}
      setFocus={() => setFocus(!isFocus)}
    />
  );
};
