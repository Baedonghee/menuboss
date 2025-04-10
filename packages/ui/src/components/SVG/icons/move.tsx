import React from 'react';

import SVG, { type ISVG } from '..';

const Move = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M14.026 19.7118L4.77382 19.7118C3.44833 19.7118 2.37381 18.6373 2.37383 17.3118L2.37392 8.18749C2.37392 7.27356 2.37358 5.97183 2.37329 5.02928C2.37309 4.36636 2.91042 3.82959 3.57334 3.82959H9.29155L12.0566 6.78323H20.3729C21.0356 6.78323 21.5729 7.32049 21.5729 7.98323V11.1708"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7842 14.7704L22.2268 17.2247M22.2268 17.2247L19.8946 19.5704M22.2268 17.2247L16.2268 17.2247"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Move;
