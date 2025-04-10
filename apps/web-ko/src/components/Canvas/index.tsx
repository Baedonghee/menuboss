import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Box, CanvasEditor, CanvasPreview } from '@repo/ui/components';
import { extraProps, useCanvas } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { enlargeImage, getCustomErrorMessage } from '@repo/ui/utils';
import { fabric } from 'fabric';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useCanvasActions } from '@/actions/canvas-actions';
import {
  canvasDetailSelector,
  canvasFontListSelector,
  canvasPreviewSubmittingSelector,
  canvasSubmittingSelector
} from '@/state/canvas';
import { errorToast } from '@/utils/toast';

import CanvasHeader from './Header';
import CanvasSidebar from './Sidebar';

const CanvasToolWrapper = styled(Box)`
  .input-range-text {
    width: 44px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.black};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    font-size: ${({ theme }) => theme.fontSize.text12};
    border: 1px solid ${({ theme }) => theme.color.gray300};
    text-align: center;
    border-radius: 4px;
  }
  .input-range {
    appearance: none;
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 100px;
    &::-webkit-slider-thumb {
      appearance: none;
      width: 14px;
      height: 14px;
      background-color: ${({ theme }) => theme.color.white};
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.color.gray400};
      cursor: pointer;
    }
  }
`;

const fontList = [
  'Arial',
  'Calibri',
  'Cormorant Garamond',
  'Century Gothic',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Raleway',
  'Bodoni Moda'
];

