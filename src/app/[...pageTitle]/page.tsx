/*
|-----------------------------------------
| Static SSG Page (Server Component)
| @description: Pre-renders pages based on URL path at BUILD TIME
|-----------------------------------------
*/

import { notFound } from 'next/navigation';
import { cache } from 'react'; // Import cache
import { MousePointer2, Type, Layers, MonitorPlay, ImageIcon } from 'lucide-react';

// Import your existing component maps
import { AllSections, AllSectionsKeys } from '@/components/all-section/all-section-index/all-sections';
import { AllForms, AllFormsKeys } from '@/components/all-form/all-form-index/all-form';
import { AllTags, AllTagsKeys } from '@/components/all-tags/all-tags-index/all-tags';

import { ItemType, PageContent } from '@/app/dashboard/page-builder/utils';
import { getAllPages } from '../api/page-builder/v1/controller';

// --- Types ---
interface PageApiResponse {
  data: {
    pages: NormalizedPage[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
  status: number;
}

interface NormalizedPage {
  _id: string;
  pageName: string;
  path: string;
  isActive?: boolean;
  content: PageContent[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// --- Component Mappings ---
const AllTitles = AllTags;
const AllTitlesKeys = AllTagsKeys;
const AllDescriptions = AllTags;
const AllDescriptionsKeys = AllTagsKeys;
const AllParagraphs = AllTags;
const AllParagraphsKeys = AllTagsKeys;
const AllSliders = AllTags;
const AllSlidersKeys = AllTagsKeys;
const AllTagSliders = AllTags;
const AllTagSlidersKeys = AllTagsKeys;
const AllLogoSliders = AllTags;
const AllLogoSlidersKeys = AllTagsKeys;
const AllGalleries = AllTags;
const AllGalleriesKeys = AllTagsKeys;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMPONENT_MAP: Record<ItemType, { collection: any; keys: string[]; label: string; icon: any }> = {
  button: { collection: AllTags, keys: AllTagsKeys, label: 'Tags', icon: MousePointer2 },
  form: { collection: AllForms, keys: AllFormsKeys, label: 'Forms', icon: Type },
  section: { collection: AllSections, keys: AllSectionsKeys, label: 'Sections', icon: Layers },
  title: { collection: AllTitles, keys: AllTitlesKeys, label: 'Title', icon: Type },
  description: { collection: AllDescriptions, keys: AllDescriptionsKeys, label: 'Description', icon: Type },
  paragraph: { collection: AllParagraphs, keys: AllParagraphsKeys, label: 'Paragraph', icon: Type },
  sliders: { collection: AllSliders, keys: AllSlidersKeys, label: 'Sliders', icon: MonitorPlay },
  tagSliders: { collection: AllTagSliders, keys: AllTagSlidersKeys, label: 'Tag Slider', icon: MonitorPlay },
  logoSliders: { collection: AllLogoSliders, keys: AllLogoSlidersKeys, label: 'Logo Slider', icon: MonitorPlay },
  gellery: { collection: AllGalleries, keys: AllGalleriesKeys, label: 'Gallery', icon: ImageIcon },
};

// --- Data Fetching Logic (Cached) ---
// We use React cache() to ensure we fetch data once during build for all components
const getCachedAllPages = cache(async (): Promise<NormalizedPage[]> => {
  try {
    const pagesData = (await getAllPages()) as unknown as PageApiResponse;

    if (pagesData && Array.isArray(pagesData.data.pages)) {
      return getNormalizedPages(pagesData.data.pages.filter(i => i.isActive));
    }
    return [];
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
});

// --- Helper: Flatten Pages ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNormalizedPages(rawPages: any[]): NormalizedPage[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flattenPages = (list: any[]): NormalizedPage[] => {
    let results: NormalizedPage[] = [];
    list.forEach(item => {
      const norm: NormalizedPage = {
        ...item,
        _id: item._id,
        pageName: item.pageName || item.pageTitle || 'Untitled',
        // Ensure path starts with / for consistent matching
        path: (item.path || item.pagePath || '#').startsWith('/') ? item.path || item.pagePath : '/' + (item.path || item.pagePath),
        content: item.content || [],
      };
      results.push(norm);

      if (item.subPage && Array.isArray(item.subPage)) {
        results = [...results, ...flattenPages(item.subPage)];
      }
    });
    return results;
  };
  return flattenPages(rawPages);
}

// --- Component: SSR Item Renderer ---
const SSRItemRenderer = ({ item }: { item: PageContent }) => {
  if (!item.type || !COMPONENT_MAP[item.type]) return null;

  const mapEntry = COMPONENT_MAP[item.type];
  const config = mapEntry ? mapEntry.collection[item.key] : null;

  if (!mapEntry || !config) return null;

  let ComponentToRender;
  if (item.type === 'form') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentToRender = (config as any).FormField;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentToRender = (config as any).query;
  }

  if (!ComponentToRender) return null;

  return (
    <div className="w-full">
      {item.type !== 'form' ? (
        <ComponentToRender data={JSON.stringify(item.data)} />
      ) : (
        <div className="pointer-events-auto">
          <ComponentToRender data={item.data} />
        </div>
      )}
    </div>
  );
};

// --- Helper: Construct Path from Params ---
const constructPathFromParams = (slugs: string[]) => {
  if (!slugs || slugs.length === 0) return '/';
  return '/' + slugs.join('/');
};

// --- STATIC GENERATION: generateStaticParams ---
// This is the key function that makes it Static.
// It tells Next.js which routes to build.
export async function generateStaticParams() {
  const pages = await getCachedAllPages();
  return pages.map(page => {
    // Convert string path "/about/us" to array ["about", "us"]
    // If path is just "/", slug is [] (if using optional catch-all)
    const slug = page.path === '/' ? [] : page.path.split('/').filter(Boolean);

    return {
      pageTitle: slug,
    };
  });
}

// Optional: Control what happens for paths not returned by generateStaticParams
// true (default): Dynamic render on first request, then static
// false: 404 for any path not generated at build time
export const dynamicParams = true;

// --- Metadata Generator (SEO) ---
export async function generateMetadata({ params }: { params: Promise<{ pageTitle: string[] }> }) {
  const resolvedParams = await params;
  const pathString = constructPathFromParams(resolvedParams.pageTitle);

  const pages = await getCachedAllPages();
  const currentPage = pages.find(p => p.path === pathString);

  if (!currentPage) {
    return { title: 'Page Not Found' };
  }

  return {
    title: currentPage.pageName,
  };
}

// --- Main Page Component ---
export default async function StaticPage({ params }: { params: Promise<{ pageTitle: string[] }> }) {
  const resolvedParams = await params;
  const pathString = constructPathFromParams(resolvedParams.pageTitle);

  // 1. Fetch Data (Uses Cache)
  const pages = await getCachedAllPages();

  // 2. Find the matching page
  const currentPage = pages.find(p => p.path === pathString);

  // 3. Handle 404
  if (!currentPage) {
    notFound();
  }

  // 4. Extract Content
  const items: PageContent[] = Array.isArray(currentPage.content) ? currentPage.content : [];

  return (
    <main className="min-h-screen w-full bg-slate-950 pt-[80px]">
      {items.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-500 space-y-4">
          <p className="text-lg font-medium">Page &quot;{currentPage.pageName}&quot; Found</p>
          <p className="text-sm">But it has no content configured yet.</p>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          {items.map((item, index) => (
            <SSRItemRenderer key={item.id || index} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
