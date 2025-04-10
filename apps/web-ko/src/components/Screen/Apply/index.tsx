/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Box,
  Button,
  CheckBox,
  Empty,
  Image,
  ModalContainer,
  ScreenOnOff,
  TitleBox,
  Typography
} from '@repo/ui/components';
import { NewScreens, PlusFill } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IScreenApplyForm, IScreenList } from '@repo/ui/types';
import { delay, getCustomErrorMessage } from '@repo/ui/utils';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useScreenActions } from '@/actions/screen-action';
import Layout from '@/components/Layout';
import { skeletonList } from '@/models/skeleton';
import { screenListSelector, screenLoadingSelector } from '@/state/screen';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast, successToast } from '@/utils/toast';

import AddScreen from '../AddScreen';

const ScreenApplyWrapper = styled(Box)`
  ul {
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    li {
      display: flex;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
      &:last-child {
        border-bottom: none;
      }
      &.header {
        border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
        & > div {
          font-weight: ${({ theme }) => theme.fontWeight.semiBold};
          height: 44px;
          &:nth-of-type(3) {
            color: ${({ theme }) => theme.color.gray700};
          }
          &:nth-of-type(4) {
            color: ${({ theme }) => theme.color.gray700};
          }
        }
      }
      & > div {
        display: flex;
        height: 84px;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSize.text14};
        color: ${({ theme }) => theme.color.gray900};
        font-weight: ${({ theme }) => theme.fontWeight.normal};
        &:nth-of-type(1) {
          width: 68px;
          font-weight: ${({ theme }) => theme.fontWeight.normal};
        }
        &:nth-of-type(2) {
          width: 132px;
        }
        &:nth-of-type(3) {
          width: calc(100% - 604px);
          justify-content: start;
          overflow: hidden;
          padding: 12px 0px 12px 16px;
        }
        &:nth-of-type(4) {
          width: 200px;
        }
        &:nth-of-type(5) {
          width: 200px;
        }
      }
    }
  }
`;

interface IScreenApply {
  type: 'Playlist' | 'Schedule';
}

