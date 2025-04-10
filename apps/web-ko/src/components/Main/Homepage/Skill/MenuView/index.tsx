import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

const SkillMenuViewWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    video {
      width: 100% !important;
      height: auto !important;
    }
    .description-list {
      margin-top: 24px;
      .description-index {
        width: 20px;
        height: 20px;
        font-size: ${({ theme }) => theme.fontSize.text12};
      }
      .description-desc {
        width: calc(100% - 32px);
        font-size: ${({ theme }) => theme.fontSize.text14};
        line-height: 19px;
      }
    }
  }
`;

interface ISkillMenuView {
  activeMenu: string;
  menu: {
    name: string;
    value: string;
    description: string[];
    video: string;
  };
}

const SkillMenuView: React.FC<ISkillMenuView> = ({ activeMenu, menu }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // activeMenu가 변경될 때 비디오 초기화 로직을 수행합니다.
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.load();
      videoElement.play();
    }
  }, []);

  return (
    <SkillMenuViewWrapper
      display={activeMenu === menu.value ? 'flex' : 'none'}
      justifyContent="space-between"
      alignItems="center"
    >
      <video autoPlay muted loop playsInline ref={videoRef}>
        <source src={menu.video} type="video/mp4" />
      </video>
      <Box className="description-list">
        {menu.description.map((desc, index) => (
          <Box
            display="flex"
            alignItems="center"
            key={`menu-view-${menu.name}-${index}`}
            mb={desc.length === index - 1 ? '0px' : '24px'}
          >
            <Box
              display="flex"
              width="24px"
              height="24px"
              borderRadius="50%"
              backgroundColor={theme.color.primary500}
              color={theme.color.white}
              justifyContent="center"
              alignItems="center"
              fontSize={theme.fontSize.text14}
              mr="12px"
              lineHeight="10px"
              className="description-index"
            >
              {index + 1}
            </Box>
            <Typography
              fontSize={theme.fontSize.text18}
              lineHeight="23px"
              color={theme.color.gray900}
              className="description-desc"
            >
              {desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </SkillMenuViewWrapper>
  );
};

export default SkillMenuView;
