import React from 'react';

import SVG, { type ISVG } from '..';

const Avatar = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <rect width="24" height="24" rx="12" fill="#F1F1F1" />
      <path
        d="M16.8 17.4V16.2C16.8 15.5635 16.5471 14.9531 16.097 14.503C15.6469 14.0529 15.0365 13.8 14.4 13.8H9.59995C8.96343 13.8 8.35298 14.0529 7.90289 14.503C7.45281 14.9531 7.19995 15.5635 7.19995 16.2V17.4"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0001 11.4001C13.3256 11.4001 14.4001 10.3256 14.4001 9.0001C14.4001 7.67461 13.3256 6.6001 12.0001 6.6001C10.6746 6.6001 9.6001 7.67461 9.6001 9.0001C9.6001 10.3256 10.6746 11.4001 12.0001 11.4001Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Avatar;
