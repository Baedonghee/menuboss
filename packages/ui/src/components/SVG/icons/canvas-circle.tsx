import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasCircle = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_circle">
        <circle id="Ellipse 183" cx="14" cy="14" r="10.5" stroke="black" strokeWidth="1.75" />
      </g>
    </SVG>
  );
};

export default CanvasCircle;
