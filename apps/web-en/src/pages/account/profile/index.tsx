/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Select, TabMenu, TitleBox, Typography } from '@repo/ui/components';
import { Avatar, FlagUs, Picture, ViewOff, ViewOn } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IApi, IOption } from '@repo/ui/types';
import { formatter, getCustomErrorMessage, validator } from '@repo/ui/utils';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useMeActions } from '@/actions/me-actions';
import fileApi from '@/api/client/file.json';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import { accountTabMenuList } from '@/models/account';
import { phoneNumberCountryList } from '@/models/country';
import { authUserSelector } from '@/state/auth';
import fileAxios from '@/utils/client/file-axios';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast, successToast } from '@/utils/toast';

const AccountProfileWrapper = styled(Box)`
  .image-box {
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.color.gray200};
    }
    .camera {
      position: absolute;
      bottom: 0;
      left: 72px;
      width: 28px;
      height: 28px;
      background-color: ${({ theme }) => theme.color.gray600};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;

interface IFormValues {
  password: string;
  name: string;
  country: IOption | null;
  phone: string;
}

const AccountProfile = () => {
  const { updatePassword, updateName, updatePhone, updateProfileImage } = useMeActions();
  const me = useRecoilValue(authUserSelector);
  const [isPasswordView, setIsPasswordView] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();
  const {
    register,
    getValues,
    getFieldState,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<IFormValues>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      name: '',
      country: {
        value: phoneNumberCountryList[0].value,
        name: phoneNumberCountryList[0].name,
        icon: phoneNumberCountryList[0].icon
      },
      phone: ''
    }
  });

  useEffect(() => {
    if (me) {
      reset({
        password: '',
        name: me.profile.name,
        country: me.profile.phone.phone
          ? {
              value: me.profile.phone.country,
              name: me.profile.phone.calling,
              icon: <FlagUs width="18" height="12" />
            }
          : {
              value: phoneNumberCountryList[0].value,
              name: phoneNumberCountryList[0].name,
              icon: phoneNumberCountryList[0].icon
            },
        phone: me.profile.phone.phone
          ? formatter.phoneNumberWithInputHyphens(me.profile.phone.phone)
          : ''
      });
    }
  }, []);

  const handlePhoneNumberCountry = (item: IOption) => {
    setValue('country', item, { shouldValidate: true });
  };

  const handlePasswordUpdate = async () => {
    try {
      const { password } = getValues();
      await updatePassword(password);
      successToast('Password updated successfully');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleNameUpdate = async () => {
    try {
      const { name } = getValues();
      await updateName(name.trim());
      setValue('name', name.trim(), { shouldValidate: true });
      successToast('Name updated successfully');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handlePhoneUpdate = async () => {
    try {
      const { country, phone } = getValues();
      if (!country || !phone) {
        return;
      }
      const phoneNumber = formatter.removePhoneNumberHyphens(phone);
      await updatePhone(country.value, country.name, phoneNumber);
      successToast('Phone number updated successfully');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleDeleteAccount = () => {
    handleShowAlert({
      title: 'Delete account',
      description: 'Are you sure you want to delete your account?',
      alertType: 'confirm',
      type: 'error',
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          router.push(ADMIN_PATH.ACCOUNT_BYE);
          handleAlertClose();
        } catch (err) {
          errorToast(getCustomErrorMessage(err));
        }
      }
    });
  };

  const handleImageUpdateInput = () => {
    ref.current?.click();
  };

  const handleImageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && me) {
        const token = atob(me.authorization.accessToken);
        const {
          data: { status, data, message }
        }: AxiosResponse<IApi<{ imageId: number }>> = await fileAxios.post(
          fileApi.profileImage,
          {
            file: e.target.files[0]
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-User-Id': me.memberId,
              Authorization: `Bearer ${token}`,
              'x-Device-Model': window.navigator.userAgent
            }
          }
        );
        if (status === 200) {
          await updateProfileImage(data.imageId);
          successToast('Profile image updated successfully');
        } else {
          errorToast(message);
        }
      }
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    } finally {
      e.target.value = '';
    }
  };

  const handlePasswordView = () => {
    setIsPasswordView((prev) => !prev);
  };

  return (
    <>
      <SeoHead title="Profile | MenuBoss" />
      <Layout>
        <TitleBox title="My account" />
        <AccountProfileWrapper mt="32px">
          <TabMenu list={accountTabMenuList} />
          <Box mt="32px">
            <Box display="flex" pb="24px" borderBottom={`1px solid ${theme.color.gray100}`}>
              <Box>
                <Box position="relative" className="image-box" display="flex">
                  {me?.profile.imageUrl ? (
                    <img src={me.profile.imageUrl} alt={me.profile.name} />
                  ) : (
                    <Avatar width="100" height="100" color={theme.color.gray400} />
                  )}
                  <Box className="camera" onClick={handleImageUpdateInput}>
                    <Picture width="16" height="16" color={theme.color.white} />
                  </Box>
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    ref={ref}
                    onChange={handleImageUpdate}
                  />
                </Box>
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="24px">
                  Email
                </Typography>
                <Typography
                  fontSize={theme.fontSize.text16}
                  fontWeight={theme.fontWeight.normal}
                  color={theme.color.gray500}
                  mt="12px"
                >
                  {me?.email || ''}
                </Typography>
                <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="24px">
                  Password
                </Typography>
                <Box display="flex" mt="12px">
                  <Input
                    type={isPasswordView ? 'text' : 'password'}
                    name="password"
                    register={register}
                    options={{
                      required: 'Password is required',
                      pattern: {
                        value: validator.passwordReg,
                        message: 'Invalid password'
                      }
                    }}
                    width="720px"
                    mr="12px"
                    size="l"
                    error={errors.password?.message}
                    placeholder="Password"
                    iconAlign="right"
                    icon={
                      isPasswordView ? (
                        <ViewOff
                          width="20"
                          height="20"
                          color={theme.color.gray600}
                          onClick={handlePasswordView}
                        />
                      ) : (
                        <ViewOn
                          width="20"
                          height="20"
                          color={theme.color.gray600}
                          onClick={handlePasswordView}
                        />
                      )
                    }
                  />
                  <Button
                    color="primary"
                    variant="fill"
                    size="l"
                    width="100px"
                    disabled={!!errors.password?.message || !getFieldState('password').isDirty}
                    onClick={handlePasswordUpdate}
                  >
                    Update
                  </Button>
                </Box>
                <Box mt="24px">
                  <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                    Full name
                  </Typography>
                  <Box display="flex" mt="12px">
                    <Input
                      name="name"
                      register={register}
                      options={{
                        required: 'Full name is required'
                      }}
                      width="720px"
                      mr="12px"
                      size="l"
                      error={errors.name?.message}
                      placeholder="Full name"
                    />
                    <Button
                      color="primary"
                      variant="fill"
                      size="l"
                      width="100px"
                      disabled={!!errors.name?.message || !watch('name')}
                      onClick={handleNameUpdate}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
                <Box mt="24px">
                  <Typography
                    fontSize={theme.fontSize.text16}
                    color={theme.color.gray900}
                    mt="12px"
                  >
                    Phone number
                  </Typography>
                  <Box display="flex" mt="12px">
                    <Select
                      list={phoneNumberCountryList}
                      selectOption={watch('country')}
                      className="country-select"
                      onClick={handlePhoneNumberCountry}
                      width="120px"
                      mr="12px"
                    />
                    <Input
                      name="phone"
                      register={register}
                      options={{
                        required: 'Phone is required',
                        pattern: {
                          value: validator.phoneNumberReg,
                          message: 'Invalid phone number'
                        }
                      }}
                      width="588px"
                      mr="12px"
                      size="l"
                      error={errors.phone?.message}
                      placeholder="000-000-0000"
                      onChange={(e) => {
                        const { onChange } = register('phone');
                        const { phone } = getValues();
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
                    <Button
                      color="primary"
                      variant="fill"
                      size="l"
                      width="100px"
                      disabled={!watch('country') || !watch('phone') || !!errors.phone?.message}
                      onClick={handlePhoneUpdate}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
                <Box mt="24px">
                  <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                    Role
                  </Typography>
                  <Typography
                    fontSize={theme.fontSize.text16}
                    color={theme.color.gray500}
                    mt="12px"
                  >
                    {me?.business.role || ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" pb="24px" mt="24px">
              <Box display="flex" alignItems="center">
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500} mr="24px">
                  If you want to delete the account, please read the terms and conditions on the
                  right and delete the account
                </Typography>
                <Button
                  color="error"
                  variant="outline"
                  size="s"
                  width="134px"
                  borderRadius="100px !important"
                  onClick={handleDeleteAccount}
                >
                  Delete account
                </Button>
              </Box>
            </Box>
          </Box>
        </AccountProfileWrapper>
      </Layout>
    </>
  );
};

export default Protect(AccountProfile);
