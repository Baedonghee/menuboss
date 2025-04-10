/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Switch, TabMenu, TitleBox, Typography } from '@repo/ui/components';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IPaymentAccountPlanList } from '@repo/ui/types';
import { delay, formatter, getCustomErrorMessage } from '@repo/ui/utils';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useAuthActions } from '@/actions/auth-action';
import { usePaymentActions } from '@/actions/payment-action';
import AccountPlanItem from '@/components/Account/PlanItem';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import { accountPlanList, accountTabMenuList } from '@/models/account';
import { authUserSelector } from '@/state/auth';
import {
  paymentListSelector,
  paymentSubscriptionLoadingSelector,
  paymentSubscriptionSelector
} from '@/state/payment';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const { publicRuntimeConfig } = getConfig();
const { CLIENT_API } = publicRuntimeConfig;

const AccountPlanWrapper = styled(Box)`
  ul.plan-list {
    display: flex;
    justify-content: center;
    & > li {
      width: 306px;
      margin-right: 16px;
      padding: 32px 16px;
      border: 1px solid ${({ theme }) => theme.color.gray300};
      border-radius: 8px;
      &.active {
        background-color: ${({ theme }) => theme.color.primary500};
      }
      & > ul {
        margin-top: 24px;
        & > li {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

const AccountPlan = () => {
  const router = useRouter();
  const { me: getMe } = useAuthActions();
  const { updatePaymentSubscription, getPaymentProducts, getSubscription, reset } =
    usePaymentActions();
  const me = useRecoilValue(authUserSelector);
  const list = useRecoilValue(paymentListSelector);
  const subscription = useRecoilValue(paymentSubscriptionSelector);
  const subscriptionLoading = useRecoilValue(paymentSubscriptionLoadingSelector);
  const [isPriceChecked, setIsPriceChecked] = useState(true);
  const { handleShowAlert, handleClose } = useAlert();
  const [planList, setPlanList] = useState([] as IPaymentAccountPlanList[]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (list.length) {
      if (subscription) {
        const newPlanList = [...accountPlanList];
        list.forEach((item) => {
          newPlanList.forEach((plan) => {
            if (plan.name === item.title) {
              if (item.interval === 'Month') {
                plan.monthPrice = `${item.amount}`;
                plan.monthInterval = item.interval;
                plan.currency = item.currency;
                plan.monthProductId = item.productId;
              } else if (item.interval === 'Year') {
                plan.yearPrice = `${item.amount}`;
                plan.yearInterval = item.interval;
                plan.currency = item.currency;
                plan.yearProductId = item.productId;
              }
            }
            if (plan.name === subscription.product.title) {
              plan.count = subscription.invoice?.quantity || 1;
              setIsPriceChecked(subscription.product.interval === 'Year');
            } else {
              plan.count = 1;
            }
          });
        });
        setPlanList([...newPlanList]);
      } else {
        const newPlanList = [...accountPlanList];
        list.forEach((item) => {
          newPlanList.forEach((plan) => {
            plan.count = 1;
            if (plan.name === item.title) {
              plan.productId = item.productId;
              if (item.interval === 'month') {
                plan.monthPrice = `${item.amount}`;
                plan.monthInterval = item.interval;
                plan.currency = item.currency;
                plan.monthProductId = item.productId;
              } else if (item.interval === 'year') {
                plan.yearPrice = `${item.amount}`;
                plan.yearInterval = item.interval;
                plan.currency = item.currency;
                plan.yearProductId = item.productId;
              }
            }
          });
        });
        setPlanList([...newPlanList]);
      }
    }
  }, [list, subscription]);

  useEffect(() => {
    fetchPaymentProducts();
    fetchSubscription();
    fetchMe();
    return () => {
      reset();
    };
  }, []);

  const fetchMe = async () => {
    try {
      await getMe();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const fetchPaymentProducts = async () => {
    try {
      await getPaymentProducts();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const fetchSubscription = async () => {
    try {
      await getSubscription();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handlePriceChecked = () => {
    if (subscription) {
      const newPlanList = [...accountPlanList];
      list.forEach((item) => {
        newPlanList.forEach((plan) => {
          if (plan.name === item.title) {
            if (item.interval === 'Month') {
              plan.monthPrice = `${item.amount}`;
              plan.monthInterval = item.interval;
              plan.currency = item.currency;
              plan.monthProductId = item.productId;
            } else if (item.interval === 'Year') {
              plan.yearPrice = `${item.amount}`;
              plan.yearInterval = item.interval;
              plan.currency = item.currency;
              plan.yearProductId = item.productId;
            }
          }
          if (
            plan.name === subscription.product.title &&
            ((subscription.product.interval === 'Month' && isPriceChecked) ||
              (subscription.product.interval === 'Year' && !isPriceChecked))
          ) {
            plan.count = subscription.invoice?.quantity || 1;
          } else {
            plan.count = 1;
          }
        });
      });
      setPlanList([...newPlanList]);
    }
    setIsPriceChecked((prev) => !prev);
  };

  const handleDownGradeAlert = (item: (typeof accountPlanList)[0]) => {
    handleShowAlert({
      title: '요금제 변경',
      alertType: 'confirm',
      description: `
        요금제를 언제든지 변경하거나 업그레이드할 수 있습니다. 아래의 주의사항을 확인해주시고 결제 변경을 진행해주세요<br/><br/>
        * 이번 달 말까지만 이전의 요금제를 사용할 수 있습니다<br/>
        * 다음달 1일부터 변경된 요금제로 결제 및 가입이 가능합니다<br/>
        * 시간표, 재생목록, 캔버스 등 해당 메뉴들의 사용이 제한 될 수 있습니다
      `,
      type: 'success',
      onConfirm: () => {
        handlePayment(item);
      }
    });
  };

  const handleChosePlan = async (item: (typeof accountPlanList)[0]) => {
    try {
      if (subscription && subscription.product.title !== '무료') {
        handleDownGradeAlert(item);
        return;
      }
      let productId = 0;
      if (isPriceChecked) {
        productId = item.yearProductId!;
      } else {
        productId = item.monthProductId!;
      }

      if (!productId) {
        errorToast(getCustomErrorMessage('요금제를 선택해주세요'));
        return;
      }
      router.push(
        ADMIN_PATH.ACCOUNT_PLAN_PAYMENT.replace(':id', productId.toString()).replace(
          ':count',
          item.count.toString()
        )
      );
    } catch (err) {
      console.log(err);
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handlePayment = async (item: (typeof accountPlanList)[0]) => {
    try {
      if (
        item.name === subscription?.product.title &&
        item.count === subscription?.invoice?.quantity &&
        ((subscription?.product.interval === 'Month' && !isPriceChecked) ||
          (subscription?.product.interval === 'Year' && isPriceChecked))
      ) {
        handleShowAlert({
          title: '이미 선택된 요금제입니다',
          description: '다른 요금제를 선택해주세요',
          type: 'error',
          onConfirm: () => {
            handleClose();
          }
        });
        return;
      }
      if (item.monthProductId && item.yearProductId) {
        setIsSubmit(true);
        if (subscription?.subscriptionId) {
          await updatePaymentSubscription(subscription.subscriptionId, {
            productId: isPriceChecked ? item.yearProductId : item.monthProductId,
            quantity: item.count
          });
          handleShowAlert({
            title: '요금제 변경 완료',
            description:
              '요금제 변경이 시작된 날부터 변경된 금액이 청구됩니다. 결제 내역은 이메일 또는 내 정보의 청구서에 표시됩니다',
            type: 'success',
            onConfirm: () => {
              handleClose();
            }
          });
          await delay(1000);
          fetchSubscription();
          fetchMe();
          return;
        }
      }
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    } finally {
      setIsSubmit(false);
    }
  };

  const handleCount = (type: 'plus' | 'minus', itemName: string) => {
    const newPlanList = [...planList];
    newPlanList.forEach((item) => {
      if (item.name === itemName) {
        if (type === 'plus') {
          item.count += 1;
        } else {
          item.count -= 1;
        }
      }
    });
    setPlanList(newPlanList);
  };

  return (
    <>
      <SeoHead title="요금제 | MenuBoss" />
      <Layout>
        <TitleBox title="내 정보" />
        <AccountPlanWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px" minWidth="1156px">
            <Typography fontSize={theme.fontSize.text20} color={theme.color.gray900}>
              내 요금제
            </Typography>
            <Box mt="24px" border={`1px solid ${theme.color.gray300}`} borderRadius="8px">
              <Box display="flex">
                <Box display="flex" width="66.6%" borderRight={`1px solid ${theme.color.gray200}`}>
                  <Box width="50%" p="16px 24px">
                    <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                      요금제
                    </Typography>
                    {subscriptionLoading ? (
                      <Skeleton width="200px" height="27px" />
                    ) : (
                      <Typography
                        mt="4px"
                        fontSize={theme.fontSize.text20}
                        fontWeight={theme.fontWeight.semiBold}
                        color={theme.color.gray900}
                      >
                        {subscription?.product.title || '-'}
                      </Typography>
                    )}
                  </Box>
                  <Box width="50%" p="16px 24px">
                    <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                      결제
                    </Typography>
                    <Box mt="4px" display="flex" alignItems="center">
                      {subscriptionLoading ? (
                        <Skeleton width="200px" height="27px" />
                      ) : (
                        <>
                          <Typography
                            as="span"
                            fontSize={theme.fontSize.text20}
                            fontWeight={theme.fontWeight.semiBold}
                            color={theme.color.gray900}
                            mr="8px"
                          >
                            {subscription
                              ? subscription.product?.amount && subscription.invoice?.quantity
                                ? `${formatter.addComma(
                                    String(
                                      subscription.product.amount * subscription.invoice.quantity
                                    )
                                  )}원`
                                : '-'
                              : '-'}
                          </Typography>
                          {subscription && subscription?.product?.amount > 0 && (
                            <Typography
                              as="span"
                              fontSize={theme.fontSize.text14}
                              fontWeight={theme.fontWeight.semiBold}
                              color={theme.color.gray900}
                            >
                              {subscription?.product.interval === 'month'
                                ? '/ 월 (TV 1개 기준)'
                                : '/ 연 (TV 1개 기준)'}
                            </Typography>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box width="33.3%">
                  <Box display="flex" alignItems="center" p="16px 24px">
                    <Box>
                      <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                        다음 결제일
                      </Typography>
                      {subscriptionLoading ? (
                        <Skeleton width="200px" height="27px" />
                      ) : (
                        <Typography
                          mt="4px"
                          fontSize={theme.fontSize.text20}
                          fontWeight={theme.fontWeight.semiBold}
                          color={theme.color.gray900}
                        >
                          {subscription?.invoice?.nextPaymentDate || '-'}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" borderTop={`1px solid ${theme.color.gray200}`}>
                <Box width="33.3%" borderRight={`1px solid ${theme.color.gray200}`}>
                  <Box p="16px 24px">
                    <Box display="flex" alignItems="center">
                      <Typography
                        fontSize={theme.fontSize.text14}
                        fontWeight={theme.fontWeight.semiBold}
                        color={theme.color.gray900}
                      >
                        구독 TV 개수
                      </Typography>
                    </Box>
                    <Box mt="12px">
                      <Box
                        borderRadius="100px"
                        height="8px"
                        backgroundColor={theme.color.gray100}
                        position="relative"
                      >
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          height="8px"
                          borderRadius="100px"
                          width={
                            me?.business?.count.screen && subscription?.invoice?.quantity
                              ? `${
                                  Math.round(
                                    ((me?.business?.count.screen || 0) /
                                      (subscription?.invoice?.quantity || 1)) *
                                      1000
                                  ) /
                                    10 >
                                  100
                                    ? 100
                                    : Math.round(
                                        ((me?.business?.count.screen || 0) /
                                          (subscription?.invoice?.quantity || 1)) *
                                          1000
                                      ) / 10
                                }%`
                              : me?.business?.count.screen && subscription?.product.title === '무료'
                                ? `${
                                    Math.round(((me?.business?.count.screen || 0) / 1) * 1000) /
                                      10 >
                                    100
                                      ? 100
                                      : Math.round(((me?.business?.count.screen || 0) / 1) * 1000) /
                                        10
                                  }%`
                                : '0%'
                          }
                          backgroundColor={theme.color.primary500}
                        ></Box>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="4px">
                      <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                        {me?.business?.count.screen || '0'}개 TV
                      </Typography>
                      <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                        {subscription?.product.title === '무료'
                          ? '1'
                          : subscription?.invoice?.quantity || '0'}{' '}
                        개 TV
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box width="66.6%">
                  <Box p="16px 24px">
                    <Typography
                      fontSize={theme.fontSize.text14}
                      fontWeight={theme.fontWeight.semiBold}
                      color={theme.color.gray900}
                    >
                      기타
                    </Typography>
                    <Box mt="12px" display="flex">
                      {subscriptionLoading ? (
                        <Skeleton width="100px" height="17px" />
                      ) : (
                        subscription &&
                        subscription.subscriptionId &&
                        subscription?.invoice?.nextPaymentDate && (
                          <Link
                            href={ADMIN_PATH.ACCOUNT_PLAN_CANCEL.replace(
                              ':id',
                              subscription.subscriptionId.toString()
                            )}
                          >
                            <Box
                              fontSize={theme.fontSize.text12}
                              fontWeight={theme.fontWeight.semiBold}
                              color={theme.color.secondary500}
                              pb="2px"
                              borderBottom={`1px solid ${theme.color.secondary500}`}
                              cursor="pointer"
                            >
                              구독 취소
                            </Box>
                          </Link>
                        )
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Typography mt="32px" fontSize={theme.fontSize.text20}>
              구독
            </Typography>
            <Box mt="24px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography mr="20px" fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  월별 청구
                </Typography>
                <Switch checked={isPriceChecked} onClick={handlePriceChecked} />
                <Box
                  ml="20px"
                  fontSize={theme.fontSize.text16}
                  color={theme.color.gray900}
                  position="relative"
                >
                  연간 청구
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
                    left="59px"
                    top="-2px"
                  >
                    할인
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt="24px">
              <ul className="plan-list">
                {planList.map((item, index) => (
                  <AccountPlanItem
                    key={`plan-${index}`}
                    item={item}
                    checked={isPriceChecked}
                    handleChosePlan={handleChosePlan}
                    handleCount={handleCount}
                    active={
                      item.name === subscription?.product.title &&
                      ((subscription?.product.interval === 'Month' && !isPriceChecked) ||
                        (subscription?.product.interval === 'Year' && isPriceChecked))
                    }
                    isSubmit={isSubmit}
                  />
                ))}
              </ul>
            </Box>
          </Box>
        </AccountPlanWrapper>
      </Layout>
    </>
  );
};

export default Protect(AccountPlan);
