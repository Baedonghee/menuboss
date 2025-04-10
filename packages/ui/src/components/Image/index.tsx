import React, { useState } from 'react';
import classNames from 'classnames';
import NextImage from 'next/image';
import styled from 'styled-components';
import { defaultPreImage, defaultPreSquareImage } from '../../utils';

const Img = styled(NextImage)<{
  objectFill?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}>`
  height: auto !important;
  position: relative !important;
  display: block !important;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${({ objectFill }) => objectFill};
  &.loaded {
    object-fit: fill;
  }
`;

interface IImage {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  size?: string;
  preImage?: string;
  style?: React.CSSProperties;
  objectFill?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const Image: React.FC<IImage> = ({
  src,
  alt,
  className,
  width,
  height,
  size,
  style,
  objectFill = 'fill'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageOnLoad = () => {
    setImageLoaded(true);
  };

  return size ? (
    <Img src={src} alt={alt} className={className} fill sizes={size} onLoad={handleImageOnLoad} />
  ) : (
    <Img
      width={width}
      height={height}
      src={imageLoaded ? src : width === height ? defaultPreSquareImage : defaultPreImage}
      alt={alt}
      className={classNames(className, { loaded: !imageLoaded })}
      onLoad={handleImageOnLoad}
      style={style}
      objectFill={objectFill}
    />
  );
};

export default Image;
