import React from 'react';

import SVG, { type ISVG } from '..';

const TooltipArrow = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 11 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        id="Vector 592"
        d="M10.5 5H0.5L4.79289 0.707107C5.18342 0.316583 5.81658 0.316582 6.20711 0.707106L10.5 5Z"
        fill={color}
      />
    </SVG>
  );
};

export default TooltipArrow;
