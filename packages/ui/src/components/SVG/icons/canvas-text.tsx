import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasText = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_text">
        <path
          id="Vector 589"
          d="M6.99643 17H9.99287M12.9893 17H9.99287M9.99287 17V3H4M4 3V5.54545M4 3H16V5.54545"
          stroke={color}
          strokeWidth="1.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasText;
