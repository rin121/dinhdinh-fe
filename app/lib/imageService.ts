import { API_CONFIG } from '../config/api';

export interface ImageResizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

export class ImageService {
  private static defaultOptions: ImageResizeOptions = {
    width: 400,
    height: 400,
    quality: 85,
    fit: 'cover',
    format: 'webp'
  };

  /**
   * Tạo URL cho hình ảnh đã được resize
   * @param originalUrl URL gốc của hình ảnh
   * @param options Các tùy chọn resize
   * @returns URL đã được resize
   */
  static getResizedImageUrl(originalUrl: string, options: ImageResizeOptions = {}): string {
    if (!originalUrl) return '';

    // Kết hợp với default options
    const finalOptions = { ...this.defaultOptions, ...options };

    try {
      // Tạo full URL cho Laravel storage
      const fullUrl = this.getFullImageUrl(originalUrl);
      return this.buildResizeUrl(fullUrl, finalOptions);
    } catch (error) {
      console.error('Error building resize URL:', error);
      return this.getFullImageUrl(originalUrl);
    }
  }

  /**
   * Tạo URL đầy đủ cho hình ảnh Laravel storage
   */
  static getFullImageUrl(relativePath: string): string {
    if (!relativePath) return '';

    // Nếu đã là URL đầy đủ, trả về luôn
    if (relativePath.startsWith('http')) {
      return relativePath;
    }

    // Lấy base URL của Laravel backend
    const baseUrl = API_CONFIG.BACKEND_URL;

    // Tạo URL đầy đủ cho Laravel storage
    // Laravel storage public disk có path /storage/
    const storagePath = relativePath.startsWith('/')
      ? `/storage${relativePath}`
      : `/storage/${relativePath}`;

    return `${baseUrl}${storagePath}`;
  }

  /**
   * Tạo URL resize với query parameters
   */
  private static buildResizeUrl(url: string, options: ImageResizeOptions): string {
    try {
      const urlObj = new URL(url);
      
      if (options.width) urlObj.searchParams.set('w', options.width.toString());
      if (options.height) urlObj.searchParams.set('h', options.height.toString());
      if (options.quality) urlObj.searchParams.set('q', options.quality.toString());
      if (options.fit) urlObj.searchParams.set('fit', options.fit);
      if (options.format) urlObj.searchParams.set('f', options.format);

      return urlObj.toString();
    } catch (error) {
      console.error('Error building URL:', error);
      return url;
    }
  }

  /**
   * Tạo srcset cho responsive images
   */
  static generateSrcSet(originalUrl: string, sizes: number[] = [320, 640, 768, 1024, 1280]): string {
    return sizes
      .map(size => {
        const resizedUrl = this.getResizedImageUrl(originalUrl, { width: size });
        return `${resizedUrl} ${size}w`;
      })
      .join(', ');
  }

  /**
   * Preload hình ảnh
   */
  static preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Tạo thumbnail từ hình ảnh gốc
   */
  static getThumbnailUrl(originalUrl: string, size: number = 150): string {
    return this.getResizedImageUrl(originalUrl, {
      width: size,
      height: size,
      fit: 'cover',
      quality: 80
    });
  }

  /**
   * Lấy URL gốc không resize
   */
  static getOriginalImageUrl(relativePath: string): string {
    return this.getFullImageUrl(relativePath);
  }

  /**
   * Optimize hình ảnh cho các thiết bị khác nhau
   */
  static getOptimizedImageUrls(originalUrl: string) {
    return {
      thumbnail: this.getThumbnailUrl(originalUrl, 150),
      small: this.getResizedImageUrl(originalUrl, { width: 300, height: 300 }),
      medium: this.getResizedImageUrl(originalUrl, { width: 600, height: 600 }),
      large: this.getResizedImageUrl(originalUrl, { width: 1200, height: 1200 }),
      original: originalUrl
    };
  }

  /**
   * Kiểm tra xem URL có phải là hình ảnh hợp lệ không
   */
  static isValidImageUrl(url: string): boolean {
    if (!url) return false;
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
    const urlLower = url.toLowerCase();
    
    return imageExtensions.some(ext => urlLower.includes(ext)) || 
           url.includes('/storage/') || 
           url.includes('/images/');
  }

  /**
   * Fallback cho trường hợp hình ảnh lỗi
   */
  static getImageWithFallback(primaryUrl?: string, fallbackUrl?: string, defaultEmoji: string = '🍰'): string {
    if (primaryUrl && this.isValidImageUrl(primaryUrl)) {
      return this.getFullImageUrl(primaryUrl);
    }
    
    if (fallbackUrl && this.isValidImageUrl(fallbackUrl)) {
      return this.getFullImageUrl(fallbackUrl);
    }
    
    return defaultEmoji;
  }
} 