import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import ScheduleSettings from '@/components/Schedule/Settings';

const ScheduleNew = () => {
  return (
    <>
      <SeoHead title="새 시간표 | MenuBoss" />
      <ScheduleSettings />
    </>
  );
};

export default Protect(ScheduleNew);
