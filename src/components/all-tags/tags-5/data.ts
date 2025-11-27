export interface ParagraphProps {
  data?: IParagraphData | string;
}

export type ParaSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type ParaAlign = 'left' | 'center' | 'right' | 'justify';
export type ParaPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ParaWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export interface IParagraphData {
  text: string;
  textSize: ParaSize;
  textAlign: ParaAlign;
  textWeight: ParaWeight;
  isUnderline: boolean;
  padding: ParaPadding;
  opacity: number; // 0 to 100
}

export const defaultDataParagraph: IParagraphData = {
  text: 'This is a standard paragraph component. It respects line breaks\nand simple text formatting.\n\nPerfect for standard content blocks.',
  textSize: 'base',
  textAlign: 'left',
  textWeight: 'normal',
  isUnderline: false,
  padding: 'md',
  opacity: 90,
};
