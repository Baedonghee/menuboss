import React from 'react';

import SVG, { type ISVG } from '..';

const Media = ({ color, ...rest }: ISVG) => {
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
        d="M19 17H20C21.6569 17 23 15.6569 23 14V8.07407C23 6.41722 21.6569 5.07407 20 5.07407H14.3802C13.6108 5.07407 12.8709 4.77849 12.3133 4.2484L11.8686 3.82567C11.3109 3.29559 10.571 3 9.80161 3H8C6.34315 3 5 4.34315 5 6V7H4C2.34315 7 1 8.34315 1 10V18C1 19.6569 2.34315 21 4 21H16C17.6569 21 19 19.6569 19 18V17ZM5 8V14C5 15.6569 6.34315 17 8 17H18V18C18 19.1046 17.1046 20 16 20H4C2.89543 20 2 19.1046 2 18V10C2 8.89543 2.89543 8 4 8H4.66667H5Z"
        fill={color}
      />
    </SVG>
  );
};

export default Media;
