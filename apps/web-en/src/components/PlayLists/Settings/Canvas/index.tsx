import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, CheckBox, Typography } from '@repo/ui/components';
import { NewCanvas } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { ICanvasList, IPlayListItemContent } from '@repo/ui/types';
import { nanoid } from 'nanoid';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCanvasActions } from '@/actions/canvas-actions';
import { skeletonList } from '@/models/skeleton';
import { canvasListSelector, canvasLoadingSelector } from '@/state/canvas';
import { playlistsContentListSelector } from '@/state/playlists';

import CanvasItem from '../../CanvasItem';

const SettingsCanvas: React.FC = () => {
  const canvasLoading = useRecoilValue(canvasLoadingSelector);
  const canvasList = useRecoilValue(canvasListSelector);
  const setList = useSetRecoilState(playlistsContentListSelector);
  const { canvasList: list, canvasListReset } = useCanvasActions();
  const [selectCanvasCheckList, setSelectCanvasCheckList] = useState<ICanvasList[]>([]);

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
      await list();
    } catch (error) {
      console.error('Error fetch canvas list:', error);
    }
  };

  const handleCanvasClick = async (item: ICanvasList) => {
    setList((prev) => [
      ...prev,
      {
        id: nanoid(),
        contentId: item.canvasId,
        type: {
          code: 'Canvas',
          name: 'canvas'
        },
        name: item.name,
        duration: 10,
        property: {
          imageUrl: item.imageUrl
        }
      }
    ]);
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

  const handleAddPlaylist = () => {
    const newPlayListContent = [] as IPlayListItemContent[];

    for (const item of selectCanvasCheckList) {
      newPlayListContent.push({
        id: nanoid(),
        contentId: item.canvasId,
        type: {
          code: 'Canvas',
          name: 'canvas'
        },
        name: item.name,
        duration: 10,
        property: {
          imageUrl: item.imageUrl
        }
      });
    }
    setList((prev) => [...prev, ...newPlayListContent]);
    setSelectCanvasCheckList([]);
  };

  const handleMenuCheckAll = () => {
    if (selectCanvasCheckList.length === canvasList.length) {
      setSelectCanvasCheckList([]);
    } else {
      setSelectCanvasCheckList([...canvasList]);
    }
  };

  const handleCanvasCheck = (item: ICanvasList) => {
    setSelectCanvasCheckList((prev) => {
      if (prev.some((checkItem) => checkItem.canvasId === item.canvasId)) {
        return prev.filter((checkItem) => checkItem.canvasId !== item.canvasId);
      }
      return [...prev, item];
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="center" p="0px 16px" mt="12px">
        <Button
          color="primary"
          variant="fill"
          size="s"
          width="100%"
          borderRadius="4px"
          onClick={handleAddPlaylist}
          disabled={!selectCanvasCheckList.length}
        >
          Add to playlist
        </Button>
      </Box>
      <Box mt="12px">
        <Box p="0px 16px">
          <Box
            display="flex"
            alignItems="center"
            mb="16px"
            borderBottom={`1px solid ${theme.color.gray300}`}
            pb="8px"
          >
            <Box fontSize={theme.fontSize.text14} color={theme.color.gray900}>
              Canvas
            </Box>
          </Box>
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="0px 16px"
        >
          <Box>
            <CheckBox
              name="selectAll"
              checked={
                canvasList.length ? selectCanvasCheckList.length === canvasList.length : false
              }
              width="16px"
              height="16px"
              onClick={handleMenuCheckAll}
            >
              Select All
            </CheckBox>
          </Box>
        </Box>
      </Box>
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
                checked={selectCanvasCheckList.some(
                  (checkItem) => checkItem.canvasId === item.canvasId
                )}
                handleCheck={handleCanvasCheck}
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

export default SettingsCanvas;
