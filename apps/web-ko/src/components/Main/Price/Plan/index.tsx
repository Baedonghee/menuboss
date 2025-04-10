import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { IMainPlanList } from '@repo/ui/types';
import styled from 'styled-components';

import MainPlanCard from '../../Plan/Card';

const PricePlanWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
    .container {
      padding: 140px 24px 80px;
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
    }
  }
`;

interface IPricePlan {
  planList: IMainPlanList[];
}

const PricePlan: React.FC<IPricePlan> = ({ planList }) => {
  return (
    <PricePlanWrapper p="80px 0px 100px">
      <Box width="1320px" m="100px auto 0" className="container">
        <Box as="h1" textAlign="center">
          <Typography
            as="span"
            fontSize="40px"
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            className="title"
          >
            요금제 안내
          </Typography>
        </Box>
        <Typography
          as="h2"
          fontSize={theme.fontSize.text20}
          color={theme.color.gray700}
          mt="12px"
          textAlign="center"
          className="description"
        >
          다양한 유형의 기능을 합리적인 가격으로 제공합니다
        </Typography>
        <Box mt="60px" className="plan-wrapper">
          <MainPlanCard planList={planList} />
        </Box>
      </Box>
    </PricePlanWrapper>
  );
};

export default PricePlan;
