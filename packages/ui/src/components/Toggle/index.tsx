import React from 'react';
import styled from 'styled-components';

interface IToggle {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;

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
    transform: translateX(21px);
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
      height: 22px;
      width: 22px;
      left: 2px;
      bottom: 3px;
      background-color: ${({ theme }) => theme.color.white};
      transition: 0.4s;
      border-radius: 50%;
      background: #fbfbfb;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
    }
  }
`;

const Toggle: React.FC<IToggle> = ({ checked = false, onChange }) => {
  return (
    <ToggleWrapper>
      <input type="checkbox" checked={checked} readOnly onChange={onChange} />
      <span className="switch-slider" />
    </ToggleWrapper>
  );
};

export default Toggle;
