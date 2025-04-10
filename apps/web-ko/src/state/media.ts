import { IMediaFile, IMediaList, IPage } from '@repo/ui/types';
import { atom, DefaultValue, selector } from 'recoil';

interface ITempMedia extends IMediaList {
  folderId?: string;
}

interface IMediaState {
  list: IMediaList[];
  listLoading: boolean;
  page: IPage | null;
  folder: IMediaList | null;
  file: IMediaFile | null;
  folderFileList: IMediaList[];
  folderList: IMediaList[];
  tempMediaFile: ITempMedia | null;
}

const mediaAtom = atom<IMediaState>({
  key: 'mediaAtom',
  default: {
    list: [],
    listLoading: true,
    page: null,
    folder: null,
    file: null,
    folderFileList: [],
    folderList: [],
    tempMediaFile: null
  }
});

const mediaListSelector = selector<IMediaList[]>({
  key: 'mediaListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(mediaAtom, (prevState) => ({
      ...prevState,
      list: newValue,
      listLoading: false
    }));
  },
  get: ({ get }) => {
    const { list } = get(mediaAtom);
    return list;
  }
});

const mediaPageSelector = selector<IPage | null>({
  key: 'mediaPageSelector',
  get: ({ get }) => {
    const { page } = get(mediaAtom);
    return page;
  }
});

const mediaListLoadingSelector = selector<boolean>({
  key: 'mediaListLoadingSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(mediaAtom, (prevState) => ({
      ...prevState,
      listLoading: newValue
    }));
  },
  get: ({ get }) => {
    const { listLoading } = get(mediaAtom);
    return listLoading;
  }
});

const mediaFolderSelector = selector<IMediaList | null>({
  key: 'mediaFolderSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(mediaAtom, (prevState) => ({
      ...prevState,
      folder: newValue
    }));
  },
  get: ({ get }) => {
    const { folder } = get(mediaAtom);
    return folder;
  }
});

const mediaFileSelector = selector<IMediaFile | null>({
  key: 'mediaFileSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(mediaAtom, (prevState) => ({
      ...prevState,
      file: newValue
    }));
  },
  get: ({ get }) => {
    const { file } = get(mediaAtom);
    return file;
  }
});

const mediaFolderFileListSelector = selector<IMediaList[]>({
  key: 'mediaFolderFileListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(mediaAtom, (prevState) => ({
      ...prevState,
      folderFileList: newValue
    }));
  },
  get: ({ get }) => {
    const { folderFileList } = get(mediaAtom);
    return folderFileList;
  }
});

const mediaFolderListSelector = selector<IMediaList[]>({
  key: 'mediaFolderListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(mediaAtom, (prevState) => ({
      ...prevState,
      folderList: newValue
    }));
  },
  get: ({ get }) => {
    const { folderList } = get(mediaAtom);
    return folderList;
  }
});

const mediaTempMediaFileSelector = selector<ITempMedia | null>({
  key: 'mediaTempMediaFileSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(mediaAtom, (prevState) => ({
      ...prevState,
      tempMediaFile: newValue
    }));
  },
  get: ({ get }) => {
    const { tempMediaFile } = get(mediaAtom);
    return tempMediaFile;
  }
});

export {
  mediaAtom,
  mediaListSelector,
  mediaPageSelector,
  mediaListLoadingSelector,
  mediaFolderSelector,
  mediaFolderFileListSelector,
  mediaFileSelector,
  mediaFolderListSelector,
  mediaTempMediaFileSelector
};
