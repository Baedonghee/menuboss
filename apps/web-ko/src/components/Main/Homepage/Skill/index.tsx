import React, { useState } from 'react';
import { Box, Button, Image, Typography } from '@repo/ui/components';
import { AppStore, GooglePlayStore } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import classNames from 'classnames';
import styled from 'styled-components';

import SkillMenuView from './MenuView';

const HomepageSkillWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    .container {
      padding: 80px 24px;
      margin: 0;
      width: 100%;
      .title {
        font-size: ${({ theme }) => theme.fontSize.text24};
        line-height: 31px;
      }
      .description {
        margin-top: 12px;
        font-size: ${({ theme }) => theme.fontSize.text16};
        line-height: 21px;
      }
      ul.menu-list {
        margin-top: 48px;
        flex-wrap: wrap;
        li {
          margin-right: 16px;
          margin-bottom: 16px;
          &:nth-last-child(-n + 2) {
            margin-bottom: 0;
          }
        }
      }
      .menu-view {
        margin-top: 48px;
      }
      .manual {
        display: block;
        flex-direction: row;
        .image-wrapper {
          margin-right: 0;
          img {
            width: 100% !important;
          }
        }
        .manual-box {
          width: 100%;
          margin-top: 40px;
          text-align: center;
          .manual-title {
            font-size: ${({ theme }) => theme.fontSize.text12};
          }
          .manual-subtitle {
            margin-top: 4px;
            font-size: ${({ theme }) => theme.fontSize.text20};
            line-height: 26px;
          }
          .manual-desc {
            margin-top: 12px;
            font-size: ${({ theme }) => theme.fontSize.text14};
            line-height: 19px;
          }
          .manual-button-wrapper {
            margin-top: 24px;
            display: flex;
            justify-content: center;
            button {
              width: 165px;
            }
          }
        }
      }
    }
  }

  ul.menu-list {
    margin-top: 64px;
    display: flex;
    justify-content: center;
    li {
      padding: 10px 12px;
      border-radius: 100px;
      border: 1px solid ${({ theme }) => theme.color.primary500};
      color: ${({ theme }) => theme.color.primary500};
      margin-right: 20px;
      font-size: ${({ theme }) => theme.fontSize.text14};
      line-height: 19px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.active,
      &:hover {
        background-color: ${({ theme }) => theme.color.primary500};
        color: ${({ theme }) => theme.color.white};
      }
    }
  }
  .menu-view {
    video {
      width: 720px;
      height: 450px;
    }
  }
