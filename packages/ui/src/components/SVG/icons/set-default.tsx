import React from 'react';

import SVG, { type ISVG } from '..';

const SetDefault = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_set_default">
        <path
          id="Icon"
          d="M5.3125 8.125L2.5 5.3125M2.5 5.3125L5.3125 2.5M2.5 5.3125L17.5 5.3125M14.6875 11.875L17.5 14.6875M17.5 14.6875L14.6875 17.5M17.5 14.6875L2.5 14.6875"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default SetDefault;
