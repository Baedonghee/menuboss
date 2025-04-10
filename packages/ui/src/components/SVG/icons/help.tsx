import React from 'react';

import SVG, { type ISVG } from '..';

const Help = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_help">
        <path
          id="Icon"
          d="M12.9987 19V19.0527M10 9.30666C10 7.61851 11.3431 6.25 13 6.25C14.6569 6.25 16 7.61851 16 9.30666C16 10.9948 14.6569 12.3633 13 12.3633C13 12.3633 12.9987 13.2757 12.9987 14.4011M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default Help;
