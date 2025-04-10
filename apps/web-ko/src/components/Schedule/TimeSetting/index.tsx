import React, { useState } from 'react';
import { Box, Button, Select, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { IOption } from '@repo/ui/types';

import ModalLayout from '@/components/Layout/Modal';
import { hourList, minuteList } from '@/models/time';

interface IScheduleTimeSetting {
  onClose: () => void;
  sHour: string;
  sMinute: string;
  eHour: string;
  eMinute: string;
  handleTimeSave: (sHour: string, sMinute: string, eHour: string, eMinute: string) => void;
}

const ScheduleTimeSetting: React.FC<IScheduleTimeSetting> = ({
  onClose,
  sHour,
  sMinute,
  eHour,
  eMinute,
  handleTimeSave
}) => {
  const [startHour, setStartHour] = useState<IOption>({
    name: sHour || '00',
    value: sHour || '00'
  });
  const [startMinute, setStartMinute] = useState<IOption>({
    name: sMinute || '00',
    value: sMinute || '00'
  });
  const [endHour, setEndHour] = useState<IOption>({
    name: eHour || '00',
    value: eHour || '00'
  });

  const [endMinute, setEndMinute] = useState<IOption>({
    name: eMinute || '00',
    value: eMinute || '00'
  });

  const handleStartHour = (item: IOption) => {
    setStartHour(item);
  };

  const handleStartMinute = (item: IOption) => {
    setStartMinute(item);
  };

  const handleEndHour = (item: IOption) => {
    setEndHour(item);
  };

  const handleEndMinute = (item: IOption) => {
    setEndMinute(item);
  };

  const handleSave = () => {
    handleTimeSave(
      startHour.value as string,
      startMinute.value as string,
      endHour.value as string,
      endMinute.value as string
    );
  };

  return (
    <ModalLayout title="시간 설정" onClose={onClose} width="580px">
      <Box mt="32px" display="flex">
        <Box width="50%" mr="16px">
          <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
            시작 시간
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" mt="12px">
            <Select
              list={hourList}
              selectOption={startHour}
              width="50%"
              onClick={handleStartHour}
            />
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} m="0px 12px">
              :
            </Typography>
            <Select
              list={minuteList}
              width="50%"
              selectOption={startMinute}
              onClick={handleStartMinute}
            />
          </Box>
        </Box>
        <Box width="50%">
          <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
            종료 시간
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" mt="12px">
            <Select list={hourList} width="50%" selectOption={endHour} onClick={handleEndHour} />
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} m="0px 12px">
              :
            </Typography>
            <Select
              list={minuteList}
              width="50%"
              selectOption={endMinute}
              onClick={handleEndMinute}
            />
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="end" mt="32px">
        <Button mr="16px" color="neutral" variant="outline" width="120px" onClick={onClose}>
          취소
        </Button>
        <Button width="120px" onClick={handleSave}>
          확인
        </Button>
      </Box>
    </ModalLayout>
  );
};

export default ScheduleTimeSetting;
