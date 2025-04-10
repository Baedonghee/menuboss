import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import ScheduleSettings from '@/components/Schedule/Settings';

const ScheduleNew = () => {
  return (
    <>
      <SeoHead title="Add new schedule | MenuBoss" />
      <ScheduleSettings />
    </>
  );
};

export default Protect(ScheduleNew);
