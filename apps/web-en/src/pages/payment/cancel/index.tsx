import React from 'react';
import { Box, Button, Typography } from '@repo/ui/components';
import { Logo2 } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import { authUserSelector } from '@/state/auth';
import { ADMIN_PATH } from '@/utils/path';

const PaymentCancel = () => {
  const me = useRecoilValue(authUserSelector);
  return (
    <>
      <SeoHead title="Payment Cancel | MenuBoss" />
      <Box margin="0 auto" mt="80px" width="420px" textAlign="center">
        <Logo2 width="126" height="60" color={theme.color.primary500} />
        <Typography
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.bold}
          color={theme.color.gray900}
          mt="32px"
        >
          MenuBoss, your subscription has been canceled
        </Typography>
        <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="32px">
          Cancellation of subscription has been sent to the address below{' '}
          <Typography as="span" color={theme.color.secondary500}>
            {me?.email || ''}
          </Typography>
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

export default Protect(PaymentCancel);
