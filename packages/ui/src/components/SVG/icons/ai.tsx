import React from 'react';

import SVG, { type ISVG } from '..';

const Ai = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g clipPath="url(#clip0_1876_8611)">
        <path
          d="M23 12.5C23 11.6716 22.3284 11 21.5 11C20.6716 11 20 11.6716 20 12.5C20 13.3284 20.6716 14 21.5 14C22.3284 14 23 13.3284 23 12.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 16C15 15.1716 14.3284 14.5 13.5 14.5C12.6716 14.5 12 15.1716 12 16C12 16.8284 12.6716 17.5 13.5 17.5C14.3284 17.5 15 16.8284 15 16Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 8.5C15 7.67157 14.3284 7 13.5 7C12.6716 7 12 7.67157 12 8.5C12 9.32843 12.6716 10 13.5 10C14.3284 10 15 9.32843 15 8.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 9L16.6667 9C17.0203 9 17.3594 9.12292 17.6095 9.34171C17.8595 9.5605 18 9.85725 18 10.1667L18 14.8333C18 15.1428 17.8595 15.4395 17.6095 15.6583C17.3594 15.8771 17.0203 16 16.6667 16L16 16"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.4267 18.5565L17.4267 20.3334C17.4267 21.2538 16.6805 22 15.76 22L9.04348 22C8.123 22 7.37681 21.2538 7.37681 20.3334L7.37681 20.2231C7.37681 19.3027 6.63062 18.5565 5.71014 18.5565L5.13237 18.5565C4.21189 18.5565 3.4657 17.8103 3.4657 16.8898L3.4657 15.4414C3.4657 14.9272 3.04884 14.5103 2.53462 14.5103V14.5103C1.83576 14.5103 1.38602 13.769 1.70881 13.1492L3.27448 10.1426C3.40005 9.90147 3.46368 9.63707 3.486 9.36612C3.61803 7.76318 4.60679 2 12 2C12 2 12 2 12 2C12 2 18.7222 2 18.7222 7.00004"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M19.5 12.5001H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_1876_8611">
          <rect width="24" height="24" fill={color} transform="translate(0 24) rotate(-90)" />
        </clipPath>
      </defs>
    </SVG>
  );
};

export default Ai;
