import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasTextAlignCenter = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_align_center">
        <path
          id="Vector"
          d="M21.4297 10.2861H3.42969"
          stroke="black"
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M21 6H3"
          stroke="black"
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M21 14H3"
          stroke="black"
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M21.4297 18H3.42969"
          stroke="black"
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasTextAlignCenter;
