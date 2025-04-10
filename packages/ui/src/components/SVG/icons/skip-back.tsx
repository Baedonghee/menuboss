import React from 'react';

import SVG, { type ISVG } from '..';

const SkipBack = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 6L10 12L18 18V6ZM6 6H8V18H6V6Z"
        fill={color}
      />
    </SVG>
  );
};

export default SkipBack;
