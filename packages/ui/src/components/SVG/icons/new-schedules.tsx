import React from 'react';

import SVG, { type ISVG } from '..';

const NewSchedules = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_new_schedules">
        <path
          id="Path"
          d="M44.7665 58.9353H12.7498C8.83782 58.9353 5.6665 56.3982 5.6665 53.2686V19.2686C5.6665 16.139 8.83782 13.6019 12.7498 13.6019H55.2498C59.1618 13.6019 62.3332 16.139 62.3332 19.2686L62.3332 44.2019M48.1669 7.93457V19.2679M19.8336 7.93457V19.2679M5.6665 29.1846H62.3332M54.3997 47.411V56.8555M59.1228 52.1328H49.6784M65.733 52.1335C65.733 58.3927 60.6589 63.4668 54.3997 63.4668C48.1405 63.4668 43.0664 58.3927 43.0664 52.1335C43.0664 45.8742 48.1405 40.8001 54.3997 40.8001C60.6589 40.8001 65.733 45.8742 65.733 52.1335Z"
          stroke={color}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default NewSchedules;
