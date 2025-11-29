'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Megaphone, Type, MousePointerClick, Sparkles, LayoutTemplate } from 'lucide-react';
import { ISection9Data, defaultDataSection9 } from './data';

export interface Section9FormProps {
  data?: ISection9Data;
  onSubmit: (values: ISection9Data) => void;
}

const MutationSection9 = ({ data, onSubmit }: Section9FormProps) => {
  const [formData, setFormData] = useState<ISection9Data>({ ...defaultDataSection9 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (data && typeof data !== 'string') {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (field: keyof ISection9Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 backdrop-blur-xl sticky top-4 z-50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Megaphone className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Call to Action</h1>
              <p className="text-zinc-500 text-sm">Manage final section content and triggers</p>
            </div>
          </div>
          <Button
            onClick={() => onSubmit(formData)}
            className="w-full md:w-auto bg-white text-zinc-950 hover:bg-zinc-200 px-8 py-6 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm space-y-8 h-full">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-6">
                <LayoutTemplate size={14} />
                <span>Content Configuration</span>
              </div>

              <div className="space-y-6">
                <div className="space-y-3 group">
                  <Label className="text-zinc-300 flex items-center gap-2 group-focus-within:text-pink-400 transition-colors">
                    <Type size={16} />
                    Heading Title
                  </Label>
                  <div className="relative">
                    <Input
                      value={formData.title}
                      onChange={e => handleChange('title', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 h-14 text-lg pl-4 focus:border-pink-500 focus:ring-pink-500/20 transition-all"
                      placeholder="e.g. Be The Next Story"
                    />
                    <div className="absolute inset-0 rounded-md ring-1 ring-white/5 pointer-events-none" />
                  </div>
                  <p className="text-xs text-zinc-600">This is the main headline displayed to encourage user action.</p>
                </div>

                <div className="h-px bg-zinc-800/50" />

                <div className="space-y-3 group">
                  <Label className="text-zinc-300 flex items-center gap-2 group-focus-within:text-pink-400 transition-colors">
                    <MousePointerClick size={16} />
                    Button Label
                  </Label>
                  <div className="relative">
                    <Input
                      value={formData.buttonText}
                      onChange={e => handleChange('buttonText', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 h-14 text-lg pl-4 focus:border-pink-500 focus:ring-pink-500/20 transition-all"
                      placeholder="e.g. Apply Now"
                    />
                    <div className="absolute inset-0 rounded-md ring-1 ring-white/5 pointer-events-none" />
                  </div>
                  <p className="text-xs text-zinc-600">The text that appears inside the primary action button.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-2 h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/30">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={14} />
                  <span>Live Preview</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
              </div>

              <div className="flex-1 rounded-2xl bg-zinc-950 m-2 relative overflow-hidden group/preview flex items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(236,72,153,0.1),rgba(0,0,0,0))]" />

                <div className="relative z-10 text-center space-y-8 max-w-lg mx-auto px-6">
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">{formData.title || 'Your Title Here'}</h2>

                  <div className="flex justify-center">
                    <button
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="relative group px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-transform active:scale-95"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {formData.buttonText || 'Button Text'}
                        <Megaphone size={18} className={`transition-transform duration-300 ${isHovered ? 'rotate-[-15deg] scale-110' : ''}`} />
                      </span>
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-pink-200 to-rose-200 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </button>
                  </div>
                </div>

                <div
                  className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutationSection9;
