import React from 'react';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import PlaylistsSettings from '@/components/PlayLists/Settings';

const PlaylistsNew = () => {
  return (
    <>
      <SeoHead title="Add new playlist | MenuBoss" />
      <PlaylistsSettings />
    </>
  );
};

export default Protect(PlaylistsNew);
