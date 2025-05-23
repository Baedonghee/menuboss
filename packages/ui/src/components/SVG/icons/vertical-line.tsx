import React from 'react';

import SVG, { type ISVG } from '..';

const VerticalLine = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M19 21L19 3C19 2.44772 18.5523 2 18 2L6 2C5.44772 2 5 2.44771 5 3L5 21C5 21.5523 5.44771 22 6 22L18 22C18.5523 22 19 21.5523 19 21Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5761 8.14681C14.311 8.46501 13.8381 8.50801 13.5198 8.24283L12.75 7.60128L12.75 16.3987L13.5198 15.7572C13.8381 15.492 14.311 15.535 14.5761 15.8532C14.8413 16.1714 14.7983 16.6443 14.4801 16.9095L12.4801 18.5762C12.202 18.8079 11.798 18.8079 11.5198 18.5762L9.51984 16.9095C9.20163 16.6443 9.15864 16.1714 9.42381 15.8532C9.68899 15.535 10.1619 15.492 10.4801 15.7572L11.25 16.3987L11.25 7.60128L10.4801 8.24283C10.1619 8.50801 9.68899 8.46501 9.42382 8.1468C9.15864 7.8286 9.20164 7.35567 9.51984 7.0905L11.5198 5.42383C11.798 5.19206 12.202 5.19206 12.4801 5.42383L14.4801 7.0905C14.7983 7.35567 14.8413 7.8286 14.5761 8.14681Z"
        fill={color}
      />
    </SVG>
  );
};

export default VerticalLine;
