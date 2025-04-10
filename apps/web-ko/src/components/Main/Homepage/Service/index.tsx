import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

import { serverCardList } from '@/models/main';

import HomepageServiceCard from './Card';

const HomepageServiceWrapper = styled(Box)`
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
      .list {
        overflow-x: scroll;
        flex-wrap: nowrap;
        justify-content: start;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          flex: 0 0 auto;
          width: 246px;
          margin-right: 24px;
          .service-card-title {
            margin-top: 55px;
            font-size: ${({ theme }) => theme.fontSize.text18};
          }
          .service-card-description {
            margin-top: 12px;
            font-size: ${({ theme }) => theme.fontSize.text14};
          }
        }
      }
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 64px;
    justify-content: center;
    li {
      width: 280px;
      margin-right: 24px;
      border-radius: 12px;
      padding: 32px 24px;
      box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.1);
      background-color: ${({ theme }) => theme.color.white};
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.color.primary500};
        .service-card-icon {
          background-color: ${({ theme }) => theme.color.white};
        }
        .service-card-title {
          color: ${({ theme }) => theme.color.white};
        }
        .service-card-description {
          color: ${({ theme }) => theme.color.white};
        }
        svg {
          path {
            stroke: ${({ theme }) => theme.color.primary500};
          }
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const HomepageService = () => {
  return (
    <HomepageServiceWrapper backgroundColor={theme.color.gray50} p="100px 0">
      <Box className="container" width="1320px" margin="0 auto">
        <Typography
          fontSize="40px"
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          textAlign="center"
          lineHeight="49px"
          className="title"
        >
          디지털 메뉴판 제작을 위한 서비스
        </Typography>
        <Typography
          fontSize={theme.fontSize.text20}
          lineHeight="26px"
          textAlign="center"
          mt="16px"
          className="description"
        >
          메뉴보스로 디지털 메뉴판을 제작하고 TV 연결까지
        </Typography>
        <ul className="list">
          {serverCardList.map((item, index) => (
            <HomepageServiceCard key={`service-card-${index}`} item={item} />
          ))}
        </ul>
      </Box>
    </HomepageServiceWrapper>
  );
};

export default HomepageService;
