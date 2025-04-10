import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

const TutorialDescriptionWrapper = styled(Box)`
  video {
    width: 100%;
  }
  ul {
    margin-top: 8px;
    list-style: disc;
    padding-left: 16px;
    li {
      font-size: ${({ theme }) => theme.fontSize.text14};
      line-height: 19px;
      color: ${({ theme }) => theme.color.gray700};
    }
  }
`;

interface ITutorialDescription {
  item: {
    name: string;
    value: string;
    title: string;
    description: string;
    options: string[];
    video: string;
  };
}

const TutorialDescription: React.FC<ITutorialDescription> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // activeMenu가 변경될 때 비디오 초기화 로직을 수행합니다.
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.load();
      videoElement.play();
    }
  }, [item]);

  return (
    <TutorialDescriptionWrapper>
      <video autoPlay muted loop playsInline ref={videoRef}>
        <source src={item.video} type="video/mp4" />
      </video>
      <Typography
        mt="24px"
        fontSize={theme.fontSize.text16}
        fontWeight={theme.fontWeight.semiBold}
        color={theme.color.gray900}
        lineHeight="21px"
      >
        {item.title}
      </Typography>
      <Typography
        mt="12px"
        fontSize={theme.fontSize.text14}
        lineHeight="19px"
        color={theme.color.gray700}
      >
        {item.description}
      </Typography>
      <ul>
        {item.options.map((option, index) => (
          <li key={`option-${index}`}>{option}</li>
        ))}
      </ul>
    </TutorialDescriptionWrapper>
  );
};

export default TutorialDescription;
