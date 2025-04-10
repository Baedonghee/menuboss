import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { MainSubscriptionHighlight } from '@repo/ui/icons';
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
        .highlight {
          width: 100%;
        }
      }
      .plan-wrapper {
        margin-top: 48px;
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
      <Box width="1320px" margin="0 auto" className="container">
        <Box display="flex" justifyContent="center">
          <Typography
            as="span"
            fontSize="40px"
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            textAlign="center"
            className="title"
          >
            Find Your Perfect Match
            <br />
            Choose Your <br className="pc-hide" />
            <Typography as="span" color={theme.color.secondary500} style={{ position: 'relative' }}>
              Ideal Subscription Plan
              <Box position="absolute" top="19px" left="-4px">
                <MainSubscriptionHighlight width="440" height="13" className="highlight" />
              </Box>
            </Typography>
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
          >
            More details and all features
          </Typography>
          <Box mt="8px">
            <Link href={PATH.PRICE} scroll>
              <Typography
                as="span"
                className="price"
                fontSize={theme.fontSize.text14}
                color={theme.color.secondary500}
              >
                View Pricing Page
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </MainPlanWrapper>
  );
};

export default HomepagePlan;
