import React from 'react';

import SVG, { type ISVG } from '..';

const Before = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M4 9.08325C8 9.08325 11.4286 9.08325 15.4286 9.08325C15.6131 9.08325 20 9.08325 20 13.7499C20 18.9999 15.7687 18.9999 15.4286 18.9999C12 18.9999 9.71429 18.9999 6.28571 18.9999"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13.1667C6.43791 11.5721 5.56209 10.6779 4 9.08333C5.56209 7.4887 6.43791 6.59464 8 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Before;
