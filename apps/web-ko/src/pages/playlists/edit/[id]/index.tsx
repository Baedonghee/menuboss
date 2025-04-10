import React from 'react';
import { useRouter } from 'next/router';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import PlaylistsSettings from '@/components/PlayLists/Settings';

const PlaylistsEdit = () => {
  const { query } = useRouter();
  return (
    <>
      <SeoHead title="재생목록 수정 | MenuBoss" />
      <PlaylistsSettings playlistId={query.id as string} />
    </>
  );
};

export default Protect(PlaylistsEdit);
