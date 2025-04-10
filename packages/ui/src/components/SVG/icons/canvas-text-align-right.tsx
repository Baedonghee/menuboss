import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasTextAlignRight = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_align_right">
        <path
          id="Vector"
          d="M7 14H21"
          stroke="black"
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M3 18H21"
          stroke="black"
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M3 10H21"
          stroke="black"
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M7 6H21"
          stroke="black"
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasTextAlignRight;
