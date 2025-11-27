/*
|-----------------------------------------
| FormFieldForm2 - Family & Sponsorship
|-----------------------------------------
*/
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { IForm2Data } from './data';
import { defaultDataForm2 } from './data';

export interface Form2Props {
  data?: IForm2Data;
  onSubmit: (values: IForm2Data) => void;
}

const FormFieldForm2 = ({ data, onSubmit }: Form2Props) => {
  const [formData, setFormData] = useState<IForm2Data>({ ...defaultDataForm2 });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const updateField = (field: keyof IForm2Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-1">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Father&apos;s Name</Label>
            <Input value={formData.fatherName} onChange={e => updateField('fatherName', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mother&apos;s Name</Label>
            <Input value={formData.motherName} onChange={e => updateField('motherName', e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sponsor Name</Label>
          <Input value={formData.sponsorName} onChange={e => updateField('sponsorName', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Sponsor Relation</Label>
            <Input value={formData.sponsorRelation} onChange={e => updateField('sponsorRelation', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Annual Family Income</Label>
            <Input value={formData.annualFamilyIncome} onChange={e => updateField('annualFamilyIncome', e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Emergency Contact Number</Label>
          <Input value={formData.emergencyContact} onChange={e => updateField('emergencyContact', e.target.value)} />
        </div>
      </div>

      <Button onClick={() => onSubmit(formData)} className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:opacity-90">
        Save Family Details
      </Button>
    </div>
  );
};

export default FormFieldForm2;
