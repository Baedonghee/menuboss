/* eslint-disable react/react-in-jsx-scope */
import { Ai, List, Menu, Mobile } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IMainPlanListKo } from '@repo/ui/types';

export const serverCardList = [
  {
    name: '쉽고 간편한 디자인 편집',
    icon: <Menu width="24" height="24" color={theme.color.white} />,
    description: '캔버스 기능을 통해 나만의 디지털 메뉴판을 제작할 수 있습니다'
  },
  {
    name: '시간표 & 재생목록 ',
    icon: <List width="24" height="24" color={theme.color.white} />,
    description: '하루 종일 또는 시간대별로 원하는 메뉴를 유연하게 설정할 수 있습니다'
  },
  {
    name: '모바일 앱 서비스',
    icon: <Mobile width="24" height="24" color={theme.color.white} />,
    description: '모바일 앱을 통해 TV 화면을 실시간으로 관리할 수 있습니다'
  },
  {
    name: 'AI 이미지 생성',
    icon: <Ai width="24" height="24" color={theme.color.white} />,
    description: 'AI 이미지 생성을 통해 디자인에 적합한 다양한 이미지를 추천합니다'
  }
];

export const mainPlanList = [
  {
    name: 'Free',
    yearPrice: '14일 무료',
    monthPrice: '14일 무료',
    description: '베이직 플랜을 14일동안 무료로 이용해보세요!',
    buttonName: '지금 바로 시작하기',
    optionDescription: '',
    options: [],
    disabledOptions: []
  },
  {
    name: '시작 요금제',
    yearPrice: '120,000원',
    monthPrice: '12,000원',
    perScreen: '/ 월 (TV 1개 기준)',
    description: '디지털 메뉴판을 처음으로 사용하시는 사장님에게 추천드립니다',
    count: 1,
    buttonName: '구독하기',
    options: [
      '시간표 & 재생목록',
      '최대 파일 크기 업로드 100MB',
      '20개의 템플릿',
      '1명의 구성원',
      '5GB 파일 저장공간',
      '500MB 저장공간(TV 1개 기준)'
    ]
  },
  {
    name: '성장 요금제',
    yearPrice: '250,000원',
    monthPrice: '25,000원',
    perScreen: '/ 월 (TV 1개 기준)',
    description: '많은 콘텐츠를 관리 및 다양한 템플릿을 이용하고 싶은 사장님에게 추천드립니다',
    count: 1,
    buttonName: '구독하기',
    options: [
      '구성원 역할 권한 설정',
      '최대 파일 크기 업로드 400MB',
      '30개의 템플릿',
      '6명의 구성원',
      '50GB 파일 저장공간',
      '2GB 저장공간 (TV 1개 기준)'
    ]
  },
  {
    name: '프로 요금제',
    yearPrice: '390,000원',
    monthPrice: '39,000원',
    perScreen: '/ 월 (TV 1개 기준)',
    description: '다양한 서비스와 체계적으로 매장 관리를 하고싶은 사장님에게 추천드립니다',
    count: 1,
    buttonName: '구독하기',
    options: [
      '감사 로그',
      '최대 파일 크기 업로드 1GB',
      '무제한 템플릿',
      '무제한 구성원',
      '100GB 파일 저장공간',
      '5GB 저장공간 (TV 1개 기준)'
    ]
  }
] as IMainPlanListKo[];
