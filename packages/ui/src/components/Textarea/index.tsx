import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';
import styled from 'styled-components';

interface IStyle {
  width?: string;
  p?: string;
  m?: string;
}

interface ITextarea extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  options?: RegisterOptions;
  className?: string;
}

const TextareaWrapper = styled.div<IStyle>`
  width: ${({ width }) => width};
  margin: ${({ m }) => m};
  padding: ${({ p }) => p};
  textarea {
    width: 100%;
    height: 128px;
    padding: 16px;
    font-size: ${({ theme }) => theme.fontSize.text14};
    color: ${({ theme }) => theme.color.gray900};
    border: 1px solid ${({ theme }) => theme.color.gray300};
    resize: none;
    outline: none;
    border-radius: 8px;
    &::placeholder {
      color: ${({ theme }) => theme.color.gray400};
    }
    &:focus {
      border: 1px solid ${({ theme }) => theme.color.gray900};
    }
    &:disabled {
      border: 1px solid ${({ theme }) => theme.color.gray300};
      background-color: ${({ theme }) => theme.color.gray100};
      color: ${({ theme }) => theme.color.gray400};
    }
    &.error {
      border: 1px solid ${({ theme }) => theme.color.red500};
    }
  }
  p {
    font-size: ${({ theme }) => theme.fontSize.text12};
    color: ${({ theme }) => theme.color.red500};
    margin-top: 4px;
  }
`;

const Textarea: React.FC<ITextarea> = ({ name, register, error, options, className, ...props }) => {
  return (
    <TextareaWrapper className={classNames(className)}>
      <textarea
        id={name}
        {...register(name, options)}
        {...props}
        className={classNames({
          error: error
        })}
      />
      {error && <p>{error}</p>}
    </TextareaWrapper>
  );
};

export default Textarea;
