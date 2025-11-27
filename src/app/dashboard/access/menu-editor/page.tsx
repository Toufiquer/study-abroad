/*
|-----------------------------------------
| Site Menu Editor with Advanced Drag & Drop & Responsive Controls
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: App Generator, November, 2025
|-----------------------------------------
*/
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  DragOverEvent,
  pointerWithin,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { ScrollArea } from '@/components/ui/scroll-area';
import { iconMap, iconOptions } from '@/components/all-icons/all-icons';
import {
  ChevronDown,
  ChevronRight,
  Edit2,
  Eye,
  GripVertical,
  Plus,
  Save,
  Trash2,
  Loader2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Monitor,
  Tablet,
  Smartphone,
} from 'lucide-react';
import { useGetMenuQuery, useUpdateMenuMutation } from '@/redux/features/menuEditorSlice';
import { IMenuItem } from '@/app/api/menu-editor/model';
import BrandSettingsEditor, { BrandSettings } from './BrandSettingsEditor';
import { refreshMenu } from '@/app/actions/revalidate-menu';

// --- Types ---

interface SidebarItem {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
  iconName?: string;
  children?: SidebarItem[];
}

interface DragState {
  activeId: string | null;
  overId: string | null;
  activeItem: SidebarItem | null;
  originalParentId: number | null;
  originalGrandParentId: number | null;
  originalIndex: number;
}

type DeviceType = 'mobile' | 'tablet' | 'desktop';

// --- Custom Hooks ---

function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize(); // Set initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}

const initialData: SidebarItem[] = [];

// --- Sub Components ---

interface SortableItemProps {
  item: SidebarItem;
  onView: (item: SidebarItem) => void;
  onEdit: (item: SidebarItem) => void;
  onDelete: (item: SidebarItem) => void;
  onAddChild?: (parentItem: SidebarItem) => void;
  onToggleCollapse?: (itemId: number) => void;
  onReorderRequest?: (item: SidebarItem) => void;
  isCollapsed?: boolean;
  level?: number;
  isOverTarget?: boolean;
  isDragging?: boolean;
  dropPosition?: 'before' | 'after' | 'inside' | null;
  deviceType: DeviceType;
}

