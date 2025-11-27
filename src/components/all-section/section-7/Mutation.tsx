'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Building2,
  MapPin,
  Save,
  Image as ImageIcon,
  GraduationCap,
  CheckCircle2,
  X,
  Plus,
  MousePointerClick,
  LayoutDashboard,
  Users,
  Award,
  DollarSign,
} from 'lucide-react';
import type { ISection7Data } from './data';
import { defaultDataSection7 } from './data';
import ImageUploadManagerSingle from '@/components/dashboard-ui/ImageUploadManagerSingle';

export interface Section7FormProps {
  data?: ISection7Data;
  onSubmit: (values: ISection7Data) => void;
}

const MutationSection7 = ({ data, onSubmit }: Section7FormProps) => {
  const [formData, setFormData] = useState<ISection7Data>({ ...defaultDataSection7 });
  const [programInput, setProgramInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const updateField = (field: keyof ISection7Data, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: 'programs' | 'subjects' | 'features', value: string, setter: (val: string) => void) => {
    if (value.trim()) {
      updateField(field, [...formData[field], value.trim()]);
      setter('');
    }
  };

  const removeArrayItem = (field: 'programs' | 'subjects' | 'features', index: number) => {
    updateField(
      field,
      formData[field].filter((_, i) => i !== index),
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">University Details</h1>
              <p className="text-zinc-500 text-sm">Manage institutional profile and content</p>
            </div>
          </div>
          <Button
            onClick={() => onSubmit(formData)}
            className="w-full md:w-auto bg-white text-zinc-950 hover:bg-zinc-200 px-8 py-6 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-2">
                <LayoutDashboard size={14} />
                <span>General Information</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-zinc-300">University Name</Label>
                  <Input
                    value={formData.universityName}
                    onChange={e => updateField('universityName', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    placeholder="e.g. Cambridge Institute"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <Input
                      value={formData.location}
                      onChange={e => updateField('location', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 focus:border-blue-500 pl-11 h-12"
                      placeholder="e.g. Cambridge, MA"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={e => updateField('description', e.target.value)}
                  className="bg-zinc-950/50 border-zinc-800 focus:border-blue-500 min-h-[160px] resize-none leading-relaxed p-4"
                  placeholder="Detailed overview of the institution..."
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400 text-xs">Established</Label>
                  <Input
                    value={formData.established}
                    onChange={e => updateField('established', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800 h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-400 text-xs">Total Students</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                    <Input
                      value={formData.totalStudents}
                      onChange={e => updateField('totalStudents', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 pl-9 h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-400 text-xs">Rating (x/5.0)</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                    <Input value={formData.rating} onChange={e => updateField('rating', e.target.value)} className="bg-zinc-950/50 border-zinc-800 pl-9 h-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-400 text-xs">Tuition Fee</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                    <Input
                      value={formData.tuitionFee}
                      onChange={e => updateField('tuitionFee', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 pl-9 h-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-2">
                <GraduationCap size={14} />
                <span>Academic Programs</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-zinc-300">Degrees Offered</Label>
                  <div className="flex gap-2">
                    <Input
                      value={programInput}
                      onChange={e => setProgramInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addArrayItem('programs', programInput, setProgramInput))}
                      className="bg-zinc-950/50 border-zinc-800"
                      placeholder="e.g. MBA"
                    />
                    <Button
                      onClick={() => addArrayItem('programs', programInput, setProgramInput)}
                      variant="outline"
                      className="border-zinc-700 hover:bg-zinc-800"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {formData.programs.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full text-sm border border-zinc-700"
                      >
                        {item}
                        <X size={12} className="cursor-pointer hover:text-red-400" onClick={() => removeArrayItem('programs', idx)} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-zinc-300">Major Subjects</Label>
                  <div className="flex gap-2">
                    <Input
                      value={subjectInput}
                      onChange={e => setSubjectInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addArrayItem('subjects', subjectInput, setSubjectInput))}
                      className="bg-zinc-950/50 border-zinc-800"
                      placeholder="e.g. Robotics"
                    />
                    <Button
                      onClick={() => addArrayItem('subjects', subjectInput, setSubjectInput)}
                      variant="outline"
                      className="border-zinc-700 hover:bg-zinc-800"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {formData.subjects.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full text-sm border border-zinc-700"
                      >
                        {item}
                        <X size={12} className="cursor-pointer hover:text-red-400" onClick={() => removeArrayItem('subjects', idx)} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-2">
                <ImageIcon size={14} />
                <span>Media Assets</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs">Banner Image</Label>
                  <ImageUploadManagerSingle value={formData.bannerImage} onChange={url => updateField('bannerImage', url)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs">University Logo</Label>
                  <ImageUploadManagerSingle value={formData.logoUrl} onChange={url => updateField('logoUrl', url)} />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-2">
                <MousePointerClick size={14} />
                <span>Actions & Links</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs">Accreditation Label</Label>
                  <Input
                    value={formData.accreditation}
                    onChange={e => updateField('accreditation', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-xs">Primary Btn Text</Label>
                    <Input value={formData.applyText} onChange={e => updateField('applyText', e.target.value)} className="bg-zinc-950/50 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-xs">Primary Btn URL</Label>
                    <Input value={formData.buttonUrl} onChange={e => updateField('buttonUrl', e.target.value)} className="bg-zinc-950/50 border-zinc-800" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-xs">Secondary Btn Text</Label>
                    <Input
                      value={formData.buttonText || 'Visit Website'}
                      onChange={e => updateField('buttonText', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-xs">Secondary Btn URL</Label>
                    <Input value={formData.websiteUrl} onChange={e => updateField('websiteUrl', e.target.value)} className="bg-zinc-950/50 border-zinc-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-2">
                <CheckCircle2 size={14} />
                <span>Key Features</span>
              </div>

              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={e => setFeatureInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addArrayItem('features', featureInput, setFeatureInput))}
                  className="bg-zinc-950/50 border-zinc-800"
                  placeholder="Add feature..."
                />
                <Button onClick={() => addArrayItem('features', featureInput, setFeatureInput)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus size={16} />
                </Button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {formData.features.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-sm text-zinc-300">{item}</span>
                    </div>
                    <button onClick={() => removeArrayItem('features', idx)} className="text-zinc-500 hover:text-red-400">
                      <X size={14} />
                    </button>
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

export default MutationSection7;
