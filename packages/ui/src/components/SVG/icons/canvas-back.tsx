import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasBack = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_back">
        <path
          id="Icon"
          d="M17.3984 9.17354L21.5984 7.02072L11.9984 2.09997L2.39844 7.02072C2.39844 7.02072 5.00502 8.35679 6.6752 9.21289"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Icon_2"
          d="M9.59844 15.3652L7.19844 14.135L2.39844 11.6747L11.9984 6.75393L21.5984 11.6747L16.7984 14.135L14.3984 15.3652M9.5 19.1676L12.1182 21.8877M12.1182 21.8877L14.7364 19.1676M12.1182 21.8877V12.173"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasBack;
