import React, { useRef } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';

import { theme } from '../../styles/theme';

import Box from '../Box';
import Typography from '../Typography';
import { IMoreMenuList } from '../../types';

const MoreMenuWrapper = styled(Box)`
  position: absolute;
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  z-index: 1;
  ul {
    border-radius: 8px;
    background: ${({ theme }) => theme.color.white};
    box-shadow:
      4px 0px 5px 0px rgba(0, 0, 0, 0.1),
      0px 4px 5px 0px rgba(0, 0, 0, 0.1);
    width: ${({ width }) => width};
    li {
      display: flex;
      height: 44px;
      cursor: pointer;
      align-items: center;
      padding-left: 16px;
      &:first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      &:hover {
        background-color: ${({ theme }) => theme.color.gray50};
      }
    }
  }
`;

interface IMoreMenu {
  top?: number | string;
  right?: number | string;
  left?: number | string;
  bottom?: number | string;
  list: IMoreMenuList[];
  handleClose: (e: MouseEvent) => void;
  width?: string;
}

const MoreMenu: React.FC<IMoreMenu> = ({
  top,
  right,
  left,
  bottom,
  list,
  width = '160px',
  handleClose
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, handleClose);

  return (
    <MoreMenuWrapper ref={ref} top={top} right={right} left={left} bottom={bottom} width={width}>
      <ul>
        {list.map((item, index) => (
          <li key={`more-menu-${index}`} onClick={item.onClick}>
            {item.icon}
            <Typography
              fontSize={theme.fontSize.text14}
              color={item.color}
              ml="8px"
              fontWeight={theme.fontWeight.normal}
            >
              {item.name}
            </Typography>
          </li>
        ))}
      </ul>
    </MoreMenuWrapper>
  );
};

export default MoreMenu;
