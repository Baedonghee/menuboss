import React from 'react';

import SVG, { type ISVG } from '..';

const Playlists = ({ color, ...rest }: ISVG) => {
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
        d="M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM15.0345 12.9078C15.8087 12.5502 15.8087 11.4498 15.0345 11.0922L10.9193 9.19145C10.2567 8.88539 9.5 9.36938 9.5 10.0993V13.9007C9.5 14.6306 10.2567 15.1146 10.9193 14.8085L15.0345 12.9078Z"
        fill={color}
      />
    </SVG>
  );
};

export default Playlists;
