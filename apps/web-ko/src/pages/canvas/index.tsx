import React, { useEffect, useState } from 'react';
import { Box, Button, Empty, TitleBox } from '@repo/ui/components';
import { NewCanvas, PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useCanvasActions } from '@/actions/canvas-actions';
import CanvasItem from '@/components/Canvas/Item';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import { skeletonList } from '@/models/skeleton';
import { canvasListSelector, canvasLoadingSelector } from '@/state/canvas';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const CanvasWrapper = styled(Box)`
  ul.tab-menu {
    display: flex;
    li {
      font-size: ${({ theme }) => theme.fontSize.text18};
      color: ${({ theme }) => theme.color.gray400};
      padding-bottom: 8px;
      margin-right: 24px;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        color: ${({ theme }) => theme.color.gray900};
        border-bottom: 2px solid ${({ theme }) => theme.color.gray900};
      }
    }
  }
  ul.list {
    margin-right: 24px;
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    min-height: 663px;
    & > li {
      width: 356px;
      height: 268px;
      margin-right: 20px;
      margin-bottom: 24px;
    }
  }
`;

const Canvas = () => {
  const { pathname } = useRouter();
  const { canvasList, reset } = useCanvasActions();
  const list = useRecoilValue(canvasListSelector);
  const loading = useRecoilValue(canvasLoadingSelector);
  const [selectedCanvasId, setSelectedCanvasId] = useState<string>('');

  useEffect(() => {
    fetchList();
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchList = async () => {
    try {
      await canvasList();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleSelectedCanvas = (id: string) => {
    setSelectedCanvasId(id);
  };

  return (
    <>
      <SeoHead title="캔버스 | MenuBoss" />
      <Layout>
        <TitleBox title="캔버스">
          <Link href={ADMIN_PATH.NEW_CANVAS}>
            <Button color="primary" variant="fill" size="m" borderRadius="100px" width="140px">
              <PlusFill width="20" height="20" color={theme.color.white} />
              캔버스 추가
            </Button>
          </Link>
        </TitleBox>
        <CanvasWrapper
          borderRadius="8px"
          border={`1px solid ${theme.color.gray200}`}
          mt="32px"
          p="24px"
        >
          <ul className="tab-menu">
            <li className={classNames({ active: pathname === ADMIN_PATH.CANVAS })}>
              <Link href={ADMIN_PATH.CANVAS}>내 캔버스</Link>
            </li>
            <li className={classNames({ active: pathname === ADMIN_PATH.TEMPLATE_CANVAS })}>
              <Link href={ADMIN_PATH.TEMPLATE_CANVAS}>템플릿</Link>
            </li>
          </ul>
          {loading ? (
            <ul className="list">
              {skeletonList.map((_, index) => (
                <li key={`skeleton-${index}`}>
                  <CanvasItem
                    selectedCanvasId={selectedCanvasId}
                    handleSelectedCanvas={handleSelectedCanvas}
                  />
                </li>
              ))}
            </ul>
          ) : list.length ? (
            <ul className="list">
              {list.map((item) => (
                <li key={`canvas-${item.canvasId}`}>
                  <Link href={ADMIN_PATH.DETAIL_CANVAS.replace(':id', item.canvasId)}>
                    <CanvasItem
                      item={item}
                      selectedCanvasId={selectedCanvasId}
                      handleSelectedCanvas={handleSelectedCanvas}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Box>
              <Empty
                icon={<NewCanvas width="68" height="68" color={theme.color.gray400} />}
                text="현재 저장된 캔버스가 없습니다<br/>캔버스를 추가하여 만들어주세요"
              />
            </Box>
          )}
        </CanvasWrapper>
      </Layout>
    </>
  );
};

export default Protect(Canvas);
