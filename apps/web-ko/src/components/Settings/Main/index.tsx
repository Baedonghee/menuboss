/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Empty,
  ModalContainer,
  TabMenu,
  TitleBox,
  Typography
} from '@repo/ui/components';
import { AddTeamMember, NewRolesSettings, PlusFill } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IBusinessMember, IBusinessRole } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useBusinessActions } from '@/actions/business-actions';
import Pagination from '@/components/common/Pagination';
import Layout from '@/components/Layout';
import SettingAddMember from '@/components/Settings/AddMember';
import SettingsAddRole from '@/components/Settings/AddRole';
import SettingMemberItem from '@/components/Settings/MemberItem';
import SettingRoleItem from '@/components/Settings/RoleItem';
import { skeletonList } from '@/models/skeleton';
import {
  businessMemberListSelector,
  businessMemberLoadingSelector,
  businessMemberPageSelector,
  businessRoleListSelector,
  businessRoleLoadingSelector
} from '@/state/business';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const SettingsMainWrapper = styled(Box)`
  ul.member-list {
    margin-top: 24px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    border-radius: 8px;
    & > li {
      display: flex;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      &.header {
        border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
        height: 44px;
        color: ${({ theme }) => theme.color.gray700};
        font-size: ${({ theme }) => theme.fontSize.text14};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        & > div {
          height: 44px;
        }
      }
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 64px;
        color: ${({ theme }) => theme.color.gray900};
        font-size: ${({ theme }) => theme.fontSize.text14};
        &:nth-of-type(1) {
          width: 60px;
          color: ${({ theme }) => theme.color.gray700};
          font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
        &:nth-of-type(2) {
          width: calc(100% - 732px);
          justify-content: start;
          padding-left: 16px;
        }
        &:nth-of-type(3) {
          width: 200px;
        }
        &:nth-of-type(4) {
          width: 200px;
        }
        &:nth-of-type(5) {
          width: 200px;
        }
        &:nth-of-type(6) {
          width: 72px;
        }
      }
    }
  }
  ul.role-list {
    margin-top: 24px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    border-radius: 8px;
    & > li {
      display: flex;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      &.header {
        border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
        height: 44px;
        color: ${({ theme }) => theme.color.gray700};
        font-size: ${({ theme }) => theme.fontSize.text14};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        & > div {
          height: 44px;
        }
      }
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 64px;
        color: ${({ theme }) => theme.color.gray900};
        font-size: ${({ theme }) => theme.fontSize.text14};
        &:nth-of-type(1) {
          width: 60px;
          color: ${({ theme }) => theme.color.gray700};
          font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
        &:nth-of-type(2) {
          width: calc(100% - 332px);
          justify-content: start;
          padding-left: 16px;
        }
        &:nth-of-type(3) {
          width: 200px;
        }
        &:nth-of-type(4) {
          width: 72px;
        }
      }
    }
  }
`;

const tabMenuList = [
  {
    name: '구성원',
    path: ADMIN_PATH.SETTINGS_TEAM
  },
  {
    name: '역할',
    path: ADMIN_PATH.SETTINGS_ROLES
  }
];

