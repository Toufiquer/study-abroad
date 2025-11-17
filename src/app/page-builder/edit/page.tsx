/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: App Generator, November, 2025
|-----------------------------------------
*/
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetPagesQuery, useUpdatePageMutation } from '@/redux/features/page-builder/pageBuilderSlice';
import { Switch } from '@/components/ui/switch';
import LoadingComponent from '@/components/common/Loading';
import ErrorMessageComponent from '@/components/common/Error';
import { AddSectionDialog } from '../components/add-section-dialog';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SectionCard } from '../components/section-card';
import { useSectionStore } from '../store/section-store';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { IDefaltFullPageData, SectionData } from '../store/data-index';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SubPageData {
  _id?: string;
  pageTitle: string;
  pagePath: string;
  content: SectionData[];
  isActive: boolean;
}

const PageContent = () => {
  const searchParams = useSearchParams();
  const pageId = searchParams.get('pageId');
  const { data, isLoading, error } = useGetPagesQuery({ page: 1, limit: 100 });
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation();
  const allPages: IDefaltFullPageData[] = data?.data?.pages || [];
  const foundPage = allPages.find(page => page._id === pageId);
  const [editedPageTitle, setEditedPageTitle] = useState('');
  const [editedPagePath, setEditedPagePath] = useState('');
  const [editedIsActive, setEditedIsActive] = useState(false);
  const [subPageList, setSubPageList] = useState<SubPageData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSubPageTitle, setNewSubPageTitle] = useState('');
  const [newSubPagePath, setNewSubPagePath] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subPageToDelete, setSubPageToDelete] = useState<SubPageData | null>(null);

  const { sectionList, setSections, reorderSections } = useSectionStore();

  useEffect(() => {
    if (foundPage) {
      setEditedPageTitle(foundPage.pageTitle);
      setEditedPagePath(foundPage.pagePath);
      setEditedIsActive(foundPage.isActive);
      const foundedContent: SectionData[] = foundPage.content || [];
      if (foundPage.content) {
        setSections(foundedContent);
      }
      setSubPageList(foundPage.subPage || []);
    }
  }, [foundPage, setSections]);

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

  const handleOpenDialog = () => {
    setNewSubPageTitle('');
    setNewSubPagePath('');
    setIsDialogOpen(true);
  };

  const handleAddSubPage = () => {
    if (!newSubPageTitle.trim()) {
      toast.error('Sub page title is required');
      return;
    }
    if (!newSubPagePath.trim()) {
      toast.error('Sub page path is required');
      return;
    }
    if (!newSubPagePath.startsWith('/')) {
      toast.error('Sub page path must start with "/"');
      return;
    }

    const fullPath = `${editedPagePath}${newSubPagePath}`;

    const newSubPage: SubPageData = {
      _id: `temp-${Date.now()}`,
      pageTitle: newSubPageTitle.trim(),
      pagePath: fullPath,
      content: [],
      isActive: true,
    };

    setSubPageList(prev => [...prev, newSubPage]);
    toast.success('Sub page added to changes');
    setIsDialogOpen(false);
  };

  const handleOpenDeleteDialog = (subPage: SubPageData) => {
    setSubPageToDelete(subPage);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (subPageToDelete) {
      setSubPageList(prev => prev.filter(sp => sp._id !== subPageToDelete._id));
      toast.success('Sub page removed from changes');
      setDeleteDialogOpen(false);
      setSubPageToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSubPageToDelete(null);
  };

  const handleSave = async () => {
    if (!foundPage?._id) return;

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

      const subPagesWithoutTempIds = subPageList.map(({ _id, ...rest }) => {
        const subPageContent = rest.content.map((section, index) => ({
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

        if (_id?.startsWith('temp-')) {
          return {
            pageTitle: rest.pageTitle,
            pagePath: rest.pagePath,
            isActive: rest.isActive,
            content: subPageContent,
          };
        }
        return {
          _id,
          pageTitle: rest.pageTitle,
          pagePath: rest.pagePath,
          isActive: rest.isActive,
          content: subPageContent,
        };
      });

      await updatePage({
        id: foundPage._id,
        pageTitle: editedPageTitle,
        pagePath: editedPagePath,
        isActive: editedIsActive,
        content: sectionsWithSerial,
        subPage: subPagesWithoutTempIds,
      }).unwrap();

      toast.success('Page saved successfully!');
    } catch (err) {
      console.error('Failed to update page:', err);
      toast.error('Failed to save page');
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
          {foundPage ? (
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Edit: {foundPage.pageTitle}</h2>
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
                    <label className="block text-sm font-medium text-white/70 mb-2">Page Title</label>
                    <input
                      type="text"
                      value={editedPageTitle}
                      onChange={e => setEditedPageTitle(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Page Path</label>
                    <input
                      type="text"
                      value={editedPagePath}
                      onChange={e => setEditedPagePath(e.target.value)}
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

              <div className="bg-transparent py-8">
                <div className="max-w-7xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-white">
                        Sub Pages <small className="text-xs">({subPageList.length})</small>
                      </h1>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={handleOpenDialog} variant="outlineGlassy">
                          Add Sub Page
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="backdrop-blur-xl bg-white/10 border border-white/20 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-white">Add New Sub Page</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="subpage-title" className="text-white/90">
                              Sub Page Title
                            </Label>
                            <Input
                              id="subpage-title"
                              value={newSubPageTitle}
                              onChange={e => setNewSubPageTitle(e.target.value)}
                              placeholder="Enter sub page title"
                              className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-purple-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subpage-path" className="text-white/90">
                              Sub Page Path
                            </Label>
                            <div className="flex items-center gap-0">
                              <Input
                                readOnly
                                value={editedPagePath}
                                className="bg-white/5 border-white/20 text-white/70 rounded-r-none border-r-0 cursor-not-allowed"
                              />
                              <Input
                                id="subpage-path"
                                value={newSubPagePath}
                                onChange={e => setNewSubPagePath(e.target.value)}
                                placeholder="/path"
                                className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-purple-500 rounded-l-none"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                            Cancel
                          </Button>
                          <Button onClick={handleAddSubPage} variant="outlineGlassy">
                            Add
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {subPageList.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {subPageList.map((subPage, index) => (
                        <div
                          key={subPage._id || index}
                          className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-white">{subPage.pageTitle}</h3>
                              <p className="text-sm text-white/60 mt-1">{subPage.pagePath}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded ${subPage.isActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}
                                >
                                  {subPage.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <span className="text-xs text-white/50">
                                  {subPage.content?.length || 0} section{subPage.content?.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => {
                                  window.location.href = `/page-builder/edit/subpage?subPageId=${subPage._id}`;
                                }}
                                variant="outlineGlassy"
                                size="sm"
                              >
                                Edit
                              </Button>
                              <Button onClick={() => handleOpenDeleteDialog(subPage)} variant="destructive" size="sm">
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-white/80 text-lg mb-4">No sub pages added yet</p>
                      <p className="text-white/60">Click the &quot;Add Sub Page&quot; button to get started</p>
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
              <p className="text-white/60">The Page not found</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="backdrop-blur-xl bg-white/10 border border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to delete &quot;{subPageToDelete?.pageTitle}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button onClick={handleCancelDelete} variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
