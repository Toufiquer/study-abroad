export interface DescriptionProps {
  data?: IDescriptionData | string;
}

export type DescSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type DescAlign = 'left' | 'center' | 'right' | 'justify';
export type DescPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IDescriptionData {
  content: string; // Stores HTML string
  textSize: DescSize;
  textAlign: DescAlign;
  isGlobalUnderline: boolean; // Forces underline on everything
  padding: DescPadding;
}

export const defaultDataDescription: IDescriptionData = {
  content: '<p>This is a <b>rich text</b> description. You can edit this content, add <i>styles</i>, and lists.</p>',
  textSize: 'base',
  textAlign: 'left',
  isGlobalUnderline: false,
  padding: 'md',
};
