import React from 'react';

import SVG, { type ISVG } from '..';

const Logout = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M8.78007 3.59998H5.07419C4.51256 3.59998 3.97392 3.82122 3.57679 4.21505C3.17965 4.60888 2.95654 5.14302 2.95654 5.69998V18.3C2.95654 18.8569 3.17965 19.3911 3.57679 19.7849C3.97392 20.1787 4.51256 20.4 5.07419 20.4H8.78007M9.04326 12H21.0433M21.0433 12L16.4581 7.19998M21.0433 12L16.4581 16.8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Logout;
