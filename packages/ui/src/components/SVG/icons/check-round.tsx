import React from 'react';

import SVG, { type ISVG } from '..';

const CheckRound = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M16 10L10.5 15L8 12.7273"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="2" y="2" width="20" height="20" rx="10" stroke={color} strokeWidth="1.5" />
    </SVG>
  );
};

export default CheckRound;
