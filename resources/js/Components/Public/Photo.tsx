import React, { useState } from 'react';

interface PhotoProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    priority?: boolean;
    aspectRatio?: string;
}

export const Photo: React.FC<PhotoProps> = ({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    aspectRatio = '4/3',
}) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div
                className={`bg-piaud-ivory-dark border border-piaud-border flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
                style={{ aspectRatio, width, height }}
                role="img"
                aria-label={alt}
            >
                <div className="w-8 h-8 rounded-sm bg-piaud-emerald/10 text-piaud-emerald flex items-center justify-center text-xs font-bold mb-2">
                    IMG
                </div>
                <span className="text-xs text-piaud-slate-muted line-clamp-2 max-w-[200px]">
                    {alt}
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onError={() => setHasError(true)}
            className={`object-cover border border-piaud-border ${className}`}
            style={{ aspectRatio }}
        />
    );
};
