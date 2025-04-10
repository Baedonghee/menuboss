import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasTextItalic = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_ltalic">
        <path
          id="icon italic"
          d="M21 8.55556V7H10.8889V8.55556H14.8867L11.4878 19.4444H7V21H17.1111V19.4444H13.1133L16.5122 8.55556H21Z"
          fill="black"
        />
      </g>
    </SVG>
  );
};

export default CanvasTextItalic;
