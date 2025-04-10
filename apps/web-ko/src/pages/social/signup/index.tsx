import React, { useInsertionEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, CheckBox, Form, Input, Typography } from '@repo/ui/components';
import { Logo } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { getCookie } from 'cookies-next';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { useAuthActions } from '@/actions/auth-action';
import SeoHead from '@/components/common/SeoHead';
import AuthLayout from '@/components/Layout/Auth';
import { authSocialAccessTokenSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const SocialSignUp = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { socialJoin } = useAuthActions();
  const social = useRecoilValue(authSocialAccessTokenSelector);

  const {
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      business: '',
      agree: {
        age: false,
        terms: false,
        privacy: false,
        marketing: false
      }
    }
  });

  register('agree.age', {
    required: true
  });

  register('agree.terms', {
    required: true
  });

  register('agree.privacy', {
    required: true
  });

  useInsertionEffect(() => {
    if (!social) {
      router.replace(`${PATH.LOGIN}${query.continue ? `?continue=${query.continue}` : ''}`);
    }
  }, []);

  const onSubmit = handleSubmit(async ({ name, business }) => {
    try {
      if (social) {
        setIsSubmit(true);
        await socialJoin({
          name,
          business,
          accessToken: social.token,
          type: social.type,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          asPath: query.continue as string
        });
      }
    } catch (err) {
      setIsSubmit(false);
      errorToast(getCustomErrorMessage(err));
    }
  });

  const handleAllCheckAgree = () => {
    const { age, terms, privacy, marketing } = getValues('agree');
    if (age && terms && privacy && marketing) {
      setValue(
        'agree',
        {
          age: false,
          terms: false,
          privacy: false,
          marketing: false
        },
        {
          shouldValidate: true
        }
      );
    } else {
      setValue(
        'agree',
        {
          age: true,
          terms: true,
          privacy: true,
          marketing: true
        },
        {
          shouldValidate: true
        }
      );
    }
  };

  const handleCheckAgree = (name: 'age' | 'terms' | 'privacy' | 'marketing') => {
    setValue(`agree.${name}`, !getValues(`agree.${name}`), {
      shouldValidate: true
    });
  };

  return (
    <>
      <SeoHead title="소셜 회원가입 | MenuBoss" />
      <AuthLayout>
        <Logo width="126" height="61" color={theme.color.primary500} className="logo" />
        <Typography
          as="h1"
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.semiBold}
          mb="12px"
          textAlign="center"
        >
          회원가입
        </Typography>
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray700} mb="32px">
          회원정보를 입력하고 메뉴보스를 시작해보세요
        </Typography>
        <Form title="login" onSubmit={onSubmit}>
          <Input
            type="text"
            name="name"
            register={register}
            options={{
              required: '이름을 입력해주세요'
            }}
            mb="12px"
            width="100%"
            placeholder="이름을 입력해주세요"
            size="l"
          />
          <Input
            type="text"
            name="business"
            register={register}
            options={{
              required: '사업자 이름을 입력해주세요'
            }}
            mb="32px"
            width="100%"
            placeholder="사업자 이름을 입력해주세요"
            size="l"
          />
          <Box pb="16px" borderBottom={`1px solid ${theme.color.gray200}`}>
            <CheckBox
              name="all"
              width="20"
              height="20"
              checked={watch('agree.age') && watch('agree.terms') && watch('agree.privacy')}
              onClick={handleAllCheckAgree}
            >
              <Typography
                fontSize={theme.fontSize.text16}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray700}
              >
                전체동의
              </Typography>
            </CheckBox>
          </Box>
          <Box mt="16px" mb="32px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="12px">
              <CheckBox
                name="age"
                width="20"
                height="20"
                checked={watch('agree.age')}
                onClick={() => handleCheckAgree('age')}
              >
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray700}>
                  (필수) 만 14세 이상입니다
                </Typography>
              </CheckBox>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="12px">
              <CheckBox
                name="age"
                width="20"
                height="20"
                checked={watch('agree.terms')}
                onClick={() => handleCheckAgree('terms')}
              >
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray700}>
                  (필수) 이용약관 동의
                </Typography>
              </CheckBox>
              <a
                href={PATH.POLICY_SERVICE}
                target="_blank"
                className="underline"
                style={{
                  color: theme.color.gray400,
                  fontSize: theme.fontSize.text14,
                  cursor: 'pointer'
                }}
                rel="noreferrer"
              >
                보기
              </a>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="12px">
              <CheckBox
                name="age"
                width="20"
                height="20"
                checked={watch('agree.privacy')}
                onClick={() => handleCheckAgree('privacy')}
              >
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray700}>
                  (필수) 개인정보 수집 및 이용 동의
                </Typography>
              </CheckBox>
              <a
                href={PATH.POLICY_PRIVACY}
                target="_blank"
                className="underline"
                style={{
                  color: theme.color.gray400,
                  fontSize: theme.fontSize.text14,
                  cursor: 'pointer'
                }}
                rel="noreferrer"
              >
                보기
              </a>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="12px">
              <CheckBox
                name="age"
                width="20"
                height="20"
                checked={watch('agree.marketing')}
                onClick={() => handleCheckAgree('marketing')}
              >
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray700}>
                  (선택) 마케팅 개인정보 제3자 제공 동의
                </Typography>
              </CheckBox>
              <a
                href={PATH.POLICY_MARKETING}
                target="_blank"
                className="underline"
                style={{
                  color: theme.color.gray400,
                  fontSize: theme.fontSize.text14,
                  cursor: 'pointer'
                }}
                rel="noreferrer"
              >
                보기
              </a>
            </Box>
          </Box>
          <Button type="submit" size="l" width="100%" mb="32px" disabled={!isValid || isSubmit}>
            회원가입
          </Button>
          <Box display="flex" justifyContent="center">
            <Typography
              as="span"
              mr="8px"
              color={theme.color.gray500}
              fontSize={theme.fontSize.text16}
            >
              이미 계정이 있으신가요?
            </Typography>
            <Typography
              as="span"
              color={theme.color.primary500}
              fontWeight={theme.fontWeight.semiBold}
            >
              <Link href={PATH.LOGIN} className="underline">
                로그인
              </Link>
            </Typography>
          </Box>
        </Form>
      </AuthLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const auth = getCookie('auth', {
    req: ctx.req,
    res: ctx.res
  });
  if (auth) {
    return {
      redirect: {
        destination: ctx.query.continue || ADMIN_PATH.SCREENS,
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
};

export default SocialSignUp;
