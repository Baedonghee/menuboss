/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, ModalContainer, TitleBox, UnderlineInput } from '@repo/ui/components';
import { useBeforeUnload } from '@repo/ui/hooks';
import { Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IPlayList, IScheduleForm, IScheduleSettingKoList } from '@repo/ui/types';
import { delay, getCustomErrorMessage } from '@repo/ui/utils';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useScheduleActions } from '@/actions/schedule-action';
import Layout from '@/components/Layout';
import ScheduleAddItem from '@/components/Schedule/AddItem';
import ScheduleTimeSetting from '@/components/Schedule/TimeSetting';
import { scheduleSettingList } from '@/models/schedule';
import { scheduleDetailSelector } from '@/state/schedule';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

import AddPlaylist from '../AddPlaylist';
import ScheduleEmptyItem from '../EmptyItem';

const ScheduleNewWrapper = styled(Box)`
  .image-radius {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  ul.schedule-list {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 283px;
      height: 376px;
      margin-right: 24px;
      margin-bottom: 24px;
    }
  }
`;

const ScheduleSettings = () => {
  const router = useRouter();
  const { query } = router;
  const {
    register,
    watch,
    getValues,
    setValue,
    setFocus,
    handleSubmit,
    formState: { isDirty }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  });
  const { addSchedule, updateSchedule, getSchedule, deleteSchedule, reset } = useScheduleActions();
  const detail = useRecoilValue(scheduleDetailSelector);
  const [basicSchedule, setBasicSchedule] = useState<IScheduleSettingKoList | null>(null);
  const [selectPlaylist, setSelectPlaylist] = useState<IPlayList | null>(null);
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const { handleShowAlert, handleClose } = useAlert();
  const [isTimeSettingOpen, setIsTimeSettingOpen] = useState(false);
  const [scheduleList, setScheduleList] = useState<IScheduleSettingKoList[]>(
    JSON.parse(JSON.stringify(scheduleSettingList))
  );

  const [isFocus, setIsFocus] = useState(false);
  const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);
  const [errorIndexList, setErrorIndexList] = useState<number[]>([]);

  const { isDirty: isPageChange, setIsDirty: setIsPageChange } = useBeforeUnload(
    isDirty,
    detail
      ? ADMIN_PATH.DETAIL_SCHEDULES.replace(':id', detail.scheduleId.toString())
      : ADMIN_PATH.PLAYLISTS,
    'ko'
  );

  useEffect(() => {
    if (detail) {
      setValue('name', detail.name);
      const newPlaylists = [...detail.playlists];
      const basicPlaylists = newPlaylists.shift();
      if (basicPlaylists) {
        setBasicSchedule({
          name: basicPlaylists.name,
          time: {
            start: basicPlaylists.time.start,
            end: basicPlaylists.time.end
          },
          playlist: basicPlaylists
        });
      }
      const newScheduleList = newPlaylists.map((playlist) => ({
        name: playlist.name,
        time: {
          start: playlist.time.start,
          end: playlist.time.end
        },
        playlist: playlist
      }));
      setScheduleList(newScheduleList);
    }
  }, [detail]);

  useEffect(() => {
    if (detail) {
      const newPlaylists = [...detail.playlists];
      const basicPlaylists = newPlaylists.shift();
      const newScheduleList = newPlaylists.map((playlist) => ({
        name: playlist.name,
        time: {
          start: playlist.time.start,
          end: playlist.time.end
        },
        playlist: playlist
      }));
      if (
        JSON.stringify(basicPlaylists) !== JSON.stringify(basicPlaylists) ||
        JSON.stringify(newScheduleList) !== JSON.stringify(scheduleList) ||
        isDirty
      ) {
        setIsPageChange(true);
      } else {
        setIsPageChange(false);
      }
    } else {
      if (
        basicSchedule ||
        JSON.stringify(scheduleList) !== JSON.stringify(scheduleSettingList) ||
        isDirty
      ) {
        setIsPageChange(true);
      } else {
        setIsPageChange(false);
      }
    }
  }, [detail, basicSchedule, isDirty, scheduleList, scheduleSettingList]);

  useEffect(() => {
    if (query.id) {
      fetchSchedule(query.id as string);
    }
  }, [query.id]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const fetchSchedule = async (scheduleId: string) => {
    try {
      await getSchedule(Number(scheduleId));
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleTimeSettingClose = () => {
    setIsTimeSettingOpen(false);
    setSelectIndex(-1);
  };

  const handleTimeSettingOpen = (index: number) => {
    if (index !== -1) {
      setSelectIndex(index);
      setIsTimeSettingOpen(true);
    }
  };

  const handleDelete = (index: number) => {
    if (scheduleList[index].playlist) {
      handleShowAlert({
        title: '재생목록 삭제',
        description: '재생목록을 삭제하시겠습니까?',
        alertType: 'confirm',
        confirmText: '삭제',
        type: 'error',
        onConfirm: () => {
          setScheduleList(scheduleList.filter((_, i) => i !== index));
          const errorIndexList = overlappingCheck(scheduleList.filter((_, i) => i !== index));
          setErrorIndexList(errorIndexList);
          handleClose();
        }
      });
      return;
    }
    setScheduleList(scheduleList.filter((_, i) => i !== index));
    const errorIndexList = overlappingCheck(scheduleList.filter((_, i) => i !== index));
    setErrorIndexList(errorIndexList);
    handleClose();
  };

  const handleScheduleNameBlur = () => {
    if (query.id && detail) {
      const { name } = getValues();
      if (!name) {
        setValue('name', detail.name);
        return;
      }
    }
  };

  const handleFocus = (isFocus: boolean) => {
    setIsFocus(isFocus);
  };

  const onNameSubmit = handleSubmit(({ name }) => {
    setValue('name', name);
    setIsFocus(false);
  });

  const handleAddPlaylistOpen = () => {
    setIsAddPlaylistOpen(true);
    if (basicSchedule?.playlist) {
      setSelectPlaylist(basicSchedule.playlist);
    }
  };

  const handleSubAddPlaylistOpen = (index: number) => {
    if (index === -1) {
      handleAddPlaylistOpen();
      return;
    }
    setIsAddPlaylistOpen(true);
    setSelectIndex(index);
    setSelectPlaylist(scheduleList[index].playlist || null);
  };

  const handleAddPlaylistClose = () => {
    setIsAddPlaylistOpen(false);
    setSelectIndex(-1);
  };

  const handleSelectPlaylist = (playlist: IPlayList) => {
    if (selectIndex > -1) {
      const newScheduleList = [...scheduleList];
      newScheduleList[selectIndex].playlist = playlist;
      setScheduleList(newScheduleList);
      setSelectIndex(-1);
    } else {
      setBasicSchedule({
        name: '',
        playlist: playlist,
        time: {
          end: '00:00',
          start: '00:00'
        }
      });
    }
    setIsAddPlaylistOpen(false);
  };

  const overlappingCheck = (checkLIst: IScheduleSettingKoList[]) => {
    const overlappingIndexes: number[] = [];

    const subPlaylists = checkLIst.map((schedule) => {
      if (schedule.time) {
        return {
          time: {
            start: schedule.time.start,
            end: schedule.time.end
          }
        };
      }
      return null;
    });
    if (subPlaylists) {
      for (let i = 0; i < subPlaylists.length; i++) {
        const currentPlaylist = subPlaylists[i];
        if (currentPlaylist) {
          const currentStart = currentPlaylist.time.start;
          const currentEnd = currentPlaylist.time.end;
          if (currentStart === currentEnd && !overlappingIndexes.includes(i)) {
            overlappingIndexes.push(i);
          } else if (currentStart > currentEnd && !overlappingIndexes.includes(i)) {
            overlappingIndexes.push(i);
          } else {
            for (let j = i + 1; j < subPlaylists.length; j++) {
              const nextPlaylist = subPlaylists[j];
              if (nextPlaylist) {
                const nextStart = nextPlaylist.time.start;
                const nextEnd = nextPlaylist.time.end;
                if (
                  ((nextStart >= currentStart && nextStart < currentEnd) ||
                    (nextEnd > currentStart && nextEnd <= currentEnd)) &&
                  !overlappingIndexes.includes(j)
                ) {
                  if (!overlappingIndexes.includes(i)) {
                    overlappingIndexes.push(i);
                  }
                  overlappingIndexes.push(j);
                }
              }
            }
          }
        }
      }
    }

    return overlappingIndexes;
  };

  const handleTimeSave = (sHour: string, sMinute: string, eHour: string, eMinute: string) => {
    if (selectIndex > -1) {
      const newScheduleList = [...scheduleList];
      newScheduleList[selectIndex].time.start = `${sHour}:${sMinute}`;
      newScheduleList[selectIndex].time.end = `${eHour}:${eMinute}`;
      newScheduleList.sort((a, b) => {
        if (a && b) {
          if (a.time.start > b.time.start) {
            return 1;
          }
          if (a.time.start < b.time.start) {
            return -1;
          }
          return 0;
        }
        return 0;
      });
      setScheduleList(newScheduleList);
      setSelectIndex(-1);
      setIsTimeSettingOpen(false);

      const errorIndexList = overlappingCheck(newScheduleList);
      setErrorIndexList(errorIndexList);
    }
  };

  const handleScheduleAdd = () => {
    const newScheduleList = [...scheduleList];
    newScheduleList.push({
      name: '새 재생목록',
      time: {
        start: '00:00',
        end: '00:00'
      }
    });
    setScheduleList(newScheduleList);
  };

  const handleScheduleSave = async () => {
    const { name } = getValues();
    let error = false;
    if (!basicSchedule?.playlist) {
      error = true;
    }
    scheduleList.forEach((schedule) => {
      if (!schedule.playlist) {
        error = true;
      }
    });
    if (error) {
      errorToast('재생목록을 선택해주세요');
      return;
    }

    const subPlaylists = scheduleList.map((schedule) => {
      if (schedule.playlist) {
        return {
          playlistId: schedule.playlist.playlistId,
          time: {
            start: schedule.time.start,
            end: schedule.time.end
          }
        };
      }
      return null;
    });
    const errorIndexList = overlappingCheck(scheduleList);
    setErrorIndexList(errorIndexList);
    if (errorIndexList.length) {
      errorToast('시간이 겹치는 재생목록이 있습니다.');
      return;
    }

    // subPlaylists time start sort
    subPlaylists.sort((a, b) => {
      if (a && b) {
        if (a.time.start > b.time.start) {
          return 1;
        }
        if (a.time.start < b.time.start) {
          return -1;
        }
        return 0;
      }
      return 0;
    });
    try {
      if (basicSchedule?.playlist) {
        const formData = {
          playlists: [
            {
              playlistId: basicSchedule.playlist?.playlistId
            },
            ...subPlaylists
          ]
        } as IScheduleForm;
        if (name) {
          formData.name = name;
        }
        if (query.id) {
          await updateSchedule(query.id as string, formData);
        } else {
          await addSchedule(formData);
        }
        setIsPageChange(false);
        await delay(100);
        router.push(ADMIN_PATH.SCHEDULES);
      }
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleScheduleDelete = () => {
    if (detail) {
      handleShowAlert({
        title: '시간표 삭제',
        description: '시간표를 삭제하시겠습니까?',
        alertType: 'confirm',
        type: 'error',
        confirmText: '삭제',
        onConfirm: async () => {
          try {
            await deleteSchedule(detail.scheduleId);
            handleClose();
            router.replace(ADMIN_PATH.SCHEDULES);
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };

  return (
    <Layout>
      {isAddPlaylistOpen && (
        <ModalContainer onClose={handleAddPlaylistClose}>
          <AddPlaylist
            selectPlaylist={selectPlaylist}
            onClose={handleAddPlaylistClose}
            handleSelectPlaylist={handleSelectPlaylist}
          />
        </ModalContainer>
      )}
      {isTimeSettingOpen && (
        <ModalContainer onClose={handleTimeSettingClose}>
          <ScheduleTimeSetting
            onClose={handleTimeSettingClose}
            sHour={scheduleList[selectIndex].time.start.split(':')[0]}
            sMinute={scheduleList[selectIndex].time.start.split(':')[1]}
            eHour={scheduleList[selectIndex].time.end.split(':')[0]}
            eMinute={scheduleList[selectIndex].time.end.split(':')[1]}
            handleTimeSave={handleTimeSave}
          />
        </ModalContainer>
      )}
      <TitleBox backUrl={ADMIN_PATH.SCHEDULES} isDirty={isPageChange} setIsDirty={setIsPageChange}>
        <Box display="flex" alignItems="center">
          <Form title="Change playlists name" onSubmit={onNameSubmit}>
            <UnderlineInput
              name="name"
              register={register}
              onBlur={handleScheduleNameBlur}
              width="auto"
              value={watch('name')}
              setFocus={setFocus}
              placeholder="제목을 입력해주세요"
              isFocus={isFocus}
              handleFocus={handleFocus}
            />
          </Form>
        </Box>
        <Box display="flex">
          {query.id && (
            <Button
              color="error"
              variant="outline"
              size="m"
              width="120px"
              mr="12px"
              icon="left"
              onClick={handleScheduleDelete}
            >
              <Trash width="20" height="20" color={theme.color.red500} />
              삭제
            </Button>
          )}
          <Button
            color="primary"
            variant="fill"
            size="m"
            width="120px"
            onClick={handleScheduleSave}
          >
            저장
          </Button>
        </Box>
      </TitleBox>
      <ScheduleNewWrapper mt="24px">
        <ul className="schedule-list">
          <ScheduleAddItem
            index={-1}
            item={basicSchedule}
            error={false}
            type="basic"
            handleTimeSettingOpen={handleTimeSettingOpen}
            handleDelete={handleDelete}
            handleSubAddPlaylistOpen={handleSubAddPlaylistOpen}
          />
          {scheduleList.map((schedule, index) => (
            <ScheduleAddItem
              key={`schedule-${index}`}
              index={index}
              item={schedule}
              type="sub"
              error={errorIndexList.includes(index)}
              handleTimeSettingOpen={handleTimeSettingOpen}
              handleDelete={handleDelete}
              handleSubAddPlaylistOpen={handleSubAddPlaylistOpen}
            />
          ))}
          <ScheduleEmptyItem handleAdd={handleScheduleAdd} />
        </ul>
      </ScheduleNewWrapper>
    </Layout>
  );
};

export default ScheduleSettings;
