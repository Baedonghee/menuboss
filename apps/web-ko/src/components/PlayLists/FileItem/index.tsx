/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { Box, Image, Input, Typography } from '@repo/ui/components';
import { Alignment, Trash } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IPlayListItemContent } from '@repo/ui/types';
import { conversion, formatter } from '@repo/ui/utils';
import classNames from 'classnames';
import styled from 'styled-components';

// const style: CSSProperties = {
//   border: '1px dashed gray',
//   padding: '0.5rem 1rem',
//   marginBottom: '.5rem',
//   backgroundColor: 'white',
//   cursor: 'move'
// };

const FileItemWrapper = styled.li`
  .time-input {
    &.error {
      color: ${({ theme }) => theme.color.red500};
    }
  }
`;

interface IFileItem {
  id: string;
  item?: IPlayListItemContent;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
  handleDelete?: (id: string) => void;
  handleTimeUpdate: (time: string, item: IPlayListItemContent) => void;
  error: boolean;
}

interface Item {
  id: string;
  originalIndex: number;
}

const FileItem: React.FC<IFileItem> = ({
  id,
  item,
  moveCard,
  findCard,
  handleDelete,
  handleTimeUpdate,
  error
}) => {
  const { register, setValue, getValues } = useForm({
    defaultValues: {
      time: ''
    }
  });

  useEffect(() => {
    const { time } = getValues();
    if (item && !time) {
      setValue('time', item.duration ? formatter.timeConvert(item.duration) : '', {
        shouldValidate: true
      });
    }
  }, [item]);

  const originalIndex = findCard(id).index;
  const [{ opacity, isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'CARD',
      item: { id, originalIndex, type: 'CARD' },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 0.4,
        isDragging: monitor.isDragging()
      }),
      isDragging: (monitor) => monitor.getItem().id === id,
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      }
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'CARD',
      canDrop: () => false,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      }
    }),
    [findCard, moveCard]
  );

  const handlePlayListFileDelete = () => {
    if (item && handleDelete) {
      handleDelete(item.id);
    }
  };

  return (
    <FileItemWrapper
      style={{
        opacity: isDragging ? opacity : 1,
        backgroundColor: isDragging ? theme.color.gray200 : 'transparent'
      }}
      ref={preview}
    >
      <Box ref={(node) => drag(drop(node))}>
        <Box display="flex" alignItems="center" width="calc(100% - 227px)">
          {item ? (
            <Box width="20px" height="20px">
              <Alignment
                width="20"
                height="20"
                color={theme.color.gray500}
                style={{ cursor: 'pointer' }}
              />
            </Box>
          ) : (
            <Box width="20px" height="20px">
              <Skeleton width={20} height={20} />
            </Box>
          )}
          <Box
            display="flex"
            ml="20px"
            mr="12px"
            width="100px"
            height="60px"
            overflow="hidden"
            backgroundColor={item?.type.code !== 'Folder' ? theme.color.black : 'transparent'}
          >
            {item ? (
              <Image width={100} height={60} src={item.property.imageUrl} alt={item.name} />
            ) : (
              <Skeleton width={100} height={60} />
            )}
          </Box>
          {item ? (
            <Box maxWidth="calc(100% - 264px)">
              <Box
                fontSize={theme.fontSize.text16}
                color={theme.color.gray900}
                mr="12px"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                lineHeight="22px"
              >
                {item.name}
              </Box>
              <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                {`${item.type.name}${
                  item?.property.size
                    ? ` - ${conversion.kilobytesToMegabytes(item.property.size)}`
                    : ''
                } `}
              </Typography>
            </Box>
          ) : (
            <Skeleton />
          )}
          {/* {item ? (
            <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
              {`${item.type.name}${
                item?.property.size
                  ? ` - ${conversion.kilobytesToMegabytes(item.property.size)}`
                  : ''
              } `}
            </Typography>
          ) : (
            <Skeleton />
          )} */}
        </Box>
        <Box display="flex" alignItems="center">
          {item ? (
            <>
              <Input
                width="96px"
                mr="20px"
                register={register}
                name="time"
                placeholder="00:00:00"
                options={{
                  required: 'time is required'
                }}
                className={classNames('time-input', { error: error })}
                disabled={item.type.code === 'Video'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { onChange } = register('time');
                  const { time } = getValues();
                  const newInputValue = e.target.value;
                  if (!newInputValue) {
                    onChange(e);
                    handleTimeUpdate('', item);
                    return;
                  }
                  if (newInputValue.length < 9) {
                    let selectStart = e.target.selectionStart;
                    e.target.value = formatter.timeFormat(newInputValue, time);
                    if (e.target.value.length > 2 && time.length < e.target.value.length) {
                      selectStart = Number(selectStart) + 1;
                    }

                    e.target.setSelectionRange(e.target.value.length, selectStart);
                    handleTimeUpdate(e.target.value, item);
                    onChange(e);
                    return;
                  }
                  e.target.value = time;
                  onChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  const { onChange } = register('time');
                  const { time } = getValues();
                  const newInputValue = e.target.value;
                  if (!newInputValue) {
                    onChange(e);
                    handleTimeUpdate('', item);
                    return;
                  }
                  if (newInputValue.length < 9) {
                    e.target.value = formatter.timeFillZero(newInputValue);
                    handleTimeUpdate(formatter.timeFillZero(newInputValue), item);
                    onChange(e);
                    return;
                  }
                  e.target.value = time;
                  onChange(e);
                }}
                onlyBorder
                error={error ? 'error' : ''}
              />
              <Trash
                width="24"
                height="24"
                color={theme.color.gray500}
                onClick={handlePlayListFileDelete}
                style={{ cursor: 'pointer' }}
              />
            </>
          ) : (
            <Skeleton width={94} height={44} />
          )}
        </Box>
      </Box>
    </FileItemWrapper>
  );
};

export default FileItem;
