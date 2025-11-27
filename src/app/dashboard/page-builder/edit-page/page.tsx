/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: App-Generator, November, 2025
|-----------------------------------------
*/

'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Edit,
  GripVertical,
  Plus,
  Save,
  Trash2,
  AlertTriangle,
  Eye,
  MousePointer2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Type,
  Image as ImageIcon,
  Layers,
  MonitorPlay,
  ChevronDown,
  LayoutGrid,
  FolderOpen,
  RefreshCw,
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { AllSections, AllSectionsKeys } from '@/components/all-section/all-section-index/all-sections';
import { AllForms, AllFormsKeys } from '@/components/all-form/all-form-index/all-form';
import { AllTags, AllTagsKeys } from '@/components/all-tags/all-tags-index/all-tags';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ItemType, PageContent } from '../utils';
import { useGetPagesQuery, useUpdatePageMutation } from '@/redux/features/page-builder/pageBuilderSlice';
import { toast } from 'sonner';

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
const COMPONENT_MAP: Record<ItemType, { collection: any; keys: string[]; label: string; icon: any; color: string }> = {
  // Core 4 Categories
  button: { collection: AllTags, keys: AllTagsKeys, label: 'Tags', icon: MousePointer2, color: 'text-orange-400 from-orange-500 to-red-500' },
  form: { collection: AllForms, keys: AllFormsKeys, label: 'Forms', icon: Type, color: 'text-blue-400 from-cyan-500 to-blue-500' },
  section: { collection: AllSections, keys: AllSectionsKeys, label: 'Sections', icon: Layers, color: 'text-purple-400 from-purple-500 to-pink-500' },

  // Legacy / Other Types
  title: { collection: AllTitles, keys: AllTitlesKeys, label: 'Title', icon: Type, color: 'text-gray-400' },
  description: { collection: AllDescriptions, keys: AllDescriptionsKeys, label: 'Description', icon: Type, color: 'text-gray-400' },
  paragraph: { collection: AllParagraphs, keys: AllParagraphsKeys, label: 'Paragraph', icon: Type, color: 'text-gray-400' },
  sliders: { collection: AllSliders, keys: AllSlidersKeys, label: 'Sliders', icon: MonitorPlay, color: 'text-gray-400' },
  tagSliders: { collection: AllTagSliders, keys: AllTagSlidersKeys, label: 'Tag Slider', icon: MonitorPlay, color: 'text-gray-400' },
  logoSliders: { collection: AllLogoSliders, keys: AllLogoSlidersKeys, label: 'Logo Slider', icon: MonitorPlay, color: 'text-gray-400' },
  gellery: { collection: AllGalleries, keys: AllGalleriesKeys, label: 'Gallery', icon: ImageIcon, color: 'text-gray-400' },
};

// --- Helper Styles ---
const getTypeStyles = (type: ItemType) => {
  switch (type) {
    case 'form':
      return {
        border: 'border-blue-500/30 hover:border-blue-400/60',
        bg: 'bg-slate-900/60',
        badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
        icon: 'text-blue-400',
        glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]',
      };
    case 'button': // Tags
      return {
        border: 'border-orange-500/30 hover:border-orange-400/60',
        bg: 'bg-slate-900/60',
        badge: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
        icon: 'text-orange-400',
        glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]',
      };
    default: // section
      return {
        border: 'border-purple-500/30 hover:border-purple-400/60',
        bg: 'bg-slate-900/40',
        badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
        icon: 'text-purple-400',
        glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]',
      };
  }
};

interface SortableItemProps {
  item: PageContent;
  onEdit: (item: PageContent) => void;
  onPreview: (item: PageContent) => void;
  onDelete: (item: PageContent) => void;
  onInlineUpdate: (item: PageContent, newData: unknown) => void;
  onOpenMoveDialog: (item: PageContent) => void;
}

