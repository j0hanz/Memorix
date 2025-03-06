import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
}

// Image component
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  onClick,
  onLoad,
  onError,
  loading = 'lazy',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
      loading={loading}
    />
  );
};

export default Image;
