/*
|-----------------------------------------
| MutationForm6 - Skills & Curriculum
|-----------------------------------------
*/
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import type { IForm6Data } from './data';
import { defaultDataForm6 } from './data';

export interface Form6Props {
  data?: IForm6Data;
  onSubmit: (values: IForm6Data) => void;
}

const MutationForm6 = ({ data, onSubmit }: Form6Props) => {
  const [formData, setFormData] = useState<IForm6Data>({ ...defaultDataForm6 });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const updateField = (field: keyof IForm6Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-1">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Technical Skills</Label>
          <Textarea
            value={formData.technicalSkills}
            onChange={e => updateField('technicalSkills', e.target.value)}
            placeholder="e.g., Java, Python, React..."
          />
        </div>

        <div className="space-y-2">
          <Label>Languages Known</Label>
          <Textarea value={formData.languages} onChange={e => updateField('languages', e.target.value)} placeholder="e.g., English, Bengali..." />
        </div>

        <div className="space-y-2">
          <Label>Hobbies & Interests</Label>
          <Textarea value={formData.hobbies} onChange={e => updateField('hobbies', e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Extra Curricular Activities</Label>
          <Textarea value={formData.extraCurricular} onChange={e => updateField('extraCurricular', e.target.value)} className="min-h-[80px]" />
        </div>

        <div className="space-y-2">
          <Label>Achievements / Awards</Label>
          <Textarea value={formData.awards} onChange={e => updateField('awards', e.target.value)} className="min-h-[80px]" />
        </div>
      </div>

      <Button onClick={() => onSubmit(formData)} className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:opacity-90">
        Save Skills Profile
      </Button>
    </div>
  );
};

export default MutationForm6;
