/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, Empty, ModalContainer, TabMenu, TitleBox } from '@repo/ui/components';
import { NewPayment, PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { delay, getCustomErrorMessage } from '@repo/ui/utils';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { usePaymentActions } from '@/actions/payment-action';
import AccountAddPaymentMethod from '@/components/Account/AddPaymentMethod';
import AccountPaymentItem from '@/components/Account/PaymentItem';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import { accountTabMenuList } from '@/models/account';
import { skeletonList } from '@/models/skeleton';
import { paymentMethodListLoadingSelector, paymentMethodListSelector } from '@/state/payment';
import { errorToast } from '@/utils/toast';

const AccountPaymentWrapper = styled(Box)`
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
        &:nth-of-type(1) {
          width: calc(100% - 272px);
          justify-content: start;
          overflow: hidden;
          padding: 12px 0px 12px 24px;
        }
        &:nth-of-type(2) {
          width: 200px;
        }
        &:nth-of-type(4) {
          width: 72px;
        }
      }
    }
  }
`;

const AccountPayment = () => {
  const { getPaymentMethods, reset } = usePaymentActions();
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const list = useRecoilValue(paymentMethodListSelector);
  const loading = useRecoilValue(paymentMethodListLoadingSelector);

  useEffect(() => {
    fetchPaymentMethods();
    return () => {
      reset();
    };
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      await getPaymentMethods();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleClose = () => {
    setIsAddPaymentOpen(false);
  };

  const handlePaymentMethod = (type?: 'edit') => {
    setIsEdit(type === 'edit');
    setIsAddPaymentOpen(true);
  };

  const handleUpdateList = async () => {
    setIsAddPaymentOpen(false);
    await delay(1000);
    fetchPaymentMethods();
  };

  return (
    <>
      <SeoHead title="결제수단 | MenuBoss" />
      {isAddPaymentOpen && (
        <ModalContainer onClose={handleClose}>
          <AccountAddPaymentMethod
            onClose={handleClose}
            onUpdateList={handleUpdateList}
            isEdit={isEdit}
          />
        </ModalContainer>
      )}
      <Layout>
        <TitleBox title="내 정보" />
        <AccountPaymentWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px" minWidth="1156px">
            <Box mt="32px">
              {!loading && !list.length && (
                <Box display="flex" justifyContent="end" alignItems="center">
                  <Button borderRadius="100px" width="140px" onClick={() => handlePaymentMethod()}>
                    <PlusFill width="20" height="20" color={theme.color.white} />
                    결제수단 추가
                  </Button>
                </Box>
              )}
              {(loading || !!list.length) && (
                <ul className="invoice-list">
                  <li className="header">
                    <div>카드 정보</div>
                    <div>등록일</div>
                    <div></div>
                  </li>
                  {loading
                    ? skeletonList.map((_, index) => (
                        <li key={`skeleton-${index}`}>
                          <div>
                            <Skeleton width="300px" height="40px" />
                          </div>
                          <div>
                            <Skeleton width="100px" height="20px" />
                          </div>
                          <div></div>
                        </li>
                      ))
                    : list.map((item) => (
                        <AccountPaymentItem
                          item={item}
                          key={`payment-methods-${item.paymentMethodId}`}
                          onPaymentEdit={() => handlePaymentMethod('edit')}
                        />
                      ))}
                </ul>
              )}
              {!loading && !list.length && (
                <Empty
                  icon={<NewPayment width="68" height="68" color={theme.color.gray400} />}
                  text="현재 저장된 결제 수단이 없습니다<br/>결제수단을 추가하여 등록해주세요"
                />
              )}
            </Box>
          </Box>
        </AccountPaymentWrapper>
      </Layout>
    </>
  );
};

export default Protect(AccountPayment);
