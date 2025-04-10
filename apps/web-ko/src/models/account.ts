import { IPaymentAccountPlanList } from '@repo/ui/types';

import { ADMIN_PATH } from '@/utils/path';

export const accountTabMenuList = [
  {
    name: '프로필',
    path: ADMIN_PATH.ACCOUNT_PROFILE
  },
  {
    name: '사업자',
    path: ADMIN_PATH.ACCOUNT_BUSINESS
  },
  {
    name: '요금제',
    path: ADMIN_PATH.ACCOUNT_PLAN
  },
  {
    name: '청구',
    path: ADMIN_PATH.ACCOUNT_BILLING
  },
  {
    name: '결제',
    path: ADMIN_PATH.ACCOUNT_PAYMENT
  }
];

export const accountPlanList = [
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
] as IPaymentAccountPlanList[];
