import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasTextStrike = ({ ...rest }: ISVG) => {
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
          d="M8.86619 23.5H9.21619L9.33599 23.1712L10.8552 19.001H17.1474L18.6639 23.1709L18.7836 23.5H19.1338H22H22.7241L22.4676 22.8229L16.0274 5.82287L15.9051 5.5H15.5598H12.4402H12.0949L11.9726 5.82287L5.53243 22.8229L5.27591 23.5H6H8.86619ZM15.9988 15.8428H12.0058L14.004 10.3577L15.9988 15.8428Z"
          stroke="black"
        />
      </g>
    </SVG>
  );
};

export default CanvasTextStrike;
