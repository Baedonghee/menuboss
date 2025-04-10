import React from 'react';
import { Box, Button, Typography } from '@repo/ui/components';
import { CheckLine, Minus, Plus } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { formatter } from '@repo/ui/utils';
import classNames from 'classnames';

import { accountPlanList } from '@/models/account';

interface IAccountPlanItem {
  item: (typeof accountPlanList)[0];
  checked: boolean;
  handleChosePlan: (item: (typeof accountPlanList)[0]) => void;
  handleCount: (type: 'plus' | 'minus', itemName: string) => void;
  active: boolean;
  isSubmit: boolean;
}

const AccountPlanItem: React.FC<IAccountPlanItem> = ({
  item,
  checked,
  handleChosePlan,
  handleCount,
  active,
  isSubmit
}) => {
  const handleMinus = () => {
    if (item.count === 1) {
      return;
    }
    handleCount('minus', item.name);
  };

  const handlePlus = () => {
    handleCount('plus', item.name);
  };

  return (
    <li className={classNames({ active })}>
      <Typography
        fontSize={theme.fontSize.text20}
        fontWeight={theme.fontWeight.semiBold}
        color={active ? theme.color.white : theme.color.gray900}
      >
        {item.name}
      </Typography>
      <Box mt="20px" display="flex" alignItems="center">
        <Typography
          fontSize={theme.fontSize.text20}
          fontWeight={theme.fontWeight.bold}
          color={active ? theme.color.white : theme.color.gray900}
        >
          {checked
            ? item.name !== 'Enterprise'
              ? `$ ${Math.round(Number(formatter.onlyNumber(item.yearPrice)) / 100 / 12)}`
              : 'Contact sales'
            : item.name !== 'Enterprise'
              ? `$ ${Number(formatter.onlyNumber(item.monthPrice)) / 100}`
              : 'Contact sales'}
        </Typography>
        {item.perScreen && (
          <Typography
            fontSize={theme.fontSize.text14}
            color={active ? theme.color.white : theme.color.gray900}
            ml="12px"
          >
            {item.perScreen}
          </Typography>
        )}
      </Box>
      <Box
        mt="8px"
        fontSize={theme.fontSize.text14}
        color={active ? theme.color.white : theme.color.gray700}
        height="38px"
      >
        {item.description}
      </Box>
      {!!item.count && (
        <Box display="flex" justifyContent="center" alignItems="center" mt="24px">
          <Box
            as="button"
            display="flex"
            width="20px"
            height="20px"
            borderRadius="50%"
            backgroundColor={item.count === 1 ? theme.color.gray50 : theme.color.gray100}
            mr="12px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            onClick={handleMinus}
          >
            <Minus
              width="12"
              height="12"
              color={item.count === 1 ? theme.color.gray300 : theme.color.gray500}
            />
          </Box>
          <Box
            display="flex"
            borderRadius="4px"
            border={`1px solid ${theme.color.gray300}`}
            width="44px"
            height="32px"
            fontSize={theme.fontSize.text12}
            fontWeight={theme.fontWeight.normal}
            backgroundColor={theme.color.white}
            color={theme.color.gray900}
            justifyContent="center"
            alignItems="center"
          >
            {item.count}
          </Box>
          <Box
            display="flex"
            width="20px"
            height="20px"
            borderRadius="50%"
            backgroundColor={theme.color.gray100}
            ml="12px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            onClick={handlePlus}
            as="button"
          >
            <Plus width="12" height="12" color={theme.color.gray500} />
          </Box>
        </Box>
      )}
      <Button
        variant="outline"
        color={active ? 'primary' : 'neutral'}
        size="s"
        width="100%"
        mt={item.count ? '24px' : '80px'}
        onClick={() => handleChosePlan(item)}
        disabled={isSubmit}
      >
        {item.buttonName}
      </Button>
      <ul>
        {item.options.map((option, index) => (
          <li key={`option-${item.name}-${index}`}>
            <CheckLine
              width="24"
              height="24"
              color={active ? theme.color.white : theme.color.gray900}
            />
            <Typography
              ml="8px"
              fontSize={theme.fontSize.text14}
              color={active ? theme.color.white : theme.color.gray900}
            >
              {option}
            </Typography>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default AccountPlanItem;
