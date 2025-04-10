import React from 'react';

import SVG, { type ISVG } from '..';

const DisplayScreen = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_display_screen">
        <path
          id="Icon"
          d="M8.75004 15.833L2.70837 15.833C1.67284 15.833 0.833372 14.9802 0.833372 13.9282L0.833373 6.42824C0.833373 5.37627 1.67284 4.52348 2.70837 4.52348L13.9584 4.52348C14.9939 4.52348 15.8334 5.37627 15.8334 6.42824L15.8334 7.49967M11.1459 1.66634L8.33337 4.52348L5.52087 1.66634"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Icon_2"
          d="M15 14.1667L15 16.25M15 12.6225V12.6042M10.8334 14.1667C10.8334 11.8655 12.6989 10 15 10C17.3012 10 19.1667 11.8655 19.1667 14.1667C19.1667 16.4679 17.3012 18.3333 15 18.3333C12.6989 18.3333 10.8334 16.4679 10.8334 14.1667Z"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default DisplayScreen;
