import React from 'react';

import SVG, { type ISVG } from '..';

const More = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <circle cx="12" cy="5" r="1" fill={color} stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill={color} stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="19" r="1" fill={color} stroke={color} strokeWidth="1.5" />
    </SVG>
  );
};

export default More;
