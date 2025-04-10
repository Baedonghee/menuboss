import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasAngle = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M13 5L9 12M5 19H19M5 19L9 12M5 19H13C13 19 14.5 12 9 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default CanvasAngle;
