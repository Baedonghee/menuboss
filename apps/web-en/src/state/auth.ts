import { IMe } from '@repo/ui/types';
import { atom, DefaultValue, selector } from 'recoil';

interface IAuthState {
  user: IMe | null;
  initLoading: boolean;
  social: {
    type: 'Google' | 'Apple';
    token: string;
  } | null;
  passwordToken: string;
}

const authAtom = atom<IAuthState>({
  key: 'authState',
  default: {
    user: null,
    initLoading: true,
    social: null,
    passwordToken: ''
  }
});

const authUserSelector = selector<IMe | null>({
  key: 'authUserSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(authAtom, (prevState) => ({ ...prevState, user: newValue, initLoading: false }));
  },
  get: ({ get }) => {
    const { user } = get(authAtom);
    return user;
  }
});

const authInitLoadingSelector = selector<boolean>({
  key: 'authInitLoadingSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(authAtom, (prevState) => ({ ...prevState, initLoading: false }));
  },
  get: ({ get }) => {
    const { initLoading } = get(authAtom);
    return initLoading;
  }
});

const authSocialAccessTokenSelector = selector<{
  type: 'Google' | 'Apple';
  token: string;
} | null>({
  key: 'socialAccessTokenSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(authAtom, (prevState) => ({
      ...prevState,
      social: newValue,
      initLoading: false
    }));
  },
  get: ({ get }) => {
    const { social } = get(authAtom);
    return social;
  }
});

const authPasswordTokenSelector = selector<string>({
  key: 'authPasswordTokenSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(authAtom, (prevState) => ({
      ...prevState,
      passwordToken: newValue
    }));
  },
  get: ({ get }) => {
    const { passwordToken } = get(authAtom);
    return passwordToken;
  }
});

export {
  authAtom,
  authUserSelector,
  authInitLoadingSelector,
  authSocialAccessTokenSelector,
  authPasswordTokenSelector
};
