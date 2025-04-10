/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Empty, TabMenu, TitleBox, Typography } from '@repo/ui/components';
import { BillingHistory, Download } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IPaymentMethodList } from '@repo/ui/types';
import { getCardBrandImage, getCustomErrorMessage } from '@repo/ui/utils';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { usePaymentActions } from '@/actions/payment-action';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import { accountTabMenuList } from '@/models/account';
import { skeletonList } from '@/models/skeleton';
import {
  paymentInvoiceListLoadingSelector,
  paymentInvoiceListSelector,
  paymentMethodListLoadingSelector,
  paymentMethodListSelector,
  paymentSubscriptionSelector
} from '@/state/payment';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const AccountBillingWrapper = styled(Box)`
  ul.invoice-list {
    margin-top: 24px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    & > li {
      display: flex;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
      &:last-child {
        border-bottom: none;
      }
      &.header {
        border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
        & > div {
          font-weight: ${({ theme }) => theme.fontWeight.semiBold};
          height: 44px;
          color: ${({ theme }) => theme.color.gray700};
        }
      }
      & > div {
        display: flex;
        height: 68px;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSize.text14};
        color: ${({ theme }) => theme.color.gray900};
        font-weight: ${({ theme }) => theme.fontWeight.normal};
        &:nth-of-type(1) {
          width: 60px;
          font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
        &:nth-of-type(2) {
          width: calc(100% - 732px);
          justify-content: start;
          overflow: hidden;
          padding: 12px 0px 12px 24px;
        }
        &:nth-of-type(3) {
          width: 200px;
        }
        &:nth-of-type(4) {
          width: 200px;
        }
        &:nth-of-type(5) {
          width: 200px;
        }
        &:nth-of-type(6) {
          width: 72px;
        }
      }
    }
  }
`;

