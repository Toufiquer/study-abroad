import Link from 'next/link';
import { defaultDataTitle, ITitleData, TitleProps } from './data';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

const QueryTitle = ({ data }: TitleProps) => {
  let titleData = defaultDataTitle;

  if (data && typeof data === 'string') {
    titleData = JSON.parse(data) as ITitleData;
  } else if (data) {
    titleData = data as ITitleData;
  }

  // 1. Map Text Size
  const sizeMap: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl md:text-5xl', // Responsive scaling
    '5xl': 'text-5xl md:text-6xl',
    '6xl': 'text-6xl md:text-7xl',
    '7xl': 'text-7xl md:text-8xl',
    '8xl': 'text-8xl md:text-9xl',
    '9xl': 'text-9xl',
  };

  // 2. Map Alignment
  const alignMap: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
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

  const containerClasses = cn(
    'w-full h-full flex items-center bg-transparent transition-all duration-300 ease-in-out',
    paddingMap[titleData.padding] || 'p-6',
    // If justified, we generally still want flex-col or block logic, but for a single title, block is safer
    titleData.textAlign === 'justify' ? 'block' : 'flex-col',
  );

  const textClasses = cn(
    'font-bold tracking-tight text-white leading-tight transition-all duration-300',
    sizeMap[titleData.textSize] || 'text-4xl',
    alignMap[titleData.textAlign] || 'text-center',
    titleData.isUnderline && 'underline decoration-blue-500/50 decoration-4 underline-offset-8',
    // Add a subtle hover effect if it's a link
    titleData.isLink && 'hover:text-blue-200 group-hover:scale-[1.01] origin-center',
  );

  // Helper to render the content
  const Content = () => (
    <h2 className={textClasses}>
      {titleData.text}
      {titleData.isLink && titleData.isNewTab && (
        <span className="inline-block ml-2 align-top opacity-0 group-hover:opacity-50 transition-opacity duration-300">
          <ExternalLink className="w-[0.4em] h-[0.4em]" />
        </span>
      )}
    </h2>
  );

  return (
    <div className={cn('group relative', containerClasses)}>
      {titleData.isLink ? (
        <Link
          href={titleData.url || '#'}
          target={titleData.isNewTab ? '_blank' : undefined}
          rel={titleData.isNewTab ? 'noopener noreferrer' : undefined}
          className="block w-full transition-opacity hover:opacity-90"
        >
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </div>
  );
};

export default QueryTitle;
