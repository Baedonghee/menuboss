import React from 'react';
import styled from 'styled-components';

const LoadingIconWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  left: -28px;
  & > div {
    transform-origin: 38px 11px;
    animation: lds-spinner 0.8s linear infinite;
    &:nth-of-type(1) {
      transform: rotate(0deg);
      animation-delay: -0.7s;
    }
    &:nth-of-type(2) {
      transform: rotate(45deg);
      animation-delay: -0.6s;
    }
    &:nth-of-type(3) {
      transform: rotate(90deg);
      animation-delay: -0.5s;
    }
    &:nth-of-type(4) {
      transform: rotate(135deg);
      animation-delay: -0.4s;
    }
    &:nth-of-type(5) {
      transform: rotate(180deg);
      animation-delay: -0.3s;
    }
    &:nth-of-type(6) {
      transform: rotate(225deg);
      animation-delay: -0.2s;
    }
    &:nth-of-type(7) {
      transform: rotate(270deg);
      animation-delay: -0.1s;
    }
    &:nth-of-type(8) {
      transform: rotate(315deg);
      animation-delay: 0s;
    }
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      top: 3px;
      left: 37px;
      width: 2px;
      height: 4px;
      border-radius: 20%;
      background: ${({ theme }) => theme.color.gray500};
    }
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const LoadingIcon = () => {
  return (
    <LoadingIconWrapper>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </LoadingIconWrapper>
  );
};

export default LoadingIcon;
