import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasTextColorPicker = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_color_picker">
        <path
          id="Icon"
          d="M10.7276 7.50591L16.4941 13.2724M19.2038 8.64052L8.13723 19.7071C7.94969 19.8946 7.69534 20 7.43012 20H5C4.44771 20 4 19.5523 4 19V16.5699C4 16.3047 4.10536 16.0503 4.29289 15.8628L15.3595 4.79619C16.4211 3.73461 18.1422 3.7346 19.2038 4.79619C20.2654 5.85777 20.2654 7.57894 19.2038 8.64052Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasTextColorPicker;
