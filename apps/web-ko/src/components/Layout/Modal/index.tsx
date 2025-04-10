import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { CloseRound } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

const ModalLayoutWrapper = styled.div<{ $width: string; $p: string }>`
  width: ${({ $width }) => $width};
  ${({ $p }) => ($p === '24px' ? 'padding: 24px;' : 'padding-top: 24px;')};
  border-radius: 12px;
  box-shadow:
    4px 0px 8px 0px rgba(0, 0, 0, 0.1),
    0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  .close {
    cursor: pointer;
  }
`;

interface IModalLayout {
  width: string;
  children: React.ReactNode;
  title: string;
  p?: string;
  onClose: () => void;
}

const ModalLayout: React.FC<IModalLayout> = ({ title, width, children, p = '24px', onClose }) => {
  return (
    <ModalLayoutWrapper $width={width} $p={p}>
      <Box display="flex" justifyContent="space-between" p={p === '24px' ? '0' : '0px 24px'}>
        <Typography fontSize={theme.fontSize.text24} fontWeight={theme.fontWeight.semiBold}>
          {title}
        </Typography>
        <CloseRound
          className="close"
          width="24"
          height="24"
          color={theme.color.gray500}
          onClick={onClose}
        />
      </Box>
      {children}
    </ModalLayoutWrapper>
  );
};

export default ModalLayout;
