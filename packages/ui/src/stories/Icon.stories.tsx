/* eslint-disable unicorn/filename-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable unicorn/filename-case */
import type { Meta } from '@storybook/react';
import styled from 'styled-components';
import { theme } from '@repo/ui/theme';
import SVG from '../components/SVG';
import { After } from '../components/SVG/icons';

const meta = {
  title: 'MenuBoss/Icon',
  component: SVG,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof SVG>;

export default meta;

const IconWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    & > div {
      text-align: center;
    }
  }
`;

export const Icon = () => (
  <IconWrapper>
    <li>
      <div>
        <After width="20" height="20" color={theme.color.black} />
      </div>
      <div>After</div>
    </li>
  </IconWrapper>
);
