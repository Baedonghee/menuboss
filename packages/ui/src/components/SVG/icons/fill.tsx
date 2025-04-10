import React from 'react';

import SVG, { type ISVG } from '..';

interface IFill extends ISVG {
  fill: string;
}

const Fill = ({ color, fill, ...rest }: IFill) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        fill={fill}
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Fill;
