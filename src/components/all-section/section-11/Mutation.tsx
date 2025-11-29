'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash2, User, Building2, BookOpen, GraduationCap, ChevronDown, ChevronUp, ImageIcon, Sparkles } from 'lucide-react';
import { ISection11Data, defaultDataSection11, IStory } from './data';
import ImageUploadManagerSingle from '@/components/dashboard-ui/ImageUploadManagerSingle';
import Image from 'next/image';

export interface Section11FormProps {
  data?: ISection11Data;
  onSubmit: (values: ISection11Data) => void;
}

const MutationSection11 = ({ data, onSubmit }: Section11FormProps) => {
  const [formData, setFormData] = useState<ISection11Data>({ ...defaultDataSection11 });
  const [expandedStory, setExpandedStory] = useState<string | null>(defaultDataSection11.stories[0]?.id || null);

  useEffect(() => {
    if (data && typeof data !== 'string') {
      setFormData(data);
    }
  }, [data]);

  const updateStory = (index: number, field: keyof IStory, value: string) => {
    const updatedStories = [...formData.stories];
    updatedStories[index] = { ...updatedStories[index], [field]: value };
    setFormData(prev => ({ ...prev, stories: updatedStories }));
  };

  const addStory = () => {
    const newStory: IStory = {
      id: `story-${Date.now()}`,
      name: 'New Student',
      university: 'University Name',
      subject: 'Program / Course',
      image: '',
      description: 'Add a description about the student success story...',
    };
    setFormData(prev => ({ ...prev, stories: [newStory, ...prev.stories] }));
    setExpandedStory(newStory.id);
  };

  const removeStory = (index: number) => {
    const updatedStories = formData.stories.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, stories: updatedStories }));
  };

  const toggleExpand = (id: string) => {
    setExpandedStory(expandedStory === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 backdrop-blur-xl sticky top-4 z-50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Success Stories Reel</h1>
              <p className="text-zinc-500 text-sm">Manage the vertical scroll timeline stories</p>
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
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 backdrop-blur-sm space-y-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                  <User size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">Student Profiles</h3>
                <p className="text-zinc-400 text-sm">You have {formData.stories.length} stories in the reel.</p>
              </div>
              <Button onClick={addStory} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none py-6 rounded-xl font-bold">
                <Plus className="mr-2 h-4 w-4" /> Add New Story
              </Button>
            </div>

            <div className="p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl text-xs text-indigo-300 leading-relaxed">
              <p>
                <strong>Tip:</strong> High-quality vertical or square images work best for the reel cards. The sequence here determines the scroll order.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {formData.stories.map((story, index) => (
              <div
                key={story.id}
                className={`bg-zinc-900/50 border ${
                  expandedStory === story.id ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-zinc-800/50'
                } rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-300`}
              >
                <div
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-zinc-800/30 transition-colors"
                  onClick={() => toggleExpand(story.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700 overflow-hidden shrink-0">
                      {story.image ? (
                        <Image width={100} height={100} src={story.image} alt={story.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{story.name}</h3>
                      <p className="text-zinc-500 text-sm flex items-center gap-1.5">
                        <Building2 size={12} /> {story.university || 'No University'}
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
                        removeStory(index);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                    {expandedStory === story.id ? <ChevronUp className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />}
                  </div>
                </div>

                {expandedStory === story.id && (
                  <div className="p-6 pt-0 space-y-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="h-px w-full bg-zinc-800/50 mb-2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-400 flex items-center gap-2">
                            <User size={14} /> Student Name
                          </Label>
                          <Input
                            value={story.name}
                            onChange={e => updateStory(index, 'name', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 transition-all"
                            placeholder="e.g. John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-400 flex items-center gap-2">
                            <Building2 size={14} /> University
                          </Label>
                          <Input
                            value={story.university}
                            onChange={e => updateStory(index, 'university', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 transition-all"
                            placeholder="e.g. Harvard University"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-400 flex items-center gap-2">
                            <GraduationCap size={14} /> Course / Subject
                          </Label>
                          <Input
                            value={story.subject}
                            onChange={e => updateStory(index, 'subject', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 transition-all"
                            placeholder="e.g. MSc Data Science"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-400 flex items-center gap-2">
                            <ImageIcon size={14} /> Profile Image
                          </Label>
                          <div className="bg-zinc-950/30 rounded-xl border border-zinc-800 p-2 min-h-[140px] flex flex-col justify-center">
                            <ImageUploadManagerSingle value={story.image} onChange={url => updateStory(index, 'image', url)} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-400 flex items-center gap-2">
                        <BookOpen size={14} /> Success Story Description
                      </Label>
                      <Textarea
                        value={story.description}
                        onChange={e => updateStory(index, 'description', e.target.value)}
                        className="bg-zinc-950/50 border-zinc-800 min-h-[100px] focus:border-indigo-500 transition-all resize-none"
                        placeholder="Describe their achievements and journey..."
                      />
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

export default MutationSection11;
