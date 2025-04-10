import React from 'react';
import { Button } from '@repo/ui/components';
import { PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

const ScheduleEmptyItemWrapper = styled.li`
  height: 376px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px dashed ${({ theme }) => theme.color.gray300};
  border-radius: 8px;
`;

interface IScheduleEmptyItem {
  handleAdd: () => void;
}

const ScheduleEmptyItem: React.FC<IScheduleEmptyItem> = ({ handleAdd }) => {
  return (
    <ScheduleEmptyItemWrapper>
      <Button width="48px" borderRadius="100px" onClick={handleAdd}>
        <PlusFill width="20" height="20" color={theme.color.white} style={{ margin: 0 }} />
      </Button>
    </ScheduleEmptyItemWrapper>
  );
};

export default ScheduleEmptyItem;
