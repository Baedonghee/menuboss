/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, CheckBox, Textarea, Typography } from '@repo/ui/components';
import { Logo2 } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useMeActions } from '@/actions/me-actions';
import Protect from '@/components/Layout/Protect';
import { errorToast } from '@/utils/toast';

const AccountByeWrapper = styled(Box)`
  ul {
    margin-top: 32px;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 18px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const AccountBye = () => {
  const router = useRouter();
  const [complete, setComplete] = useState(false);
  const { deleteMember, userReset } = useMeActions();
  const [defaultReason, setDefaultReason] = useState('');
  const { register, getValues } = useForm({
    defaultValues: {
      reason: ''
    }
  });
  const [checked, setChecked] = useState('');

  useEffect(() => {
    return () => {
      if (complete) {
        userReset();
      }
    };
  }, [complete]);

  const handleCheck = (value: string, valueReason?: string) => {
    setChecked(value);
    if (valueReason) {
      setDefaultReason(valueReason);
    } else {
      setDefaultReason('');
    }
  };

  const handleBye = async () => {
    if (!complete) {
      try {
        let formReason = '';
        if (checked === 'other') {
          const { reason } = getValues();
          if (!reason) {
            errorToast('Please enter a reason');
            return;
          }
          formReason = reason;
        } else {
          formReason = defaultReason;
        }
        await deleteMember(formReason);
        setComplete(true);
      } catch (err) {
        errorToast(getCustomErrorMessage(err));
      }
      return;
    }
    router.push('/');
  };

  return (
    <AccountByeWrapper pt="80px">
      <Box width="420px" m="0 auto">
        <Box display="flex" justifyContent="center">
          <Logo2 width="126" height="60" color={theme.color.primary500} />
        </Box>
        <Typography
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          textAlign="center"
          mt="32px"
        >
          {complete ? 'Delete account completed!' : 'Reason for deleting your account'}
        </Typography>
        {complete ? (
          <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="12px">
            Account deletion completed successfully See you next time
          </Typography>
        ) : (
          <ul>
            <li>
              <CheckBox
                name="often"
                checked={checked === 'often'}
                onClick={() => handleCheck('often', `I don't use the service very often`)}
                type="circle"
              >
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  I don{"'"}t use the service very often
                </Typography>
              </CheckBox>
            </li>
            <li>
              <CheckBox
                name="often"
                checked={checked === 'service'}
                onClick={() => handleCheck('service', 'Service is inconvenient')}
                type="circle"
              >
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  Service is inconvenient
                </Typography>
              </CheckBox>
            </li>
            <li>
              <CheckBox
                name="use"
                checked={checked === 'use'}
                onClick={() => handleCheck('use', `It's hard to use`)}
                type="circle"
              >
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  It{"'"}s hard to use
                </Typography>
              </CheckBox>
            </li>
            <li>
              <CheckBox
                name="other"
                checked={checked === 'other'}
                onClick={() => handleCheck('other')}
                type="circle"
              >
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  Other
                </Typography>
              </CheckBox>
            </li>
          </ul>
        )}

        {checked === 'other' && (
          <Box mt="16px">
            <Textarea width="100%" register={register} name="reason" placeholder="Reason" />
          </Box>
        )}
        <Box display="flex" mt="32px" justifyContent="center">
          <Button size="l" width="360px" onClick={handleBye}>
            {complete ? 'Ok' : 'Delete account'}
          </Button>
        </Box>
      </Box>
    </AccountByeWrapper>
  );
};

export default Protect(AccountBye);
