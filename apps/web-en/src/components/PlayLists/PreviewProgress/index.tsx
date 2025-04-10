import React from 'react';

interface IPreviewProgress {
  scaleX: number;
  width: number;
}

const PreviewProgress: React.FC<IPreviewProgress> = ({ scaleX, width }) => {
  return (
    <li style={{ width: `${width}%` }}>
      <div
        style={{
          transform: `scaleX(${scaleX})`
        }}
      ></div>
    </li>
  );
};

export default PreviewProgress;
