import React from 'react';

import SVG, { type ISVG } from '..';

const Kakao = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_kakao">
        <path
          id="Path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0001 3C6.47688 3 2 6.33531 2 10.4489C2 13.0072 3.73157 15.2625 6.36838 16.6039L5.25893 20.512C5.16091 20.8573 5.57047 21.1325 5.88498 20.9324L10.7482 17.8374C11.1586 17.8756 11.5757 17.8978 12.0001 17.8978C17.5228 17.8978 22 14.5627 22 10.4489C22 6.33531 17.5228 3 12.0001 3Z"
          fill={color}
        />
      </g>
    </SVG>
  );
};

export default Kakao;
