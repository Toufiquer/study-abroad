export interface ImagesProps {
  data?: IImagesData | string;
}

export type ImageFit = 'cover' | 'contain' | 'fill';
export type ImageAspectRatio = 'auto' | '1/1' | '16/9' | '4/3' | '3/4' | '3/2';
export type ImageAlign = 'left' | 'center' | 'right';
export type ImageWidth = 'auto' | '50%' | '75%' | '100%' | 'fixed-sm' | 'fixed-md' | 'fixed-lg';
export type GridColumns = 1 | 2 | 3 | 4;

export interface IImagesData {
  images: string[]; // Array of image URLs

  // Positioning & Layout
  alignment: ImageAlign;
  gridColumns: GridColumns;
  gap: 'sm' | 'md' | 'lg' | 'none';

  // Sizing
  width: ImageWidth;
  aspectRatio: ImageAspectRatio;
  objectFit: ImageFit;

  // Styling
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow: boolean;
}

export const defaultDataImages: IImagesData = {
  images: ['https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', 'https://images.unsplash.com/photo-1682687221038-404670201d45'],
  alignment: 'center',
  gridColumns: 2,
  gap: 'md',
  width: '100%',
  aspectRatio: '16/9',
  objectFit: 'cover',
  borderRadius: 'md',
  shadow: true,
};
