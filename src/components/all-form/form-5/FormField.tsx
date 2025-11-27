/*
|-----------------------------------------
| FormFieldForm5 - University Preference
|-----------------------------------------
*/
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { IForm5Data } from './data';
import { defaultDataForm5 } from './data';

export interface Form5Props {
  data?: IForm5Data;
  onSubmit: (values: IForm5Data) => void;
}

const FormFieldForm5 = ({ data, onSubmit }: Form5Props) => {
  const [formData, setFormData] = useState<IForm5Data>({ ...defaultDataForm5 });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const updateField = (field: keyof IForm5Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-1">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Target Country</Label>
            <Input value={formData.targetCountry} onChange={e => updateField('targetCountry', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Preferred Intake</Label>
            <Input value={formData.preferredIntake} onChange={e => updateField('preferredIntake', e.target.value)} placeholder="Fall 2024" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Desired Major</Label>
          <Input value={formData.desiredMajor} onChange={e => updateField('desiredMajor', e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Degree Level</Label>
          <Input value={formData.degreeLevel} onChange={e => updateField('degreeLevel', e.target.value)} placeholder="Bachelor, Master, PhD" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Budget Range</Label>
            <Input value={formData.budgetRange} onChange={e => updateField('budgetRange', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Scholarship Required?</Label>
            <Input value={formData.scholarshipNeeded} onChange={e => updateField('scholarshipNeeded', e.target.value)} />
          </div>
        </div>
      </div>

      <Button onClick={() => onSubmit(formData)} className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:opacity-90">
        Save Preferences
      </Button>
    </div>
  );
};

export default FormFieldForm5;
