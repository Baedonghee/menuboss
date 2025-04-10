import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, Input, Radio, Typography } from '@repo/ui/components';
import { useHistory } from '@repo/ui/hooks';
import { Back, Minus, Plus } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IPaymentProduct } from '@repo/ui/types';
import {
  delay,
  formatter,
  getCardBrandImage,
  getCustomErrorMessage,
  validateExpiryDate
} from '@repo/ui/utils';
import creditCardType from 'credit-card-type';
import { useRouter } from 'next/router';
import payment from 'payment';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { usePaymentActions } from '@/actions/payment-action';
import SeoHead from '@/components/common/SeoHead';
import Protect from '@/components/Layout/Protect';
import { paymentListSelector, paymentMethodListSelector } from '@/state/payment';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const PlanCancelWrapper = styled(Box)`
  .card-number {
    height: 52px;
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    font-size: ${({ theme }) => theme.fontSize.text16};
    color: ${({ theme }) => theme.color.gray900};
    margin-top: 12px;
    &.error {
      border: 1px solid ${({ theme }) => theme.color.red500};
    }
    &::placeholder {
      color: ${({ theme }) => theme.color.gray400};
    }
    &:focus {
      border: 1px solid ${({ theme }) => theme.color.gray900};
    }
  }
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
  .font-btn {
    display: flex;
    width: 28px;
    height: 28px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.white};
    border-left: 1px solid ${({ theme }) => theme.color.gray200};
    border-top: 1px solid ${({ theme }) => theme.color.gray200};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
    border-right: none;
    &.plus {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-right: 1px solid ${({ theme }) => theme.color.gray200};
      border-left: none;
    }
    &:disabled {
      cursor: not-allowed;
      border-left: 1px solid ${({ theme }) => theme.color.gray200};
      background-color: ${({ theme }) => theme.color.gray100};
      svg {
        path {
          stroke: ${({ theme }) => theme.color.gray200};
        }
      }
    }
  }
  .font-input {
    width: 40px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.black};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    font-size: ${({ theme }) => theme.fontSize.text12};
    border: 1px solid ${({ theme }) => theme.color.gray200};
    text-align: center;
    border-radius: 0px;
  }
  .card-brand {
    position: absolute;
    top: 6px;
    right: 16px;
  }
`;

