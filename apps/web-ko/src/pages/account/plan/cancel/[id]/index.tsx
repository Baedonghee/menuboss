import React, { useState } from 'react';
import { Box, Button, Image, Typography } from '@repo/ui/components';
import { useHistory } from '@repo/ui/hooks';
import { ArrowLeft, Back } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
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
  const { handleShowAlert } = useAlert();

  const handleBack = () => {
    back(ADMIN_PATH.ACCOUNT_PLAN);
  };

  const handleContinue = async () => {
    if (isContinue) {
      try {
        await deleteSubscription(query.id as string);
        handleShowAlert({
          title: '요금제 취소 완료',
          description: '요금제 취소가 완료되었습니다',
          type: 'success',
          onConfirm: () => {
            router.push(ADMIN_PATH.ACCOUNT_PLAN);
          },
          onClose: () => {
            router.push(ADMIN_PATH.ACCOUNT_PLAN);
          }
        });
      } catch (err) {
        errorToast(getCustomErrorMessage(err));
      }
      return;
    }
    setIsContinue(true);
  };

  return (
    <>
      <SeoHead title="요금제 취소 | MenuBoss" />
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
            <Back width="24" height="24" color={theme.color.black} />
            <Typography ml="12px" fontSize={theme.fontSize.text16} color={theme.color.gray900}>
              뒤로가기
            </Typography>
          </Box>
        </Box>
        <Box pt="56px" display="flex">
          <Box
            width="66.6%"
            backgroundColor={theme.color.gray50}
            height="calc(100vh - 56px)"
            display="flex"
          >
            <Box width="630px" margin="auto">
              <Typography
                fontSize={theme.fontSize.text24}
                color={theme.color.gray900}
                fontWeight={theme.fontWeight.semiBold}
              >
                {isContinue ? '취소내역' : '요금제를 취소하면 다음 권한을 잃게 됩니다'}
              </Typography>
              {isContinue ? (
                <ul>
                  <li
                    style={{
                      fontSize: theme.fontSize.text14,
                      color: theme.color.secondary500
                    }}
                  >
                    취소일자: {format(new Date(), 'yyyy/MM/dd')}
                    <Typography
                      fontSize={theme.fontSize.text14}
                      fontWeight={theme.fontWeight.normal}
                      color={theme.color.secondary500}
                      mt="8px"
                    >
                      <Typography mt="4px">
                        {format(new Date(), 'yyyy년 MM월 dd일')} 이후 기본요금제를 해지합니다. 해지
                        후 기본요금제는 납입기간이 만료될 때까지 사용할 수 있습니다, 그리고 그
                        이후에는 이용이 어렵습니다. 기본요금제를 다시 이용하고 싶으시면 구독신청을
                        해주시기 바랍니다
                      </Typography>
                    </Typography>
                  </li>
                  <li>
                    취소된 요금제는 더 이상 사용할 수 없으며, 다른 유료 서비스 또한 사용할 수
                    없습니다
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>요금제에 남아 있는 이용 서비스</li>
                  <li>베이직 요금제의 다양한 기능</li>
                  <li>내가 만든 디지털 사이니지 캔버스 기록</li>
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
                    취소
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
                  계속
                </Button>
              </Box>
            </Box>
          </Box>
          <Box width="33.3%" display="flex">
            <Box width="350px" margin="auto">
              <Image src="/images/plan/cancel.png" alt="cancel" width={300} height={300} />
              <Typography
                fontSize={theme.fontSize.text24}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
                textAlign="center"
                mt="40px"
              >
                요금제 변경
              </Typography>
              <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="12px">
                다른 요금제로 변경하고 싶다면, 아래 버튼을 눌러주세요
              </Typography>
              <Link href={ADMIN_PATH.ACCOUNT_PLAN}>
                <Button variant="outline" size="l" width="100%" mt="32px">
                  요금제 변경
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
