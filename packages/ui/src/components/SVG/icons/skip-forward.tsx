import React from 'react';

import SVG, { type ISVG } from '..';

const SkipForward = ({ color, ...rest }: ISVG) => {
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
        d="M6 6L14 12L6 18V6ZM18 6H16V18H18V6Z"
        fill={color}
      />
    </SVG>
  );
};

export default SkipForward;
