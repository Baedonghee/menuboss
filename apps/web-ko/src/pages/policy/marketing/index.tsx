import React from 'react';
import { Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';

import PolicyLayout from '@/components/Layout/Policy';

const PolicyMarketing = () => {
  return (
    <PolicyLayout>
      <Typography
        fontSize={theme.fontSize.text24}
        fontWeight={theme.fontWeight.bold}
        color={theme.color.black}
      >
        마케팅 개인정보 제3자 동의
      </Typography>
      <ul className="policy-list mt-80">
        <li>
          <ul>
            <li>제공받는 자 : (주)오롯코드</li>
            <li>
              제공목적 : 메뉴보스 서비스 내 데이터 분석 및 통계화 처리, 개인화된 콘텐츠 추천 및 광고
              등 마케팅에 활용
            </li>
            <li>제공정보 : 스크린, 미디어, 플레이리스트 및 결제내역 등 서비스 이용 내역</li>
            <li>보유기간 : 회원 탈퇴 또는 동의 철회 시 지체없이 파기</li>
            <li>위 동의를 거부할 권리가 있으며, 동의를 거부해도 서비스 이용이 가능합니다.</li>
            <li>① 이 개인정보처리방침은 2023년 12월 29부터 적용됩니다.</li>
          </ul>
        </li>
      </ul>
    </PolicyLayout>
  );
};

export default PolicyMarketing;
