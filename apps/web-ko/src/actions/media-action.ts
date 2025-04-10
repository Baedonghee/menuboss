import { IApi, IApiList, IMediaFile, IMediaList } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import qs from 'qs';
import { ParsedUrlQuery } from 'querystring';
import { useSetRecoilState } from 'recoil';

import mediaApi from '@/api/client/media.json';
import {
  mediaAtom,
  mediaFileSelector,
  mediaFolderFileListSelector,
  mediaFolderListSelector,
  mediaListLoadingSelector,
  mediaListSelector
} from '@/state/media';
import axios from '@/utils/client/axios';

function useMediaActions() {
  const setMedia = useSetRecoilState(mediaAtom);
  const setMediaList = useSetRecoilState(mediaListSelector);
  const setMediaFile = useSetRecoilState(mediaFileSelector);
  const setMediaFolderList = useSetRecoilState(mediaFolderListSelector);
  const setMediaLoading = useSetRecoilState(mediaListLoadingSelector);
  const setMediaFolderFileList = useSetRecoilState(mediaFolderFileListSelector);

  async function mediaList(query: ParsedUrlQuery, ignoreVideo?: boolean) {
    try {
      setMediaLoading(true);
      const newQuery = {
        ...query,
        page: query.page ? Number(query.page) : 1,
        size: query.size ? Number(query.size) : 20
      } as {
        mediaId?: string;
        page: number;
        size: number;
      };
      const url = `${mediaApi.media}?${qs.stringify(newQuery)}`;
      const {
        data: { list, page }
      }: AxiosResponse<IApiList<IMediaList[]>> = await axios.get(url);
      const newMediaList = [...list];
      if (newQuery.mediaId) {
        const folderName = list.shift();
        newMediaList.shift();
        setMedia((prevState) => ({
          list: ignoreVideo ? newMediaList.filter((item) => item.type.code !== 'Video') : list,
          listLoading: false,
          page,
          folder: folderName || null,
          file: null,
          folderList: [],
          folderFileList: [],
          tempMediaFile: prevState.tempMediaFile
        }));
        return;
      }
      setMedia((prevState) => ({
        list: ignoreVideo ? newMediaList.filter((item) => item.type.code !== 'Video') : list,
        listLoading: false,
        page,
        folder: null,
        file: null,
        folderList: [],
        folderFileList: [],
        tempMediaFile: prevState.tempMediaFile
      }));
    } catch (err) {
      throw err;
    }
  }

  async function mediaScrollList(query: ParsedUrlQuery, ignoreVideo?: boolean) {
    try {
      const newQuery = {
        ...query,
        page: query.page ? Number(query.page) : 1,
        size: query.size ? Number(query.size) : 20
      } as {
        mediaId?: string;
        page: number;
        size: number;
      };
      if (newQuery.page === 1) {
        setMediaLoading(true);
      }
      const url = `${mediaApi.media}?${qs.stringify(newQuery)}`;
      const {
        data: { list, page }
      }: AxiosResponse<IApiList<IMediaList[]>> = await axios.get(url);
      const newMediaList = [...list];
      if (newQuery.mediaId) {
        let folderName = null as IMediaList | null | undefined;
        if (newQuery.page === 1) {
          folderName = list.shift();
          newMediaList.shift();
        }
        setMedia((prevState) => {
          return {
            list: [],
            listLoading: false,
            folderFileList: ignoreVideo
              ? newQuery.page !== 1
                ? [...prevState.list, ...newMediaList.filter((item) => item.type.code !== 'Video')]
                : [...newMediaList.filter((item) => item.type.code !== 'Video')]
              : newQuery.page !== 1
                ? [...prevState.list, ...list]
                : [...list],
            page,
            folder: newQuery.page === 1 ? folderName || null : prevState.folder,
            file: null,
            folderList: prevState.folderList,
            tempMediaFile: prevState.tempMediaFile
          };
        });
        return;
      }
      setMedia((prevState) => {
        return {
          list: ignoreVideo
            ? newQuery.page !== 1
              ? [...prevState.list, ...newMediaList.filter((item) => item.type.code !== 'Video')]
              : [...newMediaList.filter((item) => item.type.code !== 'Video')]
            : newQuery.page !== 1
              ? [...prevState.list, ...list]
              : [...list],
          listLoading: false,
          page,
          folder: null,
          folderFileList: [],
          file: prevState.file,
          folderList: prevState.folderList,
          tempMediaFile: prevState.tempMediaFile
        };
      });
      return;
    } catch (err) {
      throw err;
    }
  }

  async function createFolder() {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IMediaList>> = await axios.post(mediaApi.createNewFolder);
      setMediaList((prevState) => [data, ...prevState]);
    } catch (err) {
      throw err;
    }
  }

  async function deleteFile(mediaIds: string[], selectFolder: boolean) {
    try {
      await axios.post(mediaApi.deleteFile, { mediaIds });
      if (selectFolder) {
        setMediaFolderFileList((prevState) =>
          prevState.filter((item) => !mediaIds.includes(item.mediaId))
        );
      } else {
        setMediaList((prevState) => prevState.filter((item) => !mediaIds.includes(item.mediaId)));
      }
    } catch (err) {
      throw err;
    }
  }

  async function mediaFile(mediaId: string, returnType?: boolean) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IMediaFile>> = await axios.get(
        mediaApi.getMediaFile.replace(':id', mediaId)
      );
      if (returnType) {
        return data;
      }
      setMediaFile(data);
    } catch (err) {
      throw err;
    }
  }

  async function mediaFileList(folderId?: string) {
    try {
      const newQuery = {
        page: 1,
        size: 100
      } as {
        page: number;
        size: number;
      };
      let last = false;
      const mediaFolderList = [];
      while (!last) {
        const url = `${mediaApi.media}?${qs.stringify(newQuery)}`;
        const {
          data: { list }
        }: AxiosResponse<IApiList<IMediaList[]>> = await axios.get(url);
        mediaFolderList.push(...list.filter((item) => item.type.code === 'Folder'));
        if (list.length && list[list.length - 1].type.code === 'Folder') {
          newQuery.page += 1;
        } else {
          last = true;
        }
      }
      setMediaFolderList(
        folderId ? mediaFolderList.filter((item) => item.mediaId !== folderId) : mediaFolderList
      );
    } catch (err) {
      throw err;
    }
  }

  async function mediaFolderFileList(folderId: string) {
    try {
      const newQuery = {
        page: 1,
        size: 100,
        mediaId: folderId
      } as {
        mediaId: string;
        page: number;
        size: number;
      };
      let last = false;
      const mediaFolderList = [];
      while (!last) {
        const url = `${mediaApi.media}?${qs.stringify(newQuery)}`;
        const {
          data: { list }
        }: AxiosResponse<IApiList<IMediaList[]>> = await axios.get(url);
        mediaFolderList.push(...list.filter((item) => item.type.code !== 'Folder'));
        if (list.length && list[list.length - 1].type.code === 'Folder') {
          newQuery.page += 1;
        } else {
          last = true;
        }
      }
      return mediaFolderList;
    } catch (err) {
      throw err;
    }
  }

  async function mediaFolderMove(folderId: string, mediaIds: string[]) {
    try {
      await axios.post(mediaApi.updateMediaFolderMover, {
        mediaIds,
        folderId: folderId || null
      });
      setMediaList((prevState) => {
        return prevState.map((item) => {
          if (item.mediaId === folderId) {
            let totalSize = 0;
            let totalCount = 0;
            mediaIds.forEach((mediaId) => {
              const findMedia = prevState.find((media) => media.mediaId === mediaId);
              if (findMedia) {
                totalSize += findMedia.property.size;
                totalCount += 1;
              }
            });
            return {
              ...item,
              property: {
                count: (item.property.count || 0) + totalCount,
                size: (item.property.size || 0) + totalSize,
                imageUrl: ''
              }
            };
          }
          return item;
        });
      });
      setMediaList((prevState) => prevState.filter((item) => !mediaIds.includes(item.mediaId)));
    } catch (err) {
      throw err;
    }
  }

  async function mediaFolderNameUpdate(folderId: string, name: string) {
    try {
      await axios.patch(mediaApi.updateMediaFolderName.replace(':id', folderId), { name });
      setMediaFile((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            name
          };
        }
        return prevState;
      });
      setMediaList((prevState) => {
        return prevState.map((item) => {
          if (item.mediaId === folderId) {
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
    setMedia((prevState) => ({
      list: [],
      listLoading: true,
      page: null,
      folder: null,
      file: null,
      folderFileList: [],
      folderList: [],
      tempMediaFile: prevState.tempMediaFile
    }));
  }

  return {
    mediaList,
    mediaScrollList,
    createFolder,
    deleteFile,
    mediaFile,
    mediaFileList,
    mediaFolderMove,
    mediaFolderNameUpdate,
    mediaFolderFileList,
    reset
  };
}

export { useMediaActions };
