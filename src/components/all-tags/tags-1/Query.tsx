import Link from 'next/link';
import { defaultDataButton1, IButton1Data, Button1Props } from './data';

const QueryButton1 = ({ data }: Button1Props) => {
  // Initialize with default data
  let buttonData = defaultDataButton1;

  // Parse data if it comes as a JSON string
  if (data && typeof data === 'string') {
    buttonData = JSON.parse(data) as IButton1Data;
  }

  return (
    <div className="p-10 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl rounded-xl">
      <Link
        href={buttonData.buttonPath || '#'}
        target={buttonData.isNewTab ? '_blank' : undefined}
        rel={buttonData.isNewTab ? 'noopener noreferrer' : undefined}
        className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-purple-400 focus:outline-none"
      >
        {/* Icon Rendering */}
        {buttonData.buttonIcon && (
          <span className="flex items-center justify-center bg-white/20 rounded-full p-1">
            {/* If you have a specific Icon component, render it here using buttonData.buttonIcon. 
                For now, we render a generic icon if 'doc-icon' is present, or the text class. */}
            {buttonData.buttonIcon === 'doc-icon' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            ) : (
              // Fallback for other icon names
              <span className="text-xs font-mono">{buttonData.buttonIcon.substring(0, 2).toUpperCase()}</span>
            )}
          </span>
        )}

        {/* Button Name */}
        <span>{buttonData.buttonName || 'Click Here'}</span>

        {/* External Link Indicator (if isNewTab is true) */}
        {buttonData.isNewTab && (
          <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </Link>
    </div>
  );
};

export default QueryButton1;
