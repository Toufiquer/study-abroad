'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Type, AlignLeft, MessageSquare, LayoutTemplate, Sparkles, Quote } from 'lucide-react';
import { ISection10Data, defaultDataSection9 } from './data';

export interface Section10FormProps {
  data?: ISection10Data;
  onSubmit: (values: ISection10Data) => void;
}

const MutationSection10 = ({ data, onSubmit }: Section10FormProps) => {
  // Note: Using defaultDataSection9 as the fallback based on the provided data structure
  const [formData, setFormData] = useState<ISection10Data>({ ...defaultDataSection9 });

  useEffect(() => {
    if (data && typeof data !== 'string') {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (field: keyof ISection10Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 backdrop-blur-xl sticky top-4 z-50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Quote className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Success Stories</h1>
              <p className="text-zinc-500 text-sm">Manage the section introduction content</p>
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
          {/* Configuration Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm space-y-8 h-full">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-6">
                <LayoutTemplate size={14} />
                <span>Content Settings</span>
              </div>

              <div className="space-y-6">
                <div className="space-y-3 group">
                  <Label className="text-zinc-300 flex items-center gap-2 group-focus-within:text-amber-400 transition-colors">
                    <Type size={16} />
                    Primary Heading
                  </Label>
                  <div className="relative">
                    <Input
                      value={formData.title}
                      onChange={e => handleChange('title', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 h-12 pl-4 focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                      placeholder="e.g. Success"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <Label className="text-zinc-300 flex items-center gap-2 group-focus-within:text-amber-400 transition-colors">
                    <AlignLeft size={16} />
                    Sub Heading
                  </Label>
                  <div className="relative">
                    <Input
                      value={formData.subTitle}
                      onChange={e => handleChange('subTitle', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 h-12 pl-4 focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                      placeholder="e.g. Stories"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <Label className="text-zinc-300 flex items-center gap-2 group-focus-within:text-amber-400 transition-colors">
                    <MessageSquare size={16} />
                    Description
                  </Label>
                  <div className="relative">
                    <Textarea
                      value={formData.description}
                      onChange={e => handleChange('description', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 min-h-[120px] p-4 focus:border-amber-500 focus:ring-amber-500/20 transition-all resize-none leading-relaxed"
                      placeholder="Add a brief description..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
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

              <div className="flex-1 rounded-2xl bg-zinc-950 m-2 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.05),rgba(0,0,0,0))]" />
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />

                <div className="relative z-10 max-w-lg mx-auto text-center px-8">
                  <div className="space-y-2 mb-8">
                    <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">{formData.title || 'Title'}</h2>
                    <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 tracking-tighter">
                      {formData.subTitle || 'Subtitle'}
                    </h2>
                  </div>

                  <div className="h-1 w-24 bg-zinc-800 mx-auto rounded-full mb-8" />

                  <p className="text-lg text-zinc-400 leading-relaxed font-light">{formData.description || 'Description text goes here...'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutationSection10;
