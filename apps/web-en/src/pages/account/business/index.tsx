/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Select, TabMenu, TitleBox, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { IBusinessAddressForm, IOption } from '@repo/ui/types';
import { delay, formatter, getCustomErrorMessage, validator } from '@repo/ui/utils';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useAuthActions } from '@/actions/auth-action';
import { useBusinessActions } from '@/actions/business-actions';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import { accountTabMenuList } from '@/models/account';
import { countryList, phoneNumberCountryList } from '@/models/country';
import { authUserSelector } from '@/state/auth';
import { errorToast, successToast } from '@/utils/toast';

const AccountBusinessWrapper = styled(Box)`
  .country-select {
    width: 120px;
    margin-right: 12px;
  }
`;

interface IAccountBusinessAddressForm {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: IOption | null;
  phoneCountry: IOption | null;
  postalCode: string;
  phone: string;
}

const AccountBusiness = () => {
  const me = useRecoilValue(authUserSelector);
  const { me: meFetch } = useAuthActions();
  const { updateTitle, updateAddress } = useBusinessActions();
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: ''
    }
  });

  const {
    register: addressRegister,
    getValues: addressGetValues,
    setValue: addressSetValue,
    watch: addressWatch,
    reset: addressReset,
    formState: { errors: addressErrors, isValid: addressIsValid },
    handleSubmit: addressHandleSubmit
  } = useForm<IAccountBusinessAddressForm>({
    mode: 'onChange',
    defaultValues: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: {
        value: countryList[0].value,
        name: countryList[0].name,
        icon: countryList[0].icon
      },
      phoneCountry: {
        value: phoneNumberCountryList[0].value,
        name: phoneNumberCountryList[0].name,
        icon: phoneNumberCountryList[0].icon
      },
      postalCode: '',
      phone: ''
    }
  });

  addressRegister('country', {
    required: 'Country is required'
  });

  addressRegister('phoneCountry', {
    required: 'Country is required'
  });

  useEffect(() => {
    if (me) {
      setValue('title', me.business.title);
      addressReset(
        {
          line1: me.business.address?.line1 || '',
          line2: me.business.address?.line2 || '',
          city: me.business.address?.city || '',
          state: me.business.address?.state || '',
          country: {
            value: me.business.address?.country || countryList[0].value,
            name: me.business.address?.country || countryList[0].name,
            icon: countryList[0].icon
          },
          phoneCountry: {
            value: me.business.phone?.country || phoneNumberCountryList[0].value,
            name: phoneNumberCountryList[0].name,
            icon: phoneNumberCountryList[0].icon
          },
          postalCode: me.business.address?.postalCode,
          phone: me.business.phone?.phone
        },
        {
          keepIsValid: true
        }
      );
    }
  }, []);

  const handleNameUpdate = async () => {
    try {
      const { title } = getValues();
      await updateTitle(title.trim());
      setValue('title', title.trim(), { shouldValidate: true });
      successToast('Name updated successfully');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleCountry = (item: IOption) => {
    addressSetValue('country', item, { shouldValidate: true });
  };

  const handlePhoneNumberCountry = (item: IOption) => {
    addressSetValue('phoneCountry', item, { shouldValidate: true });
  };

  const handleAddressUpdate = addressHandleSubmit(
    async ({ line1, line2, city, state, country, phoneCountry, postalCode, phone }) => {
      try {
        const formData = {
          line1,
          line2,
          city,
          postalCode
        } as IBusinessAddressForm;
        if (country) {
          formData.country = String(country.value);
        }
        if (phoneCountry) {
          formData.phone = `${phoneCountry.name} ${formatter.removePhoneNumberHyphens(phone)}`;
        }
        if (line2) {
          formData.line2 = line2;
        }
        if (state) {
          formData.state = state;
        }
        await updateAddress(formData);
        await delay(1000);
        await meFetch();
        successToast('Address updated successfully');
      } catch (err) {
        errorToast(getCustomErrorMessage(err));
      }
    }
  );

  return (
    <>
      <SeoHead title="Business | MenuBoss" />
      <Layout>
        <TitleBox title="My account" />
        <AccountBusinessWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px">
            <Box pb="24px" borderBottom={`1px solid ${theme.color.gray100}`}>
              <Box>
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  Business Name
                </Typography>
                <Box display="flex" mt="12px">
                  <Input
                    name="title"
                    register={register}
                    options={{
                      required: 'Name is required'
                    }}
                    width="720px"
                    mr="12px"
                    size="l"
                    error={errors.title?.message}
                    placeholder="Business Name"
                  />
                  <Button
                    color="primary"
                    variant="fill"
                    size="l"
                    width="100px"
                    disabled={!!errors.title?.message || !watch('title').trim()}
                    onClick={handleNameUpdate}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
              <Box mt="24px">
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  Address
                </Typography>
                <Box display="flex" mt="12px">
                  <Input
                    name="line1"
                    register={addressRegister}
                    options={{
                      required: 'Address is required'
                    }}
                    width="832px"
                    size="l"
                    error={addressErrors.line1?.message}
                    placeholder="Address"
                  />
                </Box>
                <Box display="flex" mt="12px">
                  <Input
                    name="line2"
                    register={addressRegister}
                    width="832px"
                    size="l"
                    placeholder="Apartment, suite, etc."
                  />
                </Box>
              </Box>
              <Box mt="24px">
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="12px">
                  City
                </Typography>
                <Box display="flex" mt="12px">
                  <Input
                    name="city"
                    register={addressRegister}
                    width="832px"
                    size="l"
                    placeholder="City"
                    options={{
                      required: 'City is required'
                    }}
                    error={addressErrors.city?.message}
                  />
                </Box>
              </Box>
              <Box mt="24px">
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="12px">
                  Region / State
                </Typography>
                <Input
                  name="state"
                  register={addressRegister}
                  width="832px"
                  size="l"
                  placeholder="N/A"
                  mt="12px"
                />
              </Box>
              <Box mt="24px">
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="12px">
                  Postal / Zip code
                </Typography>
                <Input
                  name="postalCode"
                  register={addressRegister}
                  width="832px"
                  size="l"
                  placeholder="Zip / Postal code or Block number"
                  options={{
                    required: 'Zip / Postal code is required'
                  }}
                  error={addressErrors.postalCode?.message}
                  mt="12px"
                  onChange={(e) => {
                    const { onChange } = addressRegister('postalCode');
                    e.target.value = formatter.onlyNumber(e.target.value);
                    onChange(e);
                  }}
                />
              </Box>
              <Box mt="24px">
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  Country
                </Typography>
                <Box display="flex" mt="12px">
                  <Select
                    list={countryList}
                    selectOption={addressWatch('country')}
                    width="832px"
                    onClick={handleCountry}
                    size="l"
                  />
                </Box>
              </Box>
              <Box mt="24px">
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  Phone number
                </Typography>
                <Box display="flex" mt="12px">
                  <Select
                    list={phoneNumberCountryList}
                    selectOption={addressWatch('phoneCountry')}
                    className="country-select"
                    onClick={handlePhoneNumberCountry}
                    size="l"
                  />
                  <Input
                    name="phone"
                    register={addressRegister}
                    width="700px"
                    size="l"
                    placeholder="000-000-0000"
                    options={{
                      required: 'Restaurant Number is required',
                      pattern: {
                        value: validator.phoneNumberReg,
                        message: 'Invalid Restaurant Number'
                      }
                    }}
                    error={addressErrors.phone?.message}
                    onChange={(e) => {
                      const { onChange } = addressRegister('phone');
                      const { phone } = addressGetValues();
                      if (e.target.value.length > 12) {
                        e.target.value = phone;
                        onChange(e);
                        return;
                      }
                      let selectStart = e.target.selectionStart;
                      e.target.value = formatter.phoneNumberWithInputHyphens(e.target.value);
                      selectStart = formatter.selectRange(
                        e.target.value,
                        phone,
                        Number(selectStart)
                      );
                      e.target.setSelectionRange(e.target.value.length, selectStart);
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="842px" mt="24px" display="flex" justifyContent="end">
                  <Button
                    color="primary"
                    variant="fill"
                    size="l"
                    width="100px"
                    onClick={handleAddressUpdate}
                    disabled={!addressIsValid}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </AccountBusinessWrapper>
      </Layout>
    </>
  );
};

export default Protect(AccountBusiness);
