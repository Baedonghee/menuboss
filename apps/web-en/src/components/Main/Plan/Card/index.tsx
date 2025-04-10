import React, { useState } from 'react';
import { Box, Button, Switch, Typography } from '@repo/ui/components';
import { CheckFilled } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IMainPlanList } from '@repo/ui/types';
import { formatter } from '@repo/ui/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authUserSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';

const MainPlanCardWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    .price-title {
      font-size: ${({ theme }) => theme.fontSize.text16};
    }
  }
`;

const MainPlanCardListWrapper = styled.ul`
  @media ${({ theme }) => theme.device.mobile} {
    overflow-x: scroll;
    flex-wrap: nowrap;
    justify-content: start;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    & > li {
      width: 260px !important;
      padding: 24px 20px !important;
      flex: 0 0 auto;
      box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.15) !important;
      .plan-title {
        font-size: ${({ theme }) => theme.fontSize.text18};
      }
      .plan-description {
        font-size: ${({ theme }) => theme.fontSize.text12};
      }
      .plan-price {
        font-size: ${({ theme }) => theme.fontSize.text20};
      }
      .option {
        font-size: ${({ theme }) => theme.fontSize.text12};
      }
    }
  }
  display: flex;
  margin-top: 48px;
  & > li {
    width: 251px;
    padding: 32px 16px;
    box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.color.white};
    margin-right: 16px;
    border-radius: 12px;
    &:last-child {
      margin-right: 0;
    }
    &.fill {
      background-color: ${({ theme }) => theme.color.primary500};
    }
    & > ul {
      margin-top: 32px;
      & > li {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

interface IMainPlanCard {
  planList: IMainPlanList[];
}

const MainPlanCard: React.FC<IMainPlanCard> = ({ planList }) => {
  const me = useRecoilValue(authUserSelector);

  const [isPriceChecked, setIsPriceChecked] = useState(true);

  const handlePriceChecked = () => {
    setIsPriceChecked((prev) => !prev);
  };

  return (
    <>
      <MainPlanCardWrapper display="flex" justifyContent="center" alignItems="center">
        <Typography
          mr="20px"
          fontSize={theme.fontSize.text20}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          lineHeight="31px"
          className="price-title"
        >
          Billed monthly
        </Typography>
        <Switch checked={isPriceChecked} onClick={handlePriceChecked} />
        <Typography
          ml="20px"
          fontSize={theme.fontSize.text20}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          lineHeight="31px"
          className="price-title"
        >
          Billed yearly
        </Typography>
      </MainPlanCardWrapper>
      <MainPlanCardListWrapper>
        {planList.map((item, index) => {
          const fill = index === 2;
          return (
            <li key={`plan-${index}`} className={classNames({ fill })}>
              <Typography
                fontSize={theme.fontSize.text20}
                fontWeight={theme.fontWeight.semiBold}
                color={fill ? theme.color.white : theme.color.gray900}
              >
                {item.name}
              </Typography>
              <Box display="flex" alignItems="center" mt="24px">
                <Typography
                  as="span"
                  fontSize={theme.fontSize.text24}
                  fontWeight={theme.fontWeight.bold}
                  color={fill ? theme.color.white : theme.color.gray900}
                >
                  {isPriceChecked
                    ? item.name === 'Basic' || item.name === 'Premium' || item.name === 'Premium+'
                      ? `$ ${Math.round(Number(formatter.onlyNumber(item.yearPrice)) / 100 / 12)}`
                      : item.yearPrice
                    : item.name === 'Basic' || item.name === 'Premium' || item.name === 'Premium+'
                      ? `$ ${Number(formatter.onlyNumber(item.monthPrice)) / 100}`
                      : item.monthPrice}
                </Typography>
                {item.perScreen && (
                  <Typography
                    as="span"
                    ml="12px"
                    fontSize={theme.fontSize.text14}
                    color={fill ? theme.color.white : theme.color.gray900}
                  >
                    per screen / month
                  </Typography>
                )}
              </Box>
              <Box
                mt="8px"
                fontSize={theme.fontSize.text14}
                color={fill ? theme.color.white : theme.color.gray700}
                lineHeight="20px"
                height="38px"
              >
                {item.name === 'Basic' || item.name === 'Premium' || item.name === 'Premium+'
                  ? 'Best for users getting started with digital signage'
                  : item.name === 'Free'
                    ? 'Try any plan for free, for a single screen'
                    : 'Request a demo or Request a Trial'}
              </Box>
              <Box mt="24px">
                <Link href={me ? ADMIN_PATH.ACCOUNT_PLAN : PATH.LOGIN}>
                  <Button
                    width="100%"
                    size="m"
                    variant={fill || item.name === 'Enterprise' ? 'outline' : 'fill'}
                    color="primary"
                  >
                    {item.buttonName}
                  </Button>
                </Link>
              </Box>
              <ul>
                {item.optionDescription && (
                  <Typography
                    fontSize={theme.fontSize.text14}
                    color={theme.color.gray900}
                    lineHeight="20px"
                  >
                    Check out our features before going to the next stage of your deployment. No
                    credit card or billing details required.
                  </Typography>
                )}
                {item.options.map((option, itemIndex) => (
                  <li key={`${item.name}-${option}-${itemIndex}`}>
                    <CheckFilled
                      width="20"
                      height="20"
                      color={fill ? theme.color.white : theme.color.primary500}
                    />
                    <Typography
                      ml="8px"
                      fontSize={theme.fontSize.text14}
                      color={fill ? theme.color.white : theme.color.gray900}
                    >
                      {option}
                    </Typography>
                  </li>
                ))}
                {item.disabledOptions.map((option, itemIndex) => (
                  <li key={`${item.name}-${option}-${itemIndex}`}>
                    <CheckFilled
                      width="20"
                      height="20"
                      color={fill ? theme.color.primary200 : theme.color.gray400}
                    />
                    <Typography
                      ml="8px"
                      fontSize={theme.fontSize.text14}
                      color={fill ? theme.color.primary200 : theme.color.gray400}
                    >
                      {option}
                    </Typography>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </MainPlanCardListWrapper>
    </>
  );
};

export default MainPlanCard;
