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
