import React from 'react';

import SVG, { type ISVG } from '..';

const Folder = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M0.399902 20V4C0.399902 2.89543 1.29533 2 2.3999 2H7.28185C7.82582 2 8.34633 2.22157 8.72339 2.61365L9.32769 3.24202C9.70476 3.6341 10.2253 3.85567 10.7692 3.85567H21.5999C22.7045 3.85567 23.5999 4.7511 23.5999 5.85567V20C23.5999 21.1046 22.7045 22 21.5999 22H2.3999C1.29533 22 0.399902 21.1046 0.399902 20Z"
        fill="#D6D6D6"
        stroke={color}
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      <rect
        x="0.399902"
        y="6"
        width="23.2"
        height="16"
        rx="2"
        fill="#F1F1F1"
        stroke={color}
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default Folder;
