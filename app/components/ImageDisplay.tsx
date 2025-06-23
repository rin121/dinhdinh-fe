import { useState } from 'react';
import { ProductImage } from '../data/types';
import { ImageService } from '../lib/imageService';
import ImageLoader from './ImageLoader';

interface ImageDisplayProps {
  images?: ProductImage[];
  primaryImage?: ProductImage;
  fallbackImage?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGallery?: boolean;
  alt?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-full h-48',
  lg: 'w-full h-64',
  xl: 'w-full h-96',
};

export default function ImageDisplay({
  images = [],
  primaryImage,
  fallbackImage = '🍰',
  className = '',
  size = 'lg',
  showGallery = true,
  alt = 'Product image'
}: ImageDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Tạo danh sách hình ảnh để hiển thị
  const displayImages = images && images.length > 0 ? images : [];
  const hasImages = displayImages.length > 0 || primaryImage;

  // Hình ảnh hiển thị chính
  const mainImage = selectedImageIndex === -1 
    ? primaryImage 
    : (displayImages.length > 0 ? displayImages[selectedImageIndex] : primaryImage);

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  // Tạo URL hình ảnh với tùy chọn resize
  const getImageUrl = (image: ProductImage | undefined, resize: boolean = true, width: number = 400, height: number = 400) => {
    if (!image) return null;
    
    if (resize) {
      return ImageService.getResizedImageUrl(image.url, {
        width,
        height,
        fit: 'cover',
        quality: 85
      });
    } else {
      return ImageService.getOriginalImageUrl(image.url);
    }
  };

  // Nếu không có hình ảnh, hiển thị fallback
  if (!hasImages) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl flex items-center justify-center shadow-lg`}>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300 ease-in-out animate-pulse">{fallbackImage}</span>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hình ảnh chính */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden relative group`}>
        {mainImage && !imageError[mainImage.id] ? (
          <ImageLoader
            src={getImageUrl(mainImage) || ImageService.getOriginalImageUrl(mainImage.url)}
            alt={mainImage.alt_text || alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => handleImageError(mainImage.id)}
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300 ease-in-out animate-pulse">{fallbackImage}</span>
              </div>
            }
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300 ease-in-out animate-pulse">{fallbackImage}</span>
          </div>
        )}
        
        {/* Overlay gradient cho hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Gallery thumbnails */}
      {showGallery && (displayImages.length > 1 || (primaryImage && displayImages.length > 0)) && (
        <div className="flex space-x-3 justify-center overflow-x-auto pb-2 px-2">
          {/* Primary image thumbnail */}
          {primaryImage && (
            <button
              onClick={() => setSelectedImageIndex(-1)} // -1 để chỉ primary image
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                selectedImageIndex === -1
                  ? 'ring-3 ring-pink-500 ring-offset-2 shadow-lg'
                  : 'ring-2 ring-gray-200 hover:ring-gray-300 hover:shadow-md'
              }`}
            >
              {!imageError[primaryImage.id] ? (
                <img
                  src={getImageUrl(primaryImage, true, 80, 80) || ImageService.getOriginalImageUrl(primaryImage.url)}
                  alt={primaryImage.alt_text || `${alt} primary`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(primaryImage.id)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-2xl">
                  {fallbackImage}
                </div>
              )}
            </button>
          )}

          {/* Other images thumbnails */}
          {displayImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                selectedImageIndex === index
                  ? 'ring-3 ring-pink-500 ring-offset-2 shadow-lg'
                  : 'ring-2 ring-gray-200 hover:ring-gray-300 hover:shadow-md'
              }`}
            >
              {!imageError[img.id] ? (
                <img
                  src={getImageUrl(img, true, 80, 80) || ImageService.getOriginalImageUrl(img.url)}
                  alt={img.alt_text || `${alt} ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(img.id)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-2xl">
                  {fallbackImage}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 