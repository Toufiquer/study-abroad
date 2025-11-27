'use client';

import React, { useState, useEffect } from 'react';
import { Save, Link as LinkIcon, Type, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';


import type { IButton1Data } from './data';
import { defaultDataButton1 } from './data';

export interface Button1FormProps {
  data?: IButton1Data;
  onSubmit: (values: IButton1Data) => void;
}

const MutationButton1 = ({ data, onSubmit }: Button1FormProps) => {
  const [formData, setFormData] = useState<IButton1Data>({ ...defaultDataButton1 });

  useEffect(() => {
    if (data) {
      setFormData({ ...defaultDataButton1, ...data });
    }
  }, [data]);

  const updateField = (field: keyof IButton1Data, value: IButton1Data[keyof IButton1Data]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-[400px] w-full max-w-3xl mx-auto bg-zinc-950 text-zinc-100 font-sans border border-zinc-800 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <LayoutTemplate className="text-indigo-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Edit Button
          </h2>
          <p className="text-zinc-400 text-sm">Configure your button settings.</p>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-8">        

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-zinc-400 flex items-center gap-2">
              <Type size={14} /> Button Text
            </Label>
            <Input
              value={formData.buttonName}
              onChange={e => updateField('buttonName', e.target.value)}
              className="bg-zinc-900 border-zinc-800 focus:border-indigo-500"
              placeholder="e.g. Get Started"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 flex items-center gap-2">
              <LinkIcon size={14} /> Button Path
            </Label>
            <Input
              value={formData.buttonPath}
              onChange={e => updateField('buttonPath', e.target.value)}
              className="bg-zinc-900 border-zinc-800 focus:border-indigo-500"
              placeholder="e.g. /about or https://google.com"
            />
          </div>

           <div className="space-y-2">
            <Label className="text-zinc-400 flex items-center gap-2">
              Icon Name
            </Label>
             <Input
              value={formData.buttonIcon}
              onChange={e => updateField('buttonIcon', e.target.value)}
              className="bg-zinc-900 border-zinc-800 focus:border-indigo-500"
              placeholder="e.g. doc-icon"
            />
             <p className="text-xs text-zinc-500">Icon identifier used in your icon system.</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl">
            <div className="space-y-0.5">
              <Label className="text-zinc-300">Open in New Tab</Label>
              <p className="text-xs text-zinc-500">Should the link open in a new window?</p>
            </div>
            <Switch
              checked={formData.isNewTab}
              onCheckedChange={checked => updateField('isNewTab', checked)}
            />
          </div>
        </div>

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
    </div>
  );
};

export default MutationButton1;
