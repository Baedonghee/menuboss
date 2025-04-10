import React from 'react';

import SVG, { type ISVG } from '..';

const Menu = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_menu">
        <path
          id="Vector"
          d="M21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V9C3 9.55228 3.44772 10 4 10H20C20.5523 10 21 9.55228 21 9V4Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M21 15C21 14.4477 20.5523 14 20 14H17C16.4477 14 16 14.4477 16 15V20C16 20.5523 16.4477 21 17 21H20C20.5523 21 21 20.5523 21 20V15Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M12 15C12 14.4477 11.5523 14 11 14H4C3.44772 14 3 14.4477 3 15V20C3 20.5523 3.44772 21 4 21H11C11.5523 21 12 20.5523 12 20V15Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default Menu;
