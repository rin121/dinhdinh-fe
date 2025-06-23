import { useState, useEffect } from 'react';

interface ImageAnimationsProps {
  children: React.ReactNode;
  delay?: number;
  animationType?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'bounceIn';
}

export default function ImageAnimations({ 
  children, 
  delay = 0, 
  animationType = 'fadeIn' 
}: ImageAnimationsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 transform translate-y-4 scale-95';
    
    switch (animationType) {
      case 'fadeIn':
        return 'opacity-100 transform translate-y-0 scale-100 transition-all duration-700 ease-out';
      case 'slideUp':
        return 'opacity-100 transform translate-y-0 transition-all duration-500 ease-out';
      case 'scaleIn':
        return 'opacity-100 transform scale-100 transition-all duration-600 ease-out';
      case 'bounceIn':
        return 'opacity-100 transform scale-100 transition-all duration-800 ease-bounce';
      default:
        return 'opacity-100 transform translate-y-0 scale-100 transition-all duration-700 ease-out';
    }
  };

  return (
    <div className={getAnimationClass()}>
      {children}
    </div>
  );
}

// Utility component cho shimmer effect
export function ShimmerEffect({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${className}`}>
      <div className="animate-shimmer"></div>
    </div>
  );
}

// CSS cho shimmer animation (cần thêm vào globals.css)
export const shimmerCSS = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200% 100%;
}

.ease-bounce {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
`; 