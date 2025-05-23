import React from 'react';

import SVG, { type ISVG } from '..';

const Upload2 = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_upload-02">
        <g id="Icon">
          <path d="M8.15 16.75L12 13.25L15.85 16.75H13.1V21H10.9V16.75H8.15Z" fill={color} />
          <path
            d="M4.53571 16.6637C2.58299 16.6637 1 15.4496 1 13.6695C1 11.8894 2.58299 10.4463 4.53571 10.4463C4.6685 10.4463 4.79958 10.453 4.92857 10.466V10.4463H4.9772C4.94511 10.2117 4.92857 9.97265 4.92857 9.73009C4.92857 6.56545 7.74278 4 11.2143 4C13.5651 4 15.6145 5.17642 16.6927 6.91867C16.9562 6.88334 17.2257 6.86504 17.5 6.86504C20.5376 6.86504 23 9.10981 23 11.8789C23 14.1583 21.3314 15.896 19.0469 16.4688M12 13.25L8.15 16.75H10.9V21H13.1V16.75H15.85L12 13.25Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </SVG>
  );
};

export default Upload2;
