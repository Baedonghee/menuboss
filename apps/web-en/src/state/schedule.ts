import { IScheduleDetail, IScheduleList } from '@repo/ui/types';
import { atom, DefaultValue, selector } from 'recoil';

interface IScheduleState {
  list: IScheduleList[];
  loading: boolean;
  detail: IScheduleDetail | null;
}

const scheduleAtom = atom<IScheduleState>({
  key: 'scheduleAtom',
  default: {
    list: [],
    loading: true,
    detail: null
  }
});

const scheduleListSelector = selector<IScheduleList[]>({
  key: 'scheduleListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(scheduleAtom, (prevState) => ({
      ...prevState,
      list: newValue
    }));
  },
  get: ({ get }) => {
    const { list } = get(scheduleAtom);
    return list;
  }
});

const scheduleLoadingSelector = selector<boolean>({
  key: 'scheduleLoadingSelector',
  get: ({ get }) => {
    const { loading } = get(scheduleAtom);
    return loading;
  }
});

const scheduleDetailSelector = selector<IScheduleDetail | null>({
  key: 'scheduleDetailSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(scheduleAtom, (prevState) => ({
      ...prevState,
      detail: newValue
    }));
  },
  get: ({ get }) => {
    const { detail } = get(scheduleAtom);
    return detail;
  }
});

export { scheduleAtom, scheduleListSelector, scheduleLoadingSelector, scheduleDetailSelector };
