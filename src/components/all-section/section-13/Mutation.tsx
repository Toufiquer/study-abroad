'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash2, Users, Handshake, Briefcase, LayoutTemplate, ImageIcon, X } from 'lucide-react';
import { ISection13Data, defaultDataSection13, IPartner, ICollabOption } from './data';
import ImageUploadManagerSingle from '@/components/dashboard-ui/ImageUploadManagerSingle';
import Image from 'next/image';

export interface Section13FormProps {
  data?: ISection13Data;
  onSubmit: (values: ISection13Data) => void;
}

const MutationSection13 = ({ data, onSubmit }: Section13FormProps) => {
  const [formData, setFormData] = useState<ISection13Data>({ ...defaultDataSection13 });

  useEffect(() => {
    if (data && typeof data !== 'string') {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (field: keyof ISection13Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPartner = () => {
    const newPartner: IPartner = {
      id: `partner-${Date.now()}`,
      name: 'New Partner',
      logo: '',
    };
    setFormData(prev => ({ ...prev, partners: [...prev.partners, newPartner] }));
  };

  const removePartner = (index: number) => {
    const updated = formData.partners.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, partners: updated }));
  };

  const updatePartner = (index: number, field: keyof IPartner, value: string) => {
    const updated = [...formData.partners];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, partners: updated }));
  };

  const addOption = () => {
    const newOption: ICollabOption = {
      id: `opt-${Date.now()}`,
      title: 'New Service',
      description: 'Description of the collaboration model.',
    };
    setFormData(prev => ({ ...prev, collabOptions: [...prev.collabOptions, newOption] }));
  };

  const removeOption = (index: number) => {
    const updated = formData.collabOptions.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, collabOptions: updated }));
  };

  const updateOption = (index: number, field: keyof ICollabOption, value: string) => {
    const updated = [...formData.collabOptions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, collabOptions: updated }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 backdrop-blur-xl sticky top-4 z-50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Handshake className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Collaboration</h1>
              <p className="text-zinc-500 text-sm">Manage partners and engagement models</p>
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
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-2">
                <LayoutTemplate size={14} />
                <span>Section Header</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Title</Label>
                  <Input
                    value={formData.title}
                    onChange={e => handleChange('title', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800 focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Subtitle</Label>
                  <Input
                    value={formData.subTitle}
                    onChange={e => handleChange('subTitle', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800 focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={e => handleChange('description', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800 min-h-[100px] resize-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest">
                  <Users size={14} />
                  <span>Partners / Clients</span>
                </div>
                <Button onClick={addPartner} size="sm" variant="outline" className="h-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Plus size={14} className="mr-2" /> Add Logo
                </Button>
              </div>

              <div className="space-y-4">
                {formData.partners.map((partner, index) => (
                  <div key={partner.id} className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 flex items-center gap-4 group">
                    <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                      {partner.logo ? (
                        <div className="relative w-8 h-8">
                          <Image src={partner.logo} alt={partner.name} fill className="object-contain" unoptimized />
                        </div>
                      ) : (
                        <ImageIcon size={16} className="text-zinc-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        value={partner.name}
                        onChange={e => updatePartner(index, 'name', e.target.value)}
                        className="h-8 text-xs bg-transparent border-transparent focus:border-zinc-700 hover:bg-zinc-900"
                        placeholder="Partner Name"
                      />
                      <div className="h-8">
                        <ImageUploadManagerSingle value={partner.logo} onChange={url => updatePartner(index, 'logo', url)} />
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => removePartner(index)} className="text-zinc-600 hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                {formData.partners.length === 0 && (
                  <div className="text-center py-8 text-zinc-600 italic text-sm border border-dashed border-zinc-800 rounded-xl">No partners added.</div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest">
                  <Briefcase size={14} />
                  <span>Collaboration Models</span>
                </div>
                <Button onClick={addOption} size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Plus size={14} className="mr-2" /> Add Model
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.collabOptions.map((opt, index) => (
                  <div key={opt.id} className="relative group bg-zinc-950 border border-zinc-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all">
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-6 w-6 text-zinc-500 hover:text-red-400" onClick={() => removeOption(index)}>
                        <X size={14} />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Handshake size={20} />
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-zinc-500">Title</Label>
                          <Input
                            value={opt.title}
                            onChange={e => updateOption(index, 'title', e.target.value)}
                            className="bg-zinc-900 border-zinc-800 focus:border-cyan-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-zinc-500">Description</Label>
                          <Textarea
                            value={opt.description}
                            onChange={e => updateOption(index, 'description', e.target.value)}
                            className="bg-zinc-900 border-zinc-800 min-h-[80px] text-sm resize-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutationSection13;
