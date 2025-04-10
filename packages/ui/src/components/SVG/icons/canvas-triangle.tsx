import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasTriangle = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_triangle">
        <path
          id="Vector 638"
          d="M2.33203 24.5L13.9987 3.5L25.6654 24.5H2.33203Z"
          stroke="black"
          strokeWidth="1.75"
        />
      </g>
    </SVG>
  );
};

export default CanvasTriangle;
