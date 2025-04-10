import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, MoreMenu, Typography } from '@repo/ui/components';
import { Edit, More, Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IBusinessRole } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';

import { useBusinessActions } from '@/actions/business-actions';
import { errorToast } from '@/utils/toast';

interface ISettingRoleItem {
  item?: IBusinessRole;
  index: number;
  handleRoleEdit?: (item: IBusinessRole) => void;
}

const SettingRoleItem: React.FC<ISettingRoleItem> = ({ item, index, handleRoleEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { deleteRole } = useBusinessActions();
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg') {
      return;
    }
    setMenuOpen(false);
  };

  const handleEdit = () => {
    if (item && handleRoleEdit) {
      handleRoleEdit(item);
    }
  };

  const handleScreenDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleShowAlert({
        title: '역할 삭제',
        description: '역할을 삭제하시겠습니까?',
        alertType: 'confirm',
        type: 'error',
        confirmText: '삭제',
        onConfirm: async () => {
          try {
            await deleteRole(item.roleId);
            handleAlertClose();
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };

  const list = [
    {
      icon: <Edit width="20" height="20" color={theme.color.black} />,
      name: '수정',
      color: theme.color.gray900,
      onClick: handleEdit
    },
    {
      icon: <Trash width="20" height="20" color={theme.color.red500} />,
      name: '삭제',
      color: theme.color.red500,
      onClick: handleScreenDelete
    }
  ];

  return (
    <li>
      <div>{index + 1}</div>
      <Box display="flex">
        {item ? (
          <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
            {item.name}
          </Typography>
        ) : (
          <Skeleton width={300} height={40} />
        )}
      </Box>

      <div>{item ? item.updatedDate : <Skeleton width={100} height={33} />}</div>
      <Box display="flex" alignItems="center" position="relative">
        {item && (
          <>
            <More
              width="20"
              height="20"
              color={theme.color.gray500}
              style={{ cursor: 'pointer' }}
              onClick={handleMenuOpen}
            />
            {menuOpen && (
              <MoreMenu
                width="140px"
                top="48px"
                right="30px"
                list={list}
                handleClose={handleMenuClose}
              />
            )}
          </>
        )}
      </Box>
    </li>
  );
};

export default SettingRoleItem;