// --- Sub-Component: Sortable Item Card ---
const SortableItem = ({ item, onEdit, onPreview, onDelete, onInlineUpdate, onOpenMoveDialog }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Safe check for component mapping
  const mapEntry = COMPONENT_MAP[item.type];
  const config = mapEntry ? mapEntry.collection[item.key] : null;

  // Fallback if data is corrupted or type is missing
  if (!mapEntry || !config) {
    return (
      <div ref={setNodeRef} style={style} className="p-4 border border-red-500/30 bg-red-500/10 rounded-xl flex items-center justify-between">
        <div className="text-red-400 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>Unknown Component Type: {item.type || 'Undefined'}</span>
        </div>
        <Button onClick={() => onDelete(item)} size="sm" variant="outlineFire" className="h-8 w-8 p-0">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  let ComponentToRender;
  if (item.type === 'form') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentToRender = (config as any).FormField;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentToRender = (config as any).query;
  }

  const styles = getTypeStyles(item.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group animate-in fade-in-50 slide-in-from-bottom-6 duration-700 ${isDragging ? 'opacity-40 scale-95 z-50' : 'z-0'}`}
    >
      <div className={`relative backdrop-blur-3xl shadow-xl transition-all duration-300 overflow-hidden rounded-xl border ${styles.border} ${styles.bg} ${styles.glow}`}>
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          {/* Card Header */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-20 border-b border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <button onClick={() => onOpenMoveDialog(item)} className="md:hidden p-2 rounded-full hover:bg-white/10 text-yellow-400 transition-all">
                <ArrowUpDown className="h-4 w-4" />
              </button>
              <button
                {...attributes}
                {...listeners}
                className={`cursor-grab active:cursor-grabbing p-1.5 rounded-lg hover:bg-white/10 transition-colors ${styles.icon}`}
              >
                <GripVertical className="h-5 w-5" />
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-200 tracking-wide truncate max-w-[150px]">{item.heading || item.key}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              {item.type !== 'form' ? (
                <Button onClick={() => onEdit(item)} size="sm" className="min-w-1" variant="outlineGlassy">
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={() => onPreview(item)} size="sm" className="min-w-1" variant="outlineGlassy">
                  <Eye className="h-4 w-4" />
                </Button>
              )}

              <Button onClick={() => onDelete(item)} size="sm" className="min-w-1" variant="outlineGlassy">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 pt-16 text-slate-300 min-h-[100px]">
            <div className="z-10 pointer-events-none select-none opacity-90 group-hover:opacity-100 transition-opacity">
              {ComponentToRender && (
                item.type !== 'form' ? (
                  <ComponentToRender data={JSON.stringify(item.data)} />
                ) : (
                  <div className="pointer-events-auto">
                    <ComponentToRender data={item.data} onSubmit={(newData: unknown) => onInlineUpdate(item, newData)} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Normalized Interface to handle inconsistent API data
interface NormalizedPage {
  _id: string;
  pageName: string;
  path: string;
  content: PageContent[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Main component wrapped in Suspense
function EditPageContent() {
  const searchParams = useSearchParams();
  const pathTitle = searchParams.get('pathTitle') || '/';

  // Redux hooks
  const { data: pagesData, isLoading, error, refetch } = useGetPagesQuery({ page: 1, limit: 1000 });
  const [updatePage] = useUpdatePageMutation();

  // 1. NORMALIZE DATA: Handle inconsistencies in DB (pages vs data.pages, subPages, pagePath vs path)
  const normalizedPages = useMemo(() => {
    // FIX: Access .data.pages if it exists, otherwise fallback
    const rawPages = pagesData?.data?.pages || pagesData?.pages || [];
    if (!rawPages.length) return [];

    // Recursive function to flatten subPages and normalize keys
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattenPages = (list: any[]): NormalizedPage[] => {
      let results: NormalizedPage[] = [];
      list.forEach((item) => {
        const norm: NormalizedPage = {
          ...item,
          _id: item._id,
          pageName: item.pageName || item.pageTitle || 'Untitled',
          path: item.path || item.pagePath || '#',
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
  }, [pagesData]);

  // 2. FIND CURRENT PAGE
  const currentPage = useMemo(() => {
    return normalizedPages.find((p) => p.path === pathTitle);
  }, [normalizedPages, pathTitle]);

  // States
  const [items, setItems] = useState<PageContent[]>([]);
  const [editingItem, setEditingItem] = useState<PageContent | null>(null);
  const [previewingItem, setPreviewingItem] = useState<PageContent | null>(null);
  const [deletingItem, setDeletingItem] = useState<PageContent | null>(null);
  const [movingItem, setMovingItem] = useState<PageContent | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeAddType, setActiveAddType] = useState<ItemType | null>(null);
  const [, setIsScrolled] = useState(false);
  const [isDockExpanded, setIsDockExpanded] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load page content when data is available
  useEffect(() => {
    if (currentPage?.content) {
      // Ensure content is an array and try to be safe with types
      setItems(Array.isArray(currentPage.content) ? currentPage.content : []);
    }
  }, [currentPage]);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Handlers ---
  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems(prevItems => {
        const oldIndex = prevItems.findIndex(item => item.id === active.id);
        const newIndex = prevItems.findIndex(item => item.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleMoveUp = () => {
    if (!movingItem) return;
    const index = items.findIndex(item => item.id === movingItem.id);
    if (index > 0) setItems(prevItems => arrayMove(prevItems, index, index - 1));
  };

  const handleMoveDown = () => {
    if (!movingItem) return;
    const index = items.findIndex(item => item.id === movingItem.id);
    if (index < items.length - 1) setItems(prevItems => arrayMove(prevItems, index, index + 1));
  };

  const handleAddItem = (type: ItemType, key: string) => {
    const mapEntry = COMPONENT_MAP[type];
    const config = mapEntry.collection[key];
    const newItem: PageContent = {
      id: `${type}-${key}-${Date.now()}`,
      key: key,
      type: type,
      heading: `${mapEntry.label} ${key}`,
      path: `/${key}`,
      data: config.data,
    };
    setItems([...items, newItem]);
    setActiveAddType(null);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
  };

  const handleEdit = (item: PageContent) => setEditingItem(item);
  const handlePreview = (item: PageContent) => setPreviewingItem(item);
  const handleDeleteClick = (item: PageContent) => setDeletingItem(item);
  const handleOpenMoveDialog = (item: PageContent) => setMovingItem(item);

  const handleConfirmDelete = () => {
    if (deletingItem) {
      setItems(items.filter(item => item.id !== deletingItem.id));
      setDeletingItem(null);
    }
  };

  const onSubmitEdit = (updatedData: unknown) => {
    if (editingItem) setItems(items.map(item => (item.id === editingItem.id ? { ...item, data: updatedData } : item)));
    setEditingItem(null);
  };

  const handleInlineUpdate = (targetItem: PageContent, updatedData: unknown) => {
    setItems(prevItems => prevItems.map(item => (item.id === targetItem.id ? { ...item, data: updatedData } : item)));
  };

  const handleSubmitAll = async () => {
    if (!currentPage?._id) {
      toast.error('Page context lost. Please refresh.');
      return;
    }

    setIsSaving(true);
    try {
      await updatePage({
        id: currentPage._id,
        content: items,
      }).unwrap();

      toast.success('Page saved successfully!');
    } catch (err) {
      toast.error('Failed to save page');
      console.error('Error saving page:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const topMenuButtons: ItemType[] = ['button', 'form', 'section'];

  // --- ERROR STATE ---
  if (error) {
    const errorMessage = 'status' in error 
      ? `Error ${error.status}: ${JSON.stringify(error.data)}`
      : 'message' in error 
      ? error.message 
      : 'An unexpected error occurred';

    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-500 max-w-lg">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/30 blur-3xl rounded-full" />
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl">
              <AlertTriangle className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Failed to Load Page Data</h2>
            <p className="text-slate-400 text-lg">
              We encountered an error while fetching the page data.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-left w-full overflow-hidden">
                <p className="text-red-400 text-xs font-mono break-all">
                {errorMessage}
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <Button 
              onClick={() => window.location.href = '/page-builder'} 
              variant="outlineGlassy"
              className="gap-2"
            >
              <FolderOpen className="h-4 w-4" />
              View All Pages
            </Button>
            <Button 
              onClick={() => refetch()} 
              variant="outlineGlassy"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl">
              <Layers className="h-10 w-10 text-white animate-pulse" />
            </div>
          </div>
          <div className="text-white text-xl font-semibold">Loading page editor...</div>
          <div className="text-slate-400 text-sm">Please wait while we prepare your workspace</div>
        </div>
      </main>
    );
  }

  // --- 404 STATE (Data loaded but page not found) ---
  if (!currentPage) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-500 max-w-lg">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/30 blur-3xl rounded-full" />
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl">
              <AlertTriangle className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
            <p className="text-slate-400 text-lg">
              The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t been created yet.
            </p>
            <p className="text-red-400 text-sm font-mono bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 inline-block">
              Path: {pathTitle}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <Button 
              onClick={() => window.location.href = '/page-builder'} 
              variant="outlineGlassy"
              className="gap-2"
            >
              <FolderOpen className="h-4 w-4" />
              View All Pages
            </Button>
            <Button 
              onClick={() => refetch()} 
              variant="outlineGlassy"
              className="gap-2"
            >
               <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* 0. BACKGROUND ANIMATIONS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[100px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light"></div>
      </div>

      {/* Page Title Header */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8 max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">{currentPage.pageName}</h1>
          <p className="text-slate-400 font-mono text-sm">{currentPage.path}</p>
        </div>
      </div>

      {/* 2. MAIN CANVAS */}
      <div className="relative z-10 container mx-auto px-4 pb-60 max-w-5xl">
        {items.length === 0 ? (
          <div className="animate-in zoom-in-95 duration-700 fade-in flex flex-col items-center justify-center min-h-[50vh] border-2 border-dashed border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
              <div className="relative w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center shadow-2xl mb-6">
                <Layers className="h-10 w-10 text-blue-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Start Creating</h2>
            <p className="text-slate-400 text-center max-w-md mb-8 text-lg">Your canvas is empty. Use the dock below to add powerful components.</p>
            <div className="animate-bounce text-slate-500">
                <ArrowDown className="h-6 w-6" />
            </div>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-8">
                {items.map(item => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onPreview={handlePreview}
                    onDelete={handleDeleteClick}
                    onInlineUpdate={handleInlineUpdate}
                    onOpenMoveDialog={handleOpenMoveDialog}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <div className="backdrop-blur-xl shadow-2xl rounded-xl border border-blue-500/30 bg-slate-900/90 p-4 flex items-center gap-4 transform scale-105 cursor-grabbing">
                  <GripVertical className="h-6 w-6 text-blue-400" />
                  <span className="text-white font-medium text-lg">Moving Item...</span>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {/* 3. FLOATING DOCK + SAVE BUTTON (Collapsible & Stacked Bottom) */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex flex-col items-center justify-end gap-4 pointer-events-none">
        {/* A. Toggle Handle (Always Visible & Clickable) */}
        <button
          onClick={() => setIsDockExpanded(!isDockExpanded)}
          className={`
            pointer-events-auto flex items-center justify-center w-12 h-8 rounded-full 
            bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-lg 
            text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300
            ${!isDockExpanded ? 'animate-bounce ring-1 ring-blue-500/50 shadow-blue-500/20' : ''}
          `}
          aria-label={isDockExpanded ? 'Hide Menu' : 'Show Menu'}
        >
          {isDockExpanded ? <ChevronDown className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
        </button>

        {/* B. Main Controls Container (Animate In/Out) */}
        <div
          className={`
            flex items-center gap-4 transition-all duration-500 ease-in-out origin-bottom rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl ring-1 ring-white/5 justify-between w-[95%] md:w-2xl lg:w-4xl 
            ${isDockExpanded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none absolute bottom-0'}
          `}
        >
          {/* 1. The 4 Action Buttons */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 p-2.5">
            {topMenuButtons.map(type => {
              const meta = COMPONENT_MAP[type];
              const Icon = meta.icon;
              const isActive = activeAddType === type;

              return (
                <button
                  key={type}
                  onClick={() => setActiveAddType(type)}
                  className={`
                      group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-14 rounded-xl transition-all duration-300
                      ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}
                    `}
                >
                  <span
                    className={`
                       flex items-center justify-center w-8 h-8 rounded-full mb-1 transition-all duration-300 shadow-lg
                       bg-gradient-to-br ${meta.color} text-white
                       group-hover:scale-110 group-hover:shadow-lg
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 group-hover:text-white transition-colors">{meta.label}</span>

                  {/* Active Indicator Dot */}
                  {isActive && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_5px_white]" />}
                </button>
              );
            })}
          </div>
          {/* 2. Save Button (Conditional & Stacked Below) */}
          <div
            className={`
              pointer-events-auto transition-all duration-500 pr-4 
              ${items.length > 0 ? 'max-h-20 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}
            `}
          >
            <Button onClick={handleSubmitAll} variant="outlineGlassy" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" /> {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      {/* DIALOGS */}

      {/* Unified Add Dialog */}
      <Dialog open={!!activeAddType} onOpenChange={() => setActiveAddType(null)}>
        <DialogContent className="max-w-2xl md:max-w-5xl h-[85vh] mt-10 p-0 overflow-hidden bg-slate-950/95 backdrop-blur-3xl border-white/10 shadow-2xl text-white gap-0 flex flex-col">
          {activeAddType &&
            (() => {
              const meta = COMPONENT_MAP[activeAddType];
              const Icon = meta.icon;
              return (
                <>
                  {/* Dialog Header */}
                  <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-4 shrink-0">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${meta.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-white">Add {meta.label}</DialogTitle>
                      <p className="text-slate-400 text-sm mt-1">Choose a pre-made component to drop into your page.</p>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 min-h-0 w-full">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                        {meta.keys.map(key => {
                          const config = meta.collection[key];

                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          const DisplayComponent = activeAddType === 'form' ? (config as any).preview : (config as any).query;

                          return (
                            <div
                              key={key}
                              onClick={() => handleAddItem(activeAddType, key)}
                              className="group cursor-pointer rounded-2xl border border-white/10 bg-black/20 overflow-hidden hover:border-white/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                              {/* Preview Box */}
                              <div className="h-[180px] bg-slate-900/50 relative overflow-hidden p-4 flex items-center justify-center border-b border-white/5">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                                <div className="scale-[0.6] w-full h-full origin-center flex items-center justify-center pointer-events-none">
                                  {DisplayComponent ? <DisplayComponent /> : <span className="text-slate-500">Preview</span>}
                                </div>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                  <div className="bg-white text-black px-4 py-2 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <Plus className="h-4 w-4" /> Add This
                                  </div>
                                </div>
                              </div>
                              {/* Footer */}
                              <div className="p-4 bg-white/5 flex justify-between items-center">
                                <span className="font-semibold text-slate-200 text-sm">{key}</span>
                                <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-400 uppercase tracking-wider">{meta.label}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollArea>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>

      {/* Mobile Move Dialog */}
      <Dialog open={!!movingItem} onOpenChange={() => setMovingItem(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-center">Reorder {movingItem?.key}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <Button onClick={handleMoveUp} className="h-12 text-lg bg-slate-800 hover:bg-slate-700">
              <ArrowUp className="mr-2 h-5 w-5" /> Move Up
            </Button>
            <Button onClick={handleMoveDown} className="h-12 text-lg bg-slate-800 hover:bg-slate-700">
              <ArrowDown className="mr-2 h-5 w-5" /> Move Down
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deletingItem} onOpenChange={() => setDeletingItem(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-md">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Delete Component?</h3>
            <p className="text-slate-400 mb-6">
              Are you sure you want to remove <span className="text-white font-semibold">{deletingItem?.heading || 'this item'}</span>? This cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <Button onClick={() => setDeletingItem(null)} variant="outline" className="flex-1 border-white/10 hover:bg-white/5">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} variant="destructive" className="flex-1 bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Editor Dialog - WITH SCROLLAREA */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-4xl md:max-w-6xl h-[85vh] mt-10 p-0 bg-slate-900/95 backdrop-blur-xl border-white/10 text-white flex flex-col">
          <DialogHeader className="p-6 border-b border-white/10 bg-white/5 shrink-0">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Edit className="h-5 w-5 text-blue-400" />
              Edit Component
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 min-h-0 w-full">
            <div className="md:p-6">
              {editingItem &&
                (() => {
                  const meta = COMPONENT_MAP[editingItem.type];
                  const config = meta.collection[editingItem.key];

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Mutation = (config as any).mutation;
                  return Mutation ? (
                    <Mutation data={editingItem.data} onSubmit={onSubmitEdit} />
                  ) : (
                    <div className="p-4 text-center text-slate-500">No settings available</div>
                  );
                })()}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog - WITH SCROLLAREA */}
      <Dialog open={!!previewingItem} onOpenChange={() => setPreviewingItem(null)}>
        <DialogContent className="max-w-4xl h-[85vh] mt-10 p-0 bg-slate-900/95 backdrop-blur-xl border-white/10 text-white flex flex-col">
          <DialogHeader className="p-6 border-b border-white/10 bg-white/5 shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-cyan-400" /> Live Preview
            </DialogTitle>
          </DialogHeader>

          {/* ScrollArea Added Here */}
          <ScrollArea className="flex-1 h-[calc(80vh-80px)] w-full">
            <div className="p-6">
              <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                {previewingItem &&
                  (() => {
                    const meta = COMPONENT_MAP[previewingItem.type];
                    const config = meta.collection[previewingItem.key];

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Preview = (config as any).preview;
                    return Preview ? <Preview data={JSON.stringify(previewingItem.data)} /> : null;
                  })()}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </main>
  );
}

// Wrapper with Suspense
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <EditPageContent />
    </Suspense>
  );
}