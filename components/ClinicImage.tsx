"use client";

import { useState } from 'react';

interface ClinicImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function ClinicImage({ 
  src, 
  alt, 
  className = "w-full h-full object-cover", 
  fallbackSrc = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
}: ClinicImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${hasError ? 'opacity-50 grayscale' : ''}`}
      onError={() => {
        if (!hasError) {
          setImgSrc(fallbackSrc);
          setHasError(true);
        }
      }}
    />
  );
}
