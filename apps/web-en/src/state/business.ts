import { IBusinessMember, IBusinessRole, IPage } from '@repo/ui/types';
import { atom, DefaultValue, selector } from 'recoil';

interface IBusinessState {
  memberList: IBusinessMember[];
  memberLoading: boolean;
  memberPage: IPage | null;
  memberRoleList: IBusinessRole[];
  roleList: IBusinessRole[];
  roleLoading: boolean;
}

const businessAtom = atom<IBusinessState>({
  key: 'businessAtom',
  default: {
    memberList: [],
    memberLoading: true,
    memberPage: null,
    memberRoleList: [],
    roleList: [],
    roleLoading: true
  }
});

const businessMemberListSelector = selector<IBusinessMember[]>({
  key: 'businessMemberListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(businessAtom, (prevState) => ({
      ...prevState,
      memberList: newValue
    }));
  },
  get: ({ get }) => {
    const { memberList } = get(businessAtom);
    return memberList;
  }
});

const businessMemberLoadingSelector = selector<boolean>({
  key: 'businessMemberLoadingSelector',
  get: ({ get }) => {
    const { memberLoading } = get(businessAtom);
    return memberLoading;
  }
});

const businessMemberPageSelector = selector<IPage | null>({
  key: 'businessMemberPageSelector',
  get: ({ get }) => {
    const { memberPage } = get(businessAtom);
    return memberPage;
  }
});

const businessMemberRoleListSelector = selector<IBusinessRole[]>({
  key: 'businessMemberRoleListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(businessAtom, (prevState) => ({
      ...prevState,
      memberRoleList: newValue
    }));
  },
  get: ({ get }) => {
    const { memberRoleList } = get(businessAtom);
    return memberRoleList;
  }
});

const businessRoleListSelector = selector<IBusinessRole[]>({
  key: 'businessRoleListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(businessAtom, (prevState) => ({
      ...prevState,
      roleList: newValue
    }));
  },
  get: ({ get }) => {
    const { roleList } = get(businessAtom);
    return roleList;
  }
});

const businessRoleLoadingSelector = selector<boolean>({
  key: 'businessRoleLoadingSelector',
  get: ({ get }) => {
    const { roleLoading } = get(businessAtom);
    return roleLoading;
  }
});

export {
  businessAtom,
  businessMemberListSelector,
  businessMemberLoadingSelector,
  businessMemberPageSelector,
  businessMemberRoleListSelector,
  businessRoleListSelector,
  businessRoleLoadingSelector
};
