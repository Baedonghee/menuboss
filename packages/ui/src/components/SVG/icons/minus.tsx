import React from 'react';

import SVG, { type ISVG } from '..';

const Minus = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_minus">
        <path
          id="vector"
          d="M2.40015 6H10.4001"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default Minus;
