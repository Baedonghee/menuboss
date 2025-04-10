import React from 'react';

import SVG, { type ISVG } from '..';

const MoveHere = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M6.22679 3.81824H4.75327C3.63435 3.81824 2.72729 4.73402 2.72729 5.86369V18.1364C2.72729 19.2661 3.63435 20.1819 4.75327 20.1819H12.2727M13.1335 3.81824H14.8831C16.0021 3.81824 16.9091 4.73402 16.9091 5.86369V10.3637"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="6.54541"
        y="2.72729"
        width="6.54545"
        height="2.72727"
        rx="1.36364"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1558 10.3636V12.7879C18.1558 13.1226 18.4349 13.394 18.7791 13.394H21.2726"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.0259 21.2727H13.7922C13.1036 21.2727 12.5454 20.7301 12.5454 20.0606V11.5758C12.5454 10.9063 13.1036 10.3636 13.7922 10.3636H18.1558L21.2727 13.394V20.0606C21.2727 20.7301 20.7145 21.2727 20.0259 21.2727Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0391 14.0001H15.6624"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0391 16.4241H18.7793"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0391 18.8484H18.7793"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default MoveHere;
