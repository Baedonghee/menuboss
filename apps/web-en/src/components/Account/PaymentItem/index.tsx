import React, { useState } from 'react';
import { Box, MoreMenu, Typography } from '@repo/ui/components';
import { More, SetDefault, Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IPaymentMethodList } from '@repo/ui/types';
import { getCardBrandImage, getCustomErrorMessage } from '@repo/ui/utils';

import { usePaymentActions } from '@/actions/payment-action';
import { errorToast } from '@/utils/toast';

interface IAccountPaymentItem {
  item: IPaymentMethodList;
}

const AccountPaymentItem: React.FC<IAccountPaymentItem> = ({ item }) => {
  const { updatePaymentMethodChange, deletePaymentMethod } = usePaymentActions();
  const { handleShowAlert, handleClose } = useAlert();
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePaymentChange = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (item) {
      handleShowAlert({
        title: 'Change default card?',
        description: 'Are you want to change the card you use default?',
        alertType: 'confirm',
        type: 'warning',
        confirmText: 'Change',
        onConfirm: async () => {
          try {
            await updatePaymentMethodChange(String(item.paymentMethodId));
            handleClose();
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };

  const handlePaymentDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (item.isDefault) {
      handleShowAlert({
        title: 'Unable to delete this card',
        description:
          'In order to delete the card, please set the other card as the default card and delete it',
        type: 'error',
        confirmText: 'Ok'
      });
      return;
    }
    if (item) {
      handleShowAlert({
        title: 'Delete credit card?',
        description: `Are you sure you want to remove this ${item.card.brand} card from your account?`,
        alertType: 'confirm',
        type: 'error',
        confirmText: 'Delete',
        onConfirm: async () => {
          try {
            await deletePaymentMethod(String(item.paymentMethodId));
            handleClose();
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };
  const list = [
    {
      icon: <SetDefault width="20" height="20" color={theme.color.black} />,
      name: 'Set default',
      color: theme.color.gray900,
      onClick: handlePaymentChange
    },
    {
      icon: <Trash width="20" height="20" color={theme.color.red500} />,
      name: 'Delete',
      color: theme.color.red500,
      onClick: handlePaymentDelete
    }
  ];

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg') {
      return;
    }
    setMenuOpen(false);
  };

  return (
    <li>
      <div>
        <Box mr="40px" display="flex" alignItems="center">
          {getCardBrandImage(item.card.brand, '52', '52')}
        </Box>
        <Box>
          <Box display="flex" alignItems="center">
            {item.isDefault && (
              <Box
                width="60px"
                height="24px"
                borderRadius="100px"
                color={theme.color.white}
                backgroundColor={theme.color.green400}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr="8px"
                fontSize={theme.fontSize.text12}
              >
                Default
              </Box>
            )}
            <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
              {item.card.brand} card
            </Typography>
          </Box>
          <Typography
            mt="4px"
            fontSize={theme.fontSize.text12}
            fontWeight={theme.fontWeight.normal}
            color={theme.color.gray500}
          >
            **** **** **** {item.card.last4}
          </Typography>
        </Box>
      </div>
      <div>
        {String(item.card.month).padStart(2, '0')} / {item.card.year}
      </div>
      <div>{item.createdDate}</div>
      <Box display="flex" alignItems="center" position="relative">
        <More
          width="24"
          height="24"
          color={theme.color.gray600}
          style={{ cursor: 'pointer' }}
          onClick={handleMenuOpen}
        />
        {menuOpen && <MoreMenu top="58px" right="27px" list={list} handleClose={handleMenuClose} />}
      </Box>
    </li>
  );
};

export default AccountPaymentItem;
