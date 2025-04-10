/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Empty, TitleBox } from '@repo/ui/components';
import { NewSchedules, PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useScheduleActions } from '@/actions/schedule-action';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import ScheduleCard from '@/components/Schedule/Card';
import { skeletonList } from '@/models/skeleton';
import { scheduleListSelector, scheduleLoadingSelector } from '@/state/schedule';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const SchedulesWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  & > li {
    width: 283px;
    height: 399px;
    margin-bottom: 24px;
    margin-right: 24px;
  }
`;

const Schedules = () => {
  const list = useRecoilValue(scheduleListSelector);
  const loading = useRecoilValue(scheduleLoadingSelector);
  const { scheduleList } = useScheduleActions();
  const [menuSelectSchedule, setMenuSelectSchedule] = useState<number>(-1);

  useEffect(() => {
    fetchScheduleList();
  }, []);

  const fetchScheduleList = async () => {
    try {
      await scheduleList();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleMenuSelectSchedule = (playlistId: number) => {
    setMenuSelectSchedule(playlistId);
  };

  return (
    <>
      <SeoHead title="시간표 | MenuBoss" />
      <Layout>
        <TitleBox title="시간표">
          <Link href={ADMIN_PATH.NEW_SCHEDULES}>
            <Button color="primary" variant="fill" size="m" borderRadius="100px" width="160px">
              <PlusFill width="20" height="20" color={theme.color.white} />
              시간표 추가
            </Button>
          </Link>
        </TitleBox>
        <Box mt="32px">
          {(loading || !!list.length) && (
            <SchedulesWrapper>
              {loading
                ? skeletonList.map((_, index) => (
                    <li key={`skeleton-${index}`}>
                      <ScheduleCard
                        menuSelectSchedule={menuSelectSchedule}
                        handleMenuSelectSchedule={handleMenuSelectSchedule}
                      />
                    </li>
                  ))
                : list.map((item) => (
                    <li key={`schedules-${item.scheduleId}`}>
                      <Link
                        href={ADMIN_PATH.DETAIL_SCHEDULES.replace(':id', String(item.scheduleId))}
                      >
                        <ScheduleCard
                          item={item}
                          menuSelectSchedule={menuSelectSchedule}
                          handleMenuSelectSchedule={handleMenuSelectSchedule}
                        />
                      </Link>
                    </li>
                  ))}
            </SchedulesWrapper>
          )}
          {!loading && !list.length && (
            <Empty
              icon={<NewSchedules width="68" height="68" color={theme.color.gray400} />}
              text="현재 저장된 시간표가 없습니다<br/>시간표를 추가하여 만들어주세요"
            />
          )}
        </Box>
      </Layout>
    </>
  );
};

export default Protect(Schedules);
