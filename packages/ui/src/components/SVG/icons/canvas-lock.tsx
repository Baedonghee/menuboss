import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasLock = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_lock">
        <path
          id="vector"
          d="M7.71429 10.7143H16.2857M7.71429 10.7143C6.76751 10.7143 6 11.4818 6 12.4286V18.4286C6 21 7.71429 21 7.71429 21H16.2857C16.2857 21 18 21 18 18.4286V12.4286C18 11.4818 17.2325 10.7143 16.2857 10.7143M7.71429 10.7143V7.28571C7.71429 6.14907 8.16582 5.05898 8.96954 4.25526C9.77327 3.45153 10.8634 3 12 3C13.1366 3 14.2267 3.45153 15.0305 4.25526C15.8342 5.05898 16.2857 6.14907 16.2857 7.28571V10.7143"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle id="Ellipse 158" cx="12.0002" cy="14.6572" r="0.857143" fill={color} />
        <path
          id="Vector 586"
          d="M11.25 17.5714C11.25 17.9856 11.5858 18.3214 12 18.3214C12.4142 18.3214 12.75 17.9856 12.75 17.5714L11.25 17.5714ZM11.25 15L11.25 17.5714L12.75 17.5714L12.75 15L11.25 15Z"
          fill={color}
        />
      </g>
    </SVG>
  );
};

export default CanvasLock;