`;

const menuList = [
  {
    name: 'TV 연결',
    value: 'tv',
    description: [
      'TV앱 다운 - 구글 플레이 스토어 [메뉴보스 TV - 디지털 메뉴판]',
      'QR코드 또는 PIN 번호를 입력해주세요',
      'On, Off 로 실시간 실시간 TV 상태를 확인하고 관리할 수 있습니다',
      'TV에 적용된 시간표, 재생목록을 살펴볼 수 있습니다'
    ],
    video: '/videos/tutorial/screen.mp4'
  },
  {
    name: '시간표 만들기',
    value: 'schedules',
    description: [
      '시간표 추가 (기본설정은 시간 설정 및 삭제가 불가합니다)',
      '등록한 재생목록을 선택하고 시간을 설정합니다',
      '완성된 시간표는 [TV 적용] 버튼을 눌러 TV를 선택하고 연결합니다',
      'TV 메뉴에서 상태 및 적용된 시간표를 볼 수 있습니다'
    ],
    video: '/videos/tutorial/schedule.mp4'
  },
  {
    name: '재생목록 만들기',
    value: 'playlists',
    description: [
      '재생목록 추가 (동영상은 시간 설정이 불가합니다)',
      '등록한 콘텐츠의 순서를 정렬하고 시간을 설정합니다',
      '옵션을 통해 TV 화면에 적용할 모습을 설정할 수 있습니다',
      '완성된 재생목록은 [TV 적용] 버튼을 눌러 TV를 선택하고 연결합니다',
      'TV 메뉴에서 상태 및 적용된 재생목록을 볼 수 있습니다'
    ],
    video: '/videos/tutorial/playlist.mp4'
  },
  {
    name: '캔버스 제작',
    value: 'canvas',
    description: [
      '업로드한 이미지, 동영상으로 직접 디자인을 만들 수 있습니다',
      '프리미엄 템플릿을 사용해 전문적인 디자인을 제작할 수 있습니다',
      '[미리보기] 기능으로 TV에 적용하기 전 미리 화면을 볼 수 있습니다',
      '제작한 템플릿은 시간표, 재생목록에 추가하여 사용할 수 있습니다'
    ],
    video: '/videos/tutorial/canvas.mp4'
  },
  {
    name: '구성원 추가 및 역할설정',
    value: 'settings',
    description: [
      '설정에서 구성원을 추가하여 관리할 수 있습니다',
      '각 구성원에게 역할을 부여해 구성원마다 권한을 설정할 수 있습니다',
      '역할 설정을 통해 체계적으로 구성원을 관리할 수 있습니다'
    ],
    video: '/videos/tutorial/team.mp4'
  }
];

const HomepageSkill = () => {
  const [activeMenu, setActiveMenu] = useState(menuList[0].value);

  const handleClickMenu = (value: string) => {
    setActiveMenu(value);
  };

  return (
    <HomepageSkillWrapper>
      <Box className="container" width="1320px" margin="100px auto">
        <Typography
          fontSize="40px"
          fontWeight={theme.fontWeight.semiBold}
          textAlign="center"
          lineHeight="49px"
          color={theme.color.gray900}
          className="title"
        >
          메뉴보스 이렇게 사용해보세요
        </Typography>
        <Typography
          fontSize={theme.fontSize.text20}
          color={theme.color.gray700}
          lineHeight="26px"
          mt="16px"
          textAlign="center"
          className="description"
        >
          TV / 시간표 / 재생목록 그리고 디자인 편집 기능 캔버스를 통해 나만의 디지털 메뉴판을 제작할
          수 있습니다
        </Typography>
        <ul className="menu-list">
          {menuList.map((menu) => (
            <li
              key={`menu-${menu.value}`}
              className={classNames({ active: activeMenu === menu.value })}
              onClick={() => handleClickMenu(menu.value)}
            >
              {menu.name}
            </li>
          ))}
        </ul>
        <Box className="menu-view" mt="64px">
          {menuList.map((menu) => {
            if (menu.value === activeMenu) {
              return (
                <SkillMenuView
                  key={`menu-view-${menu.value}`}
                  activeMenu={activeMenu}
                  menu={menu}
                />
              );
            }
            return null;
          })}
        </Box>
      </Box>
      <Box className="container" width="1320px" margin="100px auto">
        <Typography
          fontSize="40px"
          fontWeight={theme.fontWeight.semiBold}
          lineHeight="49px"
          textAlign="center"
          className="title"
        >
          메뉴보스 하나면 충분합니다
        </Typography>
        <Typography
          fontSize={theme.fontSize.text20}
          fontWeight={theme.fontWeight.semiBold}
          lineHeight="26px"
          mt="16px"
          textAlign="center"
          color={theme.color.gray700}
          className="description"
        >
          TV 연결부터, 나만의 디지털 메뉴판 제작까지 모두 한 곳에서
        </Typography>
        <Box display="flex" mt="120px" alignItems="center" className="manual">
          <Box display="flex" mr="120px" className="image-wrapper">
            <Image width={600} height={375} src="/images/main/skill-tv.png" alt="skill tv" />
          </Box>
          <Box className="manual-box">
            <Typography
              fontSize={theme.fontSize.text16}
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="21px"
              color={theme.color.gray900}
              className="manual-title"
            >
              TV
            </Typography>
            <Typography
              mt="8px"
              fontSize="32px"
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="40px"
              color={theme.color.gray900}
              className="manual-subtitle"
            >
              쉽고 간편한 TV 연결
            </Typography>
            <Typography
              mt="24px"
              fontSize={theme.fontSize.text18}
              lineHeight="23px"
              color={theme.color.gray900}
              className="manual-desc"
            >
              TV 앱을 통해 메뉴보스의 웹과 모바일 서비스를
              <br />
              쉽고 간편하게 연결할 수 있습니다
            </Typography>
            <Box className="manual-button-wrapper" mt="32px">
              <a
                href="https://play.google.com/store/apps/details?id=com.orot.menuboss_tv_kr"
                target="_blank"
                rel="noreferrer"
              >
                <Button width="180px" size="m" variant="outline">
                  <GooglePlayStore width="20" height="20" />
                  구글 플레이 스토어
                </Button>
              </a>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          mt="120px"
          alignItems="center"
          flexDirection="row-reverse"
          justifyContent="start"
          className="manual"
        >
          <Box display="flex" className="image-wrapper">
            <Image
              width={600}
              height={375}
              src="/images/main/skill-schedule.png"
              alt="skill schedule"
            />
          </Box>
          <Box width="600px" mr="120px" className="manual-box">
            <Typography
              fontSize={theme.fontSize.text16}
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="21px"
              color={theme.color.gray900}
              className="manual-title"
            >
              SCHEDULE & PLAYLIST
            </Typography>
            <Typography
              mt="8px"
              fontSize="32px"
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="40px"
              color={theme.color.gray900}
              className="manual-subtitle"
            >
              나만의 시간표 & 재생목록
            </Typography>
            <Typography
              mt="24px"
              fontSize={theme.fontSize.text18}
              lineHeight="23px"
              color={theme.color.gray900}
              className="manual-desc"
            >
              시간대별로 원하는 내용의 시간표를 제작하고, <br className="mobile-hide" />
              다양한 콘텐츠를 바탕으로 목록의 순서를 정렬하여 시간을 설정할 수 있습니다
            </Typography>
          </Box>
        </Box>
        <Box display="flex" mt="120px" alignItems="center" className="manual">
          <Box display="flex" mr="120px" className="image-wrapper">
            <Image width={600} height={375} src="/images/main/skill-canvas.png" alt="skill tv" />
          </Box>
          <Box className="manual-box">
            <Typography
              fontSize={theme.fontSize.text16}
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="21px"
              color={theme.color.gray900}
              className="manual-title"
            >
              CANVAS
            </Typography>
            <Typography
              mt="8px"
              fontSize="32px"
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="40px"
              color={theme.color.gray900}
              className="manual-subtitle"
            >
              디자인 편집 기능 캔버스
            </Typography>
            <Typography
              mt="24px"
              fontSize={theme.fontSize.text18}
              lineHeight="23px"
              color={theme.color.gray900}
              className="manual-desc"
            >
              내가 원하는 디지털 메뉴판을 직접 제작하거나
              <br />
              프리미엄 템플릿을 이용해 만들 수 있습니다
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          mt="120px"
          alignItems="center"
          flexDirection="row-reverse"
          justifyContent="start"
          className="manual"
        >
          <Box display="flex" className="image-wrapper">
            <Image
              width={600}
              height={375}
              src="/images/main/skill-mobile.png"
              alt="skill schedule"
            />
          </Box>
          <Box width="600px" mr="120px" className="manual-box">
            <Typography
              fontSize={theme.fontSize.text16}
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="21px"
              color={theme.color.gray900}
              className="manual-title"
            >
              MOBILE APP
            </Typography>
            <Typography
              mt="8px"
              fontSize="32px"
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="40px"
              color={theme.color.gray900}
              className="manual-subtitle"
            >
              모바일 앱 서비스까지!
            </Typography>
            <Typography
              mt="24px"
              fontSize={theme.fontSize.text18}
              lineHeight="23px"
              color={theme.color.gray900}
              className="manual-desc"
            >
              메뉴보스 웹 서비스뿐만 아니라 모바일 앱을 통해
              <br />
              실시간으로 디지털 메뉴판을 관리할 수 있습니다
            </Typography>
            <Box mt="40px" display="flex" className="manual-button-wrapper">
              <a
                href="https://play.google.com/store/apps/details?id=com.orot.menuboss.kr&pli=1"
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: '12px' }}
              >
                <Button width="180px" size="m" variant="outline">
                  <GooglePlayStore width="24" height="24" />
                  구글 플레이 스토어
                </Button>
              </a>
              <a
                href="https://apps.apple.com/us/app/%EB%A9%94%EB%89%B4%EB%B3%B4%EC%8A%A4-%EB%94%94%EC%A7%80%ED%84%B8-%EB%A9%94%EB%89%B4%ED%8C%90/id6475026803"
                target="_blank"
                rel="noreferrer"
              >
                <Button width="180px" size="m" variant="outline">
                  <AppStore width="24" height="24" />앱 스토어
                </Button>
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </HomepageSkillWrapper>
  );
};

export default HomepageSkill;
