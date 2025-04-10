import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import SettingsMain from '@/components/Settings/Main';

const SettingsTeam = () => {
  return (
    <>
      <SeoHead title="Team | MenuBoss" />
      <SettingsMain />
    </>
  );
};

export default Protect(SettingsTeam);
