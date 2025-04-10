import React, { useEffect, useState } from 'react';
import { Box, Button, CheckBox, Typography } from '@repo/ui/components';
import { CloseRound } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import TutorialDescription from './Description';

const TutorialWrapper = styled(Box)`
  border-radius: 12px;
  box-shadow:
    4px 0px 8px 0px rgba(0, 0, 0, 0.1),
    0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  .check-box {
    &:hover,
    &.active {
      background-color: ${({ theme }) => theme.color.gray50};
    }
  }
`;

const sidebarList = [
  {
    name: 'TV 화면 설정',
    value: 'screen',
    title: 'TV 화면 설정',
    description:
      'TV 화면 사용을 위해 구글 플레이 스토어에서 [MenuBossTV - Digital Signage All in one Service]를 다운받고 TV 에서 해당 어플을 실행해주세요. [TV추가] 버튼을 클릭하고, TV화면에 보이는 PIN 번호를 입력해주세요',
    options: [
      'TV 화면 이름 표시를 기능을 통해 여러대의 TV 구분이 어려운 경우, 더보기 아이콘을 클릭해 [TV 화면에 이름을 표시]를 선택하면 해당 TV를 구분할 수 있습니다'
    ],
    video: '/videos/tutorial/screen.mp4'
  },
  {
    name: '시간표 추가',
    value: 'schedule',
    title: '시간표 추가',
    description:
      '시간표 생성을 통해 시간마다 보여지는 화면을 다르게 설정하여 디지털 메뉴판을 사용할 수 있습니다. 기본 / 아침 / 점심 / 저녁과 같이 예시를 바탕으로 재생목록을 추가하여 직접 시간표를 만들 수 있습니다.',
    options: [
      '시간표를 생성하고 만들 때는 플러스 버튼을 누른 뒤 1. [재생목록 추가] 2. 해당 시간표의 시간을 설정합니다',
      '기본 설정인 24시간 옵션을 제외하고 나머지 재생목록은 시간 중복 설정이 불가합니다'
    ],
    video: '/videos/tutorial/schedule.mp4'
  },
  {
    name: '재생목록 추가',
    value: 'playlist',
    title: '재생목록 추가',
    description: `재생목록은 원하는 콘텐츠 정렬과 시간 설정을 통해 나만의 디지털 메뉴판 제작이 가능합니다. 옵션을 통해 디지털 메뉴판의 [가로 / 세로] 와 [채우기 / 맞추기 / 늘리기] 설정이 가능합니다`,
    options: [
      '해당 재생목록을 완성하기 전에 미리보기가 가능합니다(미리보기에서도 옵션 설정이 가능합니다)',
      '콘텐츠 순서를 변경 및 정렬하고 시간을 설정할 수 있습니다. 비디오는 시간 설정이 불가합니다'
    ],
    video: '/videos/tutorial/playlist.mp4'
  },
  {
    name: '캔버스 추가',
    value: 'canvas',
    title: '캔버스 추가',
    description:
      '캔버스는 다양한 템플릿을 사용하거나 나의 이미지, 동영상 파일을 이용하여 나만의 디지털 메뉴판을 제작할 수 있습니다. 미리보기를 통해 화면의 가로 / 세로 가 적용된 모습을 미리 볼 수 있습니다',
    options: [
      '이미지와 비디오를 업로드 하여 나만의 개성있는 디지털 메뉴판을 만들 수 있습니다',
      '제작된 캔버스는 시간표, 재생목록에 추가하여 디지털 메뉴판으로 사용할 수 있습니다'
    ],
    video: '/videos/tutorial/canvas.mp4'
  },
  {
    name: '파일 업로드',
    value: 'media',
    title: '파일 업로드',
    description:
      '보관함 메뉴에서는 나의 이미지, 동영상 파일을 업로드하거나, 상단의 [새 폴더] 버튼을 통해 폴더 생성이 가능합니다. 또한 더보기를 통해 파일을 삭제하거나 다른 폴더로 이동할 수 있습니다',
    options: [
      '이름순 또는 최신, 과거순으로 폴더의 순서를 정렬할 수 있습니다',
      '폴더안에 폴더 생성은 불가합니다'
    ],
    video: '/videos/tutorial/media.mp4'
  },
  {
    name: '구성원 추가',
    value: 'team',
    title: '구성원 추가',
    description: `구성원 추가를 통해 다양한 구성원들과 함께 나의 매장을 관리할 수 있습니다. 해당 구성원의 정보를 입력한 뒤 역할을 선택하고, 구성원을 만들어 나의 매장을 손 쉽게 관리해보세요`,
    options: [
      '구성원 추가를 통해 매장 내의 구성원을 손쉽게 관리할 수 있습니다',
      '구성원 역할을 설정하여 해당 구성원 개개인의 권한을 부여할 수 있습니다'
    ],
    video: '/videos/tutorial/team.mp4'
  },
  {
    name: '역할 추가',
    value: 'role',
    title: '역할 추가',
    description:
      '역할을 생성하여 구성원 개개인의 역할을 설정할 수 있습니다. 각각의 메뉴에 해당하는 권한을 설정할 수 있고, 해당 구성원의 권한을 통해 매장을 바탕으로 관리할 수 있습니다',
    options: [
      '역할의 이름을 설정한 뒤 구성원에서 권한을 부여할 수 있습니다',
      'TV / 시간표 / 재생목록 / 캔버스 / 보관함 / 구성원 / 역할 옵션의 상세 권한을 설정할 수 있습니다'
    ],
    video: '/videos/tutorial/role.mp4'
  },
  {
    name: '설정 & 내 정보',
    value: 'setting',
    title: '설정 & 내 정보',
    description:
      '설정 & 내 정보에서는 정보를 수정하거나 설정할 수 있습니다. 설정에서는 [구성원 / 역할]을 통해 구성원을 관리 할 수 있습니다. 내 정보에서는 나의 [프로필 / 사업자 정보 / 요금제 / 청구서 / 결제수단]을 설정하고 살펴볼 수 있습니다',
    options: [
      '설정은 왼쪽 메뉴를 통해 설정할 수 있습니다',
      '내 정보는 상단 오른쪽 나의 프로필 옆의 화살표를 클릭하여 내 정보를 설정할 수 있습니다'
    ],
    video: '/videos/tutorial/setting.mp4'
  }
];

