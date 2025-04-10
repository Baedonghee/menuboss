import React from 'react';
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps
} from '@techstack/styled-system';
import classNames from 'classnames';
import styled from 'styled-components';

import { theme } from '../../styles/theme';
import RadioOff from '../SVG/icons/radio-off';
import RadioOn from '../SVG/icons/radio-on';

interface IRadio extends LayoutProps, SpaceProps, FlexboxProps {
  checked?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
}

type StyledTypes = LayoutProps & SpaceProps & FlexboxProps;

const RadioWrapper = styled.div<StyledTypes>`
  ${layout}
  ${space}
  ${flexbox}
  cursor: pointer;
  display: flex;
`;

const Radio: React.FC<IRadio> = ({
  checked = false,
  className,
  onClick,
  disabled = false,
  ...props
}) => {
  const onCheckClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <RadioWrapper onClick={onCheckClick} className={classNames(className)} {...props}>
      {checked ? (
        <RadioOn width="24" height="24" color={theme.color.primary500} />
      ) : (
        <RadioOff width="24" height="24" color={theme.color.gray300} />
      )}
    </RadioWrapper>
  );
};

export default Radio;