const AccountBilling = () => {
  const { getPaymentInvoices, getPaymentMethods, getSubscription, reset } = usePaymentActions();
  const list = useRecoilValue(paymentInvoiceListSelector);
  const paymentList = useRecoilValue(paymentMethodListSelector);
  const paymentLoading = useRecoilValue(paymentMethodListLoadingSelector);
  const subscription = useRecoilValue(paymentSubscriptionSelector);
  const loading = useRecoilValue(paymentInvoiceListLoadingSelector);
  const [defaultPayment, setDefaultPayment] = useState<IPaymentMethodList | null>(null);

  useEffect(() => {
    if (paymentList.length) {
      const defaultPayment = paymentList.find((item) => item.isDefault);
      setDefaultPayment(defaultPayment || null);
    }
  }, [paymentList]);

  useEffect(() => {
    fetchPaymentInvoices();
    fetchPaymentMethods();
    fetchSubscription();
    return () => {
      reset();
    };
  }, []);

  const fetchPaymentInvoices = async () => {
    try {
      await getPaymentInvoices();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      await getPaymentMethods();
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

  return (
    <>
      <SeoHead title="Billing | MenuBoss" />
      <Layout>
        <TitleBox title="My account" />
        <AccountBillingWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px" minWidth="1156px">
            <Typography fontSize={theme.fontSize.text20} color={theme.color.gray900}>
              Billing information
            </Typography>
            <Box mt="24px" border={`1px solid ${theme.color.gray300}`} borderRadius="8px">
              <Box display="flex">
                <Box display="flex" width="66.6%" borderRight={`1px solid ${theme.color.gray200}`}>
                  <Box width="50%" p="16px 24px">
                    <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                      Card
                    </Typography>
                    {paymentLoading ? (
                      <Skeleton width="200px" height="27px" />
                    ) : defaultPayment ? (
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                          {getCardBrandImage(defaultPayment.card.brand, '32', '32')}
                          <Typography
                            ml="8px"
                            fontSize={theme.fontSize.text18}
                            fontWeight={theme.fontWeight.semiBold}
                            color={theme.color.gray900}
                          >
                            {defaultPayment.card.brand} card
                          </Typography>
                        </Box>
                        <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                          **** **** **** {defaultPayment.card.last4}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        mt="4px"
                        fontSize={theme.fontSize.text20}
                        fontWeight={theme.fontWeight.bold}
                        color={theme.color.gray900}
                      >
                        None
                      </Typography>
                    )}
                  </Box>
                  <Box width="50%" p="16px 24px">
                    <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                      Expires on
                    </Typography>
                    {paymentLoading ? (
                      <Skeleton width="200px" height="27px" />
                    ) : defaultPayment ? (
                      <Typography
                        mt="4px"
                        fontSize={theme.fontSize.text20}
                        fontWeight={theme.fontWeight.semiBold}
                        color={theme.color.gray900}
                      >
                        {String(defaultPayment.card.month).padStart(2, '0')} /{' '}
                        {defaultPayment.card.year}
                      </Typography>
                    ) : (
                      <Typography
                        mt="4px"
                        fontSize={theme.fontSize.text20}
                        fontWeight={theme.fontWeight.semiBold}
                        color={theme.color.gray900}
                      >
                        None
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box width="33.3%">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p="16px 24px"
                  >
                    <Box>
                      <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                        Next payment
                      </Typography>
                      {subscription ? (
                        <Typography
                          mt="4px"
                          fontSize={theme.fontSize.text20}
                          fontWeight={theme.fontWeight.semiBold}
                          color={theme.color.gray900}
                        >
                          {subscription.invoice?.nextPaymentDate || 'None'}
                        </Typography>
                      ) : (
                        <Skeleton width="200px" height="27px" />
                      )}
                    </Box>
                    <Link href={ADMIN_PATH.ACCOUNT_PAYMENT}>
                      <Box
                        fontSize={theme.fontSize.text12}
                        fontWeight={theme.fontWeight.semiBold}
                        color={theme.color.secondary500}
                        className="underline"
                      >
                        Payment Registration
                      </Box>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt="32px">
              <Typography fontSize={theme.fontSize.text20} color={theme.color.gray900}>
                Invoice
              </Typography>
              {(loading || !!list.length) && (
                <ul className="invoice-list">
                  <li className="header">
                    <div>No.</div>
                    <div>Invoice</div>
                    <div>Plan</div>
                    <div>Billing date</div>
                    <div>Amount</div>
                    <div></div>
                  </li>
                  {loading
                    ? skeletonList.map((_, index) => (
                        <li key={`skeleton-${index}`}>
                          <div>
                            <Skeleton width="40px" height="60px" />
                          </div>
                          <div>
                            <Skeleton width="400px" height="60px" />
                          </div>
                          <div>
                            <Skeleton width="100px" height="20px" />
                          </div>
                          <div>
                            <Skeleton width="100px" height="20px" />
                          </div>
                          <div>
                            <Skeleton width="100px" height="20px" />
                          </div>
                          <div />
                        </li>
                      ))
                    : list.map((item, index) => (
                        <li key={`invoice-${item.invoiceNumber}`}>
                          <div>{index + 1}</div>
                          <div>{item.invoiceNumber}</div>
                          <div>{item.product.title}</div>
                          <div>{item.createdDate}</div>
                          <div>
                            <Typography textAlign="center">
                              ${(item.payment.amount / 100).toFixed(2)} USD
                              <br />
                              <Typography
                                fontSize={theme.fontSize.text12}
                                fontWeight={theme.fontWeight.normal}
                                color={theme.color.gray500}
                                mt="4px"
                              >
                                {item.payment.type}
                              </Typography>
                            </Typography>
                          </div>
                          <div>
                            <a href={item.pdfUrl} target="_blank" rel="noreferrer">
                              <Download
                                width="24"
                                height="24"
                                color={theme.color.gray600}
                                style={{ cursor: 'pointer' }}
                              />
                            </a>
                          </div>
                        </li>
                      ))}
                </ul>
              )}
              {!loading && !list.length && (
                <Empty
                  icon={<BillingHistory width="68" height="68" color={theme.color.gray400} />}
                  text="There are currently no billing history<br/>Please check the details after payment"
                />
              )}
            </Box>
          </Box>
        </AccountBillingWrapper>
      </Layout>
    </>
  );
};

export default Protect(AccountBilling);
