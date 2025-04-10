import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { CheckLine } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

const PriceTableWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 80px 24px;
    .container {
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
    }
    .table {
      width: 100%;
      overflow-x: scroll;
      flex-wrap: nowrap;
      justify-content: start;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    ul.header-list {
      width: 656px;
      li {
        width: 164px !important;
        font-size: ${({ theme }) => theme.fontSize.text14} !important;
      }
    }
    ul.content-list {
      li {
        width: 656px;
        & > div {
          width: 164px !important;
          font-size: ${({ theme }) => theme.fontSize.text14} !important;
        }
      }
    }
  }
  ul.header-list {
    display: flex;
    background-color: ${({ theme }) => theme.color.primary50};
    li {
      width: 264px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${({ theme }) => theme.fontSize.text18};
      color: ${({ theme }) => theme.color.gray900};
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      &:first-child {
        width: 320px;
        justify-content: start;
        padding-left: 16px;
      }
    }
  }
  ul.content-list {
    padding: 12px 0px;
    li {
      display: flex;
      & > div {
        width: 264px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSize.text16};
        color: ${({ theme }) => theme.color.gray700};
        border-right: 1px solid ${({ theme }) => theme.color.gray300};
        &:first-child {
          width: 320px;
          justify-content: start;
          padding-left: 16px;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  ul.button-list {
    margin-top: 40px;
    display: flex;
    li {
      width: 200px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-child {
        width: 320px;
      }
    }
  }
`;

const PriceTable = () => {
  return (
    <PriceTableWrapper p="100px 0px">
      <Box width="1320px" margin="0 auto" className="container">
        <Typography
          fontSize="40px"
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          textAlign="center"
          className="title"
        >
          요금제 상세 기능 & 비교
        </Typography>
        <Typography
          as="h2"
          fontSize={theme.fontSize.text20}
          color={theme.color.gray700}
          mt="16px"
          textAlign="center"
          className="description"
        >
          상황에 알맞는 다양한 서비스의 유형을 제공하고 있습니다
        </Typography>
        <Box mt="64px" className="table">
          <ul className="header-list">
            <li>콘텐츠</li>
            <li>무료</li>
            <li>시작 요금제</li>
            <li>성장 요금제</li>
            <li>프로 요금제</li>
          </ul>
          <ul className="content-list">
            <li>
              <div>무료 저장공간</div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>시간표 & 재생목록</div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>파일 업로드</div>
              <div>100MB(파일 당)</div>
              <div>100MB(파일 당)</div>
              <div>400MB(파일 당)</div>
              <div>1GB(파일 당)</div>
            </li>
            <li>
              <div>파일 저장공간</div>
              <div>5GB</div>
              <div>5GB</div>
              <div>50GB</div>
              <div>100GB</div>
            </li>
            <li>
              <div>TV 저장공간</div>
              <div>500MB(TV 1개 기준)</div>
              <div>500MB(TV 1개 기준)</div>
              <div>2GB(TV 1개 기준)</div>
              <div>5GB(TV 1개 기준)</div>
            </li>
            <li>
              <div>캔버스(컨텐츠 제작)</div>
              <div>무제한</div>
              <div>무제한</div>
              <div>무제한</div>
              <div>무제한</div>
            </li>
            <li>
              <div>캔버스(유로글꼴)</div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>캔버스 (AI 이미지 생성)</div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>캔버스 기록</div>
              <div>7일</div>
              <div>7일</div>
              <div>30일</div>
              <div>90일</div>
            </li>
          </ul>
          <ul className="header-list">
            <li>협업 & 공유</li>
            <li>무료</li>
            <li>시작 요금제</li>
            <li>성장 요금제</li>
            <li>프로 요금제</li>
          </ul>
          <ul className="content-list">
            <li>
              <div>구성원</div>
              <div>1명의 구성원</div>
              <div>1명의 구성원</div>
              <div>6명의 구성원</div>
              <div>무제한 구성원</div>
            </li>
            <li>
              <div>역할 설정</div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>구성원 초대</div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
          </ul>
          <ul className="header-list">
            <li>지원기기</li>
            <li>무료</li>
            <li>시작 요금제</li>
            <li>성장 요금제</li>
            <li>프로 요금제</li>
          </ul>
          <ul className="content-list">
            <li>
              <div>모바일 앱</div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>새 기능 우선 지원</div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
          </ul>
        </Box>
      </Box>
    </PriceTableWrapper>
  );
};

export default PriceTable;
