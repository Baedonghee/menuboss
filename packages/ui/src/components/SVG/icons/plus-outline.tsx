import React from 'react';

import SVG, { type ISVG } from '..';

const PlusOutline = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g clipPath="url(#clip0_1652_18589)">
        <circle cx="12" cy="12" r="11.25" stroke={color} strokeWidth="1.5" />
        <path
          d="M12 6V18M6 12H18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1652_18589">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  );
};

export default PlusOutline;
