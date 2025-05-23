import React from 'react';

import SVG, { type ISVG } from '..';

const Fit = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 4.25C2.0335 4.25 1.25 5.0335 1.25 6V18C1.25 18.9665 2.0335 19.75 3 19.75H21C21.9665 19.75 22.75 18.9665 22.75 18V6C22.75 5.0335 21.9665 4.25 21 4.25H3ZM5.9685 18.25H18.0315C18.0109 18.1701 18 18.0863 18 18V6C18 5.91368 18.0109 5.82991 18.0315 5.75H5.9685C5.98906 5.82991 6 5.91368 6 6V18C6 18.0863 5.98906 18.1701 5.9685 18.25Z"
        fill={color}
      />
    </SVG>
  );
};

export default Fit;
