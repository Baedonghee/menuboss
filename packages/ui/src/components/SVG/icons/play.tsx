import React from 'react';

import SVG, { type ISVG } from '..';

const Play = ({ color, ...rest }: ISVG) => {
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
        d="M1.2 11.9996C1.2 6.03514 6.03514 1.2 11.9996 1.2C17.964 1.2 22.7992 6.03514 22.7992 11.9996C22.7992 17.964 17.964 22.7992 11.9996 22.7992C6.03514 22.7992 1.2 17.964 1.2 11.9996ZM11.9996 0C5.3724 0 0 5.3724 0 11.9996C0 18.6268 5.3724 23.9992 11.9996 23.9992C18.6268 23.9992 23.9992 18.6268 23.9992 11.9996C23.9992 5.3724 18.6268 0 11.9996 0ZM16 12L10 8V16L16 12Z"
        fill={color}
      />
    </SVG>
  );
};

export default Play;
