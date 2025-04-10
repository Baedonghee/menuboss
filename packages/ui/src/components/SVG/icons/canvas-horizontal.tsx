import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasHorizontal = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_flip_horizontal">
        <path
          id="Icon"
          d="M21.5992 18.1998L15.1992 11.9998L21.5985 5.7998L21.5992 18.1998Z"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Icon_2"
          d="M2.39844 5.7998L8.79844 11.9998L2.39914 18.1998L2.39844 5.7998Z"
          fill="#212121"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Icon_3"
          d="M12 20.8002V3.2002"
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

export default CanvasHorizontal;