const ScreenApply: React.FC<IScreenApply> = ({ type }) => {
  const router = useRouter();
  const { query } = router;
  const { screenList, screenApply, createScreen, reset } = useScreenActions();
  const list = useRecoilValue(screenListSelector);
  const loading = useRecoilValue(screenLoadingSelector);
  const [screenCheckList, setScreenCheckList] = useState<number[]>([]);
  const { handleShowAlert, handleClose } = useAlert();
  const [isAddScreenOpen, setIsAddScreenOpen] = useState(false);

  useEffect(() => {
    fetchScreenList();
    return () => {
      reset();
    };
  }, []);

  const fetchScreenList = async () => {
    try {
      await screenList();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleCheckAll = () => {
    if (list.length) {
      if (screenCheckList.length === list.length) {
        setScreenCheckList([]);
      } else {
        setScreenCheckList(list.map((item) => item.screenId));
      }
    }
  };

  const handleScreenCheck = (item: IScreenList) => {
    if (screenCheckList.includes(item.screenId)) {
      setScreenCheckList(screenCheckList.filter((screenId) => screenId !== item.screenId));
    } else {
      setScreenCheckList([...screenCheckList, item.screenId]);
    }
  };

  const handleScreenApply = async () => {
    try {
      handleShowAlert({
        title: 'TV 적용',
        description: `해당 ${
          type === 'Schedule' ? '시간표' : '재생목록'
        }를 TV화면에 바로 적용하시겠습니까?`,
        alertType: 'confirm',
        type: 'warning',
        confirmText: '확인',
        onConfirm: async () => {
          try {
            const formData = {
              screenIds: screenCheckList,
              contentType: type,
              contentId: Number(query.id)
            } as IScreenApplyForm;
            await screenApply(formData);
            handleClose();
            successToast('TV에 적용되었습니다');
            router.push(type === 'Playlist' ? ADMIN_PATH.PLAYLISTS : ADMIN_PATH.SCHEDULES);
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleAddScreenOpen = () => {
    setIsAddScreenOpen(true);
  };

  const handleAddScreenClose = () => {
    setIsAddScreenOpen(false);
  };

  const handleCreateScreen = async (code: string) => {
    try {
      await createScreen(code);
      await delay(1000);
      await screenList();
      handleAddScreenClose();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  return (
    <Layout>
      {isAddScreenOpen && (
        <ModalContainer onClose={handleAddScreenClose}>
          <AddScreen onClose={handleAddScreenClose} handleCreateScreen={handleCreateScreen} />
        </ModalContainer>
      )}
      <TitleBox backUrl={ADMIN_PATH.PLAYLISTS}>
        <Box display="flex" alignItems="center">
          <Typography
            fontSize={theme.fontSize.text24}
            fontWeight={theme.fontWeight.semiBold}
            mr="12px"
          >
            TV 적용
          </Typography>
        </Box>
        {!loading && (
          <Box display="flex">
            {list.length ? (
              <Button
                color="primary"
                variant="fill"
                size="m"
                width="120px"
                disabled={!screenCheckList.length}
                onClick={handleScreenApply}
              >
                확인
              </Button>
            ) : (
              <Button
                color="primary"
                variant="fill"
                size="m"
                borderRadius="100px"
                width="160px"
                onClick={handleAddScreenOpen}
              >
                <PlusFill width="20" height="20" color={theme.color.white} />
                TV 추가
              </Button>
            )}
          </Box>
        )}
      </TitleBox>
      <ScreenApplyWrapper mt="24px">
        {(loading || !!list.length) && (
          <ul>
            <li className="header">
              <div>
                <CheckBox
                  name="checkAll"
                  checked={list.length ? screenCheckList.length === list.length : false}
                  onClick={handleCheckAll}
                />
              </div>
              <div></div>
              <div>이름</div>
              <div>지금 재생중</div>
              <div>수정일</div>
            </li>
            {loading
              ? skeletonList.map((_, index) => (
                  <li key={`skeleton-${index}`}>
                    <div>
                      <Skeleton width="20px" height="20px" />
                    </div>
                    <div></div>
                    <div>
                      <Skeleton width="400px" height="60px" />
                    </div>
                    <div>
                      <Skeleton width="100px" height="20px" />
                    </div>
                    <div>
                      <Skeleton width="100px" height="20px" />
                    </div>
                  </li>
                ))
              : list.map((item) => (
                  <li key={`content-${item.screenId}`}>
                    <div>
                      <CheckBox
                        name={`screen-${item.screenId}`}
                        checked={screenCheckList.includes(item.screenId)}
                        onClick={() => handleScreenCheck(item)}
                      />
                    </div>
                    <div>
                      <Box display="flex" alignItems="center" height="100%" overflow="hidden">
                        <Image
                          src={item.content?.imageUrl || '/images/screen/empty.png'}
                          alt={item.name}
                          width={100}
                          height={60}
                        />
                      </Box>
                    </div>
                    <div>
                      <Box display="flex" alignItems="center">
                        <ScreenOnOff on={item.isOnline} />
                        <Typography
                          ml="8px"
                          fontSize={theme.fontSize.text14}
                          fontWeight={theme.fontWeight.semiBold}
                          color={theme.color.gray900}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </div>
                    <div>{item.content?.name || '-'}</div>
                    <div>{item.updatedDate}</div>
                  </li>
                ))}
          </ul>
        )}
        {!loading && !list.length && (
          <Empty
            icon={<NewScreens width="68" height="68" color={theme.color.gray400} />}
            text={
              type === 'Schedule'
                ? '현재 저장된 시간표가 없습니다<br/>시간표를 추가하여 만들어주세요'
                : '현재 저장된 재생목록이 없습니다<br/>재생목록을 추가하여 만들어주세요'
            }
          />
        )}
      </ScreenApplyWrapper>
    </Layout>
  );
};

export default ScreenApply;
