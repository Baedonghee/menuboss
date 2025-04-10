import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasShapeUnlock = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_un_lock_2">
        <path
          id="Icon"
          d="M5.49999 8.58333V7.82143C5.49999 5.289 7.50715 3.25 10 3.25C11.4431 3.25 12.7234 3.93331 13.5458 5.00008M5.49999 8.58333C4.67499 8.58333 4 9.26905 4 10.1071V15.2262C4 16.0643 4.67499 16.75 5.49999 16.75H14.5C15.325 16.75 16 16.0643 16 15.2262V10.1071C16 9.26905 15.325 8.58333 14.5 8.58333H5.49999Z"
          stroke="black"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasShapeUnlock;
