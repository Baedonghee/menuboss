import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { getCardBrandImage, getCustomErrorMessage } from '@repo/ui/utils';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { PaymentMethodResult, StripeCardNumberElementChangeEvent } from '@stripe/stripe-js';
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
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }
`;

interface IAccountAddPaymentMethod {
  onClose: () => void;
}

const AccountAddPaymentMethod: React.FC<IAccountAddPaymentMethod> = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCardBrand, setIsCardBrand] = useState('');
  const { createPaymentMethod } = usePaymentActions();
  const {
    register,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = getValues();
    if (!stripe || !elements) {
      errorToast('Card is invalid');
      return;
    }
    const card = elements.getElement(CardNumberElement);
    if (card === null) {
      errorToast('Card is invalid');
      return;
    }
    if (!name) {
      errorToast('Name is required');
      return;
    }
    try {
      const payload: PaymentMethodResult = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {
          name
        }
      });
      if (payload.error) {
        errorToast(payload.error.message);
        return;
      }
      await createPaymentMethod(payload.paymentMethod.id);
      successToast('Add payment method successfully');
      onClose();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleCardNumberChange = (e: StripeCardNumberElementChangeEvent) => {
    if (e.brand === 'unknown') {
      setIsCardBrand('');
      return;
    } else {
      setIsCardBrand(e.brand);
    }
  };

  return (
    <ModalLayout title="Payment method" width="580px" onClose={onClose}>
      <AccountAddPaymentMethodWrapper mt="32px">
        <Form title="add payment" onSubmit={handleSubmit}>
          <Box>
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
              Card holder name
            </Typography>
            <Input
              name="name"
              register={register}
              width="100%"
              options={{
                required: 'Name is required'
              }}
              placeholder="Card holder name"
              error={errors.name?.message}
              mt="12px"
              size="l"
            />
          </Box>
          <Box mt="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
              Card number
            </Typography>
            <Box position="relative">
              <CardNumberElement
                className="card-number"
                onChange={handleCardNumberChange}
                options={{
                  placeholder: 'Card number',
                  style: {
                    base: {
                      fontFamily:
                        '"Manrope","Segoe UI","Tahoma","Arial","Helvetica Neue",sans-serif',
                      fontSize: theme.fontSize.text16,
                      color: theme.color.gray900,
                      '::placeholder': {
                        color: theme.color.gray400
                      }
                    },
                    invalid: {
                      color: theme.color.red500
                    }
                  }
                }}
              />
              {isCardBrand && (
                <Box className="card-brand" display="flex" alignItems="center">
                  {getCardBrandImage(isCardBrand, '40', '40')}
                </Box>
              )}
            </Box>
          </Box>
          <Box mt="16px" display="flex">
            <Box width="50%" mr="12px">
              <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                Expiry code
              </Typography>
              <CardExpiryElement
                className="card-number"
                options={{
                  placeholder: 'Expiry code',
                  style: {
                    base: {
                      fontFamily:
                        '"Manrope","Segoe UI","Tahoma","Arial","Helvetica Neue",sans-serif',
                      fontSize: theme.fontSize.text16,
                      color: theme.color.gray900,
                      '::placeholder': {
                        color: theme.color.gray400
                      }
                    },
                    invalid: {
                      color: theme.color.red500
                    }
                  }
                }}
              />
            </Box>
            <Box width="50%">
              <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                Security code
              </Typography>
              <CardCvcElement
                className="card-number"
                options={{
                  placeholder: 'Security code',
                  style: {
                    base: {
                      fontFamily:
                        '"Manrope","Segoe UI","Tahoma","Arial","Helvetica Neue",sans-serif',
                      fontSize: theme.fontSize.text16,
                      color: theme.color.gray900,
                      '::placeholder': {
                        color: theme.color.gray400
                      }
                    },
                    invalid: {
                      color: theme.color.red500
                    }
                  }
                }}
              />
            </Box>
          </Box>
          <Box mt="32px" display="flex" justifyContent="end">
            <Button color="neutral" variant="outline" width="120px" mr="12px" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" width="120px">
              Save
            </Button>
          </Box>
        </Form>
      </AccountAddPaymentMethodWrapper>
    </ModalLayout>
  );
};

export default AccountAddPaymentMethod;
