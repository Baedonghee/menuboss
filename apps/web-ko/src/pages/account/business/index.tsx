/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, TabMenu, TitleBox, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { IBusinessAddressForm } from '@repo/ui/types';
import { formatter, getCustomErrorMessage, validator } from '@repo/ui/utils';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useBusinessActions } from '@/actions/business-actions';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import { accountTabMenuList } from '@/models/account';
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
  postalCode: string;
  phone: string;
}

const AccountBusiness = () => {
  const me = useRecoilValue(authUserSelector);
  const { updateTitle, updateAddress } = useBusinessActions();
  const open = useDaumPostcodePopup();
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
    reset: addressReset,
    formState: { errors: addressErrors, isValid: addressIsValid },
    handleSubmit: addressHandleSubmit
  } = useForm<IAccountBusinessAddressForm>({
    mode: 'onChange',
    defaultValues: {
      postalCode: '',
      line1: '',
      line2: '',
      phone: ''
    }
  });

  useEffect(() => {
    if (me) {
      setValue('title', me.business.title);
      addressReset({
        postalCode: me.business.address?.postalCode || '',
        line1: me.business.address?.line1 || '',
        line2: me.business.address?.line2 || '',
        phone: me.business.phone
          ? formatter.contactWithInputHyphens(`0${me.business.phone.phone}`)
          : ''
      });
    }
  }, []);

  const handleNameUpdate = async () => {
    try {
      const { title } = getValues();
      await updateTitle(title.trim());
      setValue('title', title.trim(), { shouldValidate: true });
      successToast('사업자 이름이 수정되었습니다');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleAddressUpdate = addressHandleSubmit(async ({ line1, line2, postalCode, phone }) => {
    try {
      const formData = {
        line1,
        line2,
        phone: `+82 ${formatter.removePhoneNumberHyphens(phone.substring(0, phone.length))}`,
        postalCode,
        country: 'KR'
      } as IBusinessAddressForm;
      await updateAddress(formData);
      successToast('사업자 주소가 수정되었습니다');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  });

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    addressSetValue('postalCode', data.zonecode, {
      shouldValidate: true
    });
    addressSetValue('line1', fullAddress, {
      shouldValidate: true
    });
  };

  const handleAddressOpen = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <SeoHead title="사업자 | MenuBoss" />
      <Layout>
        <TitleBox title="내 정보" />
        <AccountBusinessWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px">
            <Box pb="24px" borderBottom={`1px solid ${theme.color.gray100}`}>
              <Box>
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  사업자 이름
                </Typography>
                <Box display="flex" mt="12px">
                  <Input
                    name="title"
                    register={register}
                    options={{
                      required: '사업자 이름을 입력해주세요'
                    }}
                    width="720px"
                    mr="12px"
                    size="l"
                    error={errors.title?.message}
                    placeholder="사업자 이름을 입력해주세요"
                  />
                  <Button
                    color="primary"
                    variant="fill"
                    size="l"
                    width="100px"
                    disabled={!!errors.title?.message || !watch('title').trim()}
                    onClick={handleNameUpdate}
                  >
                    수정
                  </Button>
                </Box>
              </Box>
              <Box mt="24px">
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  주소
                </Typography>
                <Box display="flex" mt="12px">
                  <Input
                    name="postalCode"
                    register={addressRegister}
                    options={{
                      required: true
                    }}
                    width="720px"
                    size="l"
                    placeholder="우편번호"
                    mr="12px"
                    disabled
                  />
                  <Button
                    color="primary"
                    variant="fill"
                    size="l"
                    width="100px"
                    onClick={handleAddressOpen}
                  >
                    검색
                  </Button>
                </Box>
                <Box display="flex" mt="12px">
                  <Input
                    name="line1"
                    register={addressRegister}
                    options={{
                      required: true
                    }}
                    width="832px"
                    size="l"
                    placeholder="주소"
                    disabled
                  />
                </Box>
                <Box display="flex" mt="12px">
                  <Input
                    name="line2"
                    register={addressRegister}
                    width="832px"
                    size="l"
                    placeholder="상세주소를 입력해주세요"
                  />
                </Box>
              </Box>
              <Box mt="24px">
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                  전화번호
                </Typography>
                <Box display="flex" mt="12px">
                  <Input
                    name="phone"
                    register={addressRegister}
                    width="832px"
                    size="l"
                    placeholder="000-0000-0000"
                    options={{
                      required: '전화번호를 입력해주세요',
                      pattern: {
                        value: validator.contactRegKo,
                        message: '전화번호 형식이 올바르지 않습니다'
                      }
                    }}
                    error={addressErrors.phone?.message}
                    onChange={(e) => {
                      const { onChange } = addressRegister('phone');
                      const { phone } = addressGetValues();
                      if (
                        (e.target.value.startsWith('02') || !e.target.value.startsWith('010')) &&
                        !e.target.value.startsWith('070') &&
                        e.target.value.length > 12
                      ) {
                        e.target.value = phone;
                        onChange(e);
                        return;
                      }
                      if (!e.target.value.startsWith('02') && e.target.value.length > 13) {
                        e.target.value = phone;
                        onChange(e);
                        return;
                      }
                      let selectStart = e.target.selectionStart;
                      e.target.value = formatter.contactWithInputHyphens(e.target.value);
                      selectStart = formatter.selectRangeKo(
                        e.target.value,
                        phone,
                        Number(selectStart)
                      );
                      e.target.setSelectionRange(e.target.value.length, selectStart);
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="832px" mt="24px" display="flex" justifyContent="end">
                  <Button
                    color="primary"
                    variant="fill"
                    size="l"
                    width="100px"
                    onClick={handleAddressUpdate}
                    disabled={!addressIsValid}
                  >
                    수정
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
