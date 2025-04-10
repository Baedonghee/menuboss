import React, { useEffect, useState } from 'react';
import { Box, Button, Empty, TitleBox } from '@repo/ui/components';
import { NewPlaylists, PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { usePlaylistsActions } from '@/actions/playlists-action';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import PlayListsCard from '@/components/PlayLists/Card';
import { skeletonList } from '@/models/skeleton';
import { playlistsListSelector, playlistsLoadingSelector } from '@/state/playlists';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const PlayListsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  & > li {
    width: 283px;
    height: 399px;
    margin-right: 24px;
    margin-bottom: 24px;
  }
`;

const PlayLists = () => {
  const { playlistsList } = usePlaylistsActions();
  const list = useRecoilValue(playlistsListSelector);
  const loading = useRecoilValue(playlistsLoadingSelector);
  const [menuSelectPlaylist, setMenuSelectPlaylist] = useState<number>(-1);

  useEffect(() => {
    fetchPlayLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPlayLists = async () => {
    try {
      await playlistsList();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleMenuSelectPlaylist = (playlistId: number) => {
    setMenuSelectPlaylist(playlistId);
  };

  return (
    <>
      <SeoHead title="Playlists | MenuBoss" />
      <Layout>
        <TitleBox title="Playlists">
          <Link href={ADMIN_PATH.NEW_PLAYLISTS}>
            <Button color="primary" variant="fill" size="m" borderRadius="100px" width="160px">
              <PlusFill width="20" height="20" color={theme.color.white} />
              New playlist
            </Button>
          </Link>
        </TitleBox>
        <Box mt="32px">
          {(loading || !!list.length) && (
            <PlayListsWrapper>
              {loading
                ? skeletonList.map((_, index) => (
                    <li key={`skeleton-${index}`}>
                      <PlayListsCard
                        menuSelectPlaylist={menuSelectPlaylist}
                        handleMenuSelectPlaylist={handleMenuSelectPlaylist}
                      />
                    </li>
                  ))
                : list.map((item) => (
                    <li key={`playlist-${item.playlistId}`}>
                      <Link
                        href={ADMIN_PATH.DETAIL_PLAYLISTS.replace(':id', String(item.playlistId))}
                      >
                        <PlayListsCard
                          item={item}
                          menuSelectPlaylist={menuSelectPlaylist}
                          handleMenuSelectPlaylist={handleMenuSelectPlaylist}
                        />
                      </Link>
                    </li>
                  ))}
            </PlayListsWrapper>
          )}
          {!loading && !list.length && (
            <Empty
              icon={<NewPlaylists width="68" height="68" color={theme.color.gray400} />}
              text="There are currently no saved playlists<br/>Please register or create a playlist"
            />
          )}
        </Box>
      </Layout>
    </>
  );
};

export default Protect(PlayLists);
