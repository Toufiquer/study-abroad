'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Type,
  Palette,
  MousePointer2,
  Link as LinkIcon,
  ExternalLink,
  Check, 
  Save,
  Box,
  Zap,
  Droplets,
  Flame,
  Ghost,
  RotateCcw,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { LucideIcon } from 'lucide-react';

export interface IButton2Data {
  buttonName: string;
  buttonSize: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  buttonWidth: 'auto' | 'fixed-sm' | 'fixed-md' | 'fixed-lg' | 'full';
  buttonVariant: string;
  buttonIcon: string;
  buttonPath: string;
  isNewTab: boolean;
}

export const defaultDataButton2: IButton2Data = {
  buttonName: 'Get Started',
  buttonSize: 'default',
  buttonWidth: 'auto',
  buttonVariant: 'neonBlue',
  buttonIcon: 'Zap',
  buttonPath: '/',
  isNewTab: false,
};

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Box,
  Layout,
  Droplets,
  Flame,
  Ghost,
  LinkIcon,
  ExternalLink,
  Check,
};
const iconOptions = Object.keys(iconMap);

const ScrollArea = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <div className="h-full w-full overflow-y-auto scrollbar-hide scroll-smooth">{children}</div>

      <div className="pointer-events-none absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-zinc-950/80 to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-zinc-950/80 to-transparent z-10" />
    </div>
  );
};

const ModernInput = ({
  label,
  value,
  onChange,
  icon: Icon,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  placeholder?: string;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="group relative">
      <div
        className={cn(
          'flex items-center bg-zinc-900/50 border rounded-xl overflow-hidden transition-all duration-300',
          focused ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-zinc-800 hover:border-zinc-700',
        )}
      >
        <div className="pl-3 text-zinc-500">{Icon && <Icon size={16} className={focused ? 'text-blue-400' : ''} />}</div>
        <Input
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''}
          className="w-full bg-transparent p-3 text-sm text-zinc-100 focus:outline-none placeholder:text-zinc-600 border-none focus-visible:ring-0"
        />
      </div>
      <Label
        className={cn(
          'absolute left-10 pointer-events-none transition-all duration-200',
          focused || value ? '-top-2.5 text-[10px] font-bold text-blue-400 bg-zinc-950 px-1' : 'top-3 text-sm text-zinc-500',
        )}
      >
        {label}
      </Label>
    </div>
  );
};


interface ButtonFormProps {
  data?: IButton2Data;
  onSubmit: (values: IButton2Data) => void;
}

