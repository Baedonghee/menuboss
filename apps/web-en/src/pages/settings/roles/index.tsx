import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import SettingsMain from '@/components/Settings/Main';

const SettingsRoles = () => {
  return (
    <>
      <SeoHead title="Roles | MenuBoss" />
      <SettingsMain />
    </>
  );
};

export default Protect(SettingsRoles);