const SettingsMain = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const [editMember, setEditMember] = useState<IBusinessMember | null>(null);
  const [editRole, setEditRole] = useState<IBusinessRole | null>(null);
  const { getMemberList, getRoleList } = useBusinessActions();
  const [isSettingAddMemberOpen, setIsSettingAddMemberOpen] = useState(false);
  const [isSettingAddRoleOpen, setIsSettingAddRoleOpen] = useState(false);
  const memberList = useRecoilValue(businessMemberListSelector);
  const memberLoading = useRecoilValue(businessMemberLoadingSelector);
  const memberPage = useRecoilValue(businessMemberPageSelector);
  const roleList = useRecoilValue(businessRoleListSelector);
  const roleLoading = useRecoilValue(businessRoleLoadingSelector);

  useEffect(() => {
    if (pathname === ADMIN_PATH.SETTINGS_TEAM) {
      fetchMemberList();
    } else {
      fetchRoleList();
    }
  }, [query.menu]);

  const fetchMemberList = async () => {
    try {
      await getMemberList(query);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const fetchRoleList = async () => {
    try {
      await getRoleList();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleAddMemberAndRole = () => {
    if (pathname === ADMIN_PATH.SETTINGS_TEAM) {
      setIsSettingAddMemberOpen(true);
    } else {
      setIsSettingAddRoleOpen(true);
    }
  };

  const handleCloseAddMember = () => {
    setIsSettingAddMemberOpen(false);
    setEditMember(null);
  };

  const handleMemberEdit = (item: IBusinessMember) => {
    setEditMember(item);
    setIsSettingAddMemberOpen(true);
  };

  const handleRoleEdit = (item: IBusinessRole) => {
    setEditRole(item);
    setIsSettingAddRoleOpen(true);
  };

  const handleCloseAddRole = () => {
    setIsSettingAddRoleOpen(false);
    setEditRole(null);
  };

  return (
    <Layout>
      {isSettingAddRoleOpen && (
        <ModalContainer onClose={handleCloseAddRole}>
          <SettingsAddRole onClose={handleCloseAddRole} editRole={editRole} />
        </ModalContainer>
      )}
      {isSettingAddMemberOpen && (
        <ModalContainer onClose={handleCloseAddMember}>
          <SettingAddMember onClose={handleCloseAddMember} editMember={editMember} />
        </ModalContainer>
      )}
      <TitleBox title="설정" />
      <SettingsMainWrapper mt="32px">
        <TabMenu list={tabMenuList} />
        <Box mt="32px">
          <Box display="flex" alignItems="center" justifyContent="end">
            <Button
              color="primary"
              variant="fill"
              size="m"
              borderRadius="100px"
              width="140px"
              onClick={handleAddMemberAndRole}
            >
              <PlusFill width="20" height="20" color={theme.color.white} />
              {pathname === ADMIN_PATH.SETTINGS_TEAM ? '구성원 추가' : '역할 추가'}
            </Button>
          </Box>
          {pathname === ADMIN_PATH.SETTINGS_TEAM ? (
            <>
              {(memberLoading || !!memberList.length) && (
                <ul className="member-list">
                  <li className="header">
                    <div>No.</div>
                    <div>이름</div>
                    <div>역할</div>
                    <div>휴대폰 번호</div>
                    <div>수정일</div>
                    <div />
                  </li>
                  {memberLoading
                    ? skeletonList.map((_, index) => (
                        <SettingMemberItem key={`skeleton-${index}`} index={index} />
                      ))
                    : memberList.map((item, index) => (
                        <SettingMemberItem
                          key={`member-${item.memberId}`}
                          item={item}
                          index={index}
                          handleMemberEdit={handleMemberEdit}
                        />
                      ))}
                </ul>
              )}
              {!memberLoading && !memberList.length && (
                <Empty
                  icon={<AddTeamMember width="68" height="68" color={theme.color.gray400} />}
                  text="현재 저장된 구성원이 없습니다<br/>구성원을 추가하여 만들어주세요"
                />
              )}
            </>
          ) : (
            <>
              {(roleLoading || !!roleList.length) && (
                <ul className="role-list">
                  <li className="header">
                    <div>No.</div>
                    <div>이름</div>
                    <div>수정일</div>
                    <div />
                  </li>
                  {roleLoading
                    ? skeletonList.map((_, index) => (
                        <SettingRoleItem key={`skeleton-${index}`} index={index} />
                      ))
                    : roleList.map((item, index) => (
                        <SettingRoleItem
                          key={`member-${item.roleId}`}
                          item={item}
                          index={index}
                          handleRoleEdit={handleRoleEdit}
                        />
                      ))}
                </ul>
              )}
              {!roleLoading && !roleList.length && (
                <Empty
                  icon={<NewRolesSettings width="68" height="68" color={theme.color.gray400} />}
                  text="현재 저장된 구성원이 없습니다<br/>구성원을 추가하여 만들어주세요"
                />
              )}
            </>
          )}
        </Box>
        {memberPage && memberPage.totalPages !== 1 && (
          <Box mt="32px">
            <Pagination totalPage={memberPage.totalPages} />
          </Box>
        )}
      </SettingsMainWrapper>
    </Layout>
  );
};

export default SettingsMain;
