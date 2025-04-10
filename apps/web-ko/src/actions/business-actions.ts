import {
  IApi,
  IApiList,
  IBusinessAddressForm,
  IBusinessMember,
  IBusinessMemberForm,
  IBusinessRole,
  IBusinessRoleForm
} from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import qs from 'qs';
import { ParsedUrlQuery } from 'querystring';
import { useSetRecoilState } from 'recoil';

import businessApi from '@/api/client/business.json';
import { authUserSelector } from '@/state/auth';
import {
  businessAtom,
  businessMemberListSelector,
  businessMemberRoleListSelector
} from '@/state/business';
import axios from '@/utils/client/axios';

function useBusinessActions() {
  const setUser = useSetRecoilState(authUserSelector);
  const setBusiness = useSetRecoilState(businessAtom);
  const setBusinessMemberRoleList = useSetRecoilState(businessMemberRoleListSelector);
  const setBusinessMemberList = useSetRecoilState(businessMemberListSelector);

  async function getMemberList(query: ParsedUrlQuery) {
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
      const url = `${businessApi.getMembers}?${qs.stringify(newQuery)}`;
      const {
        data: { list, page }
      }: AxiosResponse<IApiList<IBusinessMember[]>> = await axios.get(url);
      setBusiness((prevState) => ({
        ...prevState,
        memberList: list,
        memberLoading: false,
        memberPage: page,
        roleList: [],
        roleLoading: true
      }));
    } catch (err) {
      throw err;
    }
  }

  async function createMember(formData: IBusinessMemberForm) {
    try {
      const url = businessApi.createMembers;
      const {
        data: { data }
      }: AxiosResponse<IApi<IBusinessMember>> = await axios.post(url, formData);
      setBusinessMemberList((prevState) => [...prevState, data]);
    } catch (err) {
      throw err;
    }
  }

  async function updateMember(memberId: number, formData: IBusinessMemberForm) {
    try {
      const url = businessApi.updateMember.replace(':id', memberId.toString());
      const {
        data: { data }
      }: AxiosResponse<IApi<IBusinessMember>> = await axios.put(url, formData);
      setBusinessMemberList((prevState) =>
        prevState.map((item) => {
          if (item.memberId === memberId) {
            return data;
          }
          return item;
        })
      );
    } catch (err) {
      throw err;
    }
  }

  async function updateTitle(title: string) {
    try {
      const url = businessApi.updateTitle;
      await axios.patch(url, { title });
      setUser((prev) => {
        if (prev) {
          return {
            ...prev,
            business: {
              ...prev.business,
              title
            }
          };
        }
        return prev;
      });
    } catch (err) {
      throw err;
    }
  }

  async function updateAddress(formData: IBusinessAddressForm) {
    try {
      const url = businessApi.updateAddress;
      await axios.patch(url, formData);
      setUser((prev) => {
        if (prev) {
          return {
            ...prev,
            business: {
              ...prev.business,
              address: {
                city: formData.city,
                country: formData.country,
                line1: formData.line1,
                line2: formData.line2 || '',
                postalCode: formData.postalCode,
                state: formData.state || ''
              }
            }
          };
        }
        return prev;
      });
    } catch (err) {
      throw err;
    }
  }

  async function deleteMember(memberId: number) {
    try {
      const url = businessApi.deleteMember.replace(':id', memberId.toString());
      await axios.delete(url);
      setBusinessMemberList((prevState) => prevState.filter((item) => item.memberId !== memberId));
    } catch (err) {
      throw err;
    }
  }

  async function getMemberRoleList() {
    try {
      const {
        data: { list }
      }: AxiosResponse<IApiList<IBusinessRole[]>> = await axios.get(businessApi.getRoles);
      setBusinessMemberRoleList(list);
    } catch (err) {
      throw err;
    }
  }

  async function getRoleList() {
    try {
      const {
        data: { list }
      }: AxiosResponse<IApiList<IBusinessRole[]>> = await axios.get(businessApi.getRoles);
      setBusiness((prevState) => ({
        ...prevState,
        memberList: [],
        memberLoading: true,
        memberPage: null,
        roleList: list,
        roleLoading: false
      }));
    } catch (err) {
      throw err;
    }
  }

  async function createRole(formData: IBusinessRoleForm) {
    try {
      const url = businessApi.createRoles;
      const {
        data: { data }
      }: AxiosResponse<IApi<IBusinessRole>> = await axios.post(url, formData);
      setBusiness((prevState) => ({
        ...prevState,
        roleList: [...prevState.roleList, data]
      }));
    } catch (err) {
      throw err;
    }
  }

  async function updateRole(roleId: number, formData: IBusinessRoleForm) {
    try {
      const url = businessApi.updateRoles.replace(':id', roleId.toString());
      await axios.patch(url, formData);
      setBusiness((prevState) => ({
        ...prevState,
        roleList: prevState.roleList.map((item) => {
          if (item.roleId === roleId) {
            return {
              ...item,
              ...formData
            };
          }
          return item;
        })
      }));
    } catch (err) {
      throw err;
    }
  }

  async function deleteRole(roleId: number) {
    try {
      const url = businessApi.deleteRole.replace(':id', roleId.toString());
      await axios.delete(url);
      setBusiness((prevState) => ({
        ...prevState,
        roleList: prevState.roleList.filter((item) => item.roleId !== roleId)
      }));
    } catch (err) {
      throw err;
    }
  }

  async function reset() {
    setBusiness((prevState) => ({
      ...prevState,
      memberList: [],
      memberLoading: true,
      memberPage: null,
      roleList: [],
      roleLoading: true
    }));
  }

  return {
    getMemberList,
    createMember,
    updateMember,
    updateTitle,
    updateAddress,
    deleteMember,
    getMemberRoleList,
    getRoleList,
    createRole,
    updateRole,
    deleteRole,
    reset
  };
}

export { useBusinessActions };
