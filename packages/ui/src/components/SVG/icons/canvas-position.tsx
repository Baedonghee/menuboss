import React from 'react';

import SVG, { type ISVG } from '..';

const CanvasPosition = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <g id="icon_position">
        <path
          id="Vector"
          d="M15.6758 15.7969L18.6637 22.75L20.6562 20.7098L22.747 18.6667L15.6758 15.7969Z"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M20.9727 21.0186L23.619 23.6295"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M13.7085 20.5459C12.0768 20.9257 10.3651 20.7861 8.81866 20.1471C7.27227 19.5081 5.9706 18.4025 5.10022 16.9888C4.22983 15.5751 3.83541 13.9258 3.97348 12.2773C4.11155 10.6288 4.77502 9.06577 5.86881 7.81218C6.9626 6.55859 8.43055 5.67881 10.0623 5.29893C11.694 4.91904 13.4057 5.05856 14.9522 5.69749C16.4986 6.33641 17.8003 7.44194 18.6707 8.85563C19.5412 10.2693 19.9357 11.9186 19.7977 13.5671"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M13.2681 17.5655C12.3163 17.787 11.3178 17.7056 10.4157 17.3329C9.51364 16.9601 8.75434 16.3152 8.24661 15.4905C7.73889 14.6659 7.50881 13.7038 7.58935 12.7422C7.66989 11.7805 8.05691 10.8688 8.69496 10.1375C9.333 9.40625 10.1893 8.89304 11.1411 8.67144C12.093 8.44985 13.0915 8.53123 13.9936 8.90394C14.8957 9.27664 15.655 9.92154 16.1628 10.7462C16.6705 11.5708 16.9006 12.5329 16.8201 13.4945"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};

export default CanvasPosition;
