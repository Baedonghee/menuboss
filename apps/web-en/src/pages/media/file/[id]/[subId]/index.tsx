import React from 'react';

import Protect from '@/components/Layout/Protect';
import FileDetail from '@/components/Media/FileDetail';

const MediaFolderFile = () => {
  return (
    <>
      <FileDetail />
    </>
  );
};

export default Protect(MediaFolderFile);
