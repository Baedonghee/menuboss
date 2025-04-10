/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, Empty, ModalContainer, TitleBox } from '@repo/ui/components';
import { NewScreens, PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { delay, getCustomErrorMessage } from '@repo/ui/utils';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useScreenActions } from '@/actions/screen-action';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import AddScreen from '@/components/Screen/AddScreen';
import ScreenItem from '@/components/Screen/Item';
import { skeletonList } from '@/models/skeleton';
import { screenListSelector, screenLoadingSelector } from '@/state/screen';
import { errorToast } from '@/utils/toast';

const ScreenWrapper = styled(Box)`
  & > ul {
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    & > li {
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
          color: ${({ theme }) => theme.color.gray700};
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
          width: 146px;
        }
        &:nth-of-type(2) {
          width: calc(100% - 622px);
          justify-content: start;
          overflow: hidden;
          padding: 12px 0px 12px 24px;
        }
        &:nth-of-type(3) {
          width: 200px;
        }
        &:nth-of-type(4) {
          width: 200px;
        }
        &:nth-of-type(5) {
          width: 72px;
          font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
      }
    }
  }
`;

const Screens = () => {
  const { screenList, createScreen, reset } = useScreenActions();
  const list = useRecoilValue(screenListSelector);
  const loading = useRecoilValue(screenLoadingSelector);
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

  const handleAddScreenClose = () => {
    setIsAddScreenOpen(false);
  };

  const handleAddScreenOpen = () => {
    setIsAddScreenOpen(true);
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
    <>
      <SeoHead title="TV | MenuBoss" />
      <Layout>
        {isAddScreenOpen && (
          <ModalContainer onClose={handleAddScreenClose}>
            <AddScreen onClose={handleAddScreenClose} handleCreateScreen={handleCreateScreen} />
          </ModalContainer>
        )}
        <TitleBox title="TV">
          <Button
            color="primary"
            variant="fill"
            size="m"
            borderRadius="100px"
            width="140px"
            onClick={handleAddScreenOpen}
          >
            <PlusFill width="20" height="20" color={theme.color.white} />
            TV 추가
          </Button>
        </TitleBox>
        <ScreenWrapper mt="24px">
          {(loading || !!list.length) && (
            <ul>
              <li className="header">
                <div></div>
                <div>이름</div>
                <div>지금 재생 중</div>
                <div>수정일</div>
                <div></div>
              </li>
              {loading
                ? skeletonList.map((_, index) => (
                    <li key={`skeleton-${index}`}>
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
                      <div />
                    </li>
                  ))
                : list.map((item) => <ScreenItem key={`content-${item.screenId}`} item={item} />)}
            </ul>
          )}
          {!loading && !list.length && (
            <Empty
              icon={<NewScreens width="68" height="68" color={theme.color.gray400} />}
              text="현재 저장된 TV목록이 없습니다<br/>QR코드 인식을 통해 TV를 등록해주세요"
            />
          )}
        </ScreenWrapper>
      </Layout>
    </>
  );
};

export default Protect(Screens);
