import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import meApi from '@/api/client/me.json';
import { authUserSelector } from '@/state/auth';
import axios from '@/utils/client/axios';

function useMeActions() {
  const setUser = useSetRecoilState(authUserSelector);

  async function updatePassword(password: string) {
    try {
      await axios.patch(meApi.updatePassword, { password });
    } catch (err) {
      throw err;
    }
  }

  async function updateName(name: string) {
    try {
      await axios.patch(meApi.updateName, { name });
      setUser((prev) => {
        if (prev) {
          return {
            ...prev,
            profile: {
              ...prev.profile,
              name
            }
          };
        }
        return prev;
      });
    } catch (err) {
      throw err;
    }
  }

  async function updatePhone(country: string | number, calling: string, phone: string) {
    try {
      await axios.patch(meApi.updatePhone, { country, phone: `${calling} ${phone}` });
      setUser((prev) => {
        if (prev) {
          return {
            ...prev,
            profile: {
              ...prev.profile,
              country,
              calling,
              phone: {
                country: String(country),
                calling,
                phone
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

  async function updateProfileImage(imageId: number) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<{ imageUrl: string }>> = await axios.patch(meApi.updateProfileImage, {
        imageId
      });
      setUser((prev) => {
        if (prev) {
          return {
            ...prev,
            profile: {
              ...prev.profile,
              imageUrl: data.imageUrl
            }
          };
        }
        return prev;
      });
    } catch (err) {
      throw err;
    }
  }

  async function deleteMember(reason: string) {
    try {
      await axios.post(meApi.deleteMember, { reason });
    } catch (err) {
      throw err;
    }
  }

  async function userReset() {
    setUser(null);
  }

  return { updatePassword, updateName, updatePhone, updateProfileImage, deleteMember, userReset };
}

export { useMeActions };
