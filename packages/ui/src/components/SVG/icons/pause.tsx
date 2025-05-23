import React from 'react';

import SVG, { type ISVG } from '..';

const Pause = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0014 1.2C6.03585 1.2 1.2 6.03508 1.2 11.9992C1.2 17.9634 6.03585 22.7984 12.0014 22.7984C17.967 22.7984 22.8028 17.9634 22.8028 11.9992C22.8028 6.03508 17.967 1.2 12.0014 1.2ZM0 11.9992C0 5.37212 5.37333 0 12.0014 0C18.6295 0 24.0028 5.37212 24.0028 11.9992C24.0028 18.6263 18.6295 23.9984 12.0014 23.9984C5.37333 23.9984 0 18.6263 0 11.9992ZM9 8H11V16H9V8ZM15 8H13V16H15V8Z"
        fill={color}
      />
    </SVG>
  );
};

export default Pause;
