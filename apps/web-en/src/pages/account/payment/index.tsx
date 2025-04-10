/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, Empty, ModalContainer, TabMenu, TitleBox } from '@repo/ui/components';
import { NewPayment, PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
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
        height: 84px;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSize.text14};
        color: ${({ theme }) => theme.color.gray900};
        &:nth-of-type(1) {
          width: calc(100% - 472px);
          justify-content: start;
          overflow: hidden;
          padding: 12px 0px 12px 24px;
        }
        &:nth-of-type(2) {
          width: 200px;
        }
        &:nth-of-type(3) {
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

  const handlePaymentMethod = () => {
    setIsAddPaymentOpen(true);
  };

  return (
    <>
      <SeoHead title="Payment | MenuBoss" />
      {isAddPaymentOpen && (
        <ModalContainer onClose={handleClose}>
          <AccountAddPaymentMethod onClose={handleClose} />
        </ModalContainer>
      )}
      <Layout>
        <TitleBox title="My account" />
        <AccountPaymentWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px" minWidth="1156px">
            <Box mt="32px">
              <Box display="flex" justifyContent="end" alignItems="center">
                <Button borderRadius="100px" width="200px" onClick={handlePaymentMethod}>
                  <PlusFill width="20" height="20" color={theme.color.white} />
                  Add payment method
                </Button>
              </Box>
              {(loading || !!list.length) && (
                <ul className="invoice-list">
                  <li className="header">
                    <div>Card information</div>
                    <div>Expires on</div>
                    <div>Creation date</div>
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
                        />
                      ))}
                </ul>
              )}
              {!loading && !list.length && (
                <Empty
                  icon={<NewPayment width="68" height="68" color={theme.color.gray400} />}
                  text="No payment methods are currently saved<br/>Please register your payment method"
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
