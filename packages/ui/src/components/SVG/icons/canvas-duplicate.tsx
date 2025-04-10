import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasDuplicate = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_duplicate">
        <path
          id="Rectangle 166"
          d="M19.0039 9.00098V5.58431C19.0039 5.26214 18.7427 5.00098 18.4206 5.00098H6.58724C6.26507 5.00098 6.00391 5.26214 6.00391 5.58431V19.4176C6.00391 19.7398 6.26507 20.001 6.58724 20.001H10.0039M10.0039 20.001V23.4176C10.0039 23.7398 10.2651 24.001 10.5872 24.001H22.4206C22.7427 24.001 23.0039 23.7398 23.0039 23.4176V9.58431C23.0039 9.26214 22.7427 9.00098 22.4206 9.00098H10.5872C10.2651 9.00098 10.0039 9.26214 10.0039 9.58431V20.001Z"
          stroke={color}
          strokeWidth="1.75"
        />
      </g>
    </SVG>
  );
};

export default CanvasDuplicate;
