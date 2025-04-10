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
    right: 21px;
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
      country: {
        value: phoneNumberCountryList[0].value,
        name: phoneNumberCountryList[0].name,
        icon: phoneNumberCountryList[0].icon
      },
      phone: '',
      role: null
    }
  });

  register('country', {
    required: true
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
        country: editMember.phone.phone
          ? {
              value: editMember.phone.country,
              name: editMember.phone.calling,
              icon: <FlagUs width="18" height="12" />
            }
          : null,
        phone: editMember.phone.phone ? editMember.phone.phone : '',
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

  const onSubmit = handleSubmit(async ({ email, name, password, country, phone, role }) => {
    try {
      if (country && role) {
        const formData = {
          email,
          name,
          password,
          country: String(country.value),
          phone: `${country.name} ${formatter.removePhoneNumberHyphens(phone)}`,
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

  const handlePhoneNumberCountry = (item: IOption) => {
    setValue('country', item, { shouldValidate: true });
  };

  const handleMemberRole = (item: IOption) => {
    setValue('role', item, { shouldValidate: true });
  };

  const handlePasswordView = () => {
    setIsPasswordView((prev) => !prev);
  };

  return (
    <ModalLayout title="Team member" width="580px" onClose={onClose}>
      <SettingAddMemberWrapper mt="32px">
        <Form title="add member" onSubmit={onSubmit}>
          <Box mb="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              Email
            </Typography>
            <Input
              name="email"
              register={register}
              options={{
                required: 'Enter email address',
                pattern: {
                  value: validator.emailReg,
                  message: 'Invalid email address'
                }
              }}
              error={errors.email?.message}
              width="100%"
              placeholder="Email address"
            />
          </Box>
          <Box mb="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              Full name
            </Typography>
            <Input
              name="name"
              register={register}
              options={{
                required: 'Enter full name'
              }}
              error={errors.name?.message}
              width="100%"
              placeholder="Full name"
            />
          </Box>
          <Box mb="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              Password
            </Typography>
            <Input
              type={isPasswordView ? 'text' : 'password'}
              name="password"
              register={register}
              options={{
                required: 'Enter password',
                pattern: {
                  value: validator.passwordReg,
                  message: 'Invalid password'
                }
              }}
              error={errors.password?.message}
              width="100%"
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
          </Box>
          <Box mb="16px">
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              Phone number
            </Typography>
            <Box display="flex">
              <Select
                list={phoneNumberCountryList}
                selectOption={watch('country')}
                className="country-select"
                onClick={handlePhoneNumberCountry}
              />
              <Input
                name="phone"
                register={register}
                options={{
                  required: 'Enter phone number',
                  pattern: {
                    value: validator.phoneNumberReg,
                    message: 'Invalid phone number'
                  }
                }}
                error={errors.phone?.message}
                placeholder="000-000-0000"
                width="calc(100% - 132px)"
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
                  selectStart = formatter.selectRange(e.target.value, phone, Number(selectStart));
                  e.target.setSelectionRange(e.target.value.length, selectStart);
                  onChange(e);
                }}
              />
            </Box>
          </Box>
          <Box mb="16px">
            <Box display="flex" alignItems="center" mb="12px" position="relative">
              <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mr="8px">
                Select role
              </Typography>
              <Information
                width="20"
                height="20"
                color={theme.color.gray500}
                className="information-icon"
              />
              <div className="tooltip">
                You can create roles through the Role Settings menu in Settings
              </div>
            </Box>
            <Select
              list={roleList.map((role) => ({
                name: role.name,
                value: role.roleId
              }))}
              placeholder="Please choose a role"
              width="100%"
              onClick={handleMemberRole}
              selectOption={watch('role')}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="32px">
            <Button mr="16px" color="neutral" variant="outline" width="120px" onClick={onClose}>
              Cancel
            </Button>
            <Button width="120px" type="submit" disabled={!isValid}>
              Save
            </Button>
          </Box>
        </Form>
      </SettingAddMemberWrapper>
    </ModalLayout>
  );
};

export default SettingAddMember;
