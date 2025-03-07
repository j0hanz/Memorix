import React, { useState } from 'react';

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
  fallbackSrc?: string;
}

// Enhanced Image component with error handling and loading management
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
  fallbackSrc,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  // Handle image load event
  const handleLoad = () => {
    onLoad?.();
  };

  // Handle image error with fallback
  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
    onError?.();
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onClick={onClick}
      onLoad={handleLoad}
      onError={handleError}
      loading={loading}
    />
  );
};

export default Image;
