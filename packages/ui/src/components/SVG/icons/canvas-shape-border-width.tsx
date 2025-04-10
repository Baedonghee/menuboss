import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasShapeBorderWidth = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_border_width">
        <rect
          id="Rectangle 172"
          x="2.33203"
          y="3.5"
          width="23.3333"
          height="2.33333"
          rx="0.583333"
          fill="black"
        />
        <rect
          id="Rectangle 173"
          x="2.33203"
          y="8.16699"
          width="23.3333"
          height="4.66667"
          rx="0.583333"
          fill="black"
        />
        <rect
          id="Rectangle 174"
          x="2.33203"
          y="15.167"
          width="23.3333"
          height="9.33333"
          rx="0.583333"
          fill="black"
        />
      </g>
    </SVG>
  );
};

export default CanvasShapeBorderWidth;
