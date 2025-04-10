import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, MoreMenu, Typography } from '@repo/ui/components';
import { Avatar, Edit, More, Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IBusinessMember } from '@repo/ui/types';
import { formatter, getCustomErrorMessage } from '@repo/ui/utils';

import { useBusinessActions } from '@/actions/business-actions';
import { errorToast } from '@/utils/toast';

interface ISettingMemberItem {
  item?: IBusinessMember;
  index: number;
  handleMemberEdit?: (item: IBusinessMember) => void;
}

const SettingMemberItem: React.FC<ISettingMemberItem> = ({ item, index, handleMemberEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { deleteMember } = useBusinessActions();
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
    if (item && handleMemberEdit) {
      handleMemberEdit(item);
      setMenuOpen(false);
    }
  };

  const handleScreenDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleShowAlert({
        title: '구성원 삭제',
        description: '해당 구성원을 삭제하시겠습니까?',
        alertType: 'confirm',
        type: 'error',
        confirmText: '삭제',
        onConfirm: async () => {
          try {
            await deleteMember(item.memberId);
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

  console.log(item);

  return (
    <li>
      <div>{index + 1}</div>
      <Box display="flex">
        <Box mr="12px">
          {item ? (
            <Avatar width="32" height="32" color={theme.color.gray400} />
          ) : (
            <Skeleton width={32} height={32} />
          )}
        </Box>
        <Box>
          {item ? (
            <>
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
                {item.name}
              </Typography>
              <Typography
                mt="4px"
                fontSize={theme.fontSize.text12}
                fontWeight={theme.fontWeight.normal}
                color={theme.color.gray500}
              >
                {item.email}
              </Typography>
            </>
          ) : (
            <Skeleton width={300} height={40} />
          )}
        </Box>
      </Box>
      <div>{item ? item.role.name : <Skeleton width={100} height={33} />}</div>
      <div>
        {item ? (
          item.phone.phone ? (
            `0${item.phone.phone}`
          ) : (
            '-'
          )
        ) : (
          <Skeleton width={100} height={33} />
        )}
      </div>
      <div>{item ? item.updatedDate : <Skeleton width={100} height={33} />}</div>
      <Box display="flex" alignItems="center" position="relative">
        {item && !(item.role.name === 'Owner' || item.role.name === '관리자') && (
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

export default SettingMemberItem;
