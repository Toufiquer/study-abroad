// app/page-builder/preview/previewContent.tsx
// Preview Content
'use client';

import { useSearchParams } from 'next/navigation';
import { useGetPagesQuery } from '@/redux/features/page-builder/pageBuilderSlice';
import { Loader2, AlertCircle } from 'lucide-react';

import ClientSection1 from '@/components/all-section/section-1/Client';
import ClientSection2 from '@/components/all-section/section-2/Client';
import ClientSection3 from '@/components/all-section/section-3/Client';
import ClientSection4 from '@/components/all-section/section-4/Client';
import ClientSection5 from '@/components/all-section/section-5/Client';
import ClientSection6 from '@/components/all-section/section-6/Client';
import { IDefaltFullPageData } from '../store/data-index';

const ClientSectionRegistry = {
  'section-uid-1': ClientSection1,
  'section-uid-2': ClientSection2,
  'section-uid-3': ClientSection3,
  'section-uid-4': ClientSection4,
  'section-uid-5': ClientSection5,
  'section-uid-6': ClientSection6,
};

const PreviewContent = () => {
  const searchParams = useSearchParams();
  const pageId = searchParams.get('pageId');

  const { data, isLoading, error } = useGetPagesQuery({ page: 1, limit: 100 });

  if (!pageId) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
        <div className="bg-white/5 backdrop-blur-[8px] border border-white/20 p-8 rounded-lg text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">No Page ID</h1>
          <p className="text-white/70">Please provide a valid page ID in the URL</p>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white/60 mx-auto mb-4" />
          <p className="text-white/70">Loading page...</p>
        </div>
      </main>
    );
  }

  if (error || !data?.data?.pages) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
        <div className="bg-white/5 backdrop-blur-[8px] border border-red-500/40 p-8 rounded-lg text-center shadow-lg shadow-red-500/10">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Error Loading Pages</h1>
          <p className="text-white/70">Failed to load page data</p>
        </div>
      </main>
    );
  }

  const page: IDefaltFullPageData = data.data.pages.find((p: IDefaltFullPageData) => p._id === pageId);

  if (!page) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
        <div className="bg-white/5 backdrop-blur-[8px] border border-red-500/40 p-8 rounded-lg text-center shadow-lg shadow-red-500/10">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
          <p className="text-white/70">The page you are looking for does not exist</p>
        </div>
      </main>
    );
  }

  if (!page.isActive) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
        <div className="bg-white/5 backdrop-blur-[8px] border border-white/20 p-8 rounded-lg text-center">
          <AlertCircle className="h-12 w-12 text-white/60 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Page Inactive</h1>
          <p className="text-white/70">This page is currently inactive</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-white/5 backdrop-blur-[8px] border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">{page.pageTitle}</h1>
            <span className="text-sm text-white/50 font-mono bg-white/5 backdrop-blur-[8px] px-3 py-1 rounded border border-white/20">Preview Mode</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        {page.content && page.content.length > 0 ? (
          page.content.map(section => {
            const ClientComponent = ClientSectionRegistry[section.sectionUid as keyof typeof ClientSectionRegistry];

            if (!ClientComponent) {
              return (
                <div key={section._id} className="py-12">
                  <div className="max-w-7xl mx-auto px-8">
                    <div className="bg-white/5 backdrop-blur-[8px] border border-white/20 p-8 rounded-lg text-center">
                      <p className="text-white/70">Section &quot;{section.sectionUid}&quot; not found</p>
                    </div>
                  </div>
                </div>
              );
            }

            return <ClientComponent key={section._id} data={JSON.stringify(section.content) as string} />;
          })
        ) : (
          <div className="min-h-[60vh] flex items-center justify-center p-8">
            <div className="bg-white/5 backdrop-blur-[8px] border border-white/20 p-8 rounded-lg text-center">
              <p className="text-white/70 text-lg">No sections added to this page yet</p>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-white/5 backdrop-blur-[8px] border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-8 py-6 text-center">
          <p className="text-white/50 text-sm">{page.pageTitle} - Preview</p>
        </div>
      </footer>
    </main>
  );
};

export default PreviewContent;
