import React from 'react';

import SVG, { type ISVG } from '..';

const Rename = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M13.7999 19.5516H19.7999M4.19995 19.5516L8.56594 18.6718C8.79771 18.6251 9.01053 18.511 9.17767 18.3438L18.9513 8.56474C19.4199 8.09588 19.4196 7.33589 18.9506 6.86743L16.8802 4.79936C16.4114 4.33109 15.6518 4.33141 15.1834 4.80007L5.40871 14.5801C5.2419 14.747 5.128 14.9594 5.08125 15.1907L4.19995 19.5516Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Rename;
