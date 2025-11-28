'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, MapPin, Save, GraduationCap, X, Plus, Trash2, Globe, BookOpen, Clock, DollarSign, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import type { ISection8Data } from './data';
import { defaultDataSection8 } from './data';
import ImageUploadManagerSingle from '@/components/dashboard-ui/ImageUploadManagerSingle';
import Image from 'next/image';

export interface Section8FormProps {
  data?: ISection8Data;
  onSubmit: (values: ISection8Data) => void;
}

const MutationSection8 = ({ data, onSubmit }: Section8FormProps) => {
  const [formData, setFormData] = useState<ISection8Data>({ ...defaultDataSection8 });
  const [cityInput, setCityInput] = useState('');
  const [expandedUni, setExpandedUni] = useState<string | null>(defaultDataSection8.universitys[0]?.id || null);

  useEffect(() => {
    if (data && typeof data !== 'string') {
      setFormData(data);
    }
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateRootField = (field: keyof ISection8Data, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCity = () => {
    if (cityInput.trim()) {
      updateRootField('city', [...formData.city, cityInput.trim()]);
      setCityInput('');
    }
  };

  const removeCity = (index: number) => {
    updateRootField(
      'city',
      formData.city.filter((_, i) => i !== index),
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUniversityChange = (index: number, field: keyof ISection8Data['universitys'][0], value: any) => {
    const updatedUnis = [...formData.universitys];
    updatedUnis[index] = { ...updatedUnis[index], [field]: value };
    updateRootField('universitys', updatedUnis);
  };

  const addUniversity = () => {
    const newUni = {
      id: `UNI-${Date.now()}`,
      name: 'New University',
      image: '',
      location: '',
      description: '',
      courses: [],
    };
    updateRootField('universitys', [newUni, ...formData.universitys]);
    setExpandedUni(newUni.id);
  };

  const removeUniversity = (index: number) => {
    const updatedUnis = formData.universitys.filter((_, i) => i !== index);
    updateRootField('universitys', updatedUnis);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCourseChange = (uniIndex: number, courseIndex: number, field: string, value: any) => {
    const updatedUnis = [...formData.universitys];
    const updatedCourses = [...updatedUnis[uniIndex].courses];
    updatedCourses[courseIndex] = { ...updatedCourses[courseIndex], [field]: value };
    updatedUnis[uniIndex].courses = updatedCourses;
    updateRootField('universitys', updatedUnis);
  };

  const handleApplyParamChange = (uniIndex: number, courseIndex: number, paramIndex: number, value: string) => {
    const updatedUnis = [...formData.universitys];
    const updatedCourses = [...updatedUnis[uniIndex].courses];
    const newParams = [...updatedCourses[courseIndex].applyBtnParms];
    newParams[paramIndex] = value;
    updatedCourses[courseIndex] = { ...updatedCourses[courseIndex], applyBtnParms: newParams };
    updatedUnis[uniIndex].courses = updatedCourses;
    updateRootField('universitys', updatedUnis);
  };

  const addCourse = (uniIndex: number) => {
    const updatedUnis = [...formData.universitys];
    const newCourse = {
      id: `CRS-${Date.now()}`,
      name: 'New Course',
      tutionFees: '',
      duration: '',
      description: '',
      applyBtnParms: [formData.country, updatedUnis[uniIndex].location, updatedUnis[uniIndex].name, 'New Course'],
    };
    updatedUnis[uniIndex].courses.push(newCourse);
    updateRootField('universitys', updatedUnis);
  };

  const removeCourse = (uniIndex: number, courseIndex: number) => {
    const updatedUnis = [...formData.universitys];
    updatedUnis[uniIndex].courses = updatedUnis[uniIndex].courses.filter((_, i) => i !== courseIndex);
    updateRootField('universitys', updatedUnis);
  };

  const toggleExpand = (id: string) => {
    setExpandedUni(expandedUni === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 backdrop-blur-xl sticky top-4 z-50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Globe className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Study Destinations</h1>
              <p className="text-zinc-500 text-sm">Manage countries, cities, and universities</p>
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

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-4 space-y-8 h-fit xl:sticky xl:top-32">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest mb-2">
                <MapPin size={14} />
                <span>Regional Settings</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Country Name</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-5 w-5 text-zinc-600" />
                    <Input
                      value={formData.country}
                      onChange={e => updateRootField('country', e.target.value)}
                      className="bg-zinc-950/50 border-zinc-800 pl-10 h-11 focus:border-indigo-500"
                      placeholder="e.g. Australia"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-zinc-300">Popular Cities</Label>
                  <div className="flex gap-2">
                    <Input
                      value={cityInput}
                      onChange={e => setCityInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCity())}
                      className="bg-zinc-950/50 border-zinc-800 h-10"
                      placeholder="Add city..."
                    />
                    <Button onClick={addCity} className="bg-indigo-600 hover:bg-indigo-700 w-10 h-10 p-0 rounded-lg">
                      <Plus size={18} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.city.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/80 text-zinc-200 rounded-lg text-sm border border-zinc-700/50 group transition-all hover:border-red-500/50 hover:bg-red-500/10"
                      >
                        {item}
                        <X size={14} className="cursor-pointer text-zinc-500 group-hover:text-red-400 transition-colors" onClick={() => removeCity(idx)} />
                      </span>
                    ))}
                    {formData.city.length === 0 && <span className="text-zinc-600 text-sm italic">No cities added yet.</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-indigo-900/20 to-zinc-900/20 border border-indigo-500/20 rounded-3xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto text-indigo-400">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Universities</h3>
                <p className="text-zinc-400 text-sm">You have {formData.universitys.length} universities listed.</p>
              </div>
              <Button onClick={addUniversity} variant="outline" className="w-full border-indigo-500/30 text-indigo-300 hover:bg-indigo-950 hover:text-white">
                <Plus className="mr-2 h-4 w-4" /> Add University
              </Button>
            </div>
          </div>

          <div className="xl:col-span-8 space-y-6">
            {formData.universitys.map((uni, index) => (
              <div
                key={uni.id}
                className={`bg-zinc-900/50 border ${expandedUni === uni.id ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-zinc-800/50'} rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-300`}
              >
                <div
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-zinc-800/30 transition-colors"
                  onClick={() => toggleExpand(uni.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      {uni.image ? (
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <Image width={200} height={200} src={uni.image} alt="logo" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <Building2 size={18} className="text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">{uni.name || 'Untitled University'}</h3>
                      <p className="text-zinc-500 text-sm flex items-center gap-1">
                        <MapPin size={12} /> {uni.location || 'No location set'}
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
                        removeUniversity(index);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                    {expandedUni === uni.id ? <ChevronUp className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />}
                  </div>
                </div>

                {expandedUni === uni.id && (
                  <div className="p-6 pt-0 space-y-8 animate-in slide-in-from-top-4 duration-300">
                    <div className="h-px w-full bg-zinc-800/50 mb-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-300">Institution Name</Label>
                          <Input
                            value={uni.name}
                            onChange={e => handleUniversityChange(index, 'name', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-300">Location</Label>
                          <Input
                            value={uni.location}
                            onChange={e => handleUniversityChange(index, 'location', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-300">Description</Label>
                          <Textarea
                            value={uni.description}
                            onChange={e => handleUniversityChange(index, 'description', e.target.value)}
                            className="bg-zinc-950/50 border-zinc-800 min-h-[100px]"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-300">Cover / Thumbnail Image</Label>
                          <div className="bg-zinc-950/30 rounded-xl border border-zinc-800 p-2">
                            <ImageUploadManagerSingle value={uni.image} onChange={url => handleUniversityChange(index, 'image', url)} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-400 uppercase text-xs font-bold tracking-widest">
                          <GraduationCap size={14} />
                          <span>Available Courses</span>
                        </div>
                        <Button size="sm" onClick={() => addCourse(index)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs h-8">
                          <Plus size={14} className="mr-1.5" /> Add Course
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {uni.courses.map((course, cIndex) => (
                          <div
                            key={course.id}
                            className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 relative group hover:border-zinc-700 transition-colors"
                          >
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCourse(index, cIndex)}
                                className="h-8 w-8 p-0 text-zinc-500 hover:text-red-400"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label className="text-xs text-zinc-400">Course Name</Label>
                                <div className="relative">
                                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                                  <Input
                                    value={course.name}
                                    onChange={e => handleCourseChange(index, cIndex, 'name', e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 pl-9 h-9 text-sm"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs text-zinc-400">Duration</Label>
                                <div className="relative">
                                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                                  <Input
                                    value={course.duration}
                                    onChange={e => handleCourseChange(index, cIndex, 'duration', e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 pl-9 h-9 text-sm"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs text-zinc-400">Tuition Fees</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                                  <Input
                                    value={course.tutionFees}
                                    onChange={e => handleCourseChange(index, cIndex, 'tutionFees', e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 pl-9 h-9 text-sm"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs text-zinc-400">Description</Label>
                                <div className="relative">
                                  <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                                  <Input
                                    value={course.description}
                                    onChange={e => handleCourseChange(index, cIndex, 'description', e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 pl-9 h-9 text-sm"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-zinc-800/50">
                              <Label className="text-[10px] uppercase font-bold text-zinc-500 mb-2 block">Application Parameters (Hidden Fields)</Label>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {course.applyBtnParms.map((param, pIdx) => (
                                  <Input
                                    key={pIdx}
                                    value={param}
                                    onChange={e => handleApplyParamChange(index, cIndex, pIdx, e.target.value)}
                                    className="bg-zinc-900/50 border-zinc-800/50 h-7 text-xs text-zinc-400"
                                    placeholder={`Param ${pIdx + 1}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                        {uni.courses.length === 0 && (
                          <div className="text-center py-8 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/30">
                            <p className="text-zinc-500 text-sm">No courses listed yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {formData.universitys.length === 0 && (
              <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
                <Building2 className="mx-auto h-12 w-12 text-zinc-700 mb-4" />
                <h3 className="text-xl font-bold text-zinc-400">No Universities Added</h3>
                <p className="text-zinc-500 mt-2">Start by adding a university to this country.</p>
                <Button onClick={addUniversity} className="mt-6 bg-indigo-600 hover:bg-indigo-700">
                  Add First University
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutationSection8;
