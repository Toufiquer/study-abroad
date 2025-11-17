'use client';

import { useState } from 'react';
import { useGetPagesQuery, useAddPageMutation, useDeletePageMutation, useUpdatePageMutation } from '@/redux/features/page-builder/pageBuilderSlice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogPortal,
  AlertDialogOverlay,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Eye, Edit, Trash2, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { IDefaltFullPageData } from './store/data-index';
import { Badge } from '@/components/ui/badge';
import { logger } from 'better-auth';

interface AddPageFormData {
  pageTitle: string;
  pagePath: string;
}

const Page = () => {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<IDefaltFullPageData | null>(null);
  const [formData, setFormData] = useState<AddPageFormData>({ pageTitle: '', pagePath: '' });
  const [isRevalidating, setIsRevalidating] = useState(false);

  const { data, isLoading, error } = useGetPagesQuery({ page: 1, limit: 100 });
  const [addPage, { isLoading: isAdding }] = useAddPageMutation();
  const [deletePage, { isLoading: isDeleting }] = useDeletePageMutation();
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation();

  const pages: IDefaltFullPageData[] = data?.data?.pages || [];

  const handleRevalidate = async () => {
    setIsRevalidating(true);
    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('All pages revalidated successfully');
      } else {
        toast.error(result.message || 'Failed to revalidate pages');
      }
    } catch (err) {
      logger.error('Failed to revalidate pages', err);
      toast.error('Failed to revalidate pages');
    } finally {
      setIsRevalidating(false);
    }
  };

  const handleAddPage = async () => {
    if (!formData.pageTitle.trim() || !formData.pagePath.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const pathExists = pages.some(p => p.pagePath === formData.pagePath);
    if (pathExists) {
      toast.error('Path already exists. Choose a new path or update the existing page.');
      return;
    }

    try {
      await addPage({
        pageTitle: formData.pageTitle,
        pagePath: formData.pagePath,
        content: [],
        subPage: [],
        isActive: true,
      }).unwrap();

      toast.success('Page created successfully');
      setFormData({ pageTitle: '', pagePath: '' });
      setOpen(false);
    } catch (err) {
      logger.error('Failed to create page', err);
      toast.error('Failed to create page');
    }
  };

  const handleDeletePage = (pageId: string) => {
    setSelectedPageId(pageId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePage({ id: selectedPageId }).unwrap();
      toast.success('Page deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedPageId('');
    } catch (err) {
      logger.error('Failed to delete page', err);
      toast.error('Failed to delete page');
    }
  };

  const handleToggleStatus = (page: IDefaltFullPageData) => {
    setSelectedPage(page);
    setToggleDialogOpen(true);
  };

  const handleToggleConfirm = async () => {
    if (!selectedPage) return;

    try {
      await updatePage({
        id: selectedPage._id,
        pageTitle: selectedPage.pageTitle,
        pagePath: selectedPage.pagePath,
        content: selectedPage.content,
        subPage: selectedPage.subPage,
        isActive: !selectedPage.isActive,
      }).unwrap();

      toast.success(`Page ${!selectedPage.isActive ? 'activated' : 'deactivated'} successfully`);
      setToggleDialogOpen(false);
      setSelectedPage(null);
    } catch (err) {
      logger.error('Failed to update page status', err);
      toast.error('Failed to update page status');
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-white/60" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="text-center text-red-400">Failed to load pages</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 pt-[75px] pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white">All Pages</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 transition-all hover:scale-105 bg-white/10 backdrop-blur-[8px] border border-white/20 text-white hover:bg-white/20">
                <Plus className="h-4 w-4" />
                Add Page
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in" />
              <DialogContent className="z-50 bg-slate-900/95 border border-white/20 text-white backdrop-blur-[8px]">
                <DialogHeader>
                  <DialogTitle>Add New Page</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="pageTitle">Page Title</Label>
                    <Input
                      id="pageTitle"
                      value={formData.pageTitle}
                      onChange={e => setFormData(prev => ({ ...prev, pageTitle: e.target.value }))}
                      placeholder="Home Page"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pagePath">Page Path</Label>
                    <Input
                      id="pagePath"
                      value={formData.pagePath}
                      onChange={e => setFormData(prev => ({ ...prev, pagePath: e.target.value }))}
                      placeholder="/home"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <Button onClick={handleAddPage} disabled={isAdding} className="w-full">
                    {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Page'}
                  </Button>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page, index) => (
            <Card
              key={page._id}
              className={`
                bg-white/5 backdrop-blur-[8px] p-6 
                transition-all duration-500 hover:scale-[1.02] hover:bg-white/10
                animate-slide-up overflow-hidden
                ${page.isActive ? 'border border-green-500/40 shadow-lg shadow-green-500/10' : 'border border-red-500/40 shadow-lg shadow-red-500/10'}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between pb-4 border-b border-white/10">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white mb-2 truncate">{page.pageTitle}</h3>
                    <p className="text-xs text-white/50 font-mono bg-white/5 px-2 py-1 rounded inline-block">{page.pagePath}</p>
                  </div>
                  <div className="flex items-end gap-2 ml-3">
                    <Badge variant={page.isActive ? 'outlineGarden' : 'outlineFire'} className="text-white">
                      {page.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Switch
                      checked={page.isActive}
                      onCheckedChange={() => handleToggleStatus(page)}
                      className="data-[state=checked]:bg-green-500/50 data-[state=unchecked]:bg-red-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white/70">Sections</h4>
                    <span className="text-xs bg-white/10 backdrop-blur-[8px] text-white/70 px-3 py-1 rounded-full border border-white/20">
                      {page.content.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white/70">Sub Pages</h4>
                    <span className="text-xs bg-white/10 backdrop-blur-[8px] text-white/70 px-3 py-1 rounded-full border border-white/20">
                      {page.subPage.length}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-end gap-6">
                    <Link target="_blank" href={`/page-builder/preview?pageId=${encodeURIComponent(page._id)}`} className="text-blue-400 hover:text-blue-100">
                      <Eye className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    </Link>
                    <Link target="_blank" href={`/page-builder/edit?pageId=${encodeURIComponent(page._id)}`} className="text-blue-400 hover:text-blue-100">
                      <Edit className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Link>
                    <button onClick={() => handleDeletePage(page._id)} className="text-rose-400 hover:text-rose-100">
                      <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {pages.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-block p-8 rounded-2xl bg-white/5 backdrop-blur-[8px] border border-white/10">
              <p className="text-white/70 text-lg">No pages yet. Create your first page to get started.</p>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-scale-in">
        <Button
          onClick={handleRevalidate}
          disabled={isRevalidating}
          className="gap-2 px-8 py-6 text-lg shadow-2xl transition-all hover:scale-105 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-[8px] border-2 border-white/30 text-white hover:from-blue-500/30 hover:to-purple-500/30"
        >
          <RefreshCw className={`h-5 w-5 ${isRevalidating ? 'animate-spin' : ''}`} />
          {isRevalidating ? 'Revalidating...' : 'Revalidate All Pages'}
        </Button>
      </div>

      <AlertDialog open={toggleDialogOpen} onOpenChange={setToggleDialogOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in" />
          <AlertDialogContent className="z-50 bg-slate-900/95 border border-white/20 text-white backdrop-blur-[8px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">Confirm Status Change</AlertDialogTitle>
              <AlertDialogDescription className="text-white/70 text-base">
                Are you sure you want to {selectedPage?.isActive ? 'deactivate' : 'activate'}{' '}
                <span className="font-bold text-white">{selectedPage?.pageTitle}</span>?
                <br />
                <span className={selectedPage?.isActive ? 'text-red-400' : 'text-green-400'}>
                  This will {selectedPage?.isActive ? 'hide' : 'show'} the page from public view.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/5 border-white/20 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleToggleConfirm} disabled={isUpdating} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in" />
          <AlertDialogContent className="z-50 bg-slate-900/95 border border-white/20 text-white backdrop-blur-[8px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">Delete Page</AlertDialogTitle>
              <AlertDialogDescription className="text-white/70 text-base">
                This action cannot be undone. This will permanently delete the page and all its content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/5 border-white/20 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="bg-red-500/20 border-red-400/50 text-red-100 hover:bg-red-500/30"
              >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.7s ease-out backwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </main>
  );
};

export default Page;
