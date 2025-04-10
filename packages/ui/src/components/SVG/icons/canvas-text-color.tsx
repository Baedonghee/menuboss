import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasTextColor = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_text_color">
        <path
          id="A"
          d="M10.2579 17.5003H8.16797L12.8639 4.66699H15.1387L19.8346 17.5003H17.7447L14.0555 6.99805H13.9535L10.2579 17.5003ZM10.6083 12.4748H17.3879V14.104H10.6083V12.4748Z"
          fill="black"
        />
        <rect
          id="Rectangle 78"
          x="5.83203"
          y="19.833"
          width="16.3333"
          height="3.5"
          rx="1.75"
          fill="url(#paint0_linear_2133_18507)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2133_18507"
          x1="5.83203"
          y1="21.583"
          x2="22.1654"
          y2="21.583"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF0000" />
          <stop offset="0.151042" stopColor="#FF9900" />
          <stop offset="0.302083" stopColor="#FAFF00" />
          <stop offset="0.427083" stopColor="#B1FF00" />
          <stop offset="0.557292" stopColor="#52FF00" />
          <stop offset="0.708333" stopColor="#00FFF0" />
          <stop offset="0.854167" stopColor="#0085FF" />
          <stop offset="1" stopColor="#000AFF" />
        </linearGradient>
      </defs>
    </SVG>
  );
};

export default CanvasTextColor;
