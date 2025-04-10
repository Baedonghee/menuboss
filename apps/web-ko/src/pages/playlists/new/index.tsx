import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import PlaylistsSettings from '@/components/PlayLists/Settings';

const PlaylistsNew = () => {
  return (
    <>
      <SeoHead title="새 재생목록 | MenuBoss" />
      <PlaylistsSettings />
    </>
  );
};

export default Protect(PlaylistsNew);
