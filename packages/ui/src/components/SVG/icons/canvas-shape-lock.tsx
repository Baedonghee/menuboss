import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasShapeLock = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_lock_2">
        <path
          id="Icon"
          d="M4 10.1068C4 9.26872 4.675 8.58301 5.5 8.58301H14.5C15.325 8.58301 16 9.26872 16 10.1068V15.2259C16 16.064 15.325 16.7497 14.5 16.7497H5.5C4.675 16.7497 4 16.064 4 15.2259V10.1068Z"
          fill="black"
          stroke="black"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          id="Icon_2"
          d="M5.5 7.82143C5.5 5.289 7.50714 3.25 10 3.25C12.4929 3.25 14.5 5.289 14.5 7.82143"
          stroke="black"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasShapeLock;
