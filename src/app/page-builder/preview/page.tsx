// app/page-builder/preview/page.tsx
// Preview Page
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import PreviewContent from './previewContent';

const PreviewPage = () => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white/60" />
        </main>
      }
    >
      <PreviewContent />
    </Suspense>
  );
};

export default PreviewPage;
