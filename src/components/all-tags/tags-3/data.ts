export interface TitleProps {
  data?: ITitleData | string;
}

export type TitleSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

export type TitleAlign = 'left' | 'center' | 'right' | 'justify';

export type TitlePadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ITitleData {
  text: string;
  textSize: TitleSize;
  textAlign: TitleAlign;
  isUnderline: boolean;
  padding: TitlePadding;
  // Link Feature
  isLink: boolean;
  url: string;
  isNewTab: boolean;
}

export const defaultDataTitle: ITitleData = {
  text: 'Create Something Stunning',
  textSize: '5xl',
  textAlign: 'center',
  isUnderline: false,
  padding: 'md',
  isLink: false,
  url: '/',
  isNewTab: false,
};
