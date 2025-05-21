import { useEffect, useState } from 'react';

import type { ImageProps } from '@/types/components';

// Image component to display images with error handling and fallback
export const Image: React.FC<ImageProps> = ({
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

  // Update image source when src prop changes
  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      setImgSrc(src);
    }
  }, [src, imgSrc, hasError]);

  // Handle image load event
  const handleLoad = () => {
    onLoad?.();
  };

  // Handle image error with fallback
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
    onError?.(event);
  };

  // Add cache-busting query parameter for profile pictures
  const finalSrc = imgSrc.includes('profile_picture') && !imgSrc.includes('?v=')
    ? `${imgSrc}?v=${new Date().getTime()}`
    : imgSrc;

  return (
    <img
      src={finalSrc}
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
