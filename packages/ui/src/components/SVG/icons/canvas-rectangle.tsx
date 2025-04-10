import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasRectangle = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_rectangle">
        <rect
          id="Rectangle 335"
          x="3.5"
          y="3.5"
          width="21"
          height="21"
          stroke="black"
          strokeWidth="1.75"
        />
      </g>
    </SVG>
  );
};

export default CanvasRectangle;
