import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Image, Typography } from '@repo/ui/components';
import { Canvas, Image as ImageIcon, Video } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { ISchedulePlaylist } from '@repo/ui/types';
import { formatter } from '@repo/ui/utils';
import styled from 'styled-components';

const ScheduleDetailItemWrapper = styled.li`
  border: 1px solid ${({ theme }) => theme.color.gray300};
  border-radius: 8px;
  .image-wrapper {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    svg {
      position: absolute;
      top: 16px;
      right: 12px;
      cursor: pointer;
    }
  }
`;

interface IScheduleDetailItem {
  item?: ISchedulePlaylist;
  index: number;
}

const ScheduleDetailItem: React.FC<IScheduleDetailItem> = ({ item, index }) => {
  return (
    <ScheduleDetailItemWrapper>
      <Box
        position="relative"
        className="image-wrapper"
        width="281px"
        height="168px"
        overflow="hidden"
        backgroundColor={item ? theme.color.black : 'transparent'}
      >
        <Image
          src={item?.property.imageUrl || '/images/schedules/empty.png'}
          alt="empty"
          width={281}
          height={168}
        />
      </Box>
      <Box mt="20px" p="0px 20px 20px">
        {item ? (
          index !== 0 ? (
            <Box
              fontSize={theme.fontSize.text24}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray900}
              width="241px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {item.name}
            </Box>
          ) : (
            <Box
              fontSize={theme.fontSize.text24}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray900}
              width="241px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              <Typography
                as="span"
                fontSize={theme.fontSize.text24}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.secondary500}
                mr="8px"
              >
                *
              </Typography>
              기본
            </Box>
          )
        ) : (
          <Skeleton height={33} style={{ width: '100%' }} />
        )}
        {item ? (
          <Typography mt="20px" fontSize={theme.fontSize.text18} color={theme.color.gray900}>
            시간 {item.time.start} ~ {item.time.end}
          </Typography>
        ) : (
          <Skeleton height={22} style={{ width: '33%', marginTop: '24px' }} />
        )}
        <Box display="flex" alignItems="center" className="icon-wrapper" mt="16px">
          {item ? (
            <>
              <ul>
                {formatter.sortContent(item.property.contentTypes).map((type, index) => {
                  if (type.code === 'Image') {
                    return (
                      <li key={`${type.code}-${index}`}>
                        <ImageIcon width="24" height="24" color={theme.color.gray900} />
                      </li>
                    );
                  } else if (type.code === 'Video') {
                    return (
                      <li key={`${type.code}-${index}`}>
                        <Video width="24" height="24" color={theme.color.gray900} />
                      </li>
                    );
                  } else if (type.code === 'Canvas') {
                    return (
                      <li key={`${type.code}-${index}`}>
                        <Canvas width="24" height="24" color={theme.color.gray900} />
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <Typography fontSize={theme.fontSize.text16} color={theme.color.gray700}>
                {`콘텐츠 ${item.property.count}개`}
              </Typography>
            </>
          ) : (
            <Skeleton height={22} style={{ width: '20%', marginTop: '24px' }} />
          )}
        </Box>
      </Box>
    </ScheduleDetailItemWrapper>
  );
};

export default ScheduleDetailItem;
