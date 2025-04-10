import React, { useState } from 'react';
import { Box, MoreMenu, Typography } from '@repo/ui/components';
import { Edit, More } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IPaymentMethodListKo } from '@repo/ui/types';
import { getCardBrandImage } from '@repo/ui/utils';
import payment from 'payment';

interface IAccountPaymentItem {
  item: IPaymentMethodListKo;
  onPaymentEdit: () => void;
}

const AccountPaymentItem: React.FC<IAccountPaymentItem> = ({ item, onPaymentEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePaymentEdit = () => {
    setMenuOpen(false);
    onPaymentEdit();
  };

  const list = [
    {
      icon: <Edit width="20" height="20" color={theme.color.gray900} />,
      name: '수정',
      color: theme.color.gray900,
      onClick: handlePaymentEdit
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
          {getCardBrandImage(payment.fns.cardType(item.card.cardNumber), '52', '52')}
        </Box>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
              {item.card.cardBrand}
            </Typography>
          </Box>
          <Typography
            mt="4px"
            fontSize={theme.fontSize.text12}
            fontWeight={theme.fontWeight.normal}
            color={theme.color.gray500}
          >
            {item.card.cardNumber}
          </Typography>
        </Box>
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
        {menuOpen && (
          <MoreMenu
            width="140px"
            top="58px"
            right="0px"
            list={list}
            handleClose={handleMenuClose}
          />
        )}
      </Box>
    </li>
  );
};

export default AccountPaymentItem;
