import React from 'react';
import { Box } from '@repo/ui/components';
import styled from 'styled-components';

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayoutWrapper = styled.section`
  display: flex;
  height: 100vh;
  .left-wrapper {
    background: url('/images/auth/login-background.png') no-repeat center center;
    background-size: cover;
  }
  .right-wrapper {
    text-align: center;
    .logo {
      margin-bottom: 32px;
    }
    .line {
      text-align: center;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
      margin: 24px 0px;
      position: relative;
      span {
        position: absolute;
        top: -11px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        display: inline-block;
        line-height: 22px;
        color: ${({ theme }) => theme.color.gray500};
        background-color: ${({ theme }) => theme.color.white};
        font-size: ${({ theme }) => theme.fontSize.text16};
      }
    }
  }
`;

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <AuthLayoutWrapper>
      <Box width="50%" className="left-wrapper" />
      <Box width="50%" m="auto 0;" className="right-wrapper">
        <Box width={360} m="auto;" textAlign="center">
          {children}
        </Box>
      </Box>
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;
