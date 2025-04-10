import React from 'react';
import { layout, LayoutProps, space, SpaceProps } from '@techstack/styled-system';
import classNames from 'classnames';
import styled from 'styled-components';

import { theme } from '../../styles/theme';
import CheckboxCircleDisabled from '../SVG/icons/checkbox-circle-disabled';
import CheckboxCircleOff from '../SVG/icons/checkbox-circle-off';
import CheckboxCircleOn from '../SVG/icons/checkbox-circle-on';
import CheckboxSquareDisabled from '../SVG/icons/checkbox-square-disabled';
import CheckboxSquareOff from '../SVG/icons/checkbox-square-off';
import CheckboxSquareOn from '../SVG/icons/checkbox-square-on';

interface ICheckBox extends LayoutProps, SpaceProps {
  name: string;
  children?: React.ReactNode;
  checked?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: 'square' | 'circle';
  width?: string;
  height?: string;
}

interface IStyle extends LayoutProps, SpaceProps {
  $children: boolean;
}

const CheckBoxWrapper = styled.div<IStyle>`
  ${layout}
  ${space}
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: ${({ $children }) => ($children ? '12px' : '0px')};
  }
  label {
    font-size: ${({ theme }) => theme.fontSize.text14};
    cursor: pointer;
  }
  &.disabled {
    cursor: not-allowed;
  }
`;

const CheckBox: React.FC<ICheckBox> = ({
  name,
  checked = false,
  children,
  className,
  onClick,
  disabled = false,
  type = 'square',
  width = '24',
  height = '24',
  ...props
}) => {
  const onCheckClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <CheckBoxWrapper
      onClick={onCheckClick}
      className={classNames(className, {
        disabled
      })}
      $children={!!children}
      {...props}
    >
      {type === 'square' ? (
        disabled ? (
          <CheckboxSquareDisabled width={width} height={height} />
        ) : checked ? (
          <CheckboxSquareOn width={width} height={height} color={theme.color.primary500} />
        ) : (
          <CheckboxSquareOff width={width} height={height} color={theme.color.gray300} />
        )
      ) : null}
      {type === 'circle' ? (
        disabled ? (
          <CheckboxCircleDisabled width={width} height={height} />
        ) : checked ? (
          <CheckboxCircleOn width={width} height={height} color={theme.color.primary500} />
        ) : (
          <CheckboxCircleOff width={width} height={height} color={theme.color.gray300} />
        )
      ) : null}
      {children && <label htmlFor={name}>{children}</label>}
    </CheckBoxWrapper>
  );
};

export default CheckBox;
