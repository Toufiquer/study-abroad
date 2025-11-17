// app/[...pageTitle]/page.tsx
// SSR Page

import { notFound } from 'next/navigation';
import { fetchAllPages, findPageByPath } from '@/lib/page-builder-api';
import { Page, SubPage } from '@/types/page-builder';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

import ClientSection1 from '@/components/all-section/section-1/Client';
import ClientSection2 from '@/components/all-section/section-2/Client';
import ClientSection3 from '@/components/all-section/section-3/Client';
import ClientSection4 from '@/components/all-section/section-4/Client';
import ClientSection5 from '@/components/all-section/section-5/Client';
import ClientSection6 from '@/components/all-section/section-6/Client';

const ClientSectionRegistry = {
  'section-uid-1': ClientSection1,
  'section-uid-2': ClientSection2,
  'section-uid-3': ClientSection3,
  'section-uid-4': ClientSection4,
  'section-uid-5': ClientSection5,
  'section-uid-6': ClientSection6,
};

interface PageProps {
  params: Promise<{
    pageTitle: string[];
  }>;
}

async function DynamicPage({ params }: PageProps) {
  const { pageTitle } = await params;

  try {
    const response = await fetchAllPages();
    const result = findPageByPath(response.data.pages, pageTitle);

    if (!result) {
      notFound();
    }

    const { type, data } = result;
    const pageData = data as Page | SubPage;
    if (!pageData.isActive) {
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
            <h1 className="text-2xl font-bold text-white">{pageData.pageTitle}</h1>
          </div>
        </div>

        <div className="w-full flex flex-col">
          {pageData.content.length === 0 ? (
            <div className="min-h-[60vh] flex items-center justify-center p-8">
              <div className="bg-white/5 backdrop-blur-[8px] border border-white/20 p-8 rounded-lg text-center">
                <p className="text-white/70 text-lg">No sections added to this page yet</p>
              </div>
            </div>
          ) : (
            pageData.content
              .filter(section => section.isActive)
              .sort((a, b) => a.serialNo - b.serialNo)
              .map(section => {
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

                return <ClientComponent key={section._id} data={JSON.stringify(section) as string} />;
              })
          )}
        </div>

        {type === 'page' && 'subPage' in data && data.subPage.length > 0 && data.subPage.filter(sub => sub.isActive).length > 0 && (
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="bg-white/5 backdrop-blur-[8px] border border-white/20 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-6">Subpages</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.subPage
                  .filter(sub => sub.isActive)
                  .map(subPage => (
                    <Link
                      key={subPage._id}
                      href={data.pagePath === '/' ? subPage.pagePath : `${data.pagePath}${subPage.pagePath}`}
                      className="bg-white/5 backdrop-blur-[8px] border border-white/20 p-6 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all"
                    >
                      <h3 className="font-medium text-white text-lg mb-2">{subPage.pageTitle}</h3>
                      <p className="text-sm text-white/50 font-mono">{subPage.pagePath}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error fetching page data:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetchAllPages();
    const params: { pageTitle: string[] }[] = [];

    response.data.pages.forEach(page => {
      if (page.isActive && page.pagePath !== '/') {
        const segments = page.pagePath.split('/').filter(Boolean);
        if (segments.length > 0) {
          params.push({ pageTitle: segments });
        }
      }

      page.subPage.forEach(subPage => {
        if (subPage.isActive) {
          const fullPath = page.pagePath === '/' ? subPage.pagePath : `${page.pagePath}${subPage.pagePath}`;
          const segments = fullPath.split('/').filter(Boolean);
          if (segments.length > 0) {
            params.push({ pageTitle: segments });
          }
        }
      });
    });

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export const dynamicParams = false;
export const dynamic = 'force-static';

export default DynamicPage;
