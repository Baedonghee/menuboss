import { IScreenList } from '@repo/ui/types';
import { atom, DefaultValue, selector } from 'recoil';

interface IScreenState {
  list: IScreenList[];
  loading: boolean;
}

const screenAtom = atom<IScreenState>({
  key: 'screenAtom',
  default: {
    list: [],
    loading: true
  }
});

const screenListSelector = selector<IScreenList[]>({
  key: 'screenListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(screenAtom, (prevState) => ({
      ...prevState,
      list: newValue
    }));
  },
  get: ({ get }) => {
    const { list } = get(screenAtom);
    return list;
  }
});

const screenLoadingSelector = selector<boolean>({
  key: 'screenLoadingSelector',
  get: ({ get }) => {
    const { loading } = get(screenAtom);
    return loading;
  }
});

export { screenAtom, screenListSelector, screenLoadingSelector };
