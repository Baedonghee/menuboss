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
          background-color: ${({ theme }) => theme.color.white};
          &:hover {
            background-color: ${({ theme }) => theme.color.white};
            .service-card-icon {
              background-color: ${({ theme }) => theme.color.primary500};
            }
            .service-card-title {
              color: ${({ theme }) => theme.color.gray900};
            }
            .service-card-description {
              color: ${({ theme }) => theme.color.gray900};
            }
            svg {
              path {
                stroke: ${({ theme }) => theme.color.white};
              }
            }
          }
          .service-card-box {
            display: block;
            .service-card-title {
              margin-top: 48px;
              font-size: ${({ theme }) => theme.fontSize.text18};
            }
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
    li {
      width: 424px;
      margin-right: 24px;
      margin-bottom: 24px;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.1);
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
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &:nth-of-type(n + 4) {
        margin-bottom: 0;
      }
    }
  }
`;

const HomepageService = () => {
  return (
    <HomepageServiceWrapper backgroundColor={theme.color.gray50} p="100px 0">
      <Box width="1320px" margin="0 auto" className="container">
        <Typography
          fontSize="40px"
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          textAlign="center"
          className="title"
        >
          The following services are
          <br />
          available on the MenuBoss
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
