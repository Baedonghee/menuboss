import React, { useRef, useState } from 'react';
import { RegisterOptions, UseFormRegister, UseFormSetFocus } from 'react-hook-form';
import classNames from 'classnames';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';

import { theme } from '../../styles/theme';

import Box from '../Box';
import Rename from '../SVG/icons/rename';
import { delay } from '../../utils';

interface IStyle {
  width?: string;
  m?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  p?: string;
  pb?: string;
  pl?: string;
  pr?: string;
  pt?: string;
}

interface IUnderlineInput extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  setFocus: UseFormSetFocus<any>;
  register: UseFormRegister<any>;
  options?: RegisterOptions;
  onBlur: () => void;
  isFocus: boolean;
  handleFocus: (status: boolean) => void;
  handleSubmit?: () => void;
}

const UnderlineInputWrapper = styled.div<IStyle>`
  width: ${({ width }) => width};
  ${({ m }) => (m ? `margin: ${m}` : null)};
  ${({ mb }) => (mb ? `margin-bottom: ${mb}` : null)};
  ${({ ml }) => (ml ? `margin-left: ${ml}` : null)};
  ${({ mr }) => (mr ? `margin-right: ${mr}` : null)};
  ${({ mt }) => (mt ? `margin-top: ${mt}` : null)};
  ${({ p }) => (p ? `padding: ${p}` : null)};
  ${({ pb }) => (pb ? `padding-bottom: ${pb}` : null)};
  ${({ pl }) => (pl ? `padding-left: ${pl}` : null)};
  ${({ pr }) => (pr ? `padding-right: ${pr}` : null)};
  ${({ pt }) => (pt ? `padding-top: ${pt}` : null)};
  .name-typography {
    &:hover {
      & + svg {
        display: block;
      }
    }
    &.name-typography__empty {
      color: ${({ theme }) => theme.color.gray500};
      & + svg {
        display: block;
      }
    }
  }
  input {
    width: ${({ width }) => `calc(${width} - 80px)`};
    max-width: 500px;
    border: 0;
    font-size: ${({ theme }) => theme.fontSize.text24};
    color: ${({ theme }) => theme.color.gray900};
    margin-right: 12px;
    padding-bottom: 3px;
    border-bottom: 2px dashed ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    &:hover {
      & + svg {
        display: block;
      }
    }
    &:focus {
      width: ${({ width }) => `calc(${width} - 44px)`};
      & + svg {
        display: block;
      }
    }
    &::placeholder {
      color: ${({ theme }) => theme.color.gray500};
    }
  }
  /* svg {
    display: none;
  } */
`;

const UnderlineInput: React.FC<IUnderlineInput & IStyle> = ({
  name,
  setFocus,
  register,
  options,
  value,
  width = '208px',
  m,
  mb,
  ml,
  mr,
  mt,
  p,
  pb,
  pl,
  pr,
  pt,
  placeholder,
  onBlur,
  isFocus,
  handleFocus,
  handleSubmit,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState(width);
  const [isSvgShow, setIsSvgShow] = useState(false);

  useOnClickOutside(ref, () => {
    handleFocus(false);
    setIsSvgShow(false);
    onBlur();
  });

  const handleFocusOpen = async () => {
    const width = document.getElementById(name)?.getBoundingClientRect().width;
    setInputWidth(width ? `${width < 200 ? 200 : width > 500 ? 500 : width + 10}px` : 'auto');
    handleFocus(true);
    await delay(0);
    setFocus(name);
  };

  const handleBoxMouseOver = () => {
    setIsSvgShow(true);
  };

  const handleBoxMouseOut = () => {
    setIsSvgShow(false);
  };

  return (
    <UnderlineInputWrapper
      width={width}
      m={m}
      mb={mb}
      ml={ml}
      mr={mr}
      mt={mt}
      p={p}
      pb={pb}
      pl={pl}
      pr={pr}
      pt={pt}
    >
      <Box display="flex" width="100%" alignItems="center" ref={ref}>
        {isFocus ? (
          <input
            id={name}
            {...register(name, options)}
            {...props}
            placeholder={placeholder}
            style={{
              width: inputWidth
            }}
          />
        ) : (
          <Box
            id={name}
            width={`calc(${width} - 44px)`}
            fontSize={theme.fontSize.text24}
            color={theme.color.gray900}
            mr="12px"
            overflow="hidden"
            textOverflow="ellipsis"
            pb="4px"
            maxWidth="500px"
            borderBottom={`2px dashed ${theme.color.gray500}`}
            className={classNames('name-typography', {
              'name-typography__empty': !value
            })}
            fontWeight={theme.fontWeight.semiBold}
            whiteSpace="nowrap"
            onClick={handleFocusOpen}
            onMouseOver={handleBoxMouseOver}
            onMouseOut={handleBoxMouseOut}
          >
            {value || placeholder}
          </Box>
        )}
        <Rename
          width="24"
          height="24"
          color={theme.color.gray500}
          style={{ cursor: 'pointer', display: isSvgShow ? 'block' : 'none' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (handleSubmit) {
              handleSubmit();
            }
          }}
        />
      </Box>
    </UnderlineInputWrapper>
  );
};

export default UnderlineInput;
