Look at the page.tsx
```
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

```

and BrandSettingsEditor.tsx
```
'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import {
  Upload,
  Image as ImageIcon,
  Type,
  Save,
  ZoomIn,
  Check,
  Smartphone,
  Monitor,
  Layout,
  Sparkles,
  Settings,
  Eye,
  RectangleHorizontal,
  Square as SquareIcon,
  LayoutTemplate,
} from 'lucide-react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandSettingsProps {
  initialSettings?: BrandSettings;
  onSave: (settings: BrandSettings) => void;
}

export interface BrandSettings {
  brandName: string;
  logoUrl: string | null;
  showText: boolean;
  showLogo: boolean;
  logoWidth: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const defaultSettings: BrandSettings = {
  brandName: 'Nexus',
  logoUrl: null,
  showText: true,
  showLogo: false,
  logoWidth: 40,
};

// Define available aspect ratios
const ASPECT_RATIOS = [
  { label: 'Square', value: 1, icon: SquareIcon },
  { label: '16:9', value: 16 / 9, icon: RectangleHorizontal },
  { label: '4:3', value: 4 / 3, icon: LayoutTemplate },
  { label: 'Wide', value: 3 / 1, icon: RectangleHorizontal },
];

export default function BrandSettingsEditor({ initialSettings = defaultSettings, onSave }: BrandSettingsProps) {
  const [settings, setSettings] = useState<BrandSettings>(initialSettings);
  const [tempImage, setTempImage] = useState<string | null>(null);

  // Crop States
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1); // Default to square
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop');
  const [mobileTab, setMobileTab] = useState<'settings' | 'preview'>('settings');

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setTempImage(imageDataUrl as string);
      setAspectRatio(1); // Reset to square on new file
      setZoom(1);
      setIsCropModalOpen(true);
      e.target.value = '';
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    try {
      if (tempImage && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
        setSettings({ ...settings, logoUrl: croppedImage, showLogo: true });
        setIsCropModalOpen(false);
        setTempImage(null);
        setZoom(1);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.message + ' Failed to crop image');
    }
  };

  return (
    <div className="w-full min-h-[400px] lg:h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-purple-600/20 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] bg-blue-600/20 rounded-full blur-[60px] lg:blur-[100px] pointer-events-none mix-blend-screen" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-[1400px] h-full max-h-[900px] backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[24px] lg:rounded-[32px] shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10"
      >
        {/* Mobile Tabs */}
        <div className="lg:hidden flex border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
          <button
            onClick={() => setMobileTab('settings')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all relative ${
              mobileTab === 'settings' ? 'text-white' : 'text-white/40'
            }`}
          >
            <Settings size={16} />
            <span>Settings</span>
            {mobileTab === 'settings' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_-2px_10px_rgba(59,130,246,0.5)]" />
            )}
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all relative ${
              mobileTab === 'preview' ? 'text-white' : 'text-white/40'
            }`}
          >
            <Eye size={16} />
            <span>Preview</span>
            {mobileTab === 'preview' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_-2px_10px_rgba(59,130,246,0.5)]" />
            )}
          </button>
        </div>

        {/* Settings Panel */}
        <div
          className={`w-full lg:w-[400px] xl:w-[450px] flex-col h-full bg-gradient-to-b from-white/5 to-transparent relative z-20 transition-transform duration-300 lg:flex ${
            mobileTab === 'settings' ? 'flex' : 'hidden'
          }`}
        >
          <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Visual Identity</h2>
                <p className="text-xs text-blue-200/60 font-medium mt-0.5">Customize your brand appearance</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Brand Name Input */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-blue-100 font-medium flex items-center gap-2">
                    <Type size={14} className="text-blue-400" />
                    Brand Name
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-200/50">{settings.showText ? 'Shown' : 'Hidden'}</span>
                    <button
                      onClick={() => setSettings(s => ({ ...s, showText: !s.showText }))}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${settings.showText ? 'bg-blue-500' : 'bg-slate-700'}`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${settings.showText ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>
                <Input
                  value={settings.brandName}
                  onChange={e => setSettings({ ...settings, brandName: e.target.value })}
                  className="bg-black/20 border-white/10 text-white placeholder:text-white/20 focus:bg-black/40 focus:border-blue-500/50 rounded-xl h-12 pl-4 transition-all"
                  placeholder="Enter brand name"
                />
              </div>

              {/* Logo Upload */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-blue-100 font-medium flex items-center gap-2">
                    <ImageIcon size={14} className="text-purple-400" />
                    Logo Symbol
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-200/50">{settings.showLogo ? 'Shown' : 'Hidden'}</span>
                    <button
                      onClick={() => setSettings(s => ({ ...s, showLogo: !s.showLogo }))}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${settings.showLogo ? 'bg-blue-500' : 'bg-slate-700'}`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${settings.showLogo ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>

                {!settings.logoUrl ? (
                  <label className="group relative flex flex-col items-center justify-center w-full h-32 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 hover:border-purple-400/50 transition-all overflow-hidden bg-black/10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
                      <div className="p-2 bg-white/10 rounded-full mb-2 group-hover:scale-110 transition-transform shadow-lg">
                        <Upload className="text-blue-200" size={18} />
                      </div>
                      <p className="text-xs text-blue-200/70 font-medium">Click to upload logo</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
                  </label>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                      <div className="relative h-14 w-14 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                        <NextImage src={settings.logoUrl} alt="Logo" fill className="object-contain p-1.5" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <div className="flex gap-2 w-full">
                          <label className="flex-1 flex items-center justify-center text-[11px] font-medium py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-blue-100 cursor-pointer transition-colors border border-white/5">
                            Replace
                            <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
                          </label>
                          <button
                            onClick={() => setSettings({ ...settings, logoUrl: null })}
                            className="flex-1 text-[11px] font-medium py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 rounded-lg transition-colors border border-red-500/10"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between text-[10px] uppercase font-bold text-blue-200/50 tracking-wider">
                        <span>Size</span>
                        <span>{settings.logoWidth}px</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="200" // Increased max slightly for rectangular logos
                        value={settings.logoWidth}
                        onChange={e => setSettings({ ...settings, logoWidth: Number(e.target.value) })}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400 hover:accent-purple-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 pt-0 border-t border-white/10 mt-auto bg-gradient-to-t from-black/40 to-transparent">
            <Button
              onClick={() => onSave(settings)}
              variant="outline"
              size="lg"
              className="w-full border-white/20 text-black hover:bg-white/10 hover:text-white backdrop-blur-sm"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div
          className={`flex-1 bg-black/20 relative flex-col min-h-0 lg:border-l border-white/10 backdrop-blur-sm transition-opacity duration-300 lg:flex ${
            mobileTab === 'preview' ? 'flex h-full' : 'hidden'
          }`}
        >
          {/* Header */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-white/5 gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-200/50 uppercase tracking-widest">
              <Layout size={14} />
              <span>Live Preview</span>
            </div>
            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 backdrop-blur-md self-start sm:self-auto">
              <button
                onClick={() => setActiveView('desktop')}
                className={`p-2 rounded-md transition-all duration-300 flex items-center gap-2 sm:gap-0 ${activeView === 'desktop' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                <Monitor size={16} />
                <span className="text-[10px] font-medium ml-2 sm:hidden">Desktop</span>
              </button>
              <button
                onClick={() => setActiveView('mobile')}
                className={`p-2 rounded-md transition-all duration-300 flex items-center gap-2 sm:gap-0 ${activeView === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                <Smartphone size={16} />
                <span className="text-[10px] font-medium ml-2 sm:hidden">Mobile</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 lg:p-12 overflow-hidden relative w-full h-full bg-slate-900/50">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                className={`relative transition-all duration-500 ease-in-out origin-top sm:origin-center
                  ${activeView === 'mobile' ? 'w-[320px] aspect-[9/19] max-h-[85vh]' : 'w-full max-w-[900px] aspect-[16/10] max-h-[85vh]'} 
                  bg-white rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border-[6px] lg:border-[8px] border-slate-800 overflow-hidden flex flex-col mx-auto`}
              >
                {/* Mock Browser Header */}
                <div className="h-6 bg-slate-800 flex items-center justify-center relative shrink-0">
                  {activeView === 'mobile' ? (
                    <div className="w-16 h-2 bg-black/40 rounded-full" />
                  ) : (
                    <div className="flex gap-1.5 absolute left-3">
                      <div className="w-2 h-2 rounded-full bg-red-500/80" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <div className="w-2 h-2 rounded-full bg-green-500/80" />
                    </div>
                  )}
                </div>

                {/* Navbar */}
                <div className="h-14 lg:h-16 border-b border-gray-100 flex items-center px-4 md:px-6 bg-white justify-between relative z-10 shrink-0">
                  <div className="flex items-center gap-3">
                    {settings.showLogo && settings.logoUrl && (
                      <div
                        className="relative transition-all duration-300"
                        style={{
                          width: `${activeView === 'mobile' ? Math.min(settings.logoWidth, 60) : settings.logoWidth}px`,
                          height: '40px', // Fixed height container
                        }}
                      >
                        <NextImage src={settings.logoUrl} alt="Brand Logo" fill className="object-contain object-left" unoptimized />
                      </div>
                    )}
                    {settings.showText && (
                      <span
                        className={`font-bold text-gray-900 tracking-tight leading-none truncate ${activeView === 'mobile' ? 'text-sm max-w-[120px]' : 'text-xl'}`}
                      >
                        {settings.brandName || 'Brand'}
                      </span>
                    )}
                  </div>

                  <div className={`flex items-center ${activeView === 'mobile' ? 'gap-2' : 'gap-6'} text-sm font-medium text-gray-500`}>
                    {activeView === 'desktop' ? (
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:block h-2 w-12 bg-gray-100 rounded-full" />
                        <div className="hidden sm:block h-2 w-12 bg-gray-100 rounded-full" />
                        <div className="h-8 w-20 lg:w-24 bg-blue-600 rounded-lg ml-2 opacity-90 shadow-sm" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-gray-400 box-content border-y-[3px] border-transparent border-t-gray-400 py-[2px]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Mock Content */}
                <div className="flex-1 bg-gray-50 p-4 md:p-8 flex flex-col gap-4 md:gap-6 overflow-hidden relative">
                  <div className="w-full h-full absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

                  <div className="h-32 md:h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl w-full border border-blue-100 relative overflow-hidden shrink-0 group">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                    <div className="absolute top-6 left-6 right-6 space-y-3">
                      <div className="h-4 bg-blue-200/50 rounded w-1/2" />
                      <div className="h-3 bg-blue-200/30 rounded w-1/3" />
                    </div>
                  </div>

                  <div className="flex gap-4 h-full min-h-0">
                    <div className="h-full bg-white rounded-xl w-2/3 border border-gray-100 shadow-sm p-4 space-y-3">
                      <div className="h-3 w-16 bg-gray-100 rounded" />
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-50 rounded" />
                        <div className="h-2 w-full bg-gray-50 rounded" />
                        <div className="h-2 w-4/5 bg-gray-50 rounded" />
                      </div>
                    </div>
                    <div className="h-full bg-white rounded-xl w-1/3 border border-gray-100 shadow-sm p-4">
                      <div className="h-8 w-8 rounded-full bg-indigo-50 mb-3" />
                      <div className="h-2 w-full bg-gray-50 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* CROP MODAL */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-xl bg-slate-950/90 backdrop-blur-2xl border-white/10 text-white p-0 overflow-hidden gap-0 rounded-3xl shadow-2xl z-[100]">
          <DialogHeader className="p-5 border-b border-white/10 bg-white/5">
            <DialogTitle className="flex items-center gap-2 text-lg font-light">
              <span className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-300">
                <ZoomIn size={14} />
              </span>
              Adjust Image
            </DialogTitle>
          </DialogHeader>

          <div className="relative h-[300px] sm:h-[400px] w-full bg-black/50 touch-none">
            {tempImage && (
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio} // Use dynamic aspect ratio
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                classes={{
                  containerClassName: 'bg-transparent',
                  cropAreaClassName: 'border-2 border-indigo-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] rounded-lg',
                }}
              />
            )}
          </div>

          <div className="p-6 bg-gradient-to-t from-black/80 to-slate-900/50 border-t border-white/10 space-y-6">
            {/* Aspect Ratio Controls */}
            <div className="space-y-3">
              <div className="text-xs font-medium text-blue-200/60 uppercase tracking-wider">Shape</div>
              <div className="grid grid-cols-4 gap-2">
                {ASPECT_RATIOS.map(ratio => (
                  <button
                    key={ratio.label}
                    onClick={() => setAspectRatio(ratio.value)}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border transition-all ${
                      Math.abs(aspectRatio - ratio.value) < 0.01
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <ratio.icon size={18} />
                    <span className="text-[10px] font-medium">{ratio.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-medium text-blue-200/60 uppercase tracking-wider">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={e => setZoom(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-0 pt-2">
              <Button
                variant="ghost"
                onClick={() => setIsCropModalOpen(false)}
                className="w-full sm:w-auto text-white/50 hover:text-white hover:bg-white/10 rounded-xl h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveCrop}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white min-w-[120px] rounded-xl shadow-lg shadow-indigo-900/40 h-11"
              >
                <Check size={16} className="mr-2" /> Apply Crop
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function readFile(file: File) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  return canvas.toDataURL('image/png');
}

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

```

and here is my page.tsx (that I need to update)
```
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, X, Monitor, Database, Settings2, Loader2, AlertTriangle, Layers, ChevronRight } from 'lucide-react';
import { AllFooter, AllFooterKeys } from '@/components/all-footer/all-footer-index/all-footer';
import {
  useGetFooterSettingsQuery,
  useCreateFooterSettingsMutation,
  useUpdateFooterSettingsMutation,
  useDeleteFooterSettingsMutation,
} from '@/redux/features/footer-settings/footerSlice';

import { Button } from '@/components/ui/button';

interface DBFooter {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  footerUId: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface FooterInstance {
  footerUId: string;
  id: string;
  dbId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isActive: boolean;
  createdAt?: string;
}

interface FooterItemProps {
  instance: FooterInstance;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (id: string, newData: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string, currentStatus: boolean) => Promise<void>;
  isUpdating: boolean;
}

const IOSSwitch = ({ isOn, onToggle, disabled }: { isOn: boolean; onToggle: () => void; disabled?: boolean }) => {
  return (
    <div
      onClick={e => {
        e.stopPropagation();
        if (!disabled) onToggle();
      }}
      className={`relative h-7 w-12 cursor-pointer rounded-full border-2 transition-colors duration-300 ${
        isOn ? 'border-emerald-500/50 bg-emerald-500/20' : 'border-slate-600 bg-slate-800'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className={`absolute top-0.5 h-5 w-5 rounded-full shadow-md ${isOn ? 'left-[22px] bg-emerald-400' : 'left-0.5 bg-slate-400'}`}
      />
    </div>
  );
};

const FooterItem: React.FC<FooterItemProps> = ({ instance, onUpdate, onDelete, onToggle, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [localSaving, setLocalSaving] = useState(false);

  const FooterComponents = AllFooter[instance.footerUId as keyof typeof AllFooter];

  const handleDeleteConfirm = async () => {
    try {
      await onDelete(instance.dbId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveData = async (newData: any) => {
    setLocalSaving(true);
    try {
      await onUpdate(instance.dbId, newData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save', error);
    } finally {
      setLocalSaving(false);
    }
  };

  if (!FooterComponents) {
    return (
      <div className="mb-4 flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-rose-500" size={20} />
          <span>
            Component type <strong className="font-mono text-rose-400">{instance.footerUId}</strong> not found.
          </span>
        </div>
        <button onClick={() => onDelete(instance.dbId)} className="rounded-lg bg-rose-500/20 px-3 py-1 text-sm hover:bg-rose-500/30">
          Remove
        </button>
      </div>
    );
  }

  const { query: QueryComponent, mutation: MutationComponent } = FooterComponents;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`group relative w-full overflow-hidden rounded-2xl border bg-slate-900/40 shadow-xl backdrop-blur-md transition-all duration-300 ${
          instance.isActive ? 'border-indigo-500/30 hover:border-indigo-500/50 hover:shadow-indigo-500/10' : 'border-slate-700/50 opacity-75 grayscale-[0.8]'
        }`}
      >
        {isUpdating && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px]">
            <Loader2 className="animate-spin text-indigo-400" size={30} />
          </div>
        )}

        <div className="flex flex-col gap-4 border-b border-white/5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-inner ${
                  instance.isActive ? 'from-indigo-500 to-violet-600 text-white shadow-indigo-500/20' : 'from-slate-700 to-slate-800 text-slate-400'
                }`}
              >
                <Database size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold tracking-wide text-slate-100">{instance.footerUId}</h3>
                </div>
                <div className="mt-1 flex items-center gap-3">
                  <span className={`text-[10px] font-bold tracking-wider ${instance.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {instance.isActive ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                  <div className="sm:hidden">
                    <IOSSwitch isOn={instance.isActive} onToggle={() => onToggle(instance.dbId, instance.isActive)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-slate-700/50 sm:block"></div>

            <div className="hidden items-center gap-3 sm:flex">
              <IOSSwitch isOn={instance.isActive} onToggle={() => onToggle(instance.dbId, instance.isActive)} />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              disabled={!instance.isActive}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:flex-none ${
                !instance.isActive
                  ? 'cursor-not-allowed bg-slate-800 text-slate-500'
                  : isEditing
                    ? 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/50 hover:bg-amber-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/50 hover:bg-indigo-500/20'
              }`}
            >
              {isEditing ? (
                <>
                  <X size={14} /> Cancel
                </>
              ) : (
                <>
                  <Edit3 size={14} /> Customize
                </>
              )}
            </button>

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-rose-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-400 ring-1 ring-rose-500/30 transition-all hover:bg-rose-500/20 sm:flex-none"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="relative min-h-[160px] bg-slate-950/30 p-6">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {!instance.isActive && (
            <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[3px]">
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-5 py-2 text-sm font-medium text-slate-400 shadow-2xl">
                <AlertTriangle size={16} /> Component Disabled
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {isEditing && instance.isActive ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative z-20 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-500/5 p-6"
              >
                <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
                  <Settings2 size={14} />
                  <span>Configuration Panel</span>
                </div>
                <div className="text-slate-300">
                  <MutationComponent
                    data={JSON.stringify(instance.data)}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSave={(newData: any) => handleSaveData(newData)}
                  />
                  {localSaving && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-indigo-400">
                      <Loader2 className="animate-spin" size={14} /> Saving changes...
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                className="relative z-0"
              >
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500/70">
                  <Monitor size={14} />
                  <span>Live Preview</span>
                </div>
                <div className="overflow-hidden rounded-lg ring-1 ring-slate-800">
                  <QueryComponent data={JSON.stringify(instance.data)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 rounded-full bg-rose-500/10 p-4 text-rose-500 ring-1 ring-rose-500/20">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-100">Delete Component?</h3>
                <p className="mt-2 text-sm text-slate-400">
                  You are about to remove <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-slate-200">{instance.footerUId}</span>. This action
                  cannot be undone.
                </p>
                <div className="mt-8 flex w-full gap-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 rounded-xl bg-slate-800 py-3 text-sm font-bold text-slate-300 transition-colors hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={isUpdating}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 text-sm font-bold text-white transition-all hover:bg-rose-700 disabled:opacity-70"
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={18} /> : 'Delete'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const FooterSelectionModal = ({
  isOpen,
  onClose,
  onSelect,
  isCreating,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (key: string) => void;
  isCreating: boolean;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isCreating ? onClose : undefined}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
          >
            <div className="border-b border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Component Library</h2>
                  <p className="text-sm text-slate-400">Select a template to add instantly</p>
                </div>
                <button
                  onClick={onClose}
                  disabled={isCreating}
                  className="rounded-lg bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="grid max-h-[60vh] gap-3 overflow-y-auto p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
              {isCreating && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                  <Loader2 className="animate-spin text-indigo-400" size={40} />
                  <p className="mt-4 font-semibold text-white">Creating your footer...</p>
                </div>
              )}
              {AllFooterKeys.map((key, index) => (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  key={key}
                  disabled={isCreating}
                  onClick={() => onSelect(key)}
                  className="group flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-left transition-all hover:border-indigo-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white">
                      <Layers size={20} />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-200 group-hover:text-white">{key}</span>
                      <span className="text-xs text-slate-500">React Component</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 opacity-0 transition-all group-hover:opacity-100">
                    <span>Add</span>
                    <ChevronRight size={16} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Page = () => {
  const { data: dbData, isLoading: isFetching } = useGetFooterSettingsQuery(undefined);
  const [createFooter, { isLoading: isCreating }] = useCreateFooterSettingsMutation();
  const [updateFooter, { isLoading: isUpdating }] = useUpdateFooterSettingsMutation();
  const [deleteFooterMutation, { isLoading: isDeleting }] = useDeleteFooterSettingsMutation();

  const [footers, setFooters] = useState<FooterInstance[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchedFooters = dbData?.data?.footers || [];
    if (fetchedFooters.length >= 0) {
      const mappedFooters: FooterInstance[] = fetchedFooters.map((f: DBFooter) => ({
        id: f._id,
        dbId: f._id,
        footerUId: f.footerUId || 'footer-clean-1',
        data: f.data || {},
        isActive: f.isActive ?? true,
        createdAt: f.createdAt,
      }));
      setFooters(mappedFooters);
    }
  }, [dbData]);

  const handleAddFooter = async (key: string) => {
    try {
      const defaultData = AllFooter[key as keyof typeof AllFooter]?.data || {};

      const payload = {
        footerUId: key,
        data: defaultData,
        isActive: true,
      };

      await createFooter(payload).unwrap();

      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create footer:', error);
      alert('Failed to create footer. Please try again.');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateFooterData = async (dbId: string, newData: any) => {
    try {
      const currentFooter = footers.find(f => f.dbId === dbId);
      if (!currentFooter) return;

      await updateFooter({
        id: dbId,
        footerUId: currentFooter.footerUId,
        data: newData,
        isActive: currentFooter.isActive,
      }).unwrap();
    } catch (error) {
      console.error('Failed to update footer data:', error);
      alert('Failed to save changes.');
    }
  };

  const handleToggleFooter = async (dbId: string, currentStatus: boolean) => {
    try {
      const currentFooter = footers.find(f => f.dbId === dbId);
      if (!currentFooter) return;

      await updateFooter({
        id: dbId,
        footerUId: currentFooter.footerUId,
        data: currentFooter.data,
        isActive: !currentStatus,
      }).unwrap();
    } catch (error) {
      console.error('Failed to toggle footer status:', error);
    }
  };

  const handleDeleteFooter = async (dbId: string) => {
    try {
      await deleteFooterMutation(dbId).unwrap();
    } catch (error) {
      console.error('Failed to delete footer:', error);
      alert('Failed to delete footer.');
    }
  };

  return (
    <main className="relative min-h-screen w-full  text-slate-200 selection:bg-indigo-500/30">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-32 sm:px-8">
        <header className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-4xl font-black tracking-tight text-transparent"
            >
              Footer Builder
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-4 text-slate-200">
              <p className="text-lg font-medium">Global site footer configuration</p>
              {isFetching && (
                <div className="flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400 ring-1 ring-indigo-500/20">
                  <Loader2 className="animate-spin" size={12} /> Syncing
                </div>
              )}
            </motion.div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="outlineGlassy" size="lg" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              <span>Add Footer</span>
            </Button>
          </div>
        </header>

        <div className="min-h-[400px]">
          {isFetching && footers.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center gap-4 text-slate-500">
              <Loader2 className="animate-spin" size={48} />
              <p className="font-medium">Loading your configuration...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {footers.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 py-32 text-center transition-colors hover:border-slate-600 hover:bg-slate-900/50"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_60%)] group-hover:opacity-100 opacity-50 transition-opacity" />
                  <div className="relative z-10 mb-6 rounded-2xl bg-slate-800 p-8 shadow-2xl ring-1 ring-white/5">
                    <Database size={48} className="text-slate-500" />
                  </div>
                  <h3 className="relative z-10 text-2xl font-bold text-white">No active footers</h3>
                  <p className="relative z-10 mt-3 max-w-sm text-slate-400">
                    Your site is currently missing a footer. Add one from the library to get started.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="relative z-10 mt-8 flex items-center gap-2 rounded-full bg-indigo-500/10 px-6 py-2.5 font-bold text-indigo-400 ring-1 ring-indigo-500/50 transition-all hover:bg-indigo-500 hover:text-white"
                  >
                    <Plus size={16} /> Open Component Library
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {footers.map(footer => (
                    <FooterItem
                      key={footer.id}
                      instance={footer}
                      onUpdate={handleUpdateFooterData}
                      onDelete={handleDeleteFooter}
                      onToggle={handleToggleFooter}
                      isUpdating={isUpdating || isDeleting}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      <FooterSelectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleAddFooter} isCreating={isCreating} />
    </main>
  );
};

export default Page;

```

Now your task is please update the second page.tsx with Image resize options. like BrandSettingsEditor 