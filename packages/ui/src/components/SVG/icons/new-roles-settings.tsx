import React from 'react';

import SVG, { type ISVG } from '..';

const NewRolesSettings = ({ color, ...rest }: ISVG) => {
  return (
    <SVG
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <circle cx="54.4005" cy="52.6331" r="11.3333" stroke="#C2C2C2" strokeWidth="1.7" />
      <path
        d="M54.3972 47.9102V57.3546"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M59.1204 52.6318L49.6759 52.6318"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44.002 58.5017H23.252C18.6956 58.5017 15.002 54.8081 15.002 50.2517V25.5017M18.002 55.5023C18.7911 54.6185 25.2179 49.3296 27.8531 47.277C28.8128 46.5294 29.9901 46.1273 31.2066 46.1273C34.1484 46.1273 41.9261 46.1273 44.882 46.1273M25.002 14.5017H50.752C55.3083 14.5017 59.002 18.1954 59.002 22.7517V43.0017M44.882 30.2501C44.882 26.0529 41.3387 22.6236 37.002 22.6236C32.6653 22.6236 29.1219 26.0529 29.1219 30.2501C29.1219 34.4474 32.6653 37.8767 37.002 37.8767C41.3386 37.8767 44.882 34.4474 44.882 30.2501Z"
        stroke={color}
        strokeWidth="1.7"
      />
      <path
        d="M20.0007 15.5007L15.526 19.5007L14.0007 18.1372M25.0007 12.5007L25.0007 22.5007C25.0007 24.1576 23.6576 25.5007 22.0007 25.5007H12.0007C10.3439 25.5007 9.00073 24.1576 9.00073 22.5007V12.5007C9.00073 10.8439 10.3439 9.50073 12.0007 9.50073H22.0007C23.6576 9.50073 25.0007 10.8439 25.0007 12.5007Z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default NewRolesSettings;
