import React, { useCallback, useEffect } from 'react';
import { Box, Typography } from '@repo/ui/components';
import { NewCanvas } from '@repo/ui/icons';
import { useAlert, useCanvas } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { ICanvasList } from '@repo/ui/types';
import { useParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import { useCanvasActions } from '@/actions/canvas-actions';
import { skeletonList } from '@/models/skeleton';
import { canvasListSelector, canvasLoadingSelector } from '@/state/canvas';

import CanvasItem from '../../CanvasItem';

const SidebarCanvas: React.FC = () => {
  const { id } = useParams();
  const { canvas, historyProcessing, historyNextState } = useCanvas();
  const canvasLoading = useRecoilValue(canvasLoadingSelector);
  const canvasList = useRecoilValue(canvasListSelector);
  const { handleShowAlert, handleClose } = useAlert();
  const { canvasList: list, canvasDetail, canvasListReset } = useCanvasActions();

  useEffect(() => {
    if (canvasList.length === 0) {
      fetchCanvasList();
    }
    return () => {
      canvasListReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCanvasList = async () => {
    try {
      await list((id as string) || '');
    } catch (error) {
      console.error('Error fetch canvas list:', error);
    }
  };

  const handleCanvasClick = async (item: ICanvasList) => {
    if (canvas) {
      try {
        const data = await canvasDetail(item.canvasId, true);
        if (data) {
          handleShowAlert({
            title: 'Apply canvas',
            type: 'info',
            alertType: 'confirm',
            description: 'Do you want to apply the canvas?',
            onConfirm: () => {
              historyProcessing.current = true;
              canvas.loadFromJSON(JSON.parse(data.objects), async () => {
                historyNextState.current = data.objects;
                canvas.renderAll();
                historyProcessing.current = false;
              });
              handleClose();
            }
          });
        }
      } catch (error) {
        console.error('Error apply canvas:', error);
      }
    }
  };

  const findCard = useCallback(
    (id: string) => {
      const item = canvasList.filter((c) => `${c.canvasId}` === id)[0] as ICanvasList;
      return {
        item,
        index: canvasList.indexOf(item)
      };
    },
    [canvasList]
  );

  return (
    <>
      <Box
        position="relative"
        width="100%"
        overflowY="auto"
        p="24px 16px"
        height={`calc(100vh - 132px)`}
        id="fileList"
        justifyContent="center"
        display={canvasLoading || canvasList.length ? 'block' : 'flex'}
      >
        <ul className="list">
          {canvasLoading ? (
            skeletonList.map((_, index) => (
              <CanvasItem
                id="1"
                key={`skeleton-${index}`}
                findCard={findCard}
                handleCanvasClick={handleCanvasClick}
              />
            ))
          ) : canvasList.length ? (
            canvasList.map((item, index) => (
              <CanvasItem
                key={`canvas-${item.canvasId}-${index}`}
                id={item.canvasId}
                item={item}
                findCard={findCard}
                handleCanvasClick={handleCanvasClick}
              />
            ))
          ) : (
            <Box
              display="flex"
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Box textAlign="center">
                <NewCanvas width="60" height="60" color={theme.color.gray400} />
                <Typography mt="12px" fontSize={theme.fontSize.text12} color={theme.color.gray400}>
                  There are no current canvases
                  <br />
                  Please create a canvases
                </Typography>
              </Box>
            </Box>
          )}
        </ul>
      </Box>
    </>
  );
};

export default SidebarCanvas;
