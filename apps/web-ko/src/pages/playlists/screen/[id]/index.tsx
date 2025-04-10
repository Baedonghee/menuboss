/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import ScreenApply from '@/components/Screen/Apply';

const PlaylistsScreen = () => {
  return (
    <>
      <SeoHead title="새 TV | MenuBoss" />
      <ScreenApply type="Playlist" />
    </>
  );
};

export default Protect(PlaylistsScreen);
