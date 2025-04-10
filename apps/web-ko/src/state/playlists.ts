import { IPlayListItem, IPlayListItemContent, IPlayList } from '@repo/ui/types';
import { atom, DefaultValue, selector } from 'recoil';

interface IPlaylistsState {
  list: IPlayList[];
  loading: boolean;
  contentList: IPlayListItemContent[];
  settingAlign: 'Horizontal' | 'Vertical';
  settingOption: 'Fit' | 'Fill' | 'Stretch';
  detail: IPlayListItem | null;
  editDetail: IPlayListItem | null;
}

const playlistsAtom = atom<IPlaylistsState>({
  key: 'playlistsAtom',
  default: {
    list: [],
    loading: true,
    contentList: [],
    settingAlign: 'Horizontal',
    settingOption: 'Fill',
    detail: null,
    editDetail: null
  }
});

const playlistsListSelector = selector<IPlayList[]>({
  key: 'playlistsListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(playlistsAtom, (prevState) => ({
      ...prevState,
      list: newValue
    }));
  },
  get: ({ get }) => {
    const { list } = get(playlistsAtom);
    return list;
  }
});

const playlistsLoadingSelector = selector<boolean>({
  key: 'playlistsLoadingSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(playlistsAtom, (prevState) => ({
      ...prevState,
      loading: newValue
    }));
  },
  get: ({ get }) => {
    const { loading } = get(playlistsAtom);
    return loading;
  }
});

const playlistsContentListSelector = selector<IPlayListItemContent[]>({
  key: 'playlistsContentListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(playlistsAtom, (prevState) => ({
      ...prevState,
      contentList: newValue
    }));
  },
  get: ({ get }) => {
    const { contentList } = get(playlistsAtom);
    return contentList;
  }
});

const playlistsSettingAlignSelector = selector<'Horizontal' | 'Vertical'>({
  key: 'playlistsSettingAlignSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(playlistsAtom, (prevState) => ({
      ...prevState,
      settingAlign: newValue
    }));
  },
  get: ({ get }) => {
    const { settingAlign } = get(playlistsAtom);
    return settingAlign;
  }
});

const playlistsSettingOptionSelector = selector<'Fit' | 'Fill' | 'Stretch'>({
  key: 'playlistsSettingOptionSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(playlistsAtom, (prevState) => ({
      ...prevState,
      settingOption: newValue
    }));
  },
  get: ({ get }) => {
    const { settingOption } = get(playlistsAtom);
    return settingOption;
  }
});

const playlistsDetailSelector = selector<IPlayListItem | null>({
  key: 'playlistsDetailSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(playlistsAtom, (prevState) => ({
      ...prevState,
      detail: newValue
    }));
  },
  get: ({ get }) => {
    const { detail } = get(playlistsAtom);
    return detail;
  }
});

const playlistsEditDetailSelector = selector<IPlayListItem | null>({
  key: 'playlistsEditDetailSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(playlistsAtom, (prevState) => ({
      ...prevState,
      editDetail: newValue
    }));
  },
  get: ({ get }) => {
    const { editDetail } = get(playlistsAtom);
    return editDetail;
  }
});

export {
  playlistsAtom,
  playlistsListSelector,
  playlistsLoadingSelector,
  playlistsContentListSelector,
  playlistsSettingAlignSelector,
  playlistsSettingOptionSelector,
  playlistsDetailSelector,
  playlistsEditDetailSelector
};
