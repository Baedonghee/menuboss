import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasAfter = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_after">
        <path
          id="Vector"
          d="M20 9.08301C16 9.08301 12.5714 9.08301 8.57143 9.08301C8.38686 9.08301 4 9.08301 4 13.7497C4 18.9997 8.23131 18.9997 8.57143 18.9997C12 18.9997 14.2857 18.9997 17.7143 18.9997"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M16 13.1667C17.5621 11.5721 18.4379 10.6779 20 9.08333C18.4379 7.4887 17.5621 6.59464 16 5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasAfter;
