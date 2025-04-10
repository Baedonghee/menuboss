import React from 'react';

import SVG, { type ISVG } from '..';

const After = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M20 9.08325C16 9.08325 12.5714 9.08325 8.57143 9.08325C8.38686 9.08325 4 9.08325 4 13.7499C4 18.9999 8.23131 18.9999 8.57143 18.9999C12 18.9999 14.2857 18.9999 17.7143 18.9999"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13.1667C17.5621 11.5721 18.4379 10.6779 20 9.08333C18.4379 7.4887 17.5621 6.59464 16 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default After;
