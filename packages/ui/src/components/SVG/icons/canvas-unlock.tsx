import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasUnLock = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_lock">
        <path
          id="vector"
          d="M9 12.5H19C20.1046 12.5 21 13.3954 21 14.5V21.5C21 24.5 19 24.5 19 24.5H9C9 24.5 7 24.5 7 21.5V14.5C7 13.3954 7.89543 12.5 9 12.5ZM9 12.5V8.5C9 7.17392 9.52678 5.90215 10.4645 4.96447C11.4021 4.02678 12.6739 3.5 14 3.5C15.3261 3.5 16.5979 4.02678 17.5355 4.96447C18.4732 5.90215 19 7.17392 19 8.5"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle id="Ellipse 158" cx="14.0039" cy="17.5" r="1" fill={color} />
        <path
          id="Vector 586"
          d="M13.125 20.5C13.125 20.9832 13.5168 21.375 14 21.375C14.4832 21.375 14.875 20.9832 14.875 20.5L13.125 20.5ZM13.125 17.5L13.125 20.5L14.875 20.5L14.875 17.5L13.125 17.5Z"
          fill={color}
        />
      </g>
    </SVG>
  );
};

export default CanvasUnLock;
