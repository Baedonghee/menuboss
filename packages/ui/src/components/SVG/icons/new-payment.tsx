import React from 'react';

import SVG, { type ISVG } from '..';

const NewPayment = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_new_payment">
        <path
          id="Rectangle 329"
          d="M3.1875 29.1875V50.4375C3.1875 53.9583 6.04168 56.8125 9.5625 56.8125H43.5625M3.1875 29.1875V18.5625C3.1875 15.0417 6.04168 12.1875 9.5625 12.1875H58.4375C61.9583 12.1875 64.8125 15.0417 64.8125 18.5625V29.1875M3.1875 29.1875H64.8125M64.8125 29.1875V48.3125M54.3999 47.9106V57.355M59.123 52.6324H49.6786M65.7332 52.6331C65.7332 58.8923 60.6591 63.9664 54.3999 63.9664C48.1406 63.9664 43.0665 58.8923 43.0665 52.6331C43.0665 46.3738 48.1406 41.2997 54.3999 41.2997C60.6591 41.2997 65.7332 46.3738 65.7332 52.6331Z"
          stroke={color}
          strokeWidth="1.7"
        />
      </g>
    </SVG>
  );
};

export default NewPayment;
