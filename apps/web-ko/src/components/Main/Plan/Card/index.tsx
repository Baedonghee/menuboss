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
    .price-discount {
      left: 60px;
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
    width: 312px;
    padding: 32px 24px;
    box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.color.white};
    margin-right: 24px;
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
          월별 요금
        </Typography>
        <Switch checked={isPriceChecked} onClick={handlePriceChecked} />
        <Box ml="20px" display="flex" alignItems="center" position="relative">
          <Typography
            fontSize={theme.fontSize.text20}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            lineHeight="31px"
            className="price-title"
          >
            연간 요금
          </Typography>
          <Box
            ml="8px"
            p="4px 12px"
            backgroundColor={theme.color.gray900}
            color={theme.color.white}
            borderRadius="4px"
            fontSize={theme.fontSize.text12}
            fontWeight={theme.fontWeight.semiBold}
            position="absolute"
            width="45px"
            left="74px"
            className="price-discount"
          >
            할인
          </Box>
        </Box>
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
                className="plan-title"
              >
                {item.name}
              </Typography>
              <Box mt="24px">
                {isPriceChecked && item.name !== 'Free' && (
                  <Box
                    fontSize={theme.fontSize.text16}
                    color={theme.color.gray500}
                    lineHeight="19px"
                    textDecoration="line-through"
                    className="total-price"
                  >
                    {formatter.addComma(String(Number(formatter.onlyNumber(item.monthPrice)) * 12))}{' '}
                    원
                  </Box>
                )}
                <Box
                  display="flex"
                  alignItems="center"
                  mt={isPriceChecked && item.name !== 'Free' ? '4px' : '0px'}
                >
                  <Typography
                    as="span"
                    fontSize={theme.fontSize.text24}
                    fontWeight={theme.fontWeight.bold}
                    color={fill ? theme.color.white : theme.color.gray900}
                    className="plan-price"
                  >
                    {isPriceChecked
                      ? item.name.includes('요금제')
                        ? `${formatter.addComma(formatter.onlyNumber(item.yearPrice))} 원`
                        : item.yearPrice
                      : item.name.includes('요금제')
                        ? `${formatter.addComma(
                            String(Number(formatter.onlyNumber(item.monthPrice)))
                          )} 원`
                        : item.monthPrice}
                  </Typography>
                  {item.perScreen && (
                    <Typography
                      as="span"
                      ml="12px"
                      fontSize={theme.fontSize.text14}
                      color={fill ? theme.color.white : theme.color.gray900}
                    >
                      {isPriceChecked ? '/ 연 (TV 1개 기준)' : item.perScreen}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box
                mt="8px"
                fontSize={theme.fontSize.text14}
                color={fill ? theme.color.white : theme.color.gray700}
                lineHeight="20px"
                height="38px"
                className="plan-description"
              >
                {item.description}
              </Box>
              <Box mt={isPriceChecked && item.name === 'Free' ? '47px' : '24px'}>
                <Link href={me ? ADMIN_PATH.ACCOUNT_PLAN : PATH.LOGIN}>
                  <Button width="100%" size="m" variant={fill ? 'outline' : 'fill'} color="primary">
                    {item.buttonName}
                  </Button>
                </Link>
              </Box>
              <ul>
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
                      className="option"
                      color={fill ? theme.color.white : theme.color.gray900}
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
