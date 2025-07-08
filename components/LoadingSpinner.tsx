'use client';

import { useState, useEffect } from 'react';
import { Car, Zap, Fuel, Settings, Gauge, CircleDot, Flame } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  variant?: 'default' | 'car' | 'electric' | 'sports';
}

export default function LoadingSpinner({ 
  message = "Loading...", 
  variant = 'car' 
}: LoadingSpinnerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadingText, setLoadingText] = useState(message);

  useEffect(() => {
    const frames = ['⚡', '🚗', '💨', '🏁'];
    const texts = [
      'Starting engine...',
      'Shifting gears...',
      'Accelerating...',
      'Almost there!'
    ];

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = (prev + 1) % frames.length;
        setLoadingText(texts[next]);
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const renderCarAnimation = () => {
    return (
      <div className="relative w-32 h-20 mx-auto mb-6">
        {/* Road */}
        <div className="absolute bottom-0 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gray-400 to-gray-500 animate-pulse"></div>
        </div>
        
        {/* Car with Icon */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-10 flex items-center justify-center">
          <Car className="w-12 h-12 text-blue-600 animate-bounce" />
        </div>
        
        <div className="absolute top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-pulse"></div>
      </div>
    );
  };

  const renderElectricAnimation = () => {
    return (
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
      </div>
    );
  };

  const renderSportsAnimation = () => {
    return (
     <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
      </div>
    );
  };

  const renderDefaultAnimation = () => {
    return (
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
      </div>
    );
  };

  const renderAnimation = () => {
    switch (variant) {
      case 'car':
        return renderCarAnimation();
      case 'electric':
        return renderElectricAnimation();
      case 'sports':
        return renderSportsAnimation();
      default:
        return renderDefaultAnimation();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {renderAnimation()}
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate-pulse">
          {loadingText}
        </h3>
      </div>
      
      <div className="mt-6 max-w-md text-center">
        <p className="text-xs text-gray-500 italic">
          {variant === 'electric' && "⚡ Did you know? Electric cars can accelerate faster than most gas cars!"}
          {variant === 'sports' && "🏎️ Fun fact: The fastest production car can reach 300+ mph!"}
          {variant === 'car' && "🚗 Loading the latest automotive insights for you..."}
          {variant === 'default' && "🔧 Preparing your automotive experience..."}
        </p>
      </div>
    </div>
  );
}
