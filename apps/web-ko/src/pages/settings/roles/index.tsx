import React, { useEffect } from 'react';

import { useBusinessActions } from '@/actions/business-actions';
import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import SettingsMain from '@/components/Settings/Main';

const SettingsRoles = () => {
  const { reset } = useBusinessActions();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <>
      <SeoHead title="역할 | MenuBoss" />
      <SettingsMain />
    </>
  );
};

export default Protect(SettingsRoles);
