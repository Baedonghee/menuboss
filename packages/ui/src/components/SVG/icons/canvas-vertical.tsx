import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasVertical = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_flip_vertical">
        <path
          id="Icon"
          d="M5.79922 21.6002L11.9992 15.2002L18.1992 21.5995L5.79922 21.6002Z"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Icon_2"
          d="M18.1992 2.39941L11.9992 8.79941L5.79922 2.40012L18.1992 2.39941Z"
          fill="#212121"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Icon_3"
          d="M3.19688 12.001L20.7969 12.001"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
        />
      </g>
    </SVG>
  );
};

export default CanvasVertical;
