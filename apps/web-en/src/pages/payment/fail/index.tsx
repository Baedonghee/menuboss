import React from 'react';
import { Box, Button, Typography } from '@repo/ui/components';
import { Warning } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';

import SeoHead from '@/components/common/SeoHead';
import { ADMIN_PATH } from '@/utils/path';

const PaymentFail = () => {
  return (
    <>
      <SeoHead title="Payment Fail | MenuBoss" />
      <Box margin="0 auto" mt="80px" width="420px" textAlign="center">
        <Warning width="32" height="32" color={theme.color.red500} />
        <Typography
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.bold}
          color={theme.color.gray900}
          mt="24px"
        >
          Plan payment failed
        </Typography>
        <Typography
          fontSize={theme.fontSize.text16}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          mt="32px"
        >
          Payment failed due to insufficient card balance
        </Typography>
        <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="4px">
          Please check the card balance and try to pay again
        </Typography>
        <Box display="flex" justifyContent="center">
          <Link href={ADMIN_PATH.ACCOUNT_PLAN}>
            <Button variant="fill" color="error" width="360px" mt="32px" size="l">
              Try again
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default PaymentFail;
