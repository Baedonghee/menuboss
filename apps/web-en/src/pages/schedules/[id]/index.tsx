/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, TitleBox, Typography } from '@repo/ui/components';
import { Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useScheduleActions } from '@/actions/schedule-action';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import ScheduleDetailItem from '@/components/Schedule/DetailItem';
import { skeletonList } from '@/models/skeleton';
import { scheduleDetailSelector } from '@/state/schedule';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const ScheduleDetailWrapper = styled(Box)`
  .image-radius {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  ul.schedule-list {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    & > li {
      width: 283px;
      height: 376px;
      margin-right: 24px;
      margin-bottom: 24px;
    }
  }
  .icon-wrapper {
    & > ul {
      display: flex;
      align-items: center;
      margin-right: 12px;
      li {
        display: flex;
        margin-right: 8px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

const ScheduleDetail = () => {
  const router = useRouter();
  const { query } = router;
  const detail = useRecoilValue(scheduleDetailSelector);
  const { getSchedule, deleteSchedule, reset } = useScheduleActions();
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (detail) {
      setLoading(false);
    }
  }, [detail]);

  useEffect(() => {
    fetchSchedule(query.id as string);
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

  const handleDelete = () => {
    if (detail) {
      handleShowAlert({
        title: 'Delete schedule',
        description: 'Are you sure you want to remove this schedule from your account?',
        alertType: 'confirm',
        type: 'error',
        confirmText: 'Delete',
        onConfirm: async () => {
          try {
            await deleteSchedule(detail.scheduleId);
            handleAlertClose();
            router.replace(ADMIN_PATH.SCHEDULES);
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };

  return (
    <>
      <SeoHead title={`${detail?.name ? `${detail.name} | MenuBoss` : undefined}`} />
      <Layout>
        <TitleBox backUrl={ADMIN_PATH.SCHEDULES}>
          <Box display="flex" alignItems="center">
            {detail ? (
              <Typography
                fontSize={theme.fontSize.text24}
                fontWeight={theme.fontWeight.semiBold}
                mr="12px"
              >
                {detail.name}
              </Typography>
            ) : (
              <Skeleton width="300px" />
            )}
          </Box>
          <Box display="flex">
            <Button
              color="error"
              variant="outline"
              size="m"
              width="120px"
              mr="12px"
              icon="left"
              onClick={handleDelete}
            >
              <Trash width="20" height="20" color={theme.color.red500} />
              Delete
            </Button>
            <Link href={ADMIN_PATH.EDIT_SCHEDULES.replace(':id', query.id as string)}>
              <Button color="primary" variant="fill" size="m" width="120px">
                Edit
              </Button>
            </Link>
          </Box>
        </TitleBox>
        <ScheduleDetailWrapper mt="24px">
          <ul className="schedule-list">
            {loading
              ? skeletonList.map((_, index) => (
                  <ScheduleDetailItem index={index} key={`skeleton-${index}`} />
                ))
              : detail?.playlists.map((item, index) => (
                  <ScheduleDetailItem
                    key={`schedule-${index}-${item.playlistId}`}
                    index={index}
                    item={item}
                  />
                ))}
          </ul>
        </ScheduleDetailWrapper>
      </Layout>
    </>
  );
};

export default Protect(ScheduleDetail);