interface ITutorial {
  onClose: () => void;
}

const Tutorial: React.FC<ITutorial> = ({ onClose }) => {
  const { pathname } = useRouter();
  const [step, setStep] = useState(0);
  const [selectItem, setSelectItem] = useState(sidebarList[0]);
  const [checkTutorial, setCheckTutorial] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const getItem = window.localStorage.getItem('tutorial');
    let item = {};
    if (getItem) {
      item = JSON.parse(getItem);
    }
    if (pathname.includes('screen')) {
      setStep(0);
      setSelectItem(sidebarList[0]);
      setCheckTutorial({
        ...item,
        screen: true
      });
    } else if (pathname.includes('schedule')) {
      setStep(1);
      setSelectItem(sidebarList[1]);
      setCheckTutorial({
        ...item,
        schedule: true
      });
    } else if (pathname.includes('playlist')) {
      setStep(2);
      setSelectItem(sidebarList[2]);
      setCheckTutorial({
        ...item,
        playlist: true
      });
    } else if (pathname.includes('canvas')) {
      setStep(3);
      setSelectItem(sidebarList[3]);
      setCheckTutorial({
        ...item,
        canvas: true
      });
    } else if (pathname.includes('media')) {
      setStep(4);
      setSelectItem(sidebarList[4]);
      setCheckTutorial({
        ...item,
        media: true
      });
    } else if (pathname.includes('team')) {
      setStep(5);
      setSelectItem(sidebarList[5]);
      setCheckTutorial({
        ...item,
        team: true
      });
    } else if (pathname.includes('role')) {
      setStep(6);
      setSelectItem(sidebarList[6]);
      setCheckTutorial({
        ...item,
        role: true
      });
    } else if (pathname.includes('account')) {
      setStep(7);
      setSelectItem(sidebarList[7]);
      setCheckTutorial({
        ...item,
        setting: true
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      window.localStorage.setItem('tutorial', JSON.stringify(checkTutorial));
    };
  }, [checkTutorial]);

  const handleCheck = (item: (typeof sidebarList)[0], index: number) => {
    setSelectItem(item);
    setStep(index);
    setCheckTutorial({
      ...checkTutorial,
      [item.value]: true
    });
  };

  const handleNextStep = () => {
    if (step === sidebarList.length - 1) {
      return;
    }
    setStep(step + 1);
    setSelectItem(sidebarList[step + 1]);
    setCheckTutorial({
      ...checkTutorial,
      [sidebarList[step + 1].value]: true
    });
  };

  return (
    <TutorialWrapper display="flex" width="1000px">
      <Box width="300px" borderRight={`1px solid ${theme.color.gray200}`} p="24px 0px">
        <Typography
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.semiBold}
          lineHeight="31px"
          p="0px 24px"
        >
          메뉴보스 시작하기
        </Typography>
        <Box mt="32px">
          {sidebarList.map((sidebar, index) => (
            <CheckBox
              key={`tutorial-${sidebar.value}`}
              name={sidebar.value}
              checked={checkTutorial[sidebar.value]}
              height="56px"
              type="circle"
              className={classNames('check-box', {
                active: step === index
              })}
              p="0px 24px"
              onClick={() => handleCheck(sidebar, index)}
            >
              <Typography
                fontSize={theme.fontSize.text16}
                fontWeight={theme.fontWeight.normal}
                lineHeight="21px"
              >
                {sidebar.name}
              </Typography>
            </CheckBox>
          ))}
        </Box>
        <Box mt="67px" display="flex" p="0px 24px">
          {Object.keys(checkTutorial).length === 8 ? (
            <Button size="m" width="100%" onClick={onClose}>
              완료
            </Button>
          ) : (
            <>
              <Button
                size="m"
                variant="outline"
                color="neutral"
                width="120px"
                mr="12px"
                onClick={onClose}
              >
                넘어가기
              </Button>
              <Button size="m" width="120px" onClick={handleNextStep}>
                다음
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box width="700px" p="24px">
        <Box display="flex" justifyContent="end">
          <CloseRound
            className="close"
            width="24"
            height="24"
            color={theme.color.gray500}
            onClick={onClose}
          />
        </Box>
        <Box mt="32px">
          <TutorialDescription item={selectItem} />
        </Box>
      </Box>
    </TutorialWrapper>
  );
};

export default Tutorial;
