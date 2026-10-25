import React, { useState } from 'react';
import { DestinationIllustration } from './DestinationIllustrations';

interface Props {
  src: string;
  alt: string;
  fallbackDestinationId?: string;
  className?: string;
  overlayGradient?: boolean;
  aspectRatio?: string;
  priority?: boolean;
}

export const ImageWithFallback: React.FC<Props> = ({
  src,
  alt,
  fallbackDestinationId = 'india',
  className = 'w-full h-full object-cover',
  overlayGradient = true,
  aspectRatio,
  priority = false
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden w-full h-full bg-slate-900 ${aspectRatio || ''}`}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
      )}

      {/* Render Real Image or Fallback */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      ) : (
        /* Resilient Bespoke Vector SVG Fallback */
        <div className="w-full h-full">
          <DestinationIllustration destinationId={fallbackDestinationId} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Legibility Gradient Overlay */}
      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/40 to-transparent pointer-events-none z-10" />
      )}
    </div>
  );
};
