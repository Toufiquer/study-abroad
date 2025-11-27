'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Files, Plus } from 'lucide-react';
import { toast } from 'sonner';

// Make sure to adjust this import path to where your component is located
import ImageUploadManagerSingle from '@/components/dashboard-ui/ImageUploadManagerSingle';

import type { IForm7Data, IOtherDoc } from './data';
import { defaultDataForm7 } from './data';

export interface Form7Props {
  data?: IForm7Data;
  onSubmit: (values: IForm7Data) => void;
}

const FormFieldForm7 = ({ data, onSubmit }: Form7Props) => {
  const [formData, setFormData] = useState<IForm7Data>({ ...defaultDataForm7 });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const updateField = (field: keyof IForm7Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateDocument = (key: keyof IForm7Data['documents'], value: string) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [key]: value,
      },
    }));
  };

  const addNewSlot = () => {
    const newDoc: IOtherDoc = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      path: '',
    };

    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        others: [...prev.documents.others, newDoc],
      },
    }));
  };

  const updateOtherDoc = (id: string, field: 'name' | 'path', value: string) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        others: prev.documents.others.map(doc => (doc.id === id ? { ...doc, [field]: value } : doc)),
      },
    }));
  };

  const removeOtherDocument = (id: string) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        others: prev.documents.others.filter(doc => doc.id !== id),
      },
    }));
    toast.info('Removed');
  };

  // Simplified Render Block using the new component
  const RenderUploadBlock = ({ label, docKey }: { label: string; docKey: keyof Omit<IForm7Data['documents'], 'others'> }) => {
    return (
      <div className="flex flex-col gap-2">
        <Label className="text-slate-300 font-medium">{label}</Label>
        <div className="bg-slate-900/50 rounded-lg p-1 border border-slate-800">
          <ImageUploadManagerSingle value={formData.documents[docKey] || ''} onChange={url => updateDocument(docKey, url)} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 p-2 text-white">
      {/* --- Student Information --- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
          <div className="h-1 w-1 rounded-full bg-blue-500" />
          <h3 className="font-semibold text-blue-400">Student Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Student Name</Label>
            <Input
              placeholder="Enter full name"
              value={formData.student_name}
              onChange={e => updateField('student_name', e.target.value)}
              className="bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label>Mobile Number</Label>
            <Input
              placeholder="+880..."
              value={formData.mobile_number}
              onChange={e => updateField('mobile_number', e.target.value)}
              className="bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* --- Required Documents --- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
          <div className="h-1 w-1 rounded-full bg-purple-500" />
          <h3 className="font-semibold text-purple-400">Required Documents</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RenderUploadBlock label="NID / Smart Card" docKey="nid" />
          <RenderUploadBlock label="Passport Copy" docKey="passport" />
          <RenderUploadBlock label="Passport Size Photo" docKey="images" />
          <RenderUploadBlock label="Birth Certificate" docKey="birth_certificate" />
          <RenderUploadBlock label="SSC / O-Level Certificate" docKey="ssc_certificate" />
          <RenderUploadBlock label="HSC / A-Level Certificate" docKey="hsc_certificate" />
        </div>
      </div>

      {/* --- Additional Documents --- */}
      <div className="space-y-4">
        <div className="w-full flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2 pb-2">
            <div className="h-1 w-1 rounded-full bg-emerald-500" />
            <h3 className="font-semibold text-emerald-400">Additional Documents</h3>
            <div className="flex items-start gap-2 text-slate-500 justify-center">
              <Files className="h-3 w-3 mt-0.5" />
              <p className="text-[10px]">Upload extra files if necessary.</p>
            </div>
          </div>
          <div className="pt-2">
            <Button onClick={addNewSlot} variant="outlineGlassy" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add File
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.documents.others.map((doc, index) => (
            <div key={doc.id} className="flex flex-col gap-3 p-4 bg-slate-900/40 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-left-2">
              {/* Header: Name + Delete */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-mono w-6">#{index + 1}</span>
                <Input
                  placeholder="Document Name (e.g. Awards)"
                  value={doc.name}
                  onChange={e => updateOtherDoc(doc.id, 'name', e.target.value)}
                  className="h-9 text-sm bg-slate-800 border-slate-600 focus:border-emerald-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOtherDocument(doc.id)}
                  className="h-9 w-9 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Body: Image Uploader */}
              <div className="w-full">
                <ImageUploadManagerSingle value={doc.path} onChange={url => updateOtherDoc(doc.id, 'path', url)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Submit Button --- */}
      <Button
        onClick={() => {
          onSubmit(formData);
          toast.success('Form Data Saved!');
        }}
        variant="outlineGlassy"
        className="w-full"
        size="sm"
      >
        {formData.submitButtonText}
      </Button>
    </div>
  );
};

export default FormFieldForm7;
