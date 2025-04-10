import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasFront = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_front">
        <path
          id="Icon"
          d="M17.3984 14.8147L21.5984 16.9676L11.9984 21.8883L2.39844 16.9676L6.6752 14.7754"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Icon_2"
          d="M9.59844 8.62207L7.19844 9.85226L2.39844 12.3126L11.9984 17.2334L21.5984 12.3126L16.7984 9.85226L14.3984 8.62207M9.5 4.81968L12.1182 2.09961M12.1182 2.09961L14.7364 4.81968M12.1182 2.09961V11.8143"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasFront;
