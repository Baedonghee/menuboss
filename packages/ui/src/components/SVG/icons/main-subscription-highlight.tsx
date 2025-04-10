import React from 'react';

import SVG, { type ISVG } from '..';

const MainSubscriptionHighlight = ({ ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 560 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M581.201 11.8909C466.007 3.54921 348.812 7.39005 233.301 5.48314C156.919 4.21116 80.5368 1.60717 4.20918 0.518432C1.92075 0.488317 0.0328566 1.82234 -0.00614057 3.51001C-0.0437558 5.19768 1.78279 6.58833 4.06983 6.61844C80.3892 7.70713 156.763 10.3111 233.137 11.583C348.441 13.4891 465.414 9.63709 580.401 17.9677C582.68 18.13 584.703 16.9084 584.931 15.2317C585.146 13.5549 583.466 12.0632 581.201 11.8909Z"
        fill="#C1662F"
      />
    </SVG>
  );
};

export default MainSubscriptionHighlight;
