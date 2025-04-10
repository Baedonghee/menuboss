import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasTextSpacing = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_spacing">
        <path
          id="Vector"
          d="M12.832 14H24.4987"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M12.832 7H24.4987"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M12.832 21H24.4987"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector 587"
          d="M3.5 8.16634L6.41667 5.83301M6.41667 5.83301L9.33333 8.16634M6.41667 5.83301V11.6663"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector 588"
          d="M9.33203 19.8337L6.41536 22.167M6.41536 22.167L3.4987 19.8337M6.41536 22.167L6.41536 11.667"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasTextSpacing;
