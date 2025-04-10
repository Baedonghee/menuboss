import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { IMainPlanList } from '@repo/ui/types';
import Link from 'next/link';
import styled from 'styled-components';

import { PATH } from '@/utils/path';

import MainPlanCard from '../../Plan/Card';

const MainPlanWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
    .container {
      padding: 80px 24px;
      margin: 0;
      width: 100%;
      .title {
        font-size: ${({ theme }) => theme.fontSize.text24};
        line-height: 31px;
      }
      .description {
        margin-top: 12px;
        font-size: ${({ theme }) => theme.fontSize.text16};
        line-height: 21px;
      }
      .plan-wrapper {
        margin-top: 48px;
      }
      .detail-title {
        font-size: ${({ theme }) => theme.fontSize.text16};
      }
      .price {
        font-size: ${({ theme }) => theme.fontSize.text12};
        border-bottom: 1px solid ${({ theme }) => theme.color.secondary500};
      }
    }
  }
  .price {
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.color.secondary500};
    }
  }
`;

interface IHomepagePlan {
  planList: IMainPlanList[];
}

const HomepagePlan: React.FC<IHomepagePlan> = ({ planList }) => {
  return (
    <MainPlanWrapper p="120px 0px">
      <Box className="container" width="1320px" margin="0 auto">
        <Box textAlign="center">
          <Typography
            as="span"
            fontSize="40px"
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            textAlign="center"
            className="title"
          >
            요금제 안내
          </Typography>
          <Typography
            fontSize={theme.fontSize.text20}
            fontWeight={theme.fontWeight.semiBold}
            mt="16px"
            lineHeight="26px"
            color={theme.color.gray700}
            className="description"
          >
            다양한 유형의 기능을 합리적인 가격으로 제공합니다
          </Typography>
        </Box>
        <Box mt="60px" className="plan-wrapper">
          <MainPlanCard planList={planList} />
        </Box>
        <Box mt="64px" textAlign="center">
          <Typography
            fontSize={theme.fontSize.text18}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            className="detail-title"
          >
            자세히 알아보고 싶으신가요?
          </Typography>
          <Box mt="8px">
            <Link href={PATH.PRICE} scroll>
              <Typography
                as="span"
                className="price"
                fontSize={theme.fontSize.text14}
                color={theme.color.secondary500}
              >
                요금제 페이지 자세히보기
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </MainPlanWrapper>
  );
};

export default HomepagePlan;