function SortableItem({
  item,
  onView,
  onEdit,
  onDelete,
  onAddChild,
  onToggleCollapse,
  onReorderRequest,
  isCollapsed = false,
  level = 0,
  isOverTarget = false,
  isDragging = false,
  dropPosition = null,
  deviceType,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id.toString(),
    disabled: deviceType !== 'desktop', // Disable dnd-kit listeners on mobile/tablet
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const hasChildren = item.children && item.children.length > 0;

  // Visual styles based on level and state
  const getBorderClass = () => {
    if (!isOverTarget) return 'border border-white/10 hover:border-white/30';
    if (dropPosition === 'inside') return 'border-2 border-purple-400 ring-2 ring-purple-400/50';
    if (dropPosition === 'before') return 'border-t-4 border-t-blue-400 border-x border-b border-white/20';
    if (dropPosition === 'after') return 'border-b-4 border-b-blue-400 border-x border-t border-white/20';
    return 'border-2 border-blue-400 ring-2 ring-blue-400/50';
  };

  const getLevelStyles = () => {
    const styles = [
      { bg: 'from-blue-500/20 to-purple-500/20', text: 'text-blue-200', ml: '' },
      { bg: 'from-emerald-500/20 to-teal-500/20', text: 'text-emerald-200', ml: 'ml-4 sm:ml-6' },
      { bg: 'from-orange-500/20 to-pink-500/20', text: 'text-orange-200', ml: 'ml-8 sm:ml-12' },
    ];
    return styles[level] || styles[0];
  };

  const levelStyle = getLevelStyles();
  const canAddChild = level < 2;
  const isDesktop = deviceType === 'desktop';

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      layoutId={item.id.toString()}
      className={`group relative backdrop-blur-md bg-white/5 rounded-xl p-2 sm:p-2.5 shadow-sm hover:shadow-md hover:bg-white/10 transition-all duration-200 ${
        levelStyle.ml
      } ${getBorderClass()}`}
    >
      <div className="flex items-center gap-2 sm:gap-3 flex-col xl:flex-row">
        {/* Container for Controls & Content */}
        <div className="flex items-center gap-3 w-full overflow-hidden">
          {/* Left Controls Group: Reorder + Collapse */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {isDesktop ? (
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-500 hover:text-gray-200 touch-none"
              >
                <GripVertical size={18} />
              </div>
            ) : (
              <Button
                onClick={e => {
                  e.stopPropagation(); // Prevent triggering row click
                  onReorderRequest?.(item);
                }}
                variant="outlineGlassy"
                className="min-w-0"
                size="sm"
              >
                <ArrowUpDown size={15} />
              </Button>
            )}

            {/* Collapse Toggle - Centered & Fixed Width */}
            <div className="w-6 flex justify-center">
              {hasChildren && (
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    onToggleCollapse?.(item.id);
                  }}
                  variant="outlineGlassy"
                  className="min-w-0 ml-3"
                  size="sm"
                >
                  {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                </Button>
              )}
            </div>
          </div>

          {/* Main Content: Icon + Name + Path */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`p-2 bg-gradient-to-br ${levelStyle.bg} rounded-lg shadow-sm border border-white/5 flex-shrink-0`}>{item.icon}</div>

            <div className="flex flex-col justify-center min-w-0">
              <span className={`font-semibold text-sm leading-tight ${levelStyle.text} truncate`}>{item.name}</span>
              <span className="text-[11px] text-gray-200/70 truncate font-mono mt-0.5">{item.path}</span>
            </div>
          </div>
        </div>

        {/* Actions (Hover on Desktop, Always Visible/condensed on Mobile) */}
        <div className={`flex items-center justify-end w-full gap-1 ${isDesktop ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity`}>
          {isDesktop && (
            <Button onClick={() => onView(item)} variant="outlineGlassy" className="min-w-1" title="View">
              <Eye size={14} />
            </Button>
          )}

          <Button onClick={() => onEdit(item)} variant="outlineGlassy" className="min-w-1" title="Edit">
            <Edit2 size={14} />
          </Button>

          <Button onClick={() => onDelete(item)} variant="outlineGlassy" className="min-w-1" title="Delete">
            <Trash2 size={14} />
          </Button>

          {canAddChild && onAddChild && (
            <Button onClick={() => onAddChild(item)} variant="outlineGlassy" className="min-w-1" title="Add Child">
              <Plus size={14} />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DropZone({ id, label, isOver }: { id: string; label: string; isOver: boolean }) {
  const { setNodeRef } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`h-14 rounded-xl border-2 border-dashed transition-all duration-300 flex items-center justify-center gap-2 ${
        isOver
          ? 'border-emerald-400 bg-emerald-400/10 scale-[1.02] shadow-[0_0_20px_rgba(52,211,153,0.3)]'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
      }`}
    >
      <Plus size={18} className={isOver ? 'text-emerald-400' : 'text-gray-500'} />
      <span className={`text-sm font-medium transition-colors ${isOver ? 'text-emerald-300' : 'text-gray-400'}`}>{label}</span>
    </div>
  );
}

// --- Main Component ---

export default function SiteMenuPage() {
  const { data: menuData, isLoading } = useGetMenuQuery('main-menu');
  const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuMutation();
  const deviceType = useDeviceType();

  const [menuItems, setMenuItems] = useState<SidebarItem[]>(initialData);
  const [viewItem, setViewItem] = useState<SidebarItem | null>(null);
  const [editItem, setEditItem] = useState<SidebarItem | null>(null);
  const [addParentItem, setAddParentItem] = useState<SidebarItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<SidebarItem | null>(null);
  const [reorderItem, setReorderItem] = useState<SidebarItem | null>(null); // For Mobile/Tablet
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({ name: '', path: '', iconName: 'Menu' });
  const [collapsedItems, setCollapsedItems] = useState<Set<number>>(new Set());

  // Brand Settings State
  const [brandSettings, setBrandSettings] = useState<BrandSettings | undefined>(undefined);
  const [showBrandSettings, setShowBrandSettings] = useState(false);

  // --- Effects ---

  useEffect(() => {
    if (menuData?.data?.items) {
      const mapItems = (items: IMenuItem[]): SidebarItem[] => {
        return items.map(item => ({
          id: item.id,
          name: item.name,
          path: item.path,
          iconName: item.iconName,
          icon: iconMap[item.iconName || 'Menu'] || iconMap.Menu,
          children: item.children ? mapItems(item.children) : [],
        }));
      };
      setMenuItems(mapItems(menuData.data.items));
    }
  }, [menuData]);

  useEffect(() => {
    // Simulated fetch for brand settings
    // In real app, replace with actual fetch
    fetch('/api/brand-settings')
      .then(res => {
        if (res.ok) return res.json();
        return null;
      })
      .then(data => {
        if (data) setBrandSettings(data);
      })
      .catch(err => console.log('Simulated fetch error', err));
  }, []);

  // --- Logic Helpers ---

  const handleSaveBrandSettings = async (settings: BrandSettings) => {
    try {
      const res = await fetch('/api/brand-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setBrandSettings(settings);
        toast.success('Brand settings saved!');
        await refreshMenu();
        setShowBrandSettings(false);
      } else {
        toast.error('Failed to save brand settings');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Error saving brand settings');
    }
  };

  const findItemById = useCallback(
    (
      id: string,
      items: SidebarItem[] = menuItems,
    ): { item: SidebarItem; parentId: number | null; grandParentId: number | null; index: number; level: number } | null => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.id.toString() === id) {
          return { item, parentId: null, grandParentId: null, index: i, level: 0 };
        }
        if (item.children) {
          for (let j = 0; j < item.children.length; j++) {
            const child = item.children[j];
            if (child.id.toString() === id) {
              return { item: child, parentId: item.id, grandParentId: null, index: j, level: 1 };
            }
            if (child.children) {
              for (let k = 0; k < child.children.length; k++) {
                if (child.children[k].id.toString() === id) {
                  return {
                    item: child.children[k],
                    parentId: child.id,
                    grandParentId: item.id,
                    index: k,
                    level: 2,
                  };
                }
              }
            }
          }
        }
      }
      return null;
    },
    [menuItems],
  );

  const [dragState, setDragState] = useState<DragState>({
    activeId: null,
    overId: null,
    activeItem: null,
    originalParentId: null,
    originalGrandParentId: null,
    originalIndex: -1,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const getAllSortableIds = (): string[] => {
    const ids: string[] = ['drop-zone-top'];
    const traverse = (items: SidebarItem[]) => {
      items.forEach(item => {
        ids.push(item.id.toString());
        if (item.children) traverse(item.children);
      });
    };
    traverse(menuItems);
    return ids;
  };

  // --- Drag & Drop Handlers (Desktop) ---

  const handleDragStart = (event: DragStartEvent) => {
    if (deviceType !== 'desktop') return;
    const activeId = event.active.id.toString();
    const result = findItemById(activeId);
    if (result) {
      setDragState({
        activeId,
        overId: null,
        activeItem: result.item,
        originalParentId: result.parentId,
        originalGrandParentId: result.grandParentId,
        originalIndex: result.index,
      });
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (deviceType !== 'desktop') return;
    const overId = event.over?.id?.toString() || null;
    setDragState(prev => ({ ...prev, overId }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (deviceType !== 'desktop') {
      setDragState({ activeId: null, overId: null, activeItem: null, originalParentId: null, originalGrandParentId: null, originalIndex: -1 });
      return;
    }

    const { active, over } = event;
    if (!over) {
      handleDragCancel();
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId === overId) {
      handleDragCancel();
      return;
    }

    const activeResult = findItemById(activeId);
    const overResult = overId === 'drop-zone-top' ? null : findItemById(overId);

    if (!activeResult) {
      handleDragCancel();
      return;
    }

    // Helpers for Tree Manipulation
    const removeItem = (items: SidebarItem[], id: number): SidebarItem[] => {
      return items.filter(i => i.id !== id).map(i => ({ ...i, children: i.children ? removeItem(i.children, id) : [] }));
    };

    const addItem = (items: SidebarItem[], targetId: number, itemToAdd: SidebarItem): SidebarItem[] => {
      return items.map(i => {
        if (i.id === targetId) return { ...i, children: [...(i.children || []), itemToAdd] };
        if (i.children) return { ...i, children: addItem(i.children, targetId, itemToAdd) };
        return i;
      });
    };

    setMenuItems(prevItems => {
      let newItems = [...prevItems];
      const itemToMove = { ...activeResult.item };

      // Remove from old position
      newItems = removeItem(newItems, itemToMove.id);

      // Scenario 1: Move to Top Level
      if (overId === 'drop-zone-top') {
        delete itemToMove.children; // Optional: Reset children when moving to top? Or keep them. Keeping them usually better.
        // Actually, let's keep children but ensure types are safe
        newItems = [itemToMove, ...newItems];
        toast.success('Moved to Top Level');
        return newItems;
      }

      if (!overResult) return prevItems;

      // Scenario 2: Nested Drop (Inside another folder)
      // Conditions: Over item is a folder (level < 2) AND we are not just reordering siblings
      const isDroppingInside =
        (overResult.level < 2 && activeResult.level > overResult.level) || (overResult.level < 2 && activeResult.parentId !== overResult.item.id);

      if (isDroppingInside && !dragState.overId?.includes(activeResult.item.id.toString())) {
        // Prevent dropping inside self
        // Add to new parent
        newItems = addItem(newItems, overResult.item.id, itemToMove);
        return newItems;
      }

      // Scenario 3: Reorder Siblings
      if (activeResult.parentId === overResult.parentId) {
        // We need to re-fetch the clean list from prevItems because removeItem mutated it
        // Easier way: use a recursive reorder map
        const reorderInTree = (items: SidebarItem[]): SidebarItem[] => {
          if (activeResult.parentId === null) {
            const idx1 = items.findIndex(i => i.id === activeResult.item.id);
            const idx2 = items.findIndex(i => i.id === overResult.item.id);
            return arrayMove(items, idx1, idx2);
          }
          return items.map(item => {
            if (item.id === activeResult.parentId) {
              const idx1 = item.children!.findIndex(i => i.id === activeResult.item.id);
              const idx2 = item.children!.findIndex(i => i.id === overResult.item.id);
              return { ...item, children: arrayMove(item.children!, idx1, idx2) };
            }
            if (item.children) return { ...item, children: reorderInTree(item.children) };
            return item;
          });
        };
        return reorderInTree(prevItems);
      }

      // Fallback: Add to new parent (similar to nesting)
      newItems = addItem(newItems, overResult.item.id, itemToMove);
      return newItems;
    });

    handleDragCancel();
  };

  const handleDragCancel = () => {
    setDragState({
      activeId: null,
      overId: null,
      activeItem: null,
      originalParentId: null,
      originalGrandParentId: null,
      originalIndex: -1,
    });
  };

  // --- Manual Move Handlers (Mobile/Tablet) ---

  const handleManualMove = (direction: 'up' | 'down') => {
    if (!reorderItem) return;

    // Helper: Clone that preserves React Nodes (icons)
    const cloneItems = (items: SidebarItem[]): SidebarItem[] => {
      return items.map(item => ({
        ...item,
        children: item.children ? cloneItems(item.children) : [],
      }));
    };

    // 1. Create a deep copy of the state
    const deepClone = cloneItems(menuItems);

    // 2. Find the item in the *cloned* structure
    const result = findItemById(reorderItem.id.toString(), deepClone);

    if (!result) return;

    const { parentId, index } = result;
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    // 3. Find the exact array to modify within the clone
    let targetArray: SidebarItem[] = deepClone;

    if (parentId !== null) {
      const findParent = (items: SidebarItem[]): SidebarItem | undefined => {
        for (const item of items) {
          if (item.id === parentId) return item;
          if (item.children) {
            const found = findParent(item.children);
            if (found) return found;
          }
        }
        return undefined;
      };
      const parentItem = findParent(deepClone);
      if (parentItem && parentItem.children) {
        targetArray = parentItem.children;
      }
    }

    // 4. Validate Bounds (Perform Side Effect Here, NOT in setState)
    if (newIndex < 0 || newIndex >= targetArray.length) {
      toast.info(`Cannot move further ${direction}`);
      return;
    }

    // 5. Perform the Move (Swap)
    [targetArray[index], targetArray[newIndex]] = [targetArray[newIndex], targetArray[index]];

    // 6. Update State
    setMenuItems(deepClone);
    toast.success(`Item moved ${direction}`);
  };

  // --- CRUD Handlers ---

  const handleToggleCollapse = (itemId: number) => {
    setCollapsedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) newSet.delete(itemId);
      else newSet.add(itemId);
      return newSet;
    });
  };

  const handleDelete = (item: SidebarItem) => setDeleteItem(item);

  const confirmDelete = () => {
    if (!deleteItem) return;
    const removeItemRecursive = (items: SidebarItem[]): SidebarItem[] => {
      return items
        .filter(i => i.id !== deleteItem.id)
        .map(i => ({
          ...i,
          children: i.children ? removeItemRecursive(i.children) : [],
        }));
    };
    setMenuItems(prev => removeItemRecursive(prev));
    toast.success(`"${deleteItem.name}" deleted successfully!`);
    setDeleteItem(null);
  };

  const handleEditSave = () => {
    if (!editItem) return;
    const updatedIcon = iconMap[formData.iconName] || iconMap.Menu;
    const updateRecursive = (items: SidebarItem[]): SidebarItem[] => {
      return items.map(item => {
        if (item.id === editItem.id) {
          return { ...item, name: formData.name, path: formData.path, icon: updatedIcon, iconName: formData.iconName };
        }
        if (item.children) return { ...item, children: updateRecursive(item.children) };
        return item;
      });
    };
    setMenuItems(prev => updateRecursive(prev));
    toast.success(`"${formData.name}" updated!`);
    setEditItem(null);
    setFormData({ name: '', path: '', iconName: 'Menu' });
  };

  const handleAddNew = () => {
    if (!formData.name || !formData.path) {
      toast.error('Fill all fields');
      return;
    }
    const newItem: SidebarItem = {
      id: Date.now(),
      name: formData.name,
      path: formData.path,
      icon: iconMap[formData.iconName] || iconMap.Menu,
      iconName: formData.iconName,
      children: [],
    };
    setMenuItems(prev => [...prev, newItem]);
    toast.success('Added new item');
    setIsAddingNew(false);
    setFormData({ name: '', path: '', iconName: 'Menu' });
  };

  const handleAddChild = () => {
    if (!addParentItem || !formData.name) return;
    const newItem: SidebarItem = {
      id: Date.now(),
      name: formData.name,
      path: formData.path,
      icon: iconMap[formData.iconName] || iconMap.Menu,
      iconName: formData.iconName,
      children: [],
    };
    const addRecursive = (items: SidebarItem[]): SidebarItem[] => {
      return items.map(item => {
        if (item.id === addParentItem.id) {
          return { ...item, children: [...(item.children || []), newItem] };
        }
        if (item.children) return { ...item, children: addRecursive(item.children) };
        return item;
      });
    };
    setMenuItems(prev => addRecursive(prev));
    toast.success('Added submenu item');
    setAddParentItem(null);
    setFormData({ name: '', path: '', iconName: 'Menu' });
  };

  const handleSubmit = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clean = (items: SidebarItem[]): any[] =>
        items.map(i => ({
          id: i.id,
          name: i.name,
          path: i.path,
          iconName: i.iconName,
          children: i.children ? clean(i.children) : [],
        }));
      await updateMenu({ type: 'main-menu', items: clean(menuItems) }).unwrap();
      toast.success('Menu saved successfully!');
    } catch {
      toast.error('Failed to save menu');
    }
  };

  const getDropPosition = (overId: string, activeId: string) => {
    // Simplified for UI feedback only
    if (!overId || overId === activeId) return null;
    const overItem = findItemById(overId);
    const activeItem = findItemById(activeId);
    if (!overItem || !activeItem) return null;
    if (overItem.level < 2 && activeItem.level > overItem.level) return 'inside';
    return 'after';
  };

  // --- Renderers ---

  const renderRecursive = (items: SidebarItem[], level: number = 0) => {
    return items.map(item => (
      <div key={item.id} className="space-y-2 mt-2 first:mt-0">
        <SortableItem
          item={item}
          onView={setViewItem}
          onEdit={i => {
            setEditItem(i);
            setFormData({ name: i.name, path: i.path, iconName: i.iconName || 'Menu' });
          }}
          onDelete={handleDelete}
          onAddChild={level < 2 ? setAddParentItem : undefined}
          onToggleCollapse={handleToggleCollapse}
          onReorderRequest={setReorderItem} // Mobile/Tablet trigger
          isCollapsed={collapsedItems.has(item.id)}
          level={level}
          isOverTarget={dragState.overId === item.id.toString()}
          isDragging={dragState.activeId === item.id.toString()}
          dropPosition={getDropPosition(dragState.overId || '', dragState.activeId || '')}
          deviceType={deviceType}
        />

        {item.children && item.children.length > 0 && !collapsedItems.has(item.id) && (
          <motion.div
            className="space-y-2 relative"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Guide line for nested items */}
            <div className={`absolute left-[${level * 20 + 20}px] top-0 bottom-0 w-px bg-white/10`} />
            {renderRecursive(item.children, level + 1)}
          </motion.div>
        )}
      </div>
    ));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-slate-950 p-2 sm:p-4 md:p-6 font-sans text-slate-100">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            {deviceType === 'mobile' && <Smartphone size={100} />}
            {deviceType === 'tablet' && <Tablet size={100} />}
            {deviceType === 'desktop' && <Monitor size={100} />}
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200 mb-2">Menu Editor</h1>
            </div>

            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              <Button onClick={() => setShowBrandSettings(!showBrandSettings)} variant="outlineGlassy" size="sm">
                <Edit2 size={18} className="mr-2" />
                {showBrandSettings ? 'Hide Logo' : 'Edit Logo'}
              </Button>
              <Button onClick={() => setIsAddingNew(true)} variant="outlineGlassy" size="sm">
                <Plus size={18} className="mr-2" />
                New Item
              </Button>
            </div>
          </div>
        </div>

        {/* Brand Settings Panel */}
        <AnimatePresence>
          {showBrandSettings && brandSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <BrandSettingsEditor initialSettings={brandSettings} onSave={handleSaveBrandSettings} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- DEVICE SPECIFIC RENDERING WRAPPERS --- */}

        {/* Desktop View: Drag and Drop Enabled */}
        {deviceType === 'desktop' && (
          <div className="hidden lg:block min-h-[400px]">
            <DndContext
              sensors={sensors}
              collisionDetection={pointerWithin}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext items={getAllSortableIds()} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  <DropZone id="drop-zone-top" label="Drop here to move to top level" isOver={dragState.overId === 'drop-zone-top'} />
                  {isLoading ? (
                    <div className="flex justify-center p-10">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    renderRecursive(menuItems)
                  )}
                </div>
              </SortableContext>
              <DragOverlay dropAnimation={null}>
                {dragState.activeItem ? (
                  <div className="backdrop-blur-xl bg-slate-800/90 border border-blue-400/50 rounded-xl p-3 shadow-2xl flex items-center gap-3 w-[300px]">
                    <div className="p-2 bg-blue-500/20 rounded-lg">{dragState.activeItem.icon}</div>
                    <span className="font-semibold text-white">{dragState.activeItem.name}</span>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        )}

        {/* Tablet View: No DND, Up/Down Controls */}
        {deviceType === 'tablet' && (
          <div className="hidden md:block lg:hidden min-h-[400px]">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm flex items-center gap-3">
                <Tablet size={20} />
                <span>Tablet Mode: Dragging disabled. Use arrows to reorder.</span>
              </div>
              {isLoading ? (
                <div className="flex justify-center p-10">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                renderRecursive(menuItems)
              )}
            </div>
          </div>
        )}

        {/* Mobile View: Compact, No DND, Up/Down Controls */}
        {deviceType === 'mobile' && (
          <div className="block md:hidden min-h-[400px]">
            <div className="space-y-3">
              {/* Mobile specific hints or header could go here */}
              {isLoading ? (
                <div className="flex justify-center p-10">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                renderRecursive(menuItems)
              )}
            </div>
          </div>
        )}

        {/* Footer / Save Action */}
        <div className="w-full flex items-center justify-end">
          <Button onClick={handleSubmit} disabled={isUpdating} variant="outlineGlassy" size="xl">
            {isUpdating ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />}
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* --- DIALOGS --- */}

      {/* View Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="p-3 bg-blue-500/20 rounded-lg scale-125">{viewItem.icon}</div>
                <div>
                  <h3 className="text-xl font-bold">{viewItem.name}</h3>
                  <p className="text-sm text-gray-400">{viewItem.path}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Path</Label>
              <Input value={formData.path} onChange={e => setFormData({ ...formData, path: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <ScrollArea className="h-32 border border-white/10 rounded-lg p-2 bg-white/5">
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setFormData({ ...formData, iconName: icon })}
                      className={`p-2 rounded hover:bg-white/20 flex justify-center ${formData.iconName === icon ? 'bg-blue-600' : ''}`}
                    >
                      {iconMap[icon]}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <Button onClick={handleEditSave} className="w-full bg-blue-600">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reorder Dialog (Mobile/Tablet) */}
      <Dialog open={!!reorderItem} onOpenChange={() => setReorderItem(null)}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Move &quot;{reorderItem?.name}&quot;</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-6">
            <Button onClick={() => handleManualMove('up')} className="h-14 text-lg bg-white/5 hover:bg-white/10 border border-white/10 justify-between px-6">
              Bring It Up
              <ArrowUp />
            </Button>
            <Button onClick={() => handleManualMove('down')} className="h-14 text-lg bg-white/5 hover:bg-white/10 border border-white/10 justify-between px-6">
              Bring It Down
              <ArrowDown />
            </Button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReorderItem(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Dialog */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/10"
            />
            <Input
              placeholder="Path / URL"
              value={formData.path}
              onChange={e => setFormData({ ...formData, path: e.target.value })}
              className="bg-white/5 border-white/10"
            />
            <Button onClick={handleAddNew} className="w-full bg-blue-600">
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Child Dialog */}
      <Dialog open={!!addParentItem} onOpenChange={() => setAddParentItem(null)}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Add Sub-Item to {addParentItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Sub Menu Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/10"
            />
            <Input
              placeholder="Sub Path"
              value={formData.path}
              onChange={e => setFormData({ ...formData, path: e.target.value })}
              className="bg-white/5 border-white/10"
            />
            <Button onClick={handleAddChild} className="w-full bg-blue-600">
              Add Sub Menu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Delete Item?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-400">
            Are you sure you want to delete <strong>{deleteItem?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setDeleteItem(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
