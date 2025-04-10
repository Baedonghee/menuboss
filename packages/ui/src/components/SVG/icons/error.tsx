import React from 'react';

import SVG, { type ISVG } from '..';

const Error = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path d="M5.28247 5.28247L18.7175 18.7175" stroke={color} strokeWidth="1.5" />
      <rect x="2" y="2" width="20" height="20" rx="10" stroke={color} strokeWidth="1.5" />
    </SVG>
  );
};

export default Error;
