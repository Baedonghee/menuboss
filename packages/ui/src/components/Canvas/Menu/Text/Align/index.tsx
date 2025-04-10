import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import { theme } from '../../../../../styles/theme';
import { Box } from '../../../..';
import {
  CanvasTextAlignCenter,
  CanvasTextAlignLeft,
  CanvasTextAlignRight
} from '../../../../SVG/icons';

const AlignWrapper = styled((props: any) => <Box {...props} />)`
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.gray300};
  position: absolute;
  z-index: 3;
  top: 36px;
  left: 0px;
  background-color: ${({ theme }) => theme.color.white};
  .align-item {
    &:hover {
      background-color: ${({ theme }) => theme.color.gray100};
    }
    &.active {
      background-color: ${({ theme }) => theme.color.gray200};
    }
  }
`;

interface IAlign {
  align: 'left' | 'center' | 'right';
  handleAlign: (align: 'left' | 'center' | 'right') => void;
}

const Align: React.FC<IAlign> = ({ align, handleAlign }) => {
  return (
    <AlignWrapper>
      <Box
        width="40px"
        height="32px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRight={`1px solid ${theme.color.gray300}`}
        className={classNames('align-item', { active: align === 'left' })}
        onClick={() => handleAlign('left')}
      >
        <CanvasTextAlignLeft width="24" height="24" />
      </Box>
      <Box
        width="40px"
        height="32px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRight={`1px solid ${theme.color.gray300}`}
        className={classNames('align-item', { active: align === 'center' })}
        onClick={() => handleAlign('center')}
      >
        <CanvasTextAlignCenter width="24" height="24" />
      </Box>
      <Box
        width="40px"
        height="32px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classNames('align-item', { active: align === 'right' })}
        onClick={() => handleAlign('right')}
      >
        <CanvasTextAlignRight width="24" height="24" />
      </Box>
    </AlignWrapper>
  );
};

export default Align;
