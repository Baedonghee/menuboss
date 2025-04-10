import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Typography, UnderlineInput } from '@repo/ui/components';
import { useBeforeUnload, useHistory } from '@repo/ui/hooks';
import { Back, HorizontalFilled, VerticalFilled } from '@repo/ui/icons';
import { extraProps, useCanvas } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { delay, getCustomErrorMessage } from '@repo/ui/utils';
import { fabric } from 'fabric';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useCanvasActions } from '@/actions/canvas-actions';
import {
  canvasDetailSelector,
  canvasPreviewSubmittingSelector,
  canvasSubmittingSelector
} from '@/state/canvas';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast, successToast } from '@/utils/toast';

const CanvasHeaderWrapper = styled(Box)`
  ul.align-type {
    display: flex;
    height: 40px;
    align-items: center;
    border-radius: 4px;
    width: 240px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      border-right: 1px solid ${({ theme }) => theme.color.gray300};
      cursor: pointer;
      &:last-child {
        border-right: none;
      }
    }
  }
`;

interface ICanvasHeader {
  handlePreview: (status: boolean) => void;
  isAlignType: 'Horizontal' | 'Vertical';
  handleAlignType: (type: 'Horizontal' | 'Vertical') => void;
}

const CanvasHeader: React.FC<ICanvasHeader> = ({ handlePreview, isAlignType, handleAlignType }) => {
  const { back } = useHistory();
  const router = useRouter();
  const { query } = router;
  const detail = useRecoilValue(canvasDetailSelector);
  const { canvas, backgroundWidth, backgroundHeight, imageList } = useCanvas();
  const { canvasImageUpload, canvasCreate, canvasUpdate } = useCanvasActions();
  const [isFocus, setIsFocus] = useState(false);
  const canvasPreviewSubmitting = useRecoilValue(canvasPreviewSubmittingSelector);
  const [canvasSubmitting, setCanvasSubmitting] = useRecoilState(canvasSubmittingSelector);
  const {
    register,
    watch,
    getValues,
    setFocus,
    handleSubmit,
    setValue,
    formState: { isDirty }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  });

  const { isDirty: isPageChange, setIsDirty: setIsPageChange } = useBeforeUnload(
    isDirty,
    ADMIN_PATH.CANVAS
  );

  useEffect(() => {
    if (canvas && !canvasSubmitting) {
      const canvasJson = canvas.toDatalessJSON(extraProps);
      const canvasObjects = canvas.getObjects();
      if (canvasObjects.length) {
        if (detail) {
          if (detail.objects !== JSON.stringify(canvasJson) || isDirty) {
            setIsPageChange(true);
          } else {
            setIsPageChange(false);
          }
        } else {
          if (canvasObjects.length === 1) {
            if (canvasObjects[0].fill !== theme.color.white) {
              setIsPageChange(true);
            } else {
              setIsPageChange(false);
            }
          } else {
            if (isDirty || canvasObjects.length > 1) {
              setIsPageChange(true);
            } else {
              setIsPageChange(true);
            }
          }
        }
      } else {
        setIsPageChange(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail, canvas?.getObjects(), isDirty, canvasSubmitting]);

  useEffect(() => {
    if (detail) {
      setValue('name', detail.name, { shouldValidate: true });
    }
  }, [detail, setValue]);

  const handleCanvasNameBlur = () => {
    if (query.id && detail) {
      const { name } = getValues();
      if (!name) {
        setValue('name', detail.name, { shouldValidate: true });
        return;
      }
    }
    setIsFocus(false);
  };

  const handleBack = () => {
    back(ADMIN_PATH.CANVAS);
  };

  const handleFocus = (isFocus: boolean) => {
    setIsFocus(isFocus);
  };

  const onNameSubmit = handleSubmit(({ name }) => {
    setValue('name', name, { shouldValidate: true });
    setIsFocus(false);
  });

  const onSubmit = async () => {
    if (canvas) {
      setCanvasSubmitting(true);
      const newCanvas = new fabric.Canvas('cloneCanvas', {
        width: isAlignType === 'Horizontal' ? backgroundWidth : backgroundHeight,
        height: isAlignType === 'Horizontal' ? backgroundHeight : backgroundWidth,
        selection: false,
        allowTouchScrolling: true
      });

      newCanvas.loadFromJSON(canvas.toDatalessJSON(extraProps), async () => {
        newCanvas.setZoom(1);
        newCanvas.renderAll();

        const backgroundRect = newCanvas.getObjects()[0];
        backgroundRect.set({
          strokeWidth: 0,
          stroke: 'transparent'
        });

        const imageDataUrl = newCanvas.toDataURL({
          format: 'png',
          left: 0,
          top: 0,
          width: isAlignType === 'Horizontal' ? backgroundWidth : backgroundHeight,
          height: isAlignType === 'Horizontal' ? backgroundHeight : backgroundWidth,
          quality: 1
        });
        // Data URL을 Blob으로 변환
        const byteCharacters = atob(imageDataUrl.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        /*
          // 이미지 파일 저장 또는 사용 가능
          // 여기에서는 콘솔에 이미지 파일을 출력하도록 했지만, 실제로는 여러 용도로 사용할 수 있습니다.
          // 이미지 다운로드
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'canvas_image.png';
          a.click();
          window.URL.revokeObjectURL(url);
        */

        // Blob을 사용하여 이미지 파일 생성
        const imageFile = new File([blob], 'canvas_image.png', { type: 'image/png' });

        try {
          const canvasImageId = await canvasImageUpload(imageFile);
          if (canvasImageId) {
            const { name } = getValues();
            const objects = canvas.toDatalessJSON(extraProps);
            const formData = {
              name,
              width: 1920,
              height: 1024,
              direction: isAlignType,
              objects: JSON.stringify(objects),
              canvasImageId,
              mediaIds: imageList
            };
            if (detail) {
              await canvasUpdate(query.id as string, formData);
            } else {
              await canvasCreate(formData);
            }
            successToast('Canvas saved successfully');
            setIsPageChange(false);
            await delay(100);
            router.push(ADMIN_PATH.CANVAS);
          }
        } catch (err) {
          errorToast(getCustomErrorMessage(err));
          setCanvasSubmitting(false);
        }
      });
    }
  };

  return (
    <CanvasHeaderWrapper
      height="80px"
      width="100%"
      display="flex"
      alignItems="center"
      p="0px 32px"
      borderBottom={`1px solid ${theme.color.gray200}`}
    >
      <Box display="flex" width="308px">
        <Box display="flex" cursor="pointer" onClick={handleBack}>
          <Back width="20" height="20" color={theme.color.gray900} />
          <Typography ml="8px" fontSize={theme.fontSize.text16} color={theme.color.gray900}>
            Back
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="calc(100% - 308px)"
      >
        <Box width="33.33%">
          <Form title="canvas name" onSubmit={onNameSubmit}>
            <UnderlineInput
              name="name"
              register={register}
              onBlur={handleCanvasNameBlur}
              width="auto"
              value={watch('name')}
              setFocus={setFocus}
              placeholder="Please enter a title"
              isFocus={isFocus}
              handleFocus={handleFocus}
            />
          </Form>
        </Box>
        <Box width="33.33%" justifyContent="center" display="flex">
          <ul className="align-type">
            <li onClick={() => handleAlignType('Horizontal')}>
              <HorizontalFilled
                width="24"
                height="24"
                color={isAlignType === 'Horizontal' ? theme.color.gray900 : theme.color.gray400}
              />
              <Typography
                ml="4px"
                fontSize={theme.fontSize.text12}
                fontWeight={theme.fontWeight.semiBold}
                color={isAlignType === 'Horizontal' ? theme.color.gray900 : theme.color.gray400}
              >
                Horizontal
              </Typography>
            </li>
            <li onClick={() => handleAlignType('Vertical')}>
              <VerticalFilled
                width="24"
                height="24"
                color={isAlignType === 'Vertical' ? theme.color.gray900 : theme.color.gray400}
              />
              <Typography
                ml="4px"
                fontSize={theme.fontSize.text12}
                fontWeight={theme.fontWeight.semiBold}
                color={isAlignType === 'Vertical' ? theme.color.gray900 : theme.color.gray400}
              >
                Vertical
              </Typography>
            </li>
          </ul>
        </Box>
        <Box display="flex" alignItems="center" width="33.33%" justifyContent="end">
          <Button
            color="neutral"
            variant="outline"
            mr="12px"
            width="120px"
            onClick={() => handlePreview(true)}
            disabled={canvasPreviewSubmitting}
          >
            Preview
          </Button>
          <Button
            width="120px"
            onClick={onSubmit}
            disabled={canvasSubmitting || !isPageChange || canvas?.getObjects().length === 1}
          >
            Save
          </Button>
        </Box>
      </Box>
    </CanvasHeaderWrapper>
  );
};

export default CanvasHeader;
