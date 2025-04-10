import { IAddPlayList, IApi, IApiList, IPlayList, IPlayListItem } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { nanoid } from 'nanoid';
import qs from 'qs';
import { useSetRecoilState } from 'recoil';

import playlistsApi from '@/api/client/playlists.json';
import {
  playlistsAtom,
  playlistsDetailSelector,
  playlistsEditDetailSelector,
  playlistsListSelector
} from '@/state/playlists';
import axios from '@/utils/client/axios';

function usePlaylistsActions() {
  const setPlaylists = useSetRecoilState(playlistsAtom);
  const setPlaylistsList = useSetRecoilState(playlistsListSelector);
  const setPlaylistsDetail = useSetRecoilState(playlistsDetailSelector);
  const setPlaylistsEditDetail = useSetRecoilState(playlistsEditDetailSelector);

  async function playlistsList(query?: { direction: string }) {
    try {
      const queryData = qs.stringify(query);
      const url = `${playlistsApi.playlists}${queryData ? `?${queryData}` : ''}`;
      const {
        data: { list }
      }: AxiosResponse<IApiList<IPlayList[]>> = await axios.get(url);
      setPlaylists({
        list,
        loading: false,
        contentList: [],
        settingAlign: 'Horizontal',
        settingOption: 'Fill',
        detail: null,
        editDetail: null
      });
    } catch (err) {
      throw err;
    }
  }

  async function addPlaylist(formData: IAddPlayList) {
    try {
      const url = playlistsApi.addPlaylist;
      await axios.post(url, formData);
    } catch (err) {
      throw err;
    }
  }

  async function updatePlaylist(playlistId: string, formData: IAddPlayList) {
    try {
      const url = playlistsApi.updatePlaylist.replace(':id', playlistId);
      await axios.patch(url, formData);
    } catch (err) {
      throw err;
    }
  }

  async function deletePlaylist(playlistId: number) {
    try {
      const url = playlistsApi.deletePlaylist.replace(':id', playlistId.toString());
      await axios.delete(url);
      setPlaylistsList((prev) => prev.filter((playlist) => playlist.playlistId !== playlistId));
    } catch (err) {
      throw err;
    }
  }

  async function getPlaylist(playlistId: string) {
    try {
      const url = playlistsApi.getPlaylist.replace(':id', playlistId);
      const {
        data: { data }
      }: AxiosResponse<IApi<IPlayListItem>> = await axios.get(url);
      setPlaylistsDetail(data);
    } catch (err) {
      throw err;
    }
  }

  async function editPlaylistDetail(playlistId: string) {
    try {
      const url = playlistsApi.getPlaylist.replace(':id', playlistId);
      const {
        data: { data }
      }: AxiosResponse<IApi<IPlayListItem>> = await axios.get(url);
      const newPlaylistContent = data.contents.map((content) => ({
        ...content,
        id: nanoid()
      }));
      data.contents = newPlaylistContent;
      setPlaylistsEditDetail(data);
    } catch (err) {
      throw err;
    }
  }

  async function playlistNameUpdate(playlistId: number, name: string) {
    try {
      await axios.patch(playlistsApi.updatePlaylistName.replace(':id', playlistId.toString()), {
        name
      });
      setPlaylistsDetail((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            name
          };
        }
        return prevState;
      });
      setPlaylistsList((prevState) => {
        return prevState.map((item) => {
          if (item.playlistId === playlistId) {
            return {
              ...item,
              name
            };
          }
          return item;
        });
      });
    } catch (err) {
      throw err;
    }
  }

  async function reset() {
    setPlaylists({
      list: [],
      loading: true,
      contentList: [],
      settingAlign: 'Horizontal',
      settingOption: 'Fill',
      detail: null,
      editDetail: null
    });
  }

  return {
    playlistsList,
    addPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylist,
    editPlaylistDetail,
    playlistNameUpdate,
    reset
  };
}

export { usePlaylistsActions };
