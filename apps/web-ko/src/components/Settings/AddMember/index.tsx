/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Select, Typography } from '@repo/ui/components';
import { FlagUs, Information, ViewOff, ViewOn } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IBusinessMember, IOption } from '@repo/ui/types';
import { formatter, getCustomErrorMessage, validator } from '@repo/ui/utils';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useBusinessActions } from '@/actions/business-actions';
import ModalLayout from '@/components/Layout/Modal';
import { phoneNumberCountryList } from '@/models/country';
import { businessMemberRoleListSelector } from '@/state/business';
import { errorToast } from '@/utils/toast';

const SettingAddMemberWrapper = styled(Box)`
  .country-select {
    width: 120px;
    margin-right: 12px;
  }
  .information-icon {
    cursor: pointer;
    &:hover + .tooltip {
      visibility: visible;
    }
  }
  .tooltip {
    visibility: hidden;
    position: absolute;
    top: 32px;
    left: 65px;
    background-color: ${({ theme }) => theme.color.gray900};
    color: ${({ theme }) => theme.color.white};
    border-radius: 4px;
    padding: 4px 8px;
    font-size: ${({ theme }) => theme.fontSize.text14};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    z-index: 1;
    &::after {
      content: ' ';
      position: absolute;
      border-style: solid;
      border-width: 5px;
      bottom: 100%;
      left: 7px;
      border-color: transparent transparent ${({ theme }) => theme.color.gray900} transparent;
    }
  }
`;

interface ISettingAddMember {
  onClose: () => void;
  editMember: IBusinessMember | null;
}

interface IFormValues {
  email: string;
  name: string;
  password: string;
  country: IOption | null;
  phone: string;
  role: IOption | null;
}

const SettingAddMember: React.FC<ISettingAddMember> = ({ onClose, editMember }) => {
  const [editMemberId, setEditMemberId] = useState<number>(-1);
  const { getMemberRoleList, createMember, updateMember } = useBusinessActions();
  const roleList = useRecoilValue(businessMemberRoleListSelector);
  const [isPasswordView, setIsPasswordView] = useState(false);

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
    getValues,
    handleSubmit
  } = useForm<IFormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phone: '',
      role: null
    }
  });

  register('role', {
    required: true
  });

  useEffect(() => {
    if (editMember) {
      setEditMemberId(editMember.memberId);
      reset({
        email: editMember.email,
        name: editMember.name,
        password: '',
        phone: editMember.phone.phone
          ? formatter.phoneNumberWithInputHyphensKo(`0${editMember.phone.phone}`)
          : '',
        role: null
      });
    }
  }, [editMember]);

  useEffect(() => {
    fetchMemberRoleList();
  }, []);

  const fetchMemberRoleList = async () => {
    try {
      await getMemberRoleList();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const onSubmit = handleSubmit(async ({ email, name, password, phone, role }) => {
    try {
      if (role) {
        const formData = {
          email,
          name,
          password,
          country: 'KR',
          phone: `+82 ${formatter.removePhoneNumberHyphens(phone.substring(1, phone.length))}`,
          roleId: Number(role.value)
        };
        if (editMemberId === -1) {
          await createMember(formData);
        } else {
          await updateMember(editMemberId, formData);
        }
        onClose();
      }
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  });

  const handleMemberRole = (item: IOption) => {
    setValue('role', item, { shouldValidate: true });
  };

  const handlePasswordView = () => {
    setIsPasswordView((prev) => !prev);
  };

  return (
    <ModalLayout title="구성원" width="580px" onClose={onClose}>
      <SettingAddMemberWrapper mt="32px">
        <Form title="add member" onSubmit={onSubmit}>
          <Box mb="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              이메일
            </Typography>
            <Input
              name="email"
              register={register}
              options={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: validator.emailReg,
                  message: '이메일 형식이 올바르지 않습니다'
                }
              }}
              error={errors.email?.message}
              width="100%"
              placeholder="이메일을 입력해주세요"
            />
          </Box>
          <Box mb="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              이름
            </Typography>
            <Input
              name="name"
              register={register}
              options={{
                required: '이름을 입력해주세요'
              }}
              error={errors.name?.message}
              width="100%"
              placeholder="이름을 입력해주세요"
            />
          </Box>
          <Box mb="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              비밀번호
            </Typography>
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
              error={errors.password?.message}
              width="100%"
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
          </Box>
          <Box mb="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              휴대폰 번호
            </Typography>
            <Box display="flex">
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
                error={errors.phone?.message}
                placeholder="000-0000-0000"
                width="100%"
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
                  selectStart = formatter.selectRangeKo(e.target.value, phone, Number(selectStart));
                  e.target.setSelectionRange(e.target.value.length, selectStart);
                  onChange(e);
                }}
              />
            </Box>
          </Box>
          <Box mb="16px">
            <Box display="flex" alignItems="center" mb="12px" position="relative">
              <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mr="8px">
                역할 선택
              </Typography>
              <Information
                width="20"
                height="20"
                color={theme.color.gray500}
                className="information-icon"
              />
              <div className="tooltip">설정의 역할 메뉴를 통해 역할을 생성할 수 있습니다</div>
            </Box>
            <Select
              list={roleList.map((role) => ({
                name: role.name,
                value: role.roleId
              }))}
              placeholder="역할을 선택해주세요"
              width="100%"
              onClick={handleMemberRole}
              selectOption={watch('role')}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="32px">
            <Button mr="16px" color="neutral" variant="outline" width="120px" onClick={onClose}>
              취소
            </Button>
            <Button width="120px" type="submit" disabled={!isValid}>
              저장
            </Button>
          </Box>
        </Form>
      </SettingAddMemberWrapper>
    </ModalLayout>
  );
};

export default SettingAddMember;
