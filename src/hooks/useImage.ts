import { useEffect, useState } from 'react';

export interface UseImageOptions {
  src: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function useImage({
  src,
  fallbackSrc,
  onLoad,
  onError,
}: UseImageOptions) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      setImgSrc(src);
      setIsLoaded(false);
    }
  }, [src, imgSrc, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoaded(false);
    } else {
      setIsLoaded(true);
    }
    onError?.(event);
  };

  // Handle profile picture cache busting
  const getFinalSrc = (source: string): string => {
    return source.includes('profile_picture') && !source.includes('?v=')
      ? `${source}?v=${Date.now().toString()}`
      : source;
  };

  return {
    imgSrc: getFinalSrc(imgSrc),
    hasError,
    isLoaded,
    handleLoad,
    handleError,
  };
}
