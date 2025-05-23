import React from 'react';

import SVG, { type ISVG } from '..';

const PlayListLineEmpty = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_playlist_list_empty">
        <path
          id="Rectangle"
          d="M48.4998 42.3323V50.6656M52.6672 46.4998H44.3339M7.5 13H12.5M7.5 28H12.5M7.5 43H12.5M7.5 30.5H12.5M7.5 15.5H12.5M7.5 33H12.5M7.5 45.5H12.5M7.5 18H12.5M7.5 48H12.5M39.3332 50.5C40.8763 54.0317 44.4004 56.4998 48.501 56.4998C54.0238 56.4998 58.501 52.0226 58.501 46.4998C58.501 40.9769 54.0238 36.4998 48.501 36.4998C45.2292 36.4998 42.3245 38.071 40.5001 40.5M39.3332 50.5C38.7979 49.275 38.501 47.9221 38.501 46.4998C38.501 44.2487 39.2448 42.1713 40.5001 40.5M39.3332 50.5H20C18.6193 50.5 17.5 49.3807 17.5 48V43C17.5 41.6193 18.6193 40.5 20 40.5H40.5001M20 20.5H50C51.3807 20.5 52.5 19.3807 52.5 18V13C52.5 11.6193 51.3807 10.5 50 10.5H20C18.6193 10.5 17.5 11.6193 17.5 13V18C17.5 19.3807 18.6193 20.5 20 20.5ZM20 35.5H50C51.3807 35.5 52.5 34.3807 52.5 33V28C52.5 26.6193 51.3807 25.5 50 25.5H20C18.6193 25.5 17.5 26.6193 17.5 28V33C17.5 34.3807 18.6193 35.5 20 35.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default PlayListLineEmpty;
