/*
|-----------------------------------------
| setting up SubPage Edit for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: App Generator, November, 2025
|-----------------------------------------
*/
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetPagesQuery, useUpdatePageMutation } from '@/redux/features/page-builder/pageBuilderSlice';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import LoadingComponent from '@/components/common/Loading';
import ErrorMessageComponent from '@/components/common/Error';
import { AddSectionDialog } from '../../components/add-section-dialog';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SectionCard } from '../../components/section-card';
import { useSectionStore } from '../../store/section-store';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { IDefaltFullPageData, SectionData } from '../../store/data-index';

interface SubPageData {
  _id?: string;
  pageTitle: string;
  pagePath: string;
  content: SectionData[];
  isActive: boolean;
}

const SubPageContent = () => {
  const searchParams = useSearchParams();
  const subPageId = searchParams.get('subPageId');
  const { data, isLoading, error } = useGetPagesQuery({ page: 1, limit: 100 });
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation();

  const [parentPage, setParentPage] = useState<IDefaltFullPageData | null>(null);
  const [foundSubPage, setFoundSubPage] = useState<SubPageData | null>(null);
  const [editedSubPageTitle, setEditedSubPageTitle] = useState('');
  const [editedSubPagePath, setEditedSubPagePath] = useState('');
  const [editedIsActive, setEditedIsActive] = useState(false);

  const { sectionList, setSections, reorderSections } = useSectionStore();

  useEffect(() => {
    const allPages: IDefaltFullPageData[] = data?.data?.pages || [];

    if (allPages.length > 0 && subPageId) {
      for (const page of allPages) {
        const subPage = page.subPage?.find(sp => sp._id === subPageId);
        if (subPage) {
          setParentPage(page);
          setFoundSubPage(subPage);
          setEditedSubPageTitle(subPage.pageTitle);
          setEditedSubPagePath(subPage.pagePath);
          setEditedIsActive(subPage.isActive);
          setSections(subPage.content || []);
          break;
        }
      }
    }
  }, [data?.data?.pages, subPageId, setSections]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sectionList.findIndex(s => s._id === active.id);
      const newIndex = sectionList.findIndex(s => s._id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  const handleSave = async () => {
    if (!parentPage?._id || !foundSubPage?._id) return;

    try {
      const sectionsWithSerial = sectionList.map((section, index) => ({
        sectionUid: section.sectionUid,
        serialNo: index + 1,
        isActive: section.isActive,
        data: {
          _id: section._id,
          title: section.title,
          picture: section.picture,
          content: section.content,
        },
      }));

      const updatedSubPages = (parentPage.subPage || []).map(sp => {
        if (sp._id === foundSubPage._id) {
          return {
            _id: sp._id,
            pageTitle: editedSubPageTitle,
            pagePath: editedSubPagePath,
            isActive: editedIsActive,
            content: sectionsWithSerial,
          };
        }

        const subPageContent = sp.content.map((section, index) => ({
          sectionUid: section.sectionUid,
          serialNo: index + 1,
          isActive: section.isActive,
          data: {
            _id: section._id,
            title: section.title,
            picture: section.picture,
            content: section.content,
          },
        }));

        return {
          _id: sp._id,
          pageTitle: sp.pageTitle,
          pagePath: sp.pagePath,
          isActive: sp.isActive,
          content: subPageContent,
        };
      });

      const parentPageContent = (parentPage.content || []).map((section, index) => ({
        sectionUid: section.sectionUid,
        serialNo: index + 1,
        isActive: section.isActive,
        data: {
          _id: section._id,
          title: section.title,
          picture: section.picture,
          content: section.content,
        },
      }));

      await updatePage({
        id: parentPage._id,
        pageTitle: parentPage.pageTitle,
        pagePath: parentPage.pagePath,
        isActive: parentPage.isActive,
        content: parentPageContent,
        subPage: updatedSubPages,
      }).unwrap();

      toast.success('Sub page saved successfully!');
    } catch (err) {
      console.error('Failed to update sub page:', err);
      toast.error('Failed to save sub page');
    }
  };

  const handleGoBack = () => {
    if (parentPage?._id) {
      window.location.href = `/page-builder/edit?pageId=${parentPage._id}`;
    } else {
      window.location.href = '/page-builder';
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorMessageComponent message="Error loading pages" />;
  }

  return (
    <main className="min-h-screen pt-[75px] flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative w-full max-w-6xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl" />

        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          {foundSubPage && parentPage ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Button onClick={handleGoBack} variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {parentPage.pageTitle}
                </Button>
              </div>

              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Edit Sub Page: {foundSubPage.pageTitle}</h2>
                    <p className="text-sm text-white/60 mt-1">Parent: {parentPage.pageTitle}</p>
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <label htmlFor="isActive" className="text-sm font-medium text-white/70">
                      Is Active
                    </label>
                    <Switch
                      id="isActive"
                      checked={editedIsActive}
                      onCheckedChange={setEditedIsActive}
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500/80"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Sub Page Title</label>
                    <input
                      type="text"
                      value={editedSubPageTitle}
                      onChange={e => setEditedSubPageTitle(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Sub Page Path</label>
                    <input
                      type="text"
                      value={editedSubPagePath}
                      onChange={e => setEditedSubPagePath(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-transparent py-8">
                <div className="max-w-7xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-white">
                        Page Sections <small className="text-xs">({sectionList.length})</small>
                      </h1>
                    </div>
                    <AddSectionDialog />
                  </div>

                  {sectionList.length > 0 ? (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={sectionList.map(s => s._id)} strategy={verticalListSortingStrategy}>
                        <div className="grid grid-cols-1 gap-6">
                          {sectionList.map(section => (
                            <SectionCard key={section._id} section={section} />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-white/80 text-lg mb-4">No sections added yet</p>
                      <p className="text-white/60">Click the &quot;Add Section&quot; button to get started</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex items-center justify-center">
                <Button onClick={handleSave} disabled={isUpdating} variant="outlineGlassy">
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                      Saving...
                    </>
                  ) : (
                    'Save All Changes'
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white tracking-tight">Not Found</h1>
              <p className="text-white/60">The Sub Page not found</p>
              <Button onClick={handleGoBack} variant="outlineGlassy" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <SubPageContent />
    </Suspense>
  );
};

export default Page;
