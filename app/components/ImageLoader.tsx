import { useState } from 'react';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  onError?: () => void;
}

export default function ImageLoader({ 
  src, 
  alt, 
  className = '', 
  fallback,
  onError 
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
} 