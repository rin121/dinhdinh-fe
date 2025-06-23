import { useEffect, useState } from 'react';
import { ProductImage } from '../data/types';
import { ImageService } from '../lib/imageService';

interface UseImagePreloadOptions {
  preloadSize?: number;
  priority?: boolean;
}

export function useImagePreload(
  images: ProductImage[] = [],
  options: UseImagePreloadOptions = {}
) {
  const { preloadSize = 400, priority = false } = options;
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!images.length) return;

    const preloadImages = async () => {
      // Preload chỉ vài hình đầu tiên để tối ưu performance
      const imagesToPreload = priority ? images : images.slice(0, 3);

      for (const image of imagesToPreload) {
        if (loadedImages[image.id] || loadingImages[image.id]) continue;

        setLoadingImages(prev => ({ ...prev, [image.id]: true }));

        try {
          const resizedUrl = ImageService.getResizedImageUrl(image.url, {
            width: preloadSize,
            height: preloadSize,
            fit: 'cover'
          });

          await ImageService.preloadImage(resizedUrl);
          
          setLoadedImages(prev => ({ ...prev, [image.id]: true }));
          setErrorImages(prev => ({ ...prev, [image.id]: false }));
        } catch (error) {
          console.warn(`Failed to preload image ${image.id}:`, error);
          setErrorImages(prev => ({ ...prev, [image.id]: true }));
        } finally {
          setLoadingImages(prev => ({ ...prev, [image.id]: false }));
        }
      }
    };

    preloadImages();
  }, [images, preloadSize, priority, loadedImages, loadingImages]);

  return {
    loadedImages,
    loadingImages,
    errorImages,
    isImageLoaded: (imageId: number) => !!loadedImages[imageId],
    isImageLoading: (imageId: number) => !!loadingImages[imageId],
    hasImageError: (imageId: number) => !!errorImages[imageId]
  };
}

export function useImageWithFallback(
  primaryUrl?: string,
  fallbackUrl?: string,
  defaultFallback: string = '🍰'
) {
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    return ImageService.getImageWithFallback(primaryUrl, fallbackUrl, defaultFallback);
  });

  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      
      if (primaryUrl && currentUrl === primaryUrl && fallbackUrl) {
        setCurrentUrl(fallbackUrl);
      } else {
        setCurrentUrl(defaultFallback);
      }
    }
  };

  const resetImage = () => {
    setHasError(false);
    setCurrentUrl(ImageService.getImageWithFallback(primaryUrl, fallbackUrl, defaultFallback));
  };

  useEffect(() => {
    resetImage();
  }, [primaryUrl, fallbackUrl, defaultFallback]);

  return {
    currentUrl,
    hasError,
    handleImageError,
    resetImage,
    isEmoji: !ImageService.isValidImageUrl(currentUrl)
  };
} 