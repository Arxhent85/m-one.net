import React, { useState, useEffect, useRef } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackStrategy?: 'picsum' | 'color' | 'custom';
  fallbackContent?: React.ReactNode;
  imgClassName?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  fallbackStrategy = 'picsum',
  fallbackContent,
  imgClassName,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);

    // Check if image is already cached
    if (src) {
      const testImg = new Image();
      testImg.src = src;
      if (testImg.complete && testImg.naturalWidth > 0) {
        setIsLoading(false);
      }
    }
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);

      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else if (fallbackStrategy === 'picsum') {
        const seed = alt ? alt.length : Math.floor(Math.random() * 1000);
        setImgSrc(`https://picsum.photos/seed/${seed}/800/600`);
      } else {
        setImgSrc(undefined);
      }
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError && fallbackStrategy === 'custom' && fallbackContent) {
    return <>{fallbackContent}</>;
  }

  if (hasError && fallbackStrategy === 'color' && !fallbackSrc) {
    return (
      <div className={`flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-400 ${className}`}>
        <ImageOff size={24} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      )}
      <img
        {...props}
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-full transition-opacity duration-300 ${imgClassName || 'object-cover'} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

export default ImageWithFallback;
