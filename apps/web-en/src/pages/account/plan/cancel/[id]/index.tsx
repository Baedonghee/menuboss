import React, { useState } from 'react';
import { Box, Button, Image, Typography } from '@repo/ui/components';
import { useHistory } from '@repo/ui/hooks';
import { ArrowLeft } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { usePaymentActions } from '@/actions/payment-action';
import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const PlanCancelWrapper = styled(Box)`
  ul {
    margin-top: 24px;
    padding-left: 20px;
    list-style: disc;
    li {
      font-size: ${({ theme }) => theme.fontSize.text16};
      color: ${({ theme }) => theme.color.gray900};
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const PlanCancel = () => {
  const router = useRouter();
  const { query } = router;
  const { deleteSubscription } = usePaymentActions();
  const { back } = useHistory();
  const [isContinue, setIsContinue] = useState(false);

  const handleBack = () => {
    back(ADMIN_PATH.ACCOUNT_PLAN);
  };

  const handleContinue = async () => {
    if (isContinue) {
      try {
        await deleteSubscription(query.id as string);
        router.replace(ADMIN_PATH.PAYMENT_CANCEL);
      } catch (err) {
        errorToast(getCustomErrorMessage(err));
      }
      return;
    }
    setIsContinue(true);
  };

  return (
    <>
      <SeoHead title="Plan Cancel | MenuBoss" />
      <PlanCancelWrapper>
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          display="flex"
          height="56px"
          p="0px 32px"
          alignItems="center"
          borderBottom={`1px solid ${theme.color.gray300}`}
          zIndex={1}
        >
          <Box display="flex" alignItems="center" onClick={handleBack} cursor="pointer">
            <ArrowLeft width="24" height="24" color={theme.color.black} />
            <Typography ml="12px" fontSize={theme.fontSize.text16} color={theme.color.gray900}>
              Back
            </Typography>
          </Box>
        </Box>
        <Box pt="56px" display="flex">
          <Box
            width="66.6%"
            backgroundColor={theme.color.gray50}
            borderRight={`1px solid ${theme.color.gray200}`}
            height="calc(100vh - 56px)"
            display="flex"
          >
            <Box width="630px" margin="auto">
              <Typography
                fontSize={theme.fontSize.text24}
                color={theme.color.gray900}
                fontWeight={theme.fontWeight.semiBold}
              >
                {isContinue
                  ? 'Cancellation Details'
                  : 'If you cancel the plan, you will lose the following rights'}
              </Typography>
              {isContinue ? (
                <ul>
                  <li>
                    Plan cancellation date: {format(new Date(), 'yyyy/MM/dd')}
                    <Typography
                      fontSize={theme.fontSize.text14}
                      fontWeight={theme.fontWeight.normal}
                      color={theme.color.secondary500}
                      mt="8px"
                    >
                      Your cancellation details are as follows.
                      <Typography mt="4px">
                        ou will cancel the Basic Plan after January 01, 2023. After cancellation,
                        the basic plan can be used until the payment expires, and it is difficult to
                        use after that. If you want to use the Basic Plan again, please apply for
                        the subscription service
                      </Typography>
                    </Typography>
                  </li>
                  <li>Plans are no longer available and paid services are not available</li>
                </ul>
              ) : (
                <ul>
                  <li>Subscription services remaining in the plan</li>
                  <li>Various features for the Basic plan</li>
                  <li>Digital signage canvas service history that I created</li>
                </ul>
              )}

              <Box display="flex" mt="32px">
                <Link href={ADMIN_PATH.ACCOUNT_PLAN}>
                  <Button
                    variant="outline"
                    color="neutral"
                    size="s"
                    width="120px"
                    mr="12px"
                    borderRadius="100px !important"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="fill"
                  size="s"
                  width="120px"
                  mr="12px"
                  borderRadius="100px !important"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
          <Box width="33.3%" display="flex">
            <Box width="300px" margin="auto">
              <Image src="/images/plan/cancel.png" alt="cancel" width={300} height={300} />
              <Typography
                fontSize={theme.fontSize.text24}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
                mt="40px"
              >
                Change the plan
              </Typography>
              <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="12px">
                If you want to change to another plan,
                <br />
                please press the button below
              </Typography>
              <Link href={ADMIN_PATH.ACCOUNT_PLAN}>
                <Button variant="outline" size="l" width="100%" mt="32px">
                  Change my plan
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </PlanCancelWrapper>
    </>
  );
};

export default Protect(PlanCancel);
