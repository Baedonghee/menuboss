import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasLine = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_line">
        <path
          id="Vector 656"
          d="M4.92896 19.071L19.0711 4.92891"
          stroke="#212121"
          strokeWidth="1.5"
        />
      </g>
    </SVG>
  );
};

export default CanvasLine;
