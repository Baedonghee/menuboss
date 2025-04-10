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
      <SeoHead title="Template | MenuBoss" />
      <Layout>
        <TitleBox title="Canvas">
          <Link href={ADMIN_PATH.NEW_CANVAS}>
            <Button color="primary" variant="fill" size="m" borderRadius="100px" width="160px">
              <PlusFill width="20" height="20" color={theme.color.white} />
              New canvas
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
              <Link href={ADMIN_PATH.CANVAS}>My canvas</Link>
            </li>
            <li className={classNames({ active: pathname === ADMIN_PATH.TEMPLATE_CANVAS })}>
              <Link href={ADMIN_PATH.TEMPLATE_CANVAS}>Template</Link>
            </li>
          </ul>
          <Box>
            <Empty
              icon={<NewCanvas width="68" height="68" color={theme.color.gray400} />}
              text="No canvas currently saved<br/>Please make a new canvas"
            />
          </Box>
        </CanvasTemplateWrapper>
      </Layout>
    </>
  );
};

export default Protect(CanvasTemplate);
