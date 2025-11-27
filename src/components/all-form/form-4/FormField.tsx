/*
|-----------------------------------------
| FormFieldForm4 - Academic Background
|-----------------------------------------
*/
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { IForm4Data } from './data';
import { defaultDataForm4 } from './data';

export interface Form4Props {
  data?: IForm4Data;
  onSubmit: (values: IForm4Data) => void;
}

const FormFieldForm4 = ({ data, onSubmit }: Form4Props) => {
  const [formData, setFormData] = useState<IForm4Data>({ ...defaultDataForm4 });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const updateField = (field: keyof IForm4Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-1">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Institution Name</Label>
          <Input value={formData.institutionName} onChange={e => updateField('institutionName', e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Qualification / Degree</Label>
          <Input value={formData.qualification} onChange={e => updateField('qualification', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Passing Year</Label>
            <Input value={formData.passingYear} onChange={e => updateField('passingYear', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Result (CGPA/GPA)</Label>
            <Input value={formData.resultCGPA} onChange={e => updateField('resultCGPA', e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>English Test Type</Label>
            <Input value={formData.englishTestType} onChange={e => updateField('englishTestType', e.target.value)} placeholder="IELTS, TOEFL..." />
          </div>
          <div className="space-y-2">
            <Label>Test Score</Label>
            <Input value={formData.englishTestScore} onChange={e => updateField('englishTestScore', e.target.value)} />
          </div>
        </div>
      </div>

      <Button onClick={() => onSubmit(formData)} className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:opacity-90">
        Save Academic Info
      </Button>
    </div>
  );
};

export default FormFieldForm4;
