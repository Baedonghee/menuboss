import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasOpacity = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_opacity">
        <rect
          id="Rectangle 167"
          x="3.5"
          y="3.5"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 169"
          opacity="0.5"
          x="11.8984"
          y="3.5"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 171"
          opacity="0.2"
          x="20.2969"
          y="3.5"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 168"
          opacity="0.7"
          x="7.70312"
          y="7.69922"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 170"
          opacity="0.4"
          x="16.1016"
          y="7.69922"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 167_2"
          x="3.5"
          y="11.9004"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 169_2"
          opacity="0.5"
          x="11.8984"
          y="11.9004"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 171_2"
          opacity="0.2"
          x="20.2969"
          y="11.9004"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 168_2"
          opacity="0.7"
          x="7.70312"
          y="16.0996"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 170_2"
          opacity="0.4"
          x="16.1016"
          y="16.0996"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 167_3"
          x="3.5"
          y="20.3008"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 169_3"
          opacity="0.5"
          x="11.8984"
          y="20.3008"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
        <rect
          id="Rectangle 171_3"
          opacity="0.2"
          x="20.2969"
          y="20.3008"
          width="4.2"
          height="4.2"
          rx="0.4375"
          fill={color}
        />
      </g>
    </SVG>
  );
};

export default CanvasOpacity;
