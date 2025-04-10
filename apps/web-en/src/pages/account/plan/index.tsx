/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Switch, TabMenu, TitleBox, Typography } from '@repo/ui/components';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IPaymentAccountPlanList } from '@repo/ui/types';
import { delay, getCustomErrorMessage } from '@repo/ui/utils';
import getConfig from 'next/config';
import Link from 'next/link';
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
import { getStripe } from '@/utils/stripe';
import { errorToast } from '@/utils/toast';

const { publicRuntimeConfig } = getConfig();
const { CLIENT_API } = publicRuntimeConfig;

const AccountPlanWrapper = styled(Box)`
  ul.plan-list {
    display: flex;
    justify-content: center;
    & > li {
      width: 306px;
      margin-right: 12px;
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
  const { me: getMe } = useAuthActions();
  const { createPayment, updatePayment, getPaymentProducts, getSubscription, reset } =
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
              if (item.interval === 'month') {
                plan.monthPrice = `$ ${item.amount}`;
                plan.monthInterval = item.interval;
                plan.currency = item.currency;
                plan.monthProductId = item.productId;
              } else if (item.interval === 'year') {
                plan.yearPrice = `$ ${item.amount}`;
                plan.yearInterval = item.interval;
                plan.currency = item.currency;
                plan.yearProductId = item.productId;
              }
            }
            if (plan.name === subscription.product.title) {
              plan.count = subscription.invoice?.quantity || 1;
              setIsPriceChecked(subscription.product.interval === 'year');
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
              if (item.interval === 'month') {
                plan.monthPrice = `$ ${item.amount}`;
                plan.monthInterval = item.interval;
                plan.currency = item.currency;
                plan.monthProductId = item.productId;
              } else if (item.interval === 'year') {
                plan.yearPrice = `$ ${item.amount}`;
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
            if (item.interval === 'month') {
              plan.monthPrice = `$ ${item.amount}`;
              plan.monthInterval = item.interval;
              plan.currency = item.currency;
              plan.monthProductId = item.productId;
            } else if (item.interval === 'year') {
              plan.yearPrice = `$ ${item.amount}`;
              plan.yearInterval = item.interval;
              plan.currency = item.currency;
              plan.yearProductId = item.productId;
            }
          }
          if (
            plan.name === subscription.product.title &&
            ((subscription.product.interval === 'month' && isPriceChecked) ||
              (subscription.product.interval === 'year' && !isPriceChecked))
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
      title: 'Do you want to downgrade your plan?',
      alertType: 'confirm',
      description: `
        If you're downgrading your plan<br/><br/>
        * You can only use the previous plan until the end of this month<br/>
        * Payment and subscription will be made with the changed plan from the 1st of next month<br/>
        * Limited number of users and as many as planned<br/><br/>
        This plan can be changed or upgraded at any time
      `,
      type: 'error',
      onConfirm: () => {
        handlePayment(item);
      }
    });
  };

  const handleChosePlan = async (item: (typeof accountPlanList)[0]) => {
    try {
      if (subscription) {
        if (
          (subscription.product.title === 'Premium' && item.name === 'Basic') ||
          (subscription.product.title === 'Premium+' && item.name === 'Premium') ||
          (subscription.product.title === 'Premium+' && item.name === 'Basic')
        ) {
          handleDownGradeAlert(item);
          return;
        }
      }
      handlePayment(item);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handlePayment = async (item: (typeof accountPlanList)[0]) => {
    try {
      if (
        item.name === subscription?.product.title &&
        item.count === subscription?.invoice?.quantity &&
        ((subscription?.product.interval === 'month' && !isPriceChecked) ||
          (subscription?.product.interval === 'year' && isPriceChecked))
      ) {
        handleShowAlert({
          title: 'You have already selected this plan.',
          description: 'Please select another plan.',
          type: 'error',
          onConfirm: () => {
            handleClose();
          }
        });
        return;
      }
      if (item.currency && item.monthProductId && item.yearProductId) {
        setIsSubmit(true);
        const formData = {
          productId: isPriceChecked ? item.yearProductId : item.monthProductId,
          quantity: item.count,
          successUrl:
            !subscription || subscription.product.title === 'Free'
              ? `${CLIENT_API}${ADMIN_PATH.PAYMENT_SUCCESS}`
              : `${CLIENT_API}${ADMIN_PATH.PAYMENT_SUBSCRIPTION}`,
          cancelUrl: `${CLIENT_API}${ADMIN_PATH.PAYMENT_CANCEL}`
        };

        if (subscription?.subscriptionId) {
          await updatePayment({
            subscriptionId: subscription?.subscriptionId,
            productId: isPriceChecked ? item.yearProductId : item.monthProductId,
            quantity: item.count
          });
          handleShowAlert({
            title: 'Subscription has been changed.',
            description: 'Please check your subscription.',
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
        const sessionId = await createPayment(formData);
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
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
      <SeoHead title="Plan & Pricing | MenuBoss" />
      <Layout>
        <TitleBox title="My account" />
        <AccountPlanWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px" minWidth="1156px">
            <Typography fontSize={theme.fontSize.text20} color={theme.color.gray900}>
              My plan
            </Typography>
            <Box mt="24px" border={`1px solid ${theme.color.gray300}`} borderRadius="8px">
              <Box display="flex">
                <Box display="flex" width="66.6%" borderRight={`1px solid ${theme.color.gray200}`}>
                  <Box width="50%" p="16px 24px">
                    <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                      Plan
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
                        {subscription?.product.title || 'None'}
                      </Typography>
                    )}
                  </Box>
                  <Box width="50%" p="16px 24px">
                    <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                      Payment
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
                                ? `$ ${
                                    (subscription.product.amount * subscription.invoice.quantity) /
                                    100
                                  }`
                                : 'None'
                              : 'None'}
                          </Typography>
                          {subscription && subscription?.product?.amount > 0 && (
                            <Typography
                              as="span"
                              fontSize={theme.fontSize.text14}
                              fontWeight={theme.fontWeight.semiBold}
                              color={theme.color.gray900}
                            >
                              {subscription?.product.interval === 'month'
                                ? 'per month'
                                : 'per year'}
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
                        Next payment
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
                          {subscription?.invoice?.nextPaymentDate || 'None'}
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
                        Subscription Screen
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
                              : '0%'
                          }
                          backgroundColor={theme.color.primary500}
                        ></Box>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="4px">
                      <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                        {me?.business?.count.screen || '0'} screen
                      </Typography>
                      <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                        {subscription?.invoice?.quantity || '0'} screens
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
                      Other service
                    </Typography>
                    <Box mt="12px" display="flex">
                      {subscriptionLoading ? (
                        <Skeleton width="100px" height="17px" />
                      ) : (
                        subscription &&
                        subscription?.subscriptionId &&
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
                              Cancel subscription
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
              Subscription
            </Typography>
            <Box mt="24px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography mr="20px" fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  Billed monthly
                </Typography>
                <Switch checked={isPriceChecked} onClick={handlePriceChecked} />
                <Typography ml="20px" fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  Billed yearly
                </Typography>
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
                      ((subscription?.product.interval === 'month' && !isPriceChecked) ||
                        (subscription?.product.interval === 'year' && isPriceChecked))
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
