import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { IMainPlanList } from '@repo/ui/types';
import styled from 'styled-components';

import MainPlanCard from '../../Plan/Card';

const PricePlanWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
    background-size: 0 0;
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
  background-image: url('/images/price/main.png');
  background-size: 1920px 669px;
  background-position: bottom;
  background-repeat: no-repeat;
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
            MenuBoss Subscription Plan
          </Typography>
        </Box>
        <Typography
          as="h2"
          fontSize={theme.fontSize.text18}
          color={theme.color.gray700}
          mt="12px"
          textAlign="center"
          className="description"
        >
          You can experience the subscription service of Menu Boss in advance through the 14-day
          free trial period
        </Typography>
        <Box mt="60px" className="plan-wrapper">
          <MainPlanCard planList={planList} />
        </Box>
      </Box>
    </PricePlanWrapper>
  );
};

export default PricePlan;
