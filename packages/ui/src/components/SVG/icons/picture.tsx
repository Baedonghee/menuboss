import React from 'react';

import SVG, { type ISVG } from '..';

const Picture = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M23 18.2222C23 18.6937 22.7893 19.1459 22.4142 19.4793C22.0391 19.8127 21.5304 20 21 20H3C2.46957 20 1.96086 19.8127 1.58579 19.4793C1.21071 19.1459 1 18.6937 1 18.2222V8.44444C1 7.97295 1.21071 7.52076 1.58579 7.18737C1.96086 6.85397 2.46957 6.66667 3 6.66667H7L9 4H15L17 6.66667H21C21.5304 6.66667 22.0391 6.85397 22.4142 7.18737C22.7893 7.52076 23 7.97295 23 8.44444V18.2222Z"
        stroke={color}
        strokeWidth="1.50667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke={color}
        strokeWidth="1.50667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Picture;
