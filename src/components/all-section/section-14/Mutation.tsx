'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash2, Users, CalendarDays, MapPin, Ticket, LayoutTemplate, ImageIcon, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { ISection14Data, defaultDataSection14, IEvent } from './data';
import ImageUploadManagerSingle from '@/components/dashboard-ui/ImageUploadManagerSingle';
import Image from 'next/image';

export interface Section14FormProps {
  data?: ISection14Data;
  onSubmit: (values: ISection14Data) => void;
}

const MutationSection14 = ({ data, onSubmit }: Section14FormProps) => {
  const [formData, setFormData] = useState<ISection14Data>({ ...defaultDataSection14 });
  const [expandedEvent, setExpandedEvent] = useState<string | null>(defaultDataSection14.events[0]?.id || null);

  useEffect(() => {
    if (data && typeof data !== 'string') {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (field: keyof ISection14Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateEvent = (index: number, field: keyof IEvent, value: string) => {
    const updated = [...formData.events];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, events: updated }));
  };

  const addEvent = () => {
    const newEvent: IEvent = {
      id: `evt-${Date.now()}`,
      title: 'New Event',
      date: 'TBD',
      location: 'TBD',
      image: '',
      category: 'Social',
      description: 'Event details goes here...',
      actionText: 'Register',
    };
    setFormData(prev => ({ ...prev, events: [newEvent, ...prev.events] }));
    setExpandedEvent(newEvent.id);
  };

  const removeEvent = (index: number) => {
    const updated = formData.events.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, events: updated }));
  };

  const toggleExpand = (id: string) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header Config */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 backdrop-blur-xl sticky top-4 z-50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Community Events</h1>
              <p className="text-zinc-500 text-sm">Manage gatherings and meetups</p>
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
          {/* Left Panel: General Settings */}
          <div className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-32">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 backdrop-blur-sm space-y-6">
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
                    className="bg-zinc-950/50 border-zinc-800 focus:border-rose-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Subtitle</Label>
                  <Input
                    value={formData.subTitle}
                    onChange={e => handleChange('subTitle', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800 focus:border-rose-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={e => handleChange('description', e.target.value)}
                    className="bg-zinc-950/50 border-zinc-800 min-h-[100px] resize-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={addEvent}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white border-none py-6 rounded-xl font-bold shadow-lg shadow-rose-900/20"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Event
            </Button>
          </div>

          {/* Right Panel: Events List */}
          <div className="lg:col-span-8 space-y-6">
            {formData.events.map((evt, index) => (
              <div
                key={evt.id}
                className={`bg-zinc-900/50 border ${
                  expandedEvent === evt.id ? 'border-rose-500/50 ring-1 ring-rose-500/20' : 'border-zinc-800/50'
                } rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-300`}
              >
                <div
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-zinc-800/30 transition-colors"
                  onClick={() => toggleExpand(evt.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700 overflow-hidden shrink-0">
                      {evt.image ? (
                        <Image width={100} height={100} src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                      ) : (
                        <CalendarDays size={24} className="text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{evt.title || 'Untitled Event'}</h3>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <p className="text-zinc-500 text-xs flex items-center gap-1">
                          <CalendarDays size={12} /> {evt.date}
                        </p>
                        <p className="text-zinc-500 text-xs flex items-center gap-1">
                          <MapPin size={12} /> {evt.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                      onClick={e => {
                        e.stopPropagation();
                        removeEvent(index);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                    {expandedEvent === evt.id ? <ChevronUp className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />}
                  </div>
                </div>

                {expandedEvent === evt.id && (
                  <div className="p-6 pt-0 space-y-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="h-px w-full bg-zinc-800/50 mb-2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-400 text-xs uppercase font-bold tracking-wider">Event Name</Label>
                          <Input
                            value={evt.title}
                            onChange={e => updateEvent(index, 'title', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 focus:border-rose-500"
                            placeholder="e.g. Annual Summit"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-zinc-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                              <CalendarDays size={12} /> Date
                            </Label>
                            <Input
                              value={evt.date}
                              onChange={e => updateEvent(index, 'date', e.target.value)}
                              className="bg-zinc-950/50 border-zinc-800 focus:border-rose-500"
                              placeholder="Oct 20, 2024"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-zinc-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                              <MapPin size={12} /> Location
                            </Label>
                            <Input
                              value={evt.location}
                              onChange={e => updateEvent(index, 'location', e.target.value)}
                              className="bg-zinc-950/50 border-zinc-800 focus:border-rose-500"
                              placeholder="New York / Online"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-zinc-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                              <Tag size={12} /> Category
                            </Label>
                            <Input
                              value={evt.category}
                              onChange={e => updateEvent(index, 'category', e.target.value)}
                              className="bg-zinc-950/50 border-zinc-800 focus:border-rose-500"
                              placeholder="Workshop"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-zinc-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                              <Ticket size={12} /> Button Label
                            </Label>
                            <Input
                              value={evt.actionText}
                              onChange={e => updateEvent(index, 'actionText', e.target.value)}
                              className="bg-zinc-950/50 border-zinc-800 focus:border-rose-500"
                              placeholder="Register"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                            <ImageIcon size={12} /> Cover Image
                          </Label>
                          <div className="bg-zinc-950/30 rounded-xl border border-zinc-800 p-2 min-h-[140px] flex flex-col justify-center">
                            <ImageUploadManagerSingle value={evt.image} onChange={url => updateEvent(index, 'image', url)} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-400 text-xs uppercase font-bold tracking-wider">Description</Label>
                      <Textarea
                        value={evt.description}
                        onChange={e => updateEvent(index, 'description', e.target.value)}
                        className="bg-zinc-950/50 border-zinc-800 min-h-[100px] resize-none focus:border-rose-500"
                        placeholder="Briefly describe what attendees can expect..."
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {formData.events.length === 0 && (
              <div className="text-center py-12 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                <p className="text-zinc-500 italic">No events listed. Start by adding one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutationSection14;
