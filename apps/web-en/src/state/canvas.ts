import { ICanvasDetail, ICanvasList } from '@repo/ui/types';
import { atom, DefaultValue, selector } from 'recoil';

interface ICanvasState {
  list: ICanvasList[];
  loading: boolean;
  detail: ICanvasDetail | null;
  fontList: string[];
  previewSubmitting: boolean;
  submitting: boolean;
}

const canvasAtom = atom<ICanvasState>({
  key: 'canvasAtom',
  default: {
    list: [],
    loading: true,
    detail: null,
    fontList: [],
    previewSubmitting: false,
    submitting: false
  }
});

const canvasListSelector = selector<ICanvasList[]>({
  key: 'canvasListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(canvasAtom, (prevState) => ({
      ...prevState,
      list: newValue
    }));
  },
  get: ({ get }) => {
    const { list } = get(canvasAtom);
    return list;
  }
});

const canvasLoadingSelector = selector<boolean>({
  key: 'canvasLoadingSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(canvasAtom, (prevState) => ({
      ...prevState,
      loading: newValue
    }));
  },
  get: ({ get }) => {
    const { loading } = get(canvasAtom);
    return loading;
  }
});

const canvasDetailSelector = selector<ICanvasDetail | null>({
  key: 'canvasDetailSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(canvasAtom, (prevState) => ({
      ...prevState,
      detail: newValue
    }));
  },
  get: ({ get }) => {
    const { detail } = get(canvasAtom);
    return detail;
  }
});

const canvasFontListSelector = selector<string[]>({
  key: 'canvasFontListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(canvasAtom, (prevState) => ({
      ...prevState,
      fontList: newValue
    }));
  },
  get: ({ get }) => {
    const { fontList } = get(canvasAtom);
    return fontList;
  }
});

const canvasPreviewSubmittingSelector = selector<boolean>({
  key: 'canvasPreviewSubmittingSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(canvasAtom, (prevState) => ({
      ...prevState,
      previewSubmitting: newValue
    }));
  },
  get: ({ get }) => {
    const { previewSubmitting } = get(canvasAtom);
    return previewSubmitting;
  }
});

const canvasSubmittingSelector = selector<boolean>({
  key: 'canvasSubmittingSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(canvasAtom, (prevState) => ({
      ...prevState,
      submitting: newValue
    }));
  },
  get: ({ get }) => {
    const { submitting } = get(canvasAtom);
    return submitting;
  }
});

export {
  canvasAtom,
  canvasListSelector,
  canvasLoadingSelector,
  canvasDetailSelector,
  canvasFontListSelector,
  canvasPreviewSubmittingSelector,
  canvasSubmittingSelector
};
