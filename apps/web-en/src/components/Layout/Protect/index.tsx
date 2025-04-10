/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React from 'react';
import { useRouter } from 'next/router';

import useAuth from '@/hooks/use-auth';
import { PATH } from '@/utils/path';

function Protect<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();
    const { asPath } = router;
    const [loading, user] = useAuth();
    if (loading) {
      return null;
    }

    if (!user && !loading) {
      router.replace(`${PATH.LOGIN}${asPath ? `?continue=${encodeURIComponent(asPath)}` : ''}`);
      return;
    }

    return <Component {...props!} />;
  };
}

export default Protect;
