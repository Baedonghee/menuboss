import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import ScheduleSettings from '@/components/Schedule/Settings';

const ScheduleEdit = () => {
  return (
    <>
      <SeoHead title="시간표 수정 | MenuBoss" />
      <ScheduleSettings />
    </>
  );
};

export default Protect(ScheduleEdit);
