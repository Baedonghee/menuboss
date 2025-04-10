import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasShapeColor = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_color">
        <rect
          id="Rectangle 172"
          x="1.16797"
          y="1.16699"
          width="25.6667"
          height="25.6667"
          rx="2.33333"
          fill="#F1F1F1"
          stroke="#E1E1E1"
          strokeWidth="1.16667"
        />
      </g>
    </SVG>
  );
};

export default CanvasShapeColor;
