import Image from 'next/image';
import { defaultDataImages, IImagesData, ImagesProps } from './data';
import { cn } from '@/lib/utils';

const QueryImages = ({ data }: ImagesProps) => {
  let imageData = defaultDataImages;

  if (data && typeof data === 'string') {
    imageData = JSON.parse(data) as IImagesData;
  } else if (data) {
    imageData = data as IImagesData;
  }

  const validImages = imageData.images.filter(url => url && url.trim().length > 0);
  if (validImages.length === 0) return null;

  // 1. Map Alignment (Container)
  const alignClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[imageData.alignment];

  // 2. Map Width (Container)
  const widthClass = {
    auto: 'w-auto',
    '100%': 'w-full',
    '75%': 'w-3/4',
    '50%': 'w-1/2',
    'fixed-sm': 'w-[200px]',
    'fixed-md': 'w-[400px]',
    'fixed-lg': 'w-[600px]',
  }[imageData.width];

  // 3. Map Aspect Ratio (Image Wrapper)
  const aspectClass = {
    auto: 'aspect-auto',
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/4': 'aspect-[3/4]',
    '3/2': 'aspect-[3/2]',
  }[imageData.aspectRatio];

  // 4. Grid Configuration
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[imageData.gridColumns];

  const gapClass = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-8',
  }[imageData.gap];

  // 5. Style Mapping
  const radiusClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[imageData.borderRadius];

  return (
    <div className={cn('w-full flex', alignClass, 'p-4')}>
      <div
        className={cn(
          'grid',
          widthClass,
          gapClass,
          // Only apply grid cols if we actually have enough images to warrant a grid
          // otherwise it might look weird if width is fixed
          validImages.length > 1 ? gridClass : 'grid-cols-1',
        )}
      >
        {validImages.map((url, idx) => (
          <div
            key={idx}
            className={cn(
              'relative overflow-hidden bg-gray-100/5',
              aspectClass,
              radiusClass,
              imageData.shadow && 'shadow-lg shadow-black/10',
              // If it's 'auto' aspect ratio, we let the image define height, else we force relative wrapper
              imageData.aspectRatio !== 'auto' ? 'h-full w-full' : '',
            )}
          >
            <Image
              width={200}
              height={200}
              src={url}
              alt={`Gallery item ${idx + 1}`}
              className={cn(
                'w-full h-full transition-transform duration-500 hover:scale-105',
                imageData.aspectRatio !== 'auto' ? 'absolute inset-0' : 'relative',
                imageData.objectFit === 'cover' ? 'object-cover' : imageData.objectFit === 'contain' ? 'object-contain' : 'object-fill',
              )}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryImages;
