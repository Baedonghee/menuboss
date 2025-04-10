/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import ScreenApply from '@/components/Screen/Apply';

const SchedulesScreen = () => {
  return (
    <>
      <SeoHead title="Apply screen | MenuBoss" />
      <ScreenApply type="Schedule" />
    </>
  );
};

export default Protect(SchedulesScreen);
