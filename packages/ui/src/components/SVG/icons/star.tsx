import React from 'react';

import SVG, { type ISVG } from '..';

const Star = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="Icon/Feather Icon">
        <path
          id="Vector"
          d="M12 4L14.472 8.93691L20 9.73344L16 13.5741L16.944 19L12 16.4369L7.056 19L8 13.5741L4 9.73344L9.528 8.93691L12 4Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default Star;
