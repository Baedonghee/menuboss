/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, CheckBox, Form, Input, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { IBusinessRole, IBusinessRoleCheckKoList } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import styled from 'styled-components';

import { useBusinessActions } from '@/actions/business-actions';
import ModalLayout from '@/components/Layout/Modal';
import { settingRoleList } from '@/models/role';
import { errorToast } from '@/utils/toast';

const SettingsAddRoleWrapper = styled(Box)`
  ul {
    margin-top: 24px;
    li {
      display: flex;
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
      & > div {
        display: flex;
        align-items: center;
        margin-right: 24px;
        &:nth-of-type(1) {
          width: 228px;
          margin-right: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

interface ISettingsAddRole {
  onClose: () => void;
  editRole: IBusinessRole | null;
}

const SettingsAddRole: React.FC<ISettingsAddRole> = ({ onClose, editRole }) => {
  const [editRoleId, setEditRoleId] = useState<number>(-1);
  const {
    register,
    formState: { errors, isValid },
    setValue,
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      role: ''
    }
  });
  const { createRole, updateRole } = useBusinessActions();
  const [roleList, setRoleList] = useState<IBusinessRoleCheckKoList[]>(
    JSON.parse(JSON.stringify(settingRoleList))
  );

  useEffect(() => {
    if (editRole) {
      setEditRoleId(editRole.roleId);
      setValue('role', editRole.name, { shouldValidate: true });
      const editRoleList = [] as IBusinessRoleCheckKoList[];
      settingRoleList.forEach((roles) => {
        const newTypes = [] as {
          name: '보기' | '등록' | '삭제' | '수정';
          value: 'Read' | 'Create' | 'Delete' | 'Edit';
          checked: boolean;
        }[];
        roles.types.forEach((role) => {
          let checked = false;
          editRole.permissions.forEach((permission) => {
            if (roles.nameValue === permission.group && permission.types.includes(role.value)) {
              checked = true;
            }
          });
          newTypes.push({
            name: role.name,
            value: role.value,
            checked
          });
        });
        editRoleList.push({
          name: roles.name,
          nameValue: roles.nameValue,
          types: newTypes
        });
      });

      setRoleList(editRoleList);
    }
  }, [editRole]);

  const handleRoleCheck = (roleName: string, name: string) => {
    const newRoleList = [...roleList];
    const roleIndex = newRoleList.findIndex((role) => role.name === roleName);
    if (roleIndex > -1) {
      const typeIndex = newRoleList[roleIndex].types.findIndex((type) => type.name === name);
      if (typeIndex > -1) {
        newRoleList[roleIndex].types[typeIndex].checked =
          !newRoleList[roleIndex].types[typeIndex].checked;
        setRoleList(newRoleList);
      }
    }
  };

  const onSubmit = handleSubmit(async ({ role }) => {
    try {
      const formData = {
        name: role,
        permissions: roleList.map((roles) => ({
          group: roles.nameValue,
          types: roles.types.filter((role) => role.checked).map((role) => role.value)
        }))
      };
      if (editRoleId === -1) {
        await createRole(formData);
      } else {
        await updateRole(editRoleId, formData);
      }
      onClose();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  });

  return (
    <ModalLayout title="역할" width="620px" onClose={onClose}>
      <SettingsAddRoleWrapper mt="32px">
        <Form title="add role" onSubmit={onSubmit}>
          <Box>
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mb="12px">
              역할 이름
            </Typography>
            <Input
              name="role"
              register={register}
              options={{
                required: '역할 이름을 입력해주세요'
              }}
              error={errors.role?.message}
              width="100%"
              placeholder="역할 이름을 입력해주세요"
            />
          </Box>
          <ul>
            {roleList.map((roles) => (
              <li key={`roles-${roles.name}`}>
                <Typography>{roles.name}</Typography>
                {roles.types.map((role) => (
                  <CheckBox
                    name={`role-${roles.name}-${role.name}`}
                    checked={role.checked}
                    onClick={() => handleRoleCheck(roles.name, role.name)}
                    key={`role-${roles.name}-${role.name}`}
                  >
                    {role.name}
                  </CheckBox>
                ))}
              </li>
            ))}
          </ul>
          <Box display="flex" justifyContent="end" mt="32px">
            <Button mr="16px" color="neutral" variant="outline" width="120px" onClick={onClose}>
              취소
            </Button>
            <Button
              width="120px"
              type="submit"
              disabled={
                !isValid || !roleList.some((roles) => roles.types.some((role) => role.checked))
              }
            >
              저장
            </Button>
          </Box>
        </Form>
      </SettingsAddRoleWrapper>
    </ModalLayout>
  );
};

export default SettingsAddRole;