const MutationButton2 = ({ data, onSubmit }: ButtonFormProps) => {
  const [formData, setFormData] = useState<IButton2Data>({ ...defaultDataButton2 });
  const [activeTab, setActiveTab] = useState<'Standard' | 'Solid' | 'Outline' | 'Neon'>('Standard');

  useEffect(() => {
    if (data) setFormData({ ...defaultDataButton2, ...data });
  }, [data]);

  const updateField = (field: keyof IButton2Data, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const variantGroups = {
    Standard: ['default', 'destructive', 'outline', 'ghost', 'link', 'secondary'],
    Solid: ['garden', 'fire', 'water'],
    Outline: ['outlineGarden', 'outlineFire', 'outlineWater'],
    Neon: ['neonBlue', 'neonPink', 'neonGreen', 'neonPurple'],
  };

  const handleReset = () => {
    setFormData(defaultDataButton2);
  };

  return (
    <div className="min-h-[600px] w-full max-w-4xl mx-auto bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 flex flex-col lg:flex-row rounded-0 border border-zinc-800 overflow-hidden shadow-2xl">

      {/* --- Right Panel: Scrollable Form Controls --- */}
      <div className="flex-1 bg-zinc-950 relative h-[600px] lg:h-auto">
        <ScrollArea className="h-full">
          <div className="p-6 lg:p-8 pb-24 space-y-8 max-w-2xl mx-auto">
             <div className="flex justify-end">
                <button onClick={handleReset} className="text-xs text-zinc-600 hover:text-zinc-300 flex items-center gap-1 transition-colors">
                  <RotateCcw size={12} /> Reset
                </button>
             </div>

            {/* Section: Identity */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                <Type size={14} /> Content
              </h3>
              <div className="space-y-4">
                <ModernInput
                  label="Button Text"
                  value={formData.buttonName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('buttonName', e.target.value)}
                  icon={Type}
                  placeholder="e.g. Explore Now"
                />
                <ModernInput
                  label="Destination Path"
                  value={formData.buttonPath}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('buttonPath', e.target.value)}
                  icon={LinkIcon}
                  placeholder="/pages/..."
                />
                <div className="flex items-center justify-between bg-zinc-900/30 p-3 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
                      <ExternalLink size={16} />
                    </div>
                    <span className="text-sm text-zinc-300">Open in New Tab</span>
                  </div>
                  <Switch checked={formData.isNewTab} onCheckedChange={(c) => updateField('isNewTab', c)} />
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-zinc-800/50" />

            {/* Section: Layout */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                <Layout size={14} /> Layout
              </h3>

              <div className="space-y-6">
                {/* Width Selector */}
                <div>
                  <Label className="text-xs text-zinc-500 mb-2 block">Width Mode</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {['auto', 'fixed-sm', 'fixed-md', 'fixed-lg', 'full'].map(w => (
                      <button
                        key={w}
                        onClick={() => updateField('buttonWidth', w)}
                        className={cn(
                          'text-[10px] py-2 px-1 rounded-lg border transition-all',
                          formData.buttonWidth === w
                            ? 'bg-blue-500/10 border-blue-500 text-blue-400 font-semibold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800',
                        )}
                      >
                        {w.replace('fixed-', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <Label className="text-xs text-zinc-500 mb-2 block">Size Scale</Label>
                  <div className="flex items-end gap-2 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800">
                    {['xs', 'sm', 'default', 'lg', 'xl'].map((s, idx) => (
                      <button
                        key={s}
                        onClick={() => updateField('buttonSize', s)}
                        className={cn(
                          'flex-1 rounded-lg transition-all flex flex-col items-center justify-end pb-2 hover:bg-zinc-800',
                          formData.buttonSize === s ? 'bg-zinc-800 text-blue-400 shadow-inner' : 'text-zinc-500',
                        )}
                        style={{ height: 30 + idx * 8 + 'px' }}
                      >
                        <span className="text-[10px] font-medium uppercase">{s}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-zinc-800/50" />

            {/* Section: Aesthetics (Variants) */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                <Palette size={14} /> Aesthetics
              </h3>

              {/* Tab Navigation for Variants */}
              <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                {Object.keys(variantGroups).map(group => (
                  <button
                    key={group}
                    onClick={() => setActiveTab(group as keyof typeof variantGroups)}
                    className={cn(
                      'px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                      activeTab === group ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300',
                    )}
                  >
                    {group}
                  </button>
                ))}
              </div>

              {/* Variant Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <AnimatePresence mode="wait">
                  {variantGroups[activeTab].map(variant => (
                    <motion.div
                      key={variant}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => updateField('buttonVariant', variant)}
                      className={cn(
                        'cursor-pointer relative group overflow-hidden rounded-xl border p-3 transition-all duration-300',
                        formData.buttonVariant === variant
                          ? 'bg-blue-500/10 border-blue-500 ring-1 ring-blue-500/50'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900',
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={cn('w-2 h-2 rounded-full', formData.buttonVariant === variant ? 'bg-blue-400 shadow-[0_0_8px_blue]' : 'bg-zinc-700')} />
                        {formData.buttonVariant === variant && <Check size={12} className="text-blue-400" />}
                      </div>
                      <p className={cn('text-xs font-medium capitalize', formData.buttonVariant === variant ? 'text-white' : 'text-zinc-500')}>
                        {variant.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            <div className="w-full h-px bg-zinc-800/50" />

            {/* Section: Icon */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                <MousePointer2 size={14} /> Iconography
              </h3>
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-2">
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {iconOptions.map(iconName => {
                    const IconComp = iconMap[iconName];
                    const isActive = formData.buttonIcon === iconName;
                    return (
                      <button
                        key={iconName}
                        onClick={() => updateField('buttonIcon', iconName)}
                        className={cn(
                          'aspect-square flex items-center justify-center rounded-lg transition-all',
                          isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-110' : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300',
                        )}
                        title={iconName}
                      >
                        <IconComp size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
            
                    {/* Footer Action */}
                    <div className="pt-6 border-t border-zinc-800 flex justify-end">
                      <Button
                        onClick={() => onSubmit(formData)}
                        variant="outlineGlassy"
                        className='w-full'
                      >
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </Button>
                    </div>
          </div>
        </ScrollArea>
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MutationButton2;
