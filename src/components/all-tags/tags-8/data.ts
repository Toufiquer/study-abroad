export interface TagSliderProps {
  data?: ITagSliderData | string;
}

export interface ITagItem {
  id: string;
  text: string;
  link?: string;
}

export type NavPosition = 'middle-outside' | 'bottom-outside' | 'hidden';
export type TagStyle = 'glassy' | 'solid' | 'outline' | 'minimal';
export type ItemsPerSlide = 1 | 2 | 3 | 4 | 5 | 6;

export interface ITagSliderData {
  tags: ITagItem[];

  // Playback
  autoplaySpeed: number;
  isAutoplay: boolean;
  infiniteLoop: boolean;
  pauseOnHover: boolean;

  // Layout
  itemsPerSlide: ItemsPerSlide;
  navPosition: NavPosition;

  // Styling
  tagStyle: TagStyle;
  gap: 'sm' | 'md' | 'lg';
}

export const defaultDataTagSlider: ITagSliderData = {
  tags: [
    { id: '1', text: 'Technology', link: '#' },
    { id: '2', text: 'Design', link: '#' },
    { id: '3', text: 'Artificial Intelligence', link: '#' },
    { id: '4', text: 'Development', link: '#' },
    { id: '5', text: 'UI/UX', link: '#' },
    { id: '6', text: 'Business', link: '#' },
    { id: '7', text: 'Marketing', link: '#' },
  ],
  autoplaySpeed: 2500,
  isAutoplay: true,
  infiniteLoop: true,
  pauseOnHover: true,
  itemsPerSlide: 4,
  navPosition: 'middle-outside',
  tagStyle: 'glassy',
  gap: 'md',
};
