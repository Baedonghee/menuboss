import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasShapeBorderColor = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_border_color">
        <rect
          id="Rectangle 172"
          x="2.33203"
          y="2.33301"
          width="23.3333"
          height="23.3333"
          rx="2.33333"
          fill="white"
          stroke="black"
          strokeWidth="1.75"
        />
      </g>
    </SVG>
  );
};

export default CanvasShapeBorderColor;
