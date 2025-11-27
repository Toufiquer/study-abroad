import { defaultDataParagraph, IParagraphData, ParagraphProps } from './data';
import { cn } from '@/lib/utils';

const QueryParagraph = ({ data }: ParagraphProps) => {
  let paraData = defaultDataParagraph;

  if (data && typeof data === 'string') {
    paraData = JSON.parse(data) as IParagraphData;
  } else if (data) {
    paraData = data as IParagraphData;
  }

  // 1. Map Size
  const sizeMap: Record<string, string> = {
    xs: 'text-xs leading-relaxed',
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-snug',
    '2xl': 'text-2xl leading-snug',
    '3xl': 'text-3xl leading-tight',
  };

  // 2. Map Weight
  const weightMap: Record<string, string> = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  // 3. Map Padding
  const paddingMap: Record<string, string> = {
    none: 'p-0',
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
    '2xl': 'p-16',
  };

  // 4. Map Alignment
  const alignMap: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  return (
    <div className={cn('w-full transition-all duration-300 ease-in-out', paddingMap[paraData.padding] || 'p-6', alignMap[paraData.textAlign] || 'text-left')}>
      <p
        className={cn(
          'text-gray-200 whitespace-pre-wrap break-words',
          sizeMap[paraData.textSize] || 'text-base',
          weightMap[paraData.textWeight] || 'font-normal',
          paraData.isUnderline && 'underline decoration-gray-500/50 underline-offset-4',
        )}
        style={{ opacity: (paraData.opacity || 100) / 100 }}
      >
        {paraData.text}
      </p>
    </div>
  );
};

export default QueryParagraph;
