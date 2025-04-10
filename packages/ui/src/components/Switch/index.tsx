import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import Box from '../Box';

const SwitchWrapper = styled(Box)`
  &.on {
    .switch-slider {
      background-color: ${({ theme }) => theme.color.primary500};
    }
  }
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + .switch-slider {
    background-color: ${({ theme }) => theme.color.primary500};
    box-shadow: none;
    border: none;
  }

  input:checked + .switch-slider:before {
    transform: translateX(20px);
  }

  .switch-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.color.gray300};
    border: none;
    transition: 0.4s;
    border-radius: 30px;

    &::before {
      position: absolute;
      content: '';
      height: 24px;
      width: 24px;
      left: 2px;
      bottom: 2px;
      background-color: ${({ theme }) => theme.color.white};
      transition: 0.4s;
      border-radius: 50%;
      background: #fbfbfb;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
    }
  }
`;

interface ISwitch {
  checked: boolean;
  onClick: () => void;
  className?: string;
}

const Switch: React.FC<ISwitch> = ({ checked, onClick, className }) => {
  return (
    <SwitchWrapper
      position="relative"
      display="inline-block"
      width="48px"
      height="28px"
      onClick={onClick}
      className={classNames(className, { on: checked })}
    >
      <input type="checkbox" checked={checked} readOnly />
      <span className="switch-slider" />
    </SwitchWrapper>
  );
};

export default Switch;
