import React from 'react';
import { CanvasProvider } from '@repo/ui/providers';

import CanvasTool from '@/components/Canvas';
import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';

const CanvasNew = () => {
  return (
    <>
      <SeoHead title="New Canvas | MenuBoss" />
      <CanvasProvider>
        <CanvasTool />
      </CanvasProvider>
    </>
  );
};

export default Protect(CanvasNew);
