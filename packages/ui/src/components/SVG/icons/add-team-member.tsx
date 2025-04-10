import React from 'react';

import SVG, { type ISVG } from '..';

const AddTeamMember = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="calendar-time">
        <g id="Group 159">
          <path
            id="Vector"
            d="M6 57.4984V52.3874C6 49.6763 7.09187 47.0763 9.03542 45.1593C10.979 43.2423 13.615 42.1653 16.3636 42.1653H37.1718C39.9204 42.1653 42.5565 43.2423 44.5 45.1593"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M42 37.5H47.5C50.2486 37.5 52.8846 38.577 54.8282 40.494"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_3"
            d="M26.7273 31.9442C32.451 31.9442 37.0909 27.3676 37.0909 21.7221C37.0909 16.0766 32.451 11.5 26.7273 11.5C21.0037 11.5 16.3638 16.0766 16.3638 21.7221C16.3638 27.3676 21.0037 31.9442 26.7273 31.9442Z"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_4"
            d="M42 14.5C43.7163 14.9548 45.2376 15.9879 46.324 17.4364C47.4103 18.8849 48 20.6664 48 22.5C48 24.3336 47.4103 26.1151 46.324 27.5636C45.2376 29.0121 43.7163 30.0452 42 30.5"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="Group 2394">
          <circle
            id="Ellipse 163"
            cx="54.3997"
            cy="52.6334"
            r="11.3333"
            stroke={color}
            strokeWidth="2.5"
          />
          <g id="Group 2387">
            <path
              id="Vector 120"
              d="M54.3999 47.9106V57.3551"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector 121"
              d="M59.1226 52.6331L49.6781 52.6331"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </SVG>
  );
};

export default AddTeamMember;
