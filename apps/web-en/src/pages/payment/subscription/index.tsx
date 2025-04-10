import React from 'react';
import { Box, Button, Typography } from '@repo/ui/components';
import { Logo2 } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';

import SeoHead from '@/components/common/SeoHead';
import { ADMIN_PATH } from '@/utils/path';

const PaymentSubscription = () => {
  return (
    <>
      <SeoHead title="Payment Subscription | MenuBoss" />
      <Box margin="0 auto" mt="80px" width="420px" textAlign="center">
        <Logo2 width="126" height="60" color={theme.color.primary500} />
        <Typography
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.bold}
          color={theme.color.gray900}
          mt="32px"
        >
          Subscription Change Completed!
        </Typography>
        <Typography
          fontSize={theme.fontSize.text16}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          mt="32px"
        >
          You will be charged the changed amount from the date the change began
        </Typography>
        <Typography
          fontSize={theme.fontSize.text16}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          mt="8px"
        >
          Payment details are shown in your email or in the Billing in Settings
        </Typography>
        <Box display="flex" justifyContent="center">
          <Link href={ADMIN_PATH.ACCOUNT_PLAN}>
            <Button variant="fill" color="primary" width="360px" mt="32px" size="l">
              Return to settings
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default PaymentSubscription;
