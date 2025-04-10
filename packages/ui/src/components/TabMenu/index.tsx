import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ITabMenuList } from '../../types';

const TabMenuWrapper = styled.ul`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  li {
    font-size: ${({ theme }) => theme.fontSize.text18};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    color: ${({ theme }) => theme.color.gray400};
    padding-bottom: 8px;
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      color: ${({ theme }) => theme.color.gray900};
      border-bottom: 2px solid ${({ theme }) => theme.color.gray900};
    }
  }
`;

interface ITabMenu {
  list: ITabMenuList[];
}

const TabMenu: React.FC<ITabMenu> = ({ list }) => {
  const { pathname } = useRouter();

  return (
    <TabMenuWrapper>
      {list.map((item, index) => (
        <li key={`tab-menu-${index}`} className={classNames({ active: pathname === item.path })}>
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </TabMenuWrapper>
  );
};

export default TabMenu;
