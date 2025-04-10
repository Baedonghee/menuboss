/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React from 'react';

import useAuth from '@/hooks/use-auth';

function MainProtect<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    useAuth();

    return <Component {...props!} />;
  };
}

export default MainProtect;