const CanvasTool = () => {
  const {
    canvas,
    backgroundWidth,
    backgroundHeight,
    setCanvasBackgroundWhiteLeft,
    setCanvasBackgroundWhiteTop,
    handleZoom,
    historyProcessing,
    historyNextState,
    setImageList,
    canvasReset
  } = useCanvas();
  const { query } = useRouter();
  const [preview, setPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isAlignType, setIsAlignType] = useState<'Horizontal' | 'Vertical'>('Horizontal');
  const detail = useRecoilValue(canvasDetailSelector);
  const { canvasDetail, reset } = useCanvasActions();
  const [, setLoadedFontsCount] = useState(0);
  const [loadedFonts, setLoadedFonts] = useRecoilState(canvasFontListSelector);
  const setCanvasPreviewSubmitting = useSetRecoilState(canvasPreviewSubmittingSelector);
  const canvasSubmitting = useRecoilValue(canvasSubmittingSelector);
  const [_, setRender] = useState<boolean>(false);

  const [, drop] = useDrop(() => ({ accept: 'ITEM' }));

  useEffect(() => {
    const fontsToLoad = fontList.filter((fontName) => !loadedFonts.includes(fontName));

    if (fontsToLoad.length === 0) {
      console.log('All fonts are already loaded.');
      return;
    }
    const fontPromises = fontsToLoad.map((fontName) => {
      if (fontName === 'Arial') {
        return document.fonts.load('1em Arial');
      }
      const link = document.createElement('link');
      // link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      //   fontName
      // )}:wght@400;700&display=swap`;
      link.href = `/fonts/${encodeURIComponent(fontName)}.css`;
      link.rel = 'stylesheet';

      document.head.appendChild(link);

      return document.fonts.load(`1em ${fontName}`);
    });

    Promise.all(fontPromises)
      .then(() => {
        console.log('Fonts loaded successfully:', fontsToLoad);
        setLoadedFonts((prevFonts) => [...prevFonts, ...fontsToLoad]);
        setLoadedFontsCount((prevCount) => prevCount + fontsToLoad.length);

        // 모든 폰트가 사용 가능한 상태가 되면 이행됩니다.
        return document.fonts.ready;
      })
      .then(() => {
        console.log('All fonts are ready to use.');
      })
      .catch((error) => {
        console.error('Font loading failed:', error);
      });
    return () => {
      canvasReset();
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (detail && canvas) {
      historyProcessing.current = true;
      const canvasObjects = JSON.parse(detail.objects);
      const imageList = [] as string[];
      canvasObjects.objects.forEach((object: any) => {
        if (object.type === 'image') {
          if (!imageList.includes(object.id as string)) {
            imageList.push(object.id as string);
          }
        }
      });
      setImageList(imageList);
      canvas.loadFromJSON(canvasObjects, async () => {
        canvas.renderAll();
        handleZoom(detail.direction === 'Horizontal' ? '22' : '18', detail.direction);
        canvas.setZoom(detail.direction === 'Horizontal' ? 0.44 : 0.36);
        historyNextState.current = JSON.stringify(canvasObjects);
        historyProcessing.current = false;
      });
      setRender((prev) => !prev);
    }
  }, [detail, canvas]);

  useEffect(() => {
    if (query.id) {
      fetchDetail();
    }
  }, [query.id]);

  useEffect(() => {
    if (detail) {
      setIsAlignType(detail.direction);
    }
  }, [detail]);

  const fetchDetail = async () => {
    try {
      await canvasDetail(query.id as string);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handlePreview = (status: boolean) => {
    setCanvasPreviewSubmitting(true);
    if (status) {
      if (canvas) {
        const newCanvas = new fabric.Canvas('cloneCanvas', {
          width: isAlignType === 'Horizontal' ? backgroundWidth : backgroundHeight,
          height: isAlignType === 'Horizontal' ? backgroundHeight : backgroundWidth,
          selection: false,
          allowTouchScrolling: true
        });
        newCanvas.loadFromJSON(canvas.toDatalessJSON(extraProps), async () => {
          newCanvas.renderAll();
          const imageDataUrl = newCanvas.toDataURL({
            format: 'png',
            left: 0,
            top: 0,
            width: isAlignType === 'Horizontal' ? backgroundWidth : backgroundHeight,
            height: isAlignType === 'Horizontal' ? backgroundHeight : backgroundWidth,
            quality: 1
          });
          const resizeImage = await enlargeImage(imageDataUrl, 2);
          setPreviewImage(resizeImage);
          setPreview(true);
        });
      }
      return;
    }
    setCanvasPreviewSubmitting(false);
    setPreview(false);
  };

  const handleAlignType = (type: 'Horizontal' | 'Vertical') => {
    if (isAlignType === type) {
      return;
    }
    if (canvas) {
      if (canvas.getObjects()[0]) {
        const newWidth = canvas.getObjects()[0].height;
        const newHeight = canvas.getObjects()[0].width;
        let centerX = 0;
        let centerY = 0;
        if (type === 'Horizontal') {
          centerX = (canvas.getWidth() - backgroundWidth) / 2;
          centerY = (canvas.getHeight() - backgroundHeight) / 2;
        } else {
          centerX = (canvas.getWidth() - backgroundHeight) / 2;
          centerY = (canvas.getHeight() - backgroundWidth) / 2;
        }
        setCanvasBackgroundWhiteTop(centerY);
        setCanvasBackgroundWhiteLeft(centerX);
        canvas.getObjects()[0].set({
          width: newWidth,
          height: newHeight
        });

        handleZoom(type === 'Horizontal' ? '22' : '18', type);
        canvas.setZoom(type === 'Horizontal' ? 0.44 : 0.36);
        setIsAlignType(type);
      }
    }
  };

  return (
    <>
      {preview && (
        <CanvasPreview
          previewImage={previewImage}
          handlePreview={handlePreview}
          isAlignType={isAlignType}
          language="ko"
        />
      )}
      <CanvasToolWrapper
        width="100%"
        height="100%"
        position="absolute"
        top="0"
        left="0"
        overflow={preview ? 'hidden' : 'auto'}
      >
        <CanvasHeader
          handlePreview={handlePreview}
          isAlignType={isAlignType}
          handleAlignType={handleAlignType}
        />
        <Box
          display="flex"
          width="100%"
          height="calc(100% - 80px)"
          pointerEvents={canvasSubmitting ? 'none' : 'auto'}
        >
          <Box width="340px" minWidth="340px" borderRight={`1px solid ${theme.color.gray200}`}>
            <CanvasSidebar />
          </Box>
          <Box width="calc(100% - 340px)" overflow="hidden">
            <CanvasEditor
              isAlignType={isAlignType}
              fontList={loadedFonts}
              drop={drop}
              detail={!!detail}
            />
          </Box>
        </Box>
      </CanvasToolWrapper>
    </>
  );
};

export default CanvasTool;
