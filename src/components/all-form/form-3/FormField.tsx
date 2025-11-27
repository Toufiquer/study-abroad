/*
|-----------------------------------------
| FormFieldForm3 - Location Information
|-----------------------------------------
*/
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import type { IForm3Data } from './data';
import { defaultDataForm3 } from './data';

export interface Form3Props {
  data?: IForm3Data;
  onSubmit: (values: IForm3Data) => void;
}

const FormFieldForm3 = ({ data, onSubmit }: Form3Props) => {
  const [formData, setFormData] = useState<IForm3Data>({ ...defaultDataForm3 });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const updateField = (field: keyof IForm3Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-1">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Street Address</Label>
          <Textarea value={formData.streetAddress} onChange={e => updateField('streetAddress', e.target.value)} className="min-h-[80px]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Input value={formData.city} onChange={e => updateField('city', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>State / Division</Label>
            <Input value={formData.state} onChange={e => updateField('state', e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Input value={formData.postalCode} onChange={e => updateField('postalCode', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Input value={formData.country} onChange={e => updateField('country', e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Any Previous Visa Refusals?</Label>
          <Input value={formData.hasRefusalHistory} onChange={e => updateField('hasRefusalHistory', e.target.value)} placeholder="Yes / No" />
        </div>
      </div>

      <Button onClick={() => onSubmit(formData)} className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:opacity-90">
        Save Location
      </Button>
    </div>
  );
};

export default FormFieldForm3;
