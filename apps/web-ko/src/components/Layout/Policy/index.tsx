import React from 'react';
import { styled } from 'styled-components';

interface IPolicyLayout {
  children: React.ReactNode;
}

const PolicyContainer = styled.section`
  padding: 60px 20px;
  ul.policy-list {
    &.mt-80 {
      margin-top: 80px;
    }
    line-height: 24px;
    & > li {
      &.title {
        font-size: 24px;
        color: ${({ theme }) => theme.color.black};
        font-weight: bold;
      }
      &.mt-24 {
        margin-top: 24px;
      }
      margin-bottom: 16px;
      & > ul {
        & > li {
          &.title {
            font-weight: bold;
            font-size: 20px;
          }
          &.mt-24 {
            margin-top: 24px;
          }
          margin-bottom: 16px;
          color: #000;
          font-size: 18px;
          & > ul {
            padding-left: 20px;
            & > li {
              font-size: 16px;
              color: #666;
              margin-bottom: 8px;
              &.title {
                font-weight: bold;
                color: #000;
              }
              & > ul {
                padding-left: 20px;
                & > li {
                  font-size: 14px;
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PolicyLayout: React.FC<IPolicyLayout> = ({ children }) => {
  return <PolicyContainer>{children}</PolicyContainer>;
};

export default PolicyLayout;
