import React from 'react';

import SVG, { type ISVG } from '..';

const Video = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M11.3358 8.84615H8.21426M15.6149 15.2539L20.8932 17.8967C21.4403 18.2352 22.0145 18.0357 21.9997 17.3296L21.9627 7.98966C21.916 7.22309 21.4709 7.01391 20.8156 7.36818L15.6001 9.77758M3.55402 20H13.0385C14.4491 20 15.5925 18.852 15.5925 17.4359L15.6149 14.1472L15.5925 7.5641C15.5925 6.14799 14.4491 5 13.0385 5H3.55402C2.14347 5 1 6.14799 1 7.5641V17.4359C1 18.852 2.14347 20 3.55402 20Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Video;
