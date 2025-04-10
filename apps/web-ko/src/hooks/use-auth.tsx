/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useAuthActions } from '@/actions/auth-action';
import { authAtom } from '@/state/auth';
import { setAuthorization } from '@/utils/client/axios';

const useAuth = () => {
  const [isAuth, setIsAuth] = useRecoilState(authAtom);
  const { me } = useAuthActions();
  useEffect(() => {
    const fetchMe = async () => {
      try {
        await me();
      } catch (err) {
        setAuthorization('');
        setIsAuth({
          user: null,
          initLoading: false,
          social: null,
          passwordToken: ''
        });
      }
    };
    if (isAuth.initLoading) {
      fetchMe();
    }
  }, []);

  return [isAuth.initLoading, isAuth.user];
};

export default useAuth;
