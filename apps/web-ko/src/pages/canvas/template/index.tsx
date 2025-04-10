import React from 'react';
import { Box, Button, Empty, TitleBox } from '@repo/ui/components';
import { NewCanvas, PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import { ADMIN_PATH } from '@/utils/path';

const CanvasTemplateWrapper = styled(Box)`
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
`;

const CanvasTemplate = () => {
  const { pathname } = useRouter();

  return (
    <>
      <SeoHead title="템플릿 | MenuBoss" />
      <Layout>
        <TitleBox title="캔버스">
          <Link href={ADMIN_PATH.NEW_CANVAS}>
            <Button color="primary" variant="fill" size="m" borderRadius="100px" width="140px">
              <PlusFill width="20" height="20" color={theme.color.white} />
              캔버스 추가
            </Button>
          </Link>
        </TitleBox>
        <CanvasTemplateWrapper
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
          <Box>
            <Empty
              icon={<NewCanvas width="68" height="68" color={theme.color.gray400} />}
              text="현재 저장된 템플릿이 없습니다"
            />
          </Box>
        </CanvasTemplateWrapper>
      </Layout>
    </>
  );
};

export default Protect(CanvasTemplate);
