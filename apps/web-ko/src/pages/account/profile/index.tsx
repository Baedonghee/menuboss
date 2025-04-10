/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, TabMenu, TitleBox, Typography } from '@repo/ui/components';
import { Avatar, Picture, ViewOff, ViewOn } from '@repo/ui/icons';
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
      phone: ''
    }
  });

  useEffect(() => {
    if (me) {
      reset({
        password: '',
        name: me.profile.name,
        phone: me.profile.phone.phone
          ? formatter.phoneNumberWithInputHyphensKo(`0${me.profile.phone.phone}`)
          : ''
      });
    }
  }, []);

  const handlePasswordUpdate = async () => {
    try {
      const { password } = getValues();
      await updatePassword(password);
      successToast('비밀번호가 변경되었습니다');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleNameUpdate = async () => {
    try {
      const { name } = getValues();
      await updateName(name.trim());
      setValue('name', name.trim(), { shouldValidate: true });
      successToast('이름이 변경되었습니다');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handlePhoneUpdate = async () => {
    try {
      const { phone } = getValues();
      if (!phone) {
        return;
      }
      const phoneNumber = formatter.removePhoneNumberHyphens(phone);
      await updatePhone('KR', '+82', phoneNumber.substring(1, phoneNumber.length));
      successToast('휴대폰 번호가 변경되었습니다');
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleDeleteAccount = () => {
    handleShowAlert({
      title: '탈퇴',
      description:
        '메뉴보스를 탈퇴하시나요? 탈퇴하시면 모든 정보와 데이터가 삭제됩니다. 해당 주의사항을 확인하고 탈퇴를 진행해주세요',
      alertType: 'confirm',
      type: 'error',
      confirmText: '확인',
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
          successToast('내 정보 이미지가 변경되었습니다');
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
      <SeoHead title="내 정보 | MenuBoss" />
      <Layout>
        <TitleBox title="내 정보" />
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
                  이메일
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
                  비밀번호
                </Typography>
                <Box display="flex" mt="12px">
                  <Input
                    type={isPasswordView ? 'text' : 'password'}
                    name="password"
                    register={register}
                    options={{
                      required: '비밀번호를 입력해주세요',
                      pattern: {
                        value: validator.passwordReg,
                        message: '비밀번호는 영문,숫자 포함 8자 이상이어야 합니다'
                      }
                    }}
                    width="720px"
                    mr="12px"
                    size="l"
                    error={errors.password?.message}
                    placeholder="비밀번호를 입력해주세요"
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
                    수정
                  </Button>
                </Box>
                <Box mt="24px">
                  <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                    이름
                  </Typography>
                  <Box display="flex" mt="12px">
                    <Input
                      name="name"
                      register={register}
                      options={{
                        required: '이름을 입력해주세요'
                      }}
                      width="720px"
                      mr="12px"
                      size="l"
                      error={errors.name?.message}
                      placeholder="이름을 입력해주세요"
                    />
                    <Button
                      color="primary"
                      variant="fill"
                      size="l"
                      width="100px"
                      disabled={!!errors.name?.message || !watch('name')}
                      onClick={handleNameUpdate}
                    >
                      수정
                    </Button>
                  </Box>
                </Box>
                <Box mt="24px">
                  <Typography
                    fontSize={theme.fontSize.text16}
                    color={theme.color.gray900}
                    mt="12px"
                  >
                    휴대폰 번호
                  </Typography>
                  <Box display="flex" mt="12px">
                    <Input
                      name="phone"
                      register={register}
                      options={{
                        required: '휴대폰 번호를 입력해주세요',
                        pattern: {
                          value: validator.phoneNumberRegKo,
                          message: '휴대폰 번호 형식이 올바르지 않습니다'
                        }
                      }}
                      width="720px"
                      mr="12px"
                      size="l"
                      error={errors.phone?.message}
                      placeholder="000-0000-0000"
                      onChange={(e) => {
                        const { onChange } = register('phone');
                        const { phone } = getValues();
                        if (e.target.value.length > 13) {
                          e.target.value = phone;
                          onChange(e);
                          return;
                        }
                        let selectStart = e.target.selectionStart;
                        e.target.value = formatter.phoneNumberWithInputHyphensKo(e.target.value);
                        selectStart = formatter.selectRangeKo(
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
                      disabled={!watch('phone') || !!errors.phone?.message}
                      onClick={handlePhoneUpdate}
                    >
                      수정
                    </Button>
                  </Box>
                </Box>
                <Box mt="24px">
                  <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
                    역할
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
                  계정 삭제를 원하신다면 오른쪽의 이용약관을 읽어보시고 계정을 삭제해주시기 바랍니다
                </Typography>
                <Button
                  color="error"
                  variant="outline"
                  size="s"
                  width="104px"
                  borderRadius="100px !important"
                  onClick={handleDeleteAccount}
                >
                  탈퇴하기
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