const PlanPayment = () => {
  const router = useRouter();
  const { id, count } = router.query;
  const list = useRecoilValue(paymentListSelector);
  const paymentMethodList = useRecoilValue(paymentMethodListSelector);
  const { back } = useHistory();
  const { getPaymentMethods, getPaymentProducts, postPaymentCard, postPaymentSubscription } =
    usePaymentActions();
  const [countValue, setCountValue] = useState(count ? Number(count) : 1);
  const [isCardBrand, setIsCardBrand] = useState('');
  const [paymentType, setPaymentType] = useState<'personal' | 'company'>('personal');
  const [selectedPayment, setSelectedPayment] = useState<IPaymentProduct | null>(null);
  const { handleShowAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    watch,
    setValue,
    setError,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    defaultValues: {
      cardNo: '',
      cardRrNo: '',
      cardExpMonth: '',
      cardPassword: ''
    }
  });

  useEffect(() => {
    if (list.length) {
      const product = list.find((item) => item.productId === Number(id));
      console.log(product);
      if (!product) {
        router.push(ADMIN_PATH.ACCOUNT_PLAN);
        return;
      }
      setSelectedPayment(product);
    }
  }, [list]);

  useEffect(() => {
    fetchPaymentProducts();
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setIsLoading(true);
      await getPaymentMethods();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPaymentProducts = async () => {
    try {
      await getPaymentProducts();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleBack = () => {
    back(ADMIN_PATH.ACCOUNT_PLAN);
  };

  const handlePlusCount = () => {
    setCountValue((prev) => prev + 1);
  };

  const handleMinusCount = () => {
    if (countValue === 1) {
      return;
    }
    setCountValue((prev) => prev - 1);
  };

  const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatter.onlyNumber(e.target.value);
    setCountValue(Number(value));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardNumber = e.target.value;
    const cardNumberLength = cardNumber.split(' ').join('').length;
    if (cardNumberLength > 16) {
      return;
    }
    const cardType = payment.fns.cardType(cardNumber);
    setValue('cardNo', formatter.formatCardNumber(cardNumber), {
      shouldValidate: true
    });
    const cardTypeInfo = creditCardType.getTypeInfo(cardType) || {};
    const cardTypeLengths = cardTypeInfo.lengths || [16];
    setIsCardBrand(cardType || '');
    if (cardTypeLengths) {
      const lastCardTypeLength = cardTypeLengths[cardTypeLengths.length - 1];
      for (const length of cardTypeLengths) {
        if (length === cardNumberLength && payment.fns.validateCardNumber(cardNumber)) {
          clearErrors('cardNo');
          break;
        }
        if (cardNumberLength === lastCardTypeLength) {
          setError('cardNo', {
            type: 'manual',
            message: '카드 번호를 확인해주세요'
          });
        }
      }
    }
  };

  const handleCardBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (paymentType === 'personal') {
      const newValue = formatter.onlyNumber(e.target.value);
      if (newValue.length > 6) {
        return;
      }
      setValue('cardRrNo', newValue, {
        shouldValidate: true
      });
    } else {
      const newValue = formatter.onlyNumber(e.target.value);
      if (newValue.length > 10) {
        return;
      }
      setValue('cardRrNo', newValue, {
        shouldValidate: true
      });
    }
  };

  const handleCardExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 7) {
      return;
    }
    const value = formatter.formatExpiry(e) || '';
    if (value) {
      const newValue = value.split(' / ').join('/');
      if (newValue.length > 5) {
        return;
      }
      const expiryError = validateExpiryDate(newValue);
      if (newValue.length > 4) {
        if (expiryError) {
          setError('cardExpMonth', {
            type: 'manual',
            message: expiryError
          });
        } else {
          clearErrors('cardExpMonth');
        }
      }
    }
    setValue('cardExpMonth', value, {
      shouldValidate: true
    });
  };

  const handleCardPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      return;
    }
    setValue('cardPassword', e.target.value, {
      shouldValidate: true
    });
  };

  const handleCheck = async (type: 'personal' | 'company') => {
    if (paymentType === type) {
      return;
    }
    setPaymentType(type);
    reset({
      ...watch(),
      cardRrNo: ''
    });
  };

  const handlePayment = handleSubmit(async ({ cardNo, cardExpMonth, cardPassword, cardRrNo }) => {
    try {
      if (!paymentMethodList.length) {
        await postPaymentCard({
          cardNo: cardNo.split(' ').join(''),
          cardExpMonth: cardExpMonth.split(' / ').join('/').split('/')[0],
          cardExpYear: cardExpMonth.split(' / ').join('/').split('/')[1],
          cardPassword,
          cardRrNo
        });
        await delay(1000);
      }
      await postPaymentSubscription({
        productId: Number(id),
        quantity: countValue
      });
      handleShowAlert({
        title: '결제 완료',
        description:
          '결제가 완료되었습니다. 결제 세부 정보는 이메일 또는 내 정보의 청구서에 표시됩니다',
        confirmText: '확인',
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
  });

  return (
    <>
      <SeoHead title="구독 결제 | MenuBoss" />
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
            width="50%"
            backgroundColor={theme.color.gray50}
            height="calc(100vh - 56px)"
            display="flex"
          >
            <Box width="360px" margin="auto">
              <Typography
                color={theme.color.gray900}
                fontSize={theme.fontSize.text16}
                lineHeight="21px"
              >
                결제 내역
              </Typography>

              <Box mt="32px" pb="24px" borderBottom={`1px solid ${theme.color.gray200}`}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    {selectedPayment ? (
                      <Typography
                        fontSize={theme.fontSize.text20}
                        fontWeight={theme.fontWeight.semiBold}
                        color={theme.color.gray900}
                        lineHeight="26px"
                      >
                        {selectedPayment.title}
                      </Typography>
                    ) : (
                      <Skeleton width={100} height={26} />
                    )}
                    <Box display="flex" alignItems="center" ml="12px">
                      <button
                        className="font-btn"
                        onClick={handleMinusCount}
                        disabled={countValue === 1}
                      >
                        <Minus width="14" height="14" color={theme.color.black} />
                      </button>
                      <input
                        type="text"
                        className="font-input"
                        value={countValue}
                        onChange={handleCount}
                      />
                      <button className="font-btn plus" onClick={handlePlusCount}>
                        <Plus width="14" height="14" color={theme.color.black} />
                      </button>
                    </Box>
                  </Box>
                  {selectedPayment ? (
                    <Typography
                      fontSize={theme.fontSize.text20}
                      fontWeight={theme.fontWeight.semiBold}
                      lineHeight="26px"
                    >
                      {selectedPayment.description}
                    </Typography>
                  ) : (
                    <Skeleton width={80} height={26} />
                  )}
                </Box>
                {selectedPayment ? (
                  <Typography
                    mt="8px"
                    fontSize={theme.fontSize.text12}
                    lineHeight="16px"
                    color={theme.color.gray500}
                  >
                    {`${formatter.addComma(
                      String(selectedPayment.amount)
                    )}원 x ${countValue}개 요금제 추가(TV 화면) x ${
                      selectedPayment.interval === 'Month' ? '1개월' : '1년'
                    }`}
                  </Typography>
                ) : (
                  <Skeleton width={150} height={16} />
                )}
              </Box>
              <Box mt="24px" display="flex" justifyContent="space-between">
                <Typography
                  fontSize={theme.fontSize.text20}
                  color={theme.color.gray900}
                  fontWeight={theme.fontWeight.bold}
                  lineHeight="26px"
                >
                  총 금액
                </Typography>
                {selectedPayment ? (
                  <Typography
                    fontSize={theme.fontSize.text20}
                    color={theme.color.gray900}
                    fontWeight={theme.fontWeight.bold}
                    lineHeight="26px"
                  >
                    {formatter.addComma(String(selectedPayment.amount * countValue))}원
                  </Typography>
                ) : (
                  <Skeleton width={100} height={26} />
                )}
              </Box>
            </Box>
          </Box>
          <Box width="50%" display="flex">
            <Box width="360px" margin="auto">
              <Typography
                fontSize={theme.fontSize.text24}
                fontWeight={theme.fontWeight.bold}
                lineHeight="31px"
                color={theme.color.gray900}
                textAlign="center"
              >
                결제 상세
              </Typography>
              {isLoading ? (
                <Skeleton width={150} height={16} />
              ) : (
                !paymentMethodList.length && (
                  <Typography
                    fontSize={theme.fontSize.text16}
                    lineHeight="21px"
                    color={theme.color.gray900}
                    textAlign="center"
                    mt="12px"
                  >
                    카드 결제 정보를 입력해주세요
                  </Typography>
                )
              )}
              {isLoading ? (
                <Skeleton width={150} height={16} />
              ) : (
                !paymentMethodList.length && (
                  <Box mt="32px" display="flex">
                    <Box
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      onClick={() => handleCheck('personal')}
                    >
                      <Radio mr="8px" checked={paymentType === 'personal'} />
                      <Typography
                        fontSize={theme.fontSize.text14}
                        lineHeight="19px"
                        color={theme.color.gray900}
                      >
                        개인
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      ml="16px"
                      onClick={() => handleCheck('company')}
                    >
                      <Radio mr="8px" checked={paymentType === 'company'} />
                      <Typography
                        fontSize={theme.fontSize.text14}
                        lineHeight="19px"
                        color={theme.color.gray900}
                      >
                        법인
                      </Typography>
                    </Box>
                  </Box>
                )
              )}
              {isLoading ? (
                <>
                  <Skeleton width={100} height={16} />
                  <Skeleton width={300} height={16} />
                </>
              ) : !paymentMethodList.length ? (
                <Box mt="24px">
                  <Typography
                    fontSize={theme.fontSize.text16}
                    lineHeight="21px"
                    color={theme.color.gray900}
                  >
                    카드 번호
                  </Typography>
                  <Box position="relative">
                    <Input
                      mt="12px"
                      width="100%"
                      size="l"
                      {...register('cardNo', {
                        required: '카드 번호를 입력해주세요',
                        validate: (value) => {
                          if (!payment.fns.validateCardNumber(value)) {
                            return '카드 번호를 확인해주세요';
                          }
                          return true;
                        }
                      })}
                      error={errors.cardNo?.message}
                      placeholder="0000 0000 0000 0000"
                      value={watch('cardNo')}
                      onChange={handleCardNumberChange}
                    />
                    {isCardBrand && (
                      <Box className="card-brand" display="flex" alignItems="center">
                        {getCardBrandImage(isCardBrand, '40', '40')}
                      </Box>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box mt="32px">
                  <Typography
                    fontSize={theme.fontSize.text16}
                    lineHeight="21px"
                    color={theme.color.gray900}
                  >
                    {paymentMethodList[0].card.cardBrand}
                  </Typography>
                  <Box position="relative" mt="12px">
                    <Typography
                      fontSize={theme.fontSize.text16}
                      color={theme.color.gray700}
                      lineHeight="21px"
                    >
                      {paymentMethodList[0].card.cardNumber.replace(
                        /(\d{4})(\d{2})(\*\*\*\*\*\*)(\d{4})/,
                        '$1 $2** **** $4'
                      )}
                    </Typography>
                    <Box className="card-brand" display="flex" alignItems="center">
                      {getCardBrandImage(
                        payment.fns.cardType(paymentMethodList[0].card.cardNumber),
                        '40',
                        '40'
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
              {isLoading ? (
                <>
                  <Skeleton width={100} height={16} />
                  <Skeleton width={300} height={16} />
                </>
              ) : (
                !paymentMethodList.length && (
                  <Box mt="16px">
                    <Typography
                      fontSize={theme.fontSize.text16}
                      lineHeight="21px"
                      color={theme.color.gray900}
                    >
                      {paymentType === 'personal' ? '생년월일' : '사업자 번호'}
                    </Typography>
                    <Input
                      mt="12px"
                      width="100%"
                      size="l"
                      {...register('cardRrNo', {
                        required:
                          paymentType === 'personal'
                            ? '생년월일을 입력해주세요'
                            : '사업자 번호를 입력해주세요',
                        validate: (value) => {
                          if (paymentType === 'personal') {
                            if (!value || value.length < 6) {
                              return '생년월일을 입력해주세요';
                            }
                          } else {
                            if (!value || value.length < 10) {
                              return '사업자 번호를 입력해주세요';
                            }
                          }
                          return true;
                        }
                      })}
                      error={
                        errors.cardRrNo?.message
                          ? paymentType === 'personal'
                            ? '생년월일을 입력해주세요'
                            : '사업자 번호를 입력해주세요'
                          : ''
                      }
                      value={watch('cardRrNo')}
                      placeholder={paymentType === 'personal' ? 'YYMMDD' : '0000000000'}
                      onChange={handleCardBirthChange}
                    />
                  </Box>
                )
              )}
              {isLoading ? (
                <>
                  <Skeleton width={100} height={16} />
                  <Skeleton width={300} height={16} />
                </>
              ) : (
                !paymentMethodList.length && (
                  <Box mt="16px" display="flex">
                    <Box width="50%" mr="16px">
                      <Typography
                        fontSize={theme.fontSize.text16}
                        lineHeight="21px"
                        color={theme.color.gray900}
                      >
                        유효기간
                      </Typography>
                      <Input
                        mt="12px"
                        width="100%"
                        size="l"
                        {...register('cardExpMonth', {
                          required: '유효기간을 입력해주세요',
                          validate: (value) => {
                            if (!value) {
                              return '유효기간을 입력해주세요';
                            }
                            const newValue = value.split(' / ').join('/');
                            const expiryError = validateExpiryDate(newValue);
                            if (expiryError) {
                              return expiryError;
                            }
                            return true;
                          }
                        })}
                        value={watch('cardExpMonth')}
                        error={errors.cardExpMonth?.message}
                        placeholder="MM / YY"
                        onChange={handleCardExpChange}
                      />
                    </Box>
                    <Box width="50%">
                      <Typography
                        fontSize={theme.fontSize.text16}
                        lineHeight="21px"
                        color={theme.color.gray900}
                      >
                        비밀번호
                      </Typography>
                      <Input
                        mt="12px"
                        width="100%"
                        size="l"
                        type="password"
                        {...register('cardPassword', {
                          required: '비밀번호 앞 2자리를 입력해주세요',
                          validate: (value) => {
                            if (!value) {
                              return '비밀번호 앞 2자리를 입력해주세요';
                            }
                            return true;
                          }
                        })}
                        error={errors.cardPassword?.message}
                        placeholder="앞 2자리"
                        value={watch('cardPassword')}
                        onChange={handleCardPasswordChange}
                      />
                    </Box>
                  </Box>
                )
              )}
              <Button
                mt="32px"
                size="l"
                width="100%"
                onClick={handlePayment}
                disabled={
                  isLoading
                    ? false
                    : paymentMethodList.length
                      ? isSubmitting
                      : !isValid || isSubmitting
                }
              >
                결제
              </Button>
              <Typography
                mt="24px"
                fontSize={theme.fontSize.text14}
                lineHeight="19px"
                color={theme.color.gray500}
              >
                구독을 클릭하면 약관에 따라 향후 결제에 대해 오롯코드에 대금을 청구할 수 있습니다.
                언제든지 구독을 취소할 수 있습니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </PlanCancelWrapper>
    </>
  );
};

export default Protect(PlanPayment);
