import React from 'react';

import SVG, { type ISVG } from '..';

const My = ({ color, ...rest }: ISVG) => {
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
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM3 21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V19C21 16.2386 18.7614 14 16 14H8C5.23858 14 3 16.2386 3 19V21Z"
        fill={color}
      />
    </SVG>
  );
};

export default My;
