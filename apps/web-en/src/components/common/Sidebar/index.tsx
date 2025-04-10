import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import {
  Canvas,
  MediaLine,
  PlayListLine,
  SchedulesLine,
  ScreensLine,
  Settings,
  SidebarLogo
} from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ADMIN_PATH, PATH } from '@/utils/path';

const SidebarWrapper = styled.aside`
  min-width: 220px;
  width: 220px;
  border-right: 1px solid ${({ theme }) => theme.color.gray200};
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.white};
  ul {
    li {
      &.active {
        position: relative;
        background-color: ${({ theme }) => theme.color.primary50};
        &::before {
          position: absolute;
          content: '';
          width: 3px;
          height: 100%;
          left: 0;
          top: 0;
          background: ${({ theme }) => theme.color.primary500};
        }
      }
      a {
        display: flex;
        padding-left: 28px;
        height: 64px;
        align-items: center;
        svg {
          margin-right: 12px;
        }
      }
      &:hover {
        background-color: ${({ theme }) => theme.color.primary50};
        a {
          svg {
            path {
              fill: ${({ theme }) => theme.color.primary400};
            }
            &.canvas-icon {
              path {
                fill: none;
                stroke: ${({ theme }) => theme.color.primary500};
              }
            }
          }
        }
        .menu-title {
          color: ${({ theme }) => theme.color.primary400};
        }
      }
    }
  }
`;

const menuList = [
  {
    title: 'Screens',
    path: ADMIN_PATH.SCREENS,
    active: ADMIN_PATH.SCREENS
  },
  {
    title: 'Schedules',
    path: ADMIN_PATH.SCHEDULES,
    active: ADMIN_PATH.SCHEDULES
  },
  {
    title: 'Playlists',
    path: ADMIN_PATH.PLAYLISTS,
    active: ADMIN_PATH.PLAYLISTS
  },
  {
    title: 'Canvas',
    path: ADMIN_PATH.CANVAS,
    active: ADMIN_PATH.CANVAS
  },
  {
    title: 'Media',
    path: ADMIN_PATH.MEDIA,
    active: ADMIN_PATH.MEDIA
  },
  {
    title: 'Settings',
    path: ADMIN_PATH.SETTINGS_TEAM,
    active: '/settings'
  }
];

const Sidebar: React.FC = () => {
  const { pathname } = useRouter();

  const menuIcon = (key: string, active: boolean) => {
    return {
      Screens: (
        <ScreensLine
          width="24"
          height="24"
          color={active ? theme.color.primary500 : theme.color.gray400}
        />
      ),
      Schedules: (
        <SchedulesLine
          width="24"
          height="24"
          color={active ? theme.color.primary500 : theme.color.gray400}
        />
      ),
      Playlists: (
        <PlayListLine
          width="24"
          height="24"
          color={active ? theme.color.primary500 : theme.color.gray400}
        />
      ),
      Canvas: (
        <Canvas
          width="24"
          height="24"
          color={active ? theme.color.primary500 : theme.color.gray400}
          className="canvas-icon"
        />
      ),
      Media: (
        <MediaLine
          width="24"
          height="24"
          color={active ? theme.color.primary500 : theme.color.gray400}
        />
      ),
      Settings: (
        <Settings
          width="24"
          height="24"
          color={active ? theme.color.primary500 : theme.color.gray400}
        />
      )
    }[key];
  };

  return (
    <SidebarWrapper>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="center"
        height="80px"
        cursor="pointer"
      >
        <Link href={PATH.MAIN}>
          <SidebarLogo width="164" height="28" color={theme.color.primary500} />
        </Link>
      </Box>
      <ul>
        {menuList.map((menu) => {
          const active = pathname.includes(menu.active.replace('/', ''));
          return (
            <li
              key={`menu-${menu.title}`}
              className={classNames({
                active
              })}
            >
              <Link href={menu.path}>
                {menuIcon(menu.title, active)}
                <Typography
                  fontSize="16px"
                  color={active ? theme.color.primary500 : theme.color.gray400}
                  className="menu-title"
                >
                  {menu.title}
                </Typography>
              </Link>
            </li>
          );
        })}
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
