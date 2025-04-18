import React from 'react';

import SVG, { type ISVG } from '..';

const Screens = ({ color, ...rest }: ISVG) => {
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
        d="M19 7V6C19 4.34314 17.6569 3 16 3H5C3.34315 3 2 4.34315 2 6V16C2 17.6569 3.34315 19 5 19H12C12 20.1046 12.8954 21 14 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7H19ZM14 8H15C15 8.55228 15.4477 9 16 9H18C18.5523 9 19 8.55228 19 8H20C20.5523 8 21 8.44772 21 9V19C21 19.5523 20.5523 20 20 20H14C13.4477 20 13 19.5523 13 19V9C13 8.44771 13.4477 8 14 8Z"
        fill={color}
      />
    </SVG>
  );
};

export default Screens;
