import React from 'react';
import { Box, Button, Image, Typography } from '@repo/ui/components';
import { Edit, PlusFill, Time, Trash } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IScheduleSettingList } from '@repo/ui/types';
import styled from 'styled-components';

const ScheduleAddItemWrapper = styled.li`
  border: 1px solid ${({ theme }) => theme.color.gray300};
  border-radius: 8px;
  .image-wrapper {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .delete-wrapper {
      position: absolute;
      top: 12px;
      right: 7px;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

interface IScheduleAddItem {
  index: number;
  item: IScheduleSettingList | null;
  error: boolean;
  type: 'basic' | 'sub';
  handleDelete: (index: number) => void;
  handleTimeSettingOpen: (index: number) => void;
  handleSubAddPlaylistOpen: (index: number) => void;
}

const ScheduleAddItem: React.FC<IScheduleAddItem> = ({
  index,
  item,
  error,
  type,
  handleDelete,
  handleTimeSettingOpen,
  handleSubAddPlaylistOpen
}) => {
  return (
    <ScheduleAddItemWrapper>
      <Box
        position="relative"
        className="image-wrapper"
        width="281px"
        height="168px"
        overflow="hidden"
        backgroundColor={item?.playlist?.property.imageUrl ? theme.color.black : 'transparent'}
      >
        <Image
          src={item?.playlist?.property.imageUrl || '/images/schedules/empty.png'}
          alt="empty"
          width={281}
          height={168}
        />
        {type !== 'basic' && (
          <Box
            width="32px"
            height="32px"
            borderRadius="50%"
            backgroundColor="rgba(0, 0, 0, 0.30)"
            className="delete-wrapper"
            onClick={() => handleDelete(index)}
          >
            <Trash width="20" height="20" color={theme.color.white} style={{ cursor: 'pointer' }} />
          </Box>
        )}
      </Box>
      <Box mt="20px" p="0px 20px 20px">
        <Box
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          width="241px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {type === 'basic' ? (
            <>
              <Typography
                as="span"
                fontSize={theme.fontSize.text24}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.secondary500}
                mr="8px"
              >
                *
              </Typography>
              Basic
            </>
          ) : (
            item?.playlist?.name || item?.name
          )}
        </Box>
        {type === 'basic' && (
          <Typography mt="4px" fontSize={theme.fontSize.text14} color={theme.color.gray700}>
            Basic menu screen option
          </Typography>
        )}
        {type === 'basic' ? (
          <Typography
            mt="20px"
            fontSize={theme.fontSize.text16}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
          >
            Time 00:00 ~ 23:59
          </Typography>
        ) : (
          <Button
            width="100%"
            color={error ? 'error' : 'neutral'}
            variant="outline"
            mt="24px"
            onClick={() => handleTimeSettingOpen(index)}
          >
            <Time width="20" height="20" color={error ? theme.color.red500 : theme.color.gray900} />
            Time {item?.time.start} ~ {item?.time.end}
          </Button>
        )}
        <Button
          width="100%"
          color="neutral"
          variant="outline"
          mt={type === 'basic' ? '20px' : '12px'}
          onClick={() => handleSubAddPlaylistOpen(index)}
        >
          {item?.playlist ? (
            <Edit width="20" height="20" color={theme.color.gray900} />
          ) : (
            <PlusFill width="20" height="20" color={theme.color.gray900} />
          )}
          {item?.playlist ? 'Change playlist' : 'Add playlist'}
        </Button>
      </Box>
    </ScheduleAddItemWrapper>
  );
};

export default ScheduleAddItem;
