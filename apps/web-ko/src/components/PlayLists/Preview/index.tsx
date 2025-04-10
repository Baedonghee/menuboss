/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@repo/ui/components';
import {
  CloseLine,
  Fill,
  Fit,
  HorizontalLine,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Stretch
} from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IPreviewList } from '@repo/ui/types';
import classNames from 'classnames';
import styled from 'styled-components';

import PreviewProgress from '../PreviewProgress';

const PreviewContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  z-index: 9999;
  overflow-y: auto;
  .wire-frame-wrapper {
    /* aspect-ratio: 16/9;
    &.vertical {
      aspect-ratio: 9/16;
    } */
    &:hover {
      .play-button {
        opacity: 1;
      }
    }
    .play-button {
      transition: opacity 0.5s ease-in-out; /* 전환 효과 적용 */
      opacity: 0;
      svg {
        cursor: pointer;
      }
    }
  }
  ul {
    display: flex;
    justify-content: center;
    width: 100%;
    li {
      width: 25%;
      height: 4px;
      border-radius: 2px;
      background-color: ${({ theme }) => theme.color.gray800};
      margin-right: 4px;
      & > div {
        background: rgb(255, 255, 255);
        height: 100%;
        max-width: 100%;
        border-radius: 2px;
        transform-origin: left center;
        backface-visibility: hidden;
        perspective: 1000px;
        width: 100%;
        border-radius: 2px;
        /* transform: scaleX(0.3); */
      }
    }
  }

  img,
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out; /* 전환 효과 적용 */
    &.fit {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

interface IPreview {
  list: IPreviewList[];
  onClose: () => void;
  settingAlign: 'horizontal' | 'vertical';
  settingOption: 'fill' | 'fit' | 'stretch';
  language?: 'en' | 'ko';
}

const animationSteps = 100; // 60개의 단계로 나누어 애니메이션 실행
const stepSize = 1 / animationSteps;

const Preview: React.FC<IPreview> = ({
  list,
  onClose,
  settingAlign,
  settingOption,
  language = 'en'
}) => {
  const [align, setAlign] = useState<'horizontal' | 'vertical'>(settingAlign); // horizontal, vertical
  const [option, setOption] = useState<'fill' | 'fit' | 'stretch'>(settingOption); // fill, fit, stretch
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingValue = useRef<boolean>(false);
  const currentImageIndex = useRef<number>(0);
  const animationInterval = useRef<any>(null);
  const videoRef = useRef<RefObject<HTMLVideoElement>[]>(list.map(() => React.createRef()));

  const [scaleX, setScaleX] = useState(0); // 초기 scaleX 값 설정
  const scaleXValue = useRef<number>(0);
  const currentStep = useRef<number>(0);
  const [_, setReRendering] = useState(false);

  useEffect(() => {
    handleResize(align);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => handleResize(align));
    return () => {
      window.removeEventListener('resize', () => handleResize(align));
    };
  }, [align]);

  const handleResize = (type: 'horizontal' | 'vertical') => {
    const wireFrame = document.getElementById('wireFrame');

    if (wireFrame) {
      if (type === 'horizontal') {
        const newHeight = wireFrame.clientHeight; // 새로운 높이를 가져옴
        const newWidth = newHeight * (16 / 9); // 새로운 가로넓이 계산
        wireFrame.style.width = `${newWidth}px`; // 가로넓이를 설정
      } else {
        const newHeight = wireFrame.clientHeight; // 새로운 높이를 가져옴
        const newWidth = newHeight * (9 / 16); // 새로운 가로넓이 계산
        wireFrame.style.width = `${newWidth}px`; // 가로넓이를 설정
      }
    }
  };

  const handleAnimation = () => {
    if (currentImageIndex.current < list.length) {
      const currentImage = list[currentImageIndex.current];

      // 현재 이미지의 애니메이션을 설정
      const intervalDuration = currentImage.duration / animationSteps;
      if (scaleXValue.current === 0 && videoRef.current[currentImageIndex.current].current) {
        (videoRef.current[currentImageIndex.current].current as HTMLVideoElement).currentTime = 0;
      }
      if (currentImage.videoUrl && isPlayingValue.current) {
        videoRef.current[currentImageIndex.current].current?.play();
      }
      animationInterval.current = setInterval(() => {
        currentStep.current++;
        if (currentStep.current <= animationSteps) {
          const newScaleX = currentStep.current * stepSize;
          setScaleX(newScaleX);
          scaleXValue.current = newScaleX;
        } else {
          // 애니메이션 종료
          clearInterval(animationInterval.current);

          // 현재 이미지가 마지막 이미지가 아니라면 다음 이미지로 이동
          if (currentImageIndex.current < list.length - 1) {
            if (currentImage.videoUrl && videoRef.current[currentImageIndex.current].current) {
              (
                videoRef.current[currentImageIndex.current].current as HTMLVideoElement
              ).currentTime = 0;
              (videoRef.current[currentImageIndex.current].current as HTMLVideoElement).pause();
            }
            currentImageIndex.current++;

            // 다음 이미지의 애니메이션을 설정
            const nextImage = list[currentImageIndex.current];
            const nextIntervalDuration = nextImage.duration / animationSteps;
            currentStep.current = 0;
            setTimeout(() => {
              handleAnimation(); // 재귀적으로 다음 이미지의 애니메이션 시작
            }, nextIntervalDuration);
          } else {
            currentImageIndex.current = 0;
            const nextImage = list[0];
            const nextIntervalDuration = nextImage.duration / animationSteps;
            currentStep.current = 0;
            setTimeout(() => {
              handleAnimation(); // 재귀적으로 다음 이미지의 애니메이션 시작
            }, nextIntervalDuration);
          }
        }
      }, intervalDuration);
    }
  };

  const handleStart = () => {
    if (videoRef.current[currentImageIndex.current].current) {
      videoRef.current[currentImageIndex.current].current?.play();
    }
    setIsPlaying(true);
    isPlayingValue.current = true;
    handleAnimation();
  };

  const handlePause = () => {
    if (videoRef.current[currentImageIndex.current].current) {
      videoRef.current[currentImageIndex.current].current?.pause();
    }
    setIsPlaying(false);
    isPlayingValue.current = false;
    clearInterval(animationInterval.current);
  };

  const handleNext = () => {
    setReRendering((prev) => !prev);
    clearInterval(animationInterval.current);
    currentStep.current = 0;
    if (currentImageIndex.current < list.length - 1) {
      currentImageIndex.current++;
    } else {
      currentImageIndex.current = 0;
    }
    if (videoRef.current[currentImageIndex.current].current) {
      (videoRef.current[currentImageIndex.current].current as HTMLVideoElement).currentTime = 0;
    }
    if (isPlaying) {
      handleAnimation();
      return;
    }
    setScaleX(0);
    scaleXValue.current = 0;
  };

  const handlePrevious = () => {
    setReRendering((prev) => !prev);
    clearInterval(animationInterval.current);
    currentStep.current = 0;
    if (currentImageIndex.current > 0) {
      currentImageIndex.current--;
    } else {
      currentImageIndex.current = list.length - 1;
    }
    if (videoRef.current[currentImageIndex.current].current) {
      (videoRef.current[currentImageIndex.current].current as HTMLVideoElement).currentTime = 0;
    }
    if (isPlaying) {
      handleAnimation();
      return;
    }
    setScaleX(0);
    scaleXValue.current = 0;
  };

  const handleAlign = (type: 'horizontal' | 'vertical') => {
    setAlign(type);
    handleResize(type);
  };

  const handleOption = (type: 'fill' | 'fit' | 'stretch') => {
    setOption(type);
  };

  const handleResourcePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handleStart();
    }
  };

  return (
    <PreviewContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="80px"
        p="0px 32px"
      >
        <Typography
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.white}
        >
          {language === 'en' ? 'Preview' : '미리보기'}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box
            display="flex"
            alignItems="center"
            mr="24px"
            pr="24px"
            borderRight={`1px solid ${theme.color.white}`}
          >
            <Box
              textAlign="center"
              mr="16px"
              width="60px"
              height="42px"
              onClick={() => handleAlign('horizontal')}
              cursor="pointer"
            >
              <HorizontalLine
                width="24"
                height="24"
                color={align === 'horizontal' ? theme.color.white : theme.color.gray500}
              />
              <Typography
                fontSize={theme.fontSize.text12}
                color={align === 'horizontal' ? theme.color.white : theme.color.gray500}
              >
                {language === 'en' ? 'Horizontal' : '가로'}
              </Typography>
            </Box>
            <Box
              textAlign="center"
              width="60px"
              height="42px"
              onClick={() => handleAlign('vertical')}
              cursor="pointer"
            >
              <HorizontalLine
                width="24"
                height="24"
                color={align === 'vertical' ? theme.color.white : theme.color.gray500}
                style={{ transform: 'rotate(90deg)' }}
              />
              <Typography
                fontSize={theme.fontSize.text12}
                color={align === 'vertical' ? theme.color.white : theme.color.gray500}
              >
                {language === 'en' ? 'Vertical' : '세로'}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              textAlign="center"
              mr="16px"
              width="60px"
              height="42px"
              onClick={() => handleOption('fill')}
              cursor="pointer"
            >
              <Fill
                width="24"
                height="24"
                color={option === 'fill' ? theme.color.white : theme.color.gray500}
                fill={option === 'fill' ? theme.color.white : theme.color.gray500}
              />
              <Typography
                fontSize={theme.fontSize.text12}
                color={option === 'fill' ? theme.color.white : theme.color.gray500}
              >
                {language === 'en' ? 'Fill' : '채우기'}
              </Typography>
            </Box>
            <Box
              textAlign="center"
              width="60px"
              height="42px"
              onClick={() => handleOption('fit')}
              cursor="pointer"
              mr="16px"
            >
              <Fit
                width="24"
                height="24"
                color={option === 'fit' ? theme.color.white : theme.color.gray500}
              />
              <Typography
                fontSize={theme.fontSize.text12}
                color={option === 'fit' ? theme.color.white : theme.color.gray500}
              >
                {language === 'en' ? 'Fit' : '맞추기'}
              </Typography>
            </Box>
            <Box
              textAlign="center"
              width="60px"
              height="42px"
              onClick={() => handleOption('stretch')}
              cursor="pointer"
            >
              <Stretch
                width="24"
                height="24"
                color={option === 'stretch' ? theme.color.white : theme.color.gray500}
              />
              <Typography
                fontSize={theme.fontSize.text12}
                color={option === 'stretch' ? theme.color.white : theme.color.gray500}
              >
                {language === 'en' ? 'Stretch' : '늘리기'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CloseLine
          width="24"
          height="24"
          color={theme.color.white}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
      </Box>
      <Box display="flex" height="calc(100% - 160px)" justifyContent="center" p="72px 0px">
        <Box
          id="wireFrame"
          className={classNames('wire-frame-wrapper', { vertical: align === 'vertical' })}
        >
          <Box
            width="100%"
            height="100%"
            m="auto"
            border={`8px solid ${theme.color.gray800}`}
            position="relative"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              backgroundColor="rgba(0, 0, 0, 0.2)"
              zIndex={2}
              className="play-button"
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                display="flex"
                alignItems="center"
                justifyItems="center"
                gap="60px"
                zIndex={1}
              >
                <SkipBack
                  width="32"
                  height="32"
                  color={theme.color.white}
                  onClick={handlePrevious}
                />
                {isPlaying ? (
                  <Pause width="64" height="64" color={theme.color.white} onClick={handlePause} />
                ) : (
                  <Play width="64" height="64" color={theme.color.white} onClick={handleStart} />
                )}
                <SkipForward
                  width="32"
                  height="32"
                  color={theme.color.white}
                  onClick={handleNext}
                />
              </Box>
            </Box>
            <Box
              position="relative"
              width="100%"
              height="100%"
              overflow="hidden"
              onClick={handleResourcePlay}
            >
              {list.map((item, index) => {
                if (item.imageUrl) {
                  return (
                    <img
                      src={item.imageUrl}
                      key={`image-${index}`}
                      style={{
                        opacity: currentImageIndex.current === index ? 1 : 0,
                        objectFit:
                          option === 'fill' ? 'cover' : option === 'fit' ? 'contain' : 'fill'
                      }}
                      alt={`image-${index}`}
                      className={classNames({ fit: option === 'fit' })}
                    />
                  );
                }
                return (
                  <video
                    ref={videoRef.current[index]}
                    key={`video-${index}`}
                    src={item.videoUrl}
                    style={{
                      opacity: currentImageIndex.current === index ? 1 : 0,
                      objectFit: option === 'fill' ? 'cover' : option === 'fit' ? 'contain' : 'fill'
                    }}
                    muted
                    loop
                    className={classNames({ fit: option === 'fit' })}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        width="720px"
        display="flex"
        height="80px"
        alignItems="center"
        justifyContent="center"
        m="0 auto"
      >
        <ul>
          {list.map((item, index) => (
            <PreviewProgress
              key={index}
              scaleX={
                currentImageIndex.current > index
                  ? 1
                  : currentImageIndex.current === index
                    ? scaleX
                    : 0
              }
              width={100 / list.length}
            />
          ))}
        </ul>
      </Box>
    </PreviewContainer>
  );
};

export default Preview;
