import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasBackward = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_backward">
        <path
          id="Icon"
          d="M9.7 13.3359L7.3 12.0673L2.5 9.53005L12.1 4.45553L21.7 9.53005L16.9 12.0673L14.5 13.3359M9.5 16.8102L12.1182 19.5303M12.1182 19.5303L14.7364 16.8102M12.1182 19.5303V9.81559"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasBackward;
