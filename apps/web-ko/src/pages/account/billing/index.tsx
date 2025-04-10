/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Empty, TabMenu, TitleBox, Typography } from '@repo/ui/components';
import { BillingHistory, Download } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { formatter, getCardBrandImage, getCustomErrorMessage } from '@repo/ui/utils';
import Link from 'next/link';
import payment from 'payment';
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
  const { getPaymentInvoices, getPaymentMethods, getSubscription, getInvoicesDownload, reset } =
    usePaymentActions();
  const list = useRecoilValue(paymentInvoiceListSelector);
  const paymentLoading = useRecoilValue(paymentMethodListLoadingSelector);
  const subscription = useRecoilValue(paymentSubscriptionSelector);
  const loading = useRecoilValue(paymentInvoiceListLoadingSelector);

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

  const handleInvoiceDownload = async (invoiceId: string) => {
    try {
      const data = await getInvoicesDownload(invoiceId);
      // 폼 생성 및 설정
      const form = document.createElement('form');
      form.setAttribute('method', data.method);
      form.setAttribute('action', data.url);
      form.setAttribute('target', '_blank'); // 새 창으로 열기

      // 파라미터 추가
      for (const key in data.params) {
        if (data.params.hasOwnProperty(key)) {
          const input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', key);
          input.setAttribute('value', data.params[key as keyof typeof data.params]);
          form.appendChild(input);
        }
      }

      // 폼을 문서에 추가하고 제출
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  return (
    <>
      <SeoHead title="청구서 | MenuBoss" />
      <Layout>
        <TitleBox title="내 정보" />
        <AccountBillingWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px" minWidth="1156px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
              청구 정보
            </Typography>
            <Box mt="24px" border={`1px solid ${theme.color.gray300}`} borderRadius="8px">
              <Box display="flex">
                <Box display="flex" width="33.3%" borderRight={`1px solid ${theme.color.gray200}`}>
                  <Box width="100%" p="16px 24px">
                    <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                      카드
                    </Typography>
                    {paymentLoading ? (
                      <Skeleton width="200px" height="27px" />
                    ) : subscription?.product ? (
                      subscription?.product.title !== '무료' ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mt="4px"
                        >
                          <Box display="flex" alignItems="center">
                            {getCardBrandImage(
                              payment.fns.cardType(subscription.paymentMethod!.card.cardNumber),
                              '32',
                              '32'
                            )}
                            <Typography
                              ml="8px"
                              fontSize={theme.fontSize.text18}
                              fontWeight={theme.fontWeight.semiBold}
                              color={theme.color.gray900}
                            >
                              {subscription.paymentMethod!.card.cardBrand}
                            </Typography>
                          </Box>
                          <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                            {subscription.paymentMethod!.card.cardNumber}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography
                          mt="4px"
                          fontSize={theme.fontSize.text20}
                          fontWeight={theme.fontWeight.bold}
                          color={theme.color.gray900}
                        >
                          -
                        </Typography>
                      )
                    ) : (
                      <Typography
                        mt="4px"
                        fontSize={theme.fontSize.text20}
                        fontWeight={theme.fontWeight.bold}
                        color={theme.color.gray900}
                      >
                        -
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box width="66.6%">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p="16px 24px"
                  >
                    <Box>
                      <Typography
                        fontSize={theme.fontSize.text14}
                        fontWeight={theme.fontWeight.semiBold}
                        color={theme.color.gray500}
                      >
                        다음 결제일
                      </Typography>
                      {subscription ? (
                        <Typography
                          mt="4px"
                          fontSize={theme.fontSize.text20}
                          color={theme.color.gray900}
                          lineHeight="32px"
                        >
                          {subscription.invoice?.nextPaymentDate || '-'}
                        </Typography>
                      ) : (
                        <Skeleton width="200px" height="27px" />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt="32px">
              <Typography fontSize={theme.fontSize.text20} color={theme.color.gray900}>
                청구서
              </Typography>
              {(loading || !!list.length) && (
                <ul className="invoice-list">
                  <li className="header">
                    <div>No.</div>
                    <div>이름</div>
                    <div>요금제</div>
                    <div>청구일자</div>
                    <div>금액</div>
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
                              {formatter.addComma(String(item.payment.amount))}원
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
                            <Box
                              width="32px"
                              height="32px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              cursor="pointer"
                              onClick={() => handleInvoiceDownload(item.invoiceId)}
                            >
                              <Download
                                width="24"
                                height="24"
                                color={theme.color.gray600}
                                style={{ cursor: 'pointer' }}
                              />
                            </Box>
                          </div>
                        </li>
                      ))}
                </ul>
              )}
              {!loading && !list.length && (
                <Empty
                  icon={<BillingHistory width="68" height="68" color={theme.color.gray400} />}
                  text="현재 청구서가 없습니다<br/>결제 후 청구서를 확인해주세요"
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
