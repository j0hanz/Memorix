import { useImage } from '@/hooks/useImage';
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
  const { imgSrc, handleLoad, handleError } = useImage({
    src,
    fallbackSrc,
    onLoad,
    onError,
  });

  const imageElement = (
    <img
      src={imgSrc}
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
