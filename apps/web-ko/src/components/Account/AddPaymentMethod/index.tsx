import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Radio, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import {
  delay,
  formatter,
  getCardBrandImage,
  getCustomErrorMessage,
  validateExpiryDate
} from '@repo/ui/utils';
import creditCardType from 'credit-card-type';
import payment from 'payment';
import styled from 'styled-components';

import { usePaymentActions } from '@/actions/payment-action';
import ModalLayout from '@/components/Layout/Modal';
import { errorToast, successToast } from '@/utils/toast';

const AccountAddPaymentMethodWrapper = styled(Box)`
  .card-number {
    height: 52px;
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    font-size: ${({ theme }) => theme.fontSize.text16};
    color: ${({ theme }) => theme.color.gray900};
    margin-top: 12px;
    &::placeholder {
      color: ${({ theme }) => theme.color.gray400};
    }
    &:focus {
      border: 1px solid ${({ theme }) => theme.color.gray900};
    }
  }
  .StripeElement--invalid {
    border: 1px solid ${({ theme }) => theme.color.red500};
  }
  .card-brand {
    position: absolute;
    top: 6px;
    right: 16px;
  }
`;

interface IAccountAddPaymentMethod {
  onClose: () => void;
  onUpdateList: () => void;
  isEdit: boolean;
}

const AccountAddPaymentMethod: React.FC<IAccountAddPaymentMethod> = ({
  onClose,
  onUpdateList,
  isEdit
}) => {
  const [isCardBrand, setIsCardBrand] = useState('');
  const { postPaymentCard, updatePaymentCard } = usePaymentActions();
  const [paymentType, setPaymentType] = useState<'personal' | 'company'>('personal');
  const {
    register,
    watch,
    reset,
    setValue,
    setError,
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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardNumber = e.target.value;
    const cardNumberLength = cardNumber.split(' ').join('').length;
    if (cardNumberLength > 16) {
      return;
    }
    const cardType = payment.fns.cardType(cardNumber);
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
    setValue('cardNo', formatter.formatCardNumber(cardNumber), {
      shouldValidate: true
    });
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

  const handlePayment = handleSubmit(async ({ cardNo, cardExpMonth, cardPassword, cardRrNo }) => {
    try {
      if (isEdit) {
        await updatePaymentCard({
          cardNo: cardNo.split(' ').join(''),
          cardExpMonth: cardExpMonth.split(' / ').join('/').split('/')[0],
          cardExpYear: cardExpMonth.split(' / ').join('/').split('/')[1],
          cardPassword,
          cardRrNo
        });
      } else {
        await postPaymentCard({
          cardNo: cardNo.split(' ').join(''),
          cardExpMonth: cardExpMonth.split(' / ').join('/').split('/')[0],
          cardExpYear: cardExpMonth.split(' / ').join('/').split('/')[1],
          cardPassword,
          cardRrNo
        });
      }
      onUpdateList();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  });

  return (
    <ModalLayout title="결제" width="580px" onClose={onClose}>
      <AccountAddPaymentMethodWrapper mt="32px">
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
            placeholder={paymentType === 'personal' ? 'YYMMDD' : '- 없이 입력해주세요'}
            value={watch('cardRrNo')}
            onChange={handleCardBirthChange}
          />
        </Box>
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
              value={watch('cardPassword')}
              error={errors.cardPassword?.message}
              placeholder="앞 2자리"
              onChange={handleCardPasswordChange}
            />
          </Box>
        </Box>
        <Box mt="32px" display="flex" justifyContent="end">
          <Button color="neutral" variant="outline" width="120px" mr="12px" onClick={onClose}>
            취소
          </Button>
          <Button width="120px" onClick={handlePayment} disabled={!isValid || isSubmitting}>
            저장
          </Button>
        </Box>
      </AccountAddPaymentMethodWrapper>
    </ModalLayout>
  );
};

export default AccountAddPaymentMethod;
