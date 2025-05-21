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

  const finalSrc =
    imgSrc.includes('profile_picture') && !imgSrc.includes('?v=')
      ? `${imgSrc}?v=${Date.now().toString()}`
      : imgSrc;

  // Render the image element
  const imageElement = (
    <img
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  // If onClick is provided, wrap the image in a clickable div
  if (onClick) {
    return (
      <div
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={alt}
        className={className}
        style={{
          ...style,
          cursor: 'pointer',
          display: 'inline-block',
        }}
      >
        {imageElement}
      </div>
    );
  }
  return imageElement;
};
