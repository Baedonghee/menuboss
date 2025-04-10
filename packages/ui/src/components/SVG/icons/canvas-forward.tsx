import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasForward = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_forward">
        <path
          id="Icon"
          d="M9.7 10.6543L7.3 11.9229L2.5 14.4602L12.1 19.5347L21.7 14.4602L16.9 11.9229L14.5 10.6543M9.5 7.18003L12.1182 4.45996M12.1182 4.45996L14.7364 7.18003M12.1182 4.45996V14.1746"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasForward;
