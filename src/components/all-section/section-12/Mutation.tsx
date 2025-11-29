'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash2, Briefcase, Calendar, Trophy, Target, Layers, X, ChevronDown, ChevronUp, History, LayoutTemplate } from 'lucide-react';
import { ISection12Data, defaultDataSection12, IExperienceItem } from './data';

export interface Section12FormProps {
  data?: ISection12Data;
  onSubmit: (values: ISection12Data) => void;
}

const MutationSection12 = ({ data, onSubmit }: Section12FormProps) => {
  const [formData, setFormData] = useState<ISection12Data>({ ...defaultDataSection12 });
  const [expandedExp, setExpandedExp] = useState<string | null>(defaultDataSection12.experiences[0]?.id || null);
  const [featureInputs, setFeatureInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data && typeof data !== 'string') {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (field: keyof ISection12Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateExperience = (index: number, field: keyof IExperienceItem, value: any) => {
    const updated = [...formData.experiences];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, experiences: updated }));
  };

  const updateMilestone = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...formData.experiences];
    updated[index] = {
      ...updated[index],
      highlightMilestone: { ...updated[index].highlightMilestone, [field]: value },
    };
    setFormData(prev => ({ ...prev, experiences: updated }));
  };

  const addExperience = () => {
    const newExp: IExperienceItem = {
      id: `exp-${Date.now()}`,
      year: '2024 - Present',
      companyName: 'New Company',
      role: 'Role Title',
      description: 'Describe your role and impact here...',
      lastAchievement: 'Significant achievement',
      highlightMilestone: { label: 'Metric', value: '100%' },
      features: ['Skill 1', 'Skill 2'],
    };
    setFormData(prev => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
    setExpandedExp(newExp.id);
  };

  const removeExperience = (index: number) => {
    const updated = formData.experiences.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, experiences: updated }));
  };

  const handleFeatureInput = (id: string, value: string) => {
    setFeatureInputs(prev => ({ ...prev, [id]: value }));
  };

  const addFeature = (index: number, id: string) => {
    const value = featureInputs[id]?.trim();
    if (value) {
      const updated = [...formData.experiences];
      updated[index].features = [...updated[index].features, value];
      setFormData(prev => ({ ...prev, experiences: updated }));
      setFeatureInputs(prev => ({ ...prev, [id]: '' }));
    }
  };

  const removeFeature = (expIndex: number, featureIndex: number) => {
    const updated = [...formData.experiences];
    updated[expIndex].features = updated[expIndex].features.filter((_, i) => i !== featureIndex);
    setFormData(prev => ({ ...prev, experiences: updated }));
  };

  const toggleExpand = (id: string) => {
    setExpandedExp(expandedExp === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 backdrop-blur-xl sticky top-4 z-50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <History className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Experience Timeline</h1>
              <p className="text-zinc-500 text-sm">Manage professional history and milestones</p>
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
          <div className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-32">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-2">
                <LayoutTemplate size={14} />
                <span>Section Header</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Title</Label>
                  <Input value={formData.title} onChange={e => handleChange('title', e.target.value)} className="bg-zinc-950/50 border-zinc-800" />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Subtitle</Label>
                  <Input value={formData.subTitle} onChange={e => handleChange('subTitle', e.target.value)} className="bg-zinc-950/50 border-zinc-800" />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={e => handleChange('description', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800 min-h-[100px] resize-none"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={addExperience}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none py-6 rounded-xl font-bold shadow-lg shadow-emerald-900/20"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Experience Position
            </Button>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {formData.experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`bg-zinc-900/50 border ${
                  expandedExp === exp.id ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-zinc-800/50'
                } rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-300`}
              >
                <div
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-zinc-800/30 transition-colors"
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700 shrink-0">
                      <Briefcase size={20} className="text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{exp.role || 'Role Title'}</h3>
                      <p className="text-zinc-500 text-sm flex items-center gap-1.5">
                        <span className="font-medium text-emerald-400/80">{exp.companyName}</span>
                        <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                        <span>{exp.year}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                      onClick={e => {
                        e.stopPropagation();
                        removeExperience(index);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                    {expandedExp === exp.id ? <ChevronUp className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />}
                  </div>
                </div>

                {expandedExp === exp.id && (
                  <div className="p-6 pt-0 space-y-8 animate-in slide-in-from-top-4 duration-300">
                    <div className="h-px w-full bg-zinc-800/50 mb-2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-400 flex items-center gap-2">
                            <Briefcase size={14} /> Role Title
                          </Label>
                          <Input
                            value={exp.role}
                            onChange={e => updateExperience(index, 'role', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-400 flex items-center gap-2">
                            <Layers size={14} /> Company Name
                          </Label>
                          <Input
                            value={exp.companyName}
                            onChange={e => updateExperience(index, 'companyName', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-400 flex items-center gap-2">
                            <Calendar size={14} /> Duration / Year
                          </Label>
                          <Input
                            value={exp.year}
                            onChange={e => updateExperience(index, 'year', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 space-y-4">
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <Target size={14} /> Highlight Milestone
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-zinc-400 text-xs">Label</Label>
                              <Input
                                value={exp.highlightMilestone.label}
                                onChange={e => updateMilestone(index, 'label', e.target.value)}
                                className="bg-zinc-950/50 border-emerald-500/30 h-9 text-sm"
                                placeholder="e.g. Revenue"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-zinc-400 text-xs">Value</Label>
                              <Input
                                value={exp.highlightMilestone.value}
                                onChange={e => updateMilestone(index, 'value', e.target.value)}
                                className="bg-zinc-950/50 border-emerald-500/30 h-9 text-sm font-bold"
                                placeholder="e.g. +200%"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-zinc-400 flex items-center gap-2">
                            <Trophy size={14} /> Last Major Achievement
                          </Label>
                          <Input
                            value={exp.lastAchievement}
                            onChange={e => updateExperience(index, 'lastAchievement', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 focus:border-emerald-500"
                            placeholder="e.g. Led team to Series B"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-400">Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={e => updateExperience(index, 'description', e.target.value)}
                        className="bg-zinc-950/50 border-zinc-800 min-h-[100px] resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-zinc-400">Features / Tech Stack / Skills</Label>
                      <div className="flex gap-2">
                        <Input
                          value={featureInputs[exp.id] || ''}
                          onChange={e => handleFeatureInput(exp.id, e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature(index, exp.id))}
                          className="bg-zinc-950/50 border-zinc-800 h-10"
                          placeholder="Add skill or feature..."
                        />
                        <Button onClick={() => addFeature(index, exp.id)} className="bg-zinc-800 hover:bg-zinc-700 w-10 h-10 p-0 rounded-lg shrink-0">
                          <Plus size={18} />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.features.map((feature, fIndex) => (
                          <span
                            key={fIndex}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-lg text-sm border border-emerald-500/20 group hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                            onClick={() => removeFeature(index, fIndex)}
                          >
                            {feature}
                            <X size={12} className="opacity-50 group-hover:opacity-100" />
                          </span>
                        ))}
                        {exp.features.length === 0 && <span className="text-zinc-600 text-sm italic">No features added.</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutationSection12;
