import React, { useState } from 'react';
import { ImageProps } from '@/types/components';

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
