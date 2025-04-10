import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import ScheduleSettings from '@/components/Schedule/Settings';

const ScheduleEdit = () => {
  return (
    <>
      <SeoHead title="Edit schedule | MenuBoss" />
      <ScheduleSettings />
    </>
  );
};

export default Protect(ScheduleEdit);
