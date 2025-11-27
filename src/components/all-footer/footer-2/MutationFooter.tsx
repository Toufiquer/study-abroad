'use client';

import React, { useState, useCallback } from 'react';

import { Save, Plus, Trash2, Upload, X, Globe, Smartphone, Mail, MapPin, LayoutTemplate, Type, Loader2, Square, RectangleHorizontal } from 'lucide-react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import { defaultDataFooter2, IFooter2Data, ContactInfo } from './data';
import { toast } from 'react-toastify';

interface MutationFooterProps {
  data?: string;
  onSave?: (settings: IFooter2Data) => Promise<void> | void;
}

// Define available aspect ratios for the logo
const ASPECT_RATIOS = [
  { label: 'Square', value: 1, icon: Square },
  { label: '16:9', value: 16 / 9, icon: RectangleHorizontal },
  { label: '4:3', value: 4 / 3, icon: LayoutTemplate },
  { label: 'Wide', value: 3 / 1, icon: RectangleHorizontal },
];

const MutationFooter = ({ data, onSave }: MutationFooterProps) => {
  // 1. Initialize State: Use props if available, otherwise default
  const parseInitData = data ? JSON.parse(data) : null;
  const [settings, setSettings] = useState<IFooter2Data>(parseInitData || defaultDataFooter2);

  const [isSaving, setIsSaving] = useState(false);

  // Cropper State
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1); // Default to Square
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(settings);
      } else {
        // Simulate API call if no handler provided
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Saved Settings:', settings);
      }
      toast.success('Footer settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setZoom(1);
        setAspectRatio(1);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setSettings({ ...settings, logoUrl: croppedImage });
      setShowCropper(false);
      setImageSrc(null);
      toast.success('Logo updated successfully');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || 'Error cropping image');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('No 2d context');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // High quality scaling
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

    return canvas.toDataURL('image/png');
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const updateContact = (field: keyof ContactInfo, value: string) => {
    setSettings(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value },
    }));
  };

  // Dynamic List Handlers
  const handleArrayChange = (arrayName: 'quickLinks' | 'socialLinks', id: number, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [arrayName]: prev[arrayName].map((item: any) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeItem = (arrayName: 'quickLinks' | 'socialLinks', id: number) => {
    setSettings(prev => ({
      ...prev,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [arrayName]: prev[arrayName].filter((item: any) => item.id !== id),
    }));
  };

  const addItem = (arrayName: 'quickLinks' | 'socialLinks') => {
    const newItem = arrayName === 'quickLinks' ? { id: Date.now(), title: '', link: '' } : { id: Date.now(), platform: '', link: '' };

    setSettings(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem],
    }));
  };

  // --- REUSABLE STYLES FOR GLASS EFFECT ---
  const glassCardClass = 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl overflow-hidden';
  const glassHeaderClass = 'bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center';
  const glassInputClass =
    'w-full mt-1 px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all text-white placeholder:text-slate-500';
  const labelClass = 'text-xs font-bold text-indigo-300 uppercase tracking-wider';

  return (
    // 1. MAIN BACKGROUND
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black pb-20 text-slate-200">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 border border-indigo-500/30">
              <LayoutTemplate size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Footer Builder</h1>
              <p className="text-xs text-slate-400">Manage global footer content</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-70 transform hover:scale-105 active:scale-95"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Publish Changes'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Info */}
          <div className={glassCardClass}>
            <div className={glassHeaderClass}>
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Type size={18} className="text-indigo-400" /> Brand Information
              </h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className={labelClass}>Brand Name</label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={e => setSettings({ ...settings, brandName: e.target.value })}
                  className={glassInputClass}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <textarea
                  rows={3}
                  value={settings.tagline}
                  onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                  className={`${glassInputClass} resize-none`}
                  placeholder="Short description..."
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={glassCardClass}>
            <div className={glassHeaderClass}>
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Globe size={18} className="text-indigo-400" /> Quick Links
              </h2>
              <button
                onClick={() => addItem('quickLinks')}
                className="text-xs flex items-center gap-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-lg hover:bg-indigo-500/30 transition-colors"
              >
                <Plus size={14} /> Add Link
              </button>
            </div>
            <div className="p-6 space-y-3">
              {settings.quickLinks.map(item => (
                <div key={item.id} className="flex gap-3 items-start group">
                  <input
                    placeholder="Title"
                    value={item.title}
                    onChange={e => handleArrayChange('quickLinks', item.id, 'title', e.target.value)}
                    className={`${glassInputClass} mt-0`}
                  />
                  <input
                    placeholder="/link"
                    value={item.link}
                    onChange={e => handleArrayChange('quickLinks', item.id, 'link', e.target.value)}
                    className={`${glassInputClass} mt-0 font-mono text-slate-400`}
                  />
                  <button
                    onClick={() => removeItem('quickLinks', item.id)}
                    className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Contact */}
        <div className="space-y-6">
          {/* Logo */}
          <div className={glassCardClass}>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Logo</h3>
              <div className="flex flex-col items-center p-6 border-2 border-dashed border-white/10 rounded-xl bg-black/20 mb-4 min-h-[120px] justify-center">
                {settings.logoUrl ? (
                  <div className="relative">
                    <Image
                      src={settings.logoUrl}
                      width={settings.logoWidth}
                      height={settings.logoWidth}
                      alt="Logo"
                      className="object-contain drop-shadow-lg"
                      style={{ width: `${settings.logoWidth}px` }}
                    />
                  </div>
                ) : (
                  <span className="text-slate-500 text-sm flex flex-col items-center gap-2">
                    <Upload size={20} className="opacity-50" />
                    No Logo
                  </span>
                )}
              </div>
              <label className="cursor-pointer w-full block text-center py-2.5 border border-white/10 bg-white/5 rounded-lg hover:bg-white/10 text-sm font-medium text-slate-300 transition-colors">
                Upload New
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Size</span>
                  <span>{settings.logoWidth}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={settings.logoWidth}
                  onChange={e => setSettings({ ...settings, logoWidth: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className={`${glassCardClass} p-6 space-y-5`}>
            <h3 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">Contact Details</h3>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-indigo-400" size={16} />
              <input
                value={settings.contactInfo.address}
                onChange={e => updateContact('address', e.target.value)}
                className={`${glassInputClass} mt-0 pl-10`}
                placeholder="Address"
              />
            </div>
            <div className="relative">
              <Smartphone className="absolute top-3 left-3 text-indigo-400" size={16} />
              <input
                value={settings.contactInfo.phone}
                onChange={e => updateContact('phone', e.target.value)}
                className={`${glassInputClass} mt-0 pl-10`}
                placeholder="Phone"
              />
            </div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-indigo-400" size={16} />
              <input
                value={settings.contactInfo.email}
                onChange={e => updateContact('email', e.target.value)}
                className={`${glassInputClass} mt-0 pl-10`}
                placeholder="Email"
              />
            </div>
          </div>

          {/* Socials & Copyright */}
          <div className={`${glassCardClass} p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Social Links</h3>
              <button onClick={() => addItem('socialLinks')} className="p-1.5 bg-white/10 text-slate-300 rounded hover:bg-white/20 transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <div className="space-y-3 mb-6">
              {settings.socialLinks.map(item => (
                <div key={item.id} className="flex gap-2">
                  <input
                    value={item.platform}
                    onChange={e => handleArrayChange('socialLinks', item.id, 'platform', e.target.value)}
                    className="w-1/3 px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-xs text-white outline-none focus:border-indigo-500/50"
                    placeholder="Platform"
                  />
                  <input
                    value={item.link}
                    onChange={e => handleArrayChange('socialLinks', item.id, 'link', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-xs text-slate-300 outline-none focus:border-indigo-500/50 font-mono"
                    placeholder="URL"
                  />
                  <button onClick={() => removeItem('socialLinks', item.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-white/10">
              <label className={labelClass}>Copyright</label>
              <input value={settings.copyrightText} onChange={e => setSettings({ ...settings, copyrightText: e.target.value })} className={glassInputClass} />
            </div>
          </div>
        </div>
      </div>

      {/* Image Cropper Modal (Dark Theme) with Shape Options */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Upload size={18} className="text-indigo-400" />
                Adjust Image
              </h3>
              <button
                onClick={() => {
                  setShowCropper(false);
                  setImageSrc(null);
                }}
                className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cropper Area */}
            <div className="relative flex-1 min-h-[300px] bg-black">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                classes={{
                  containerClassName: 'bg-transparent',
                  cropAreaClassName: 'border-2 border-indigo-500 shadow-[0_0_0_9999px_rgba(0,0,0,0.8)]',
                }}
              />
            </div>

            {/* Controls Area */}
            <div className="p-6 bg-slate-900 space-y-6 border-t border-white/10">
              {/* 1. Aspect Ratio Selector */}
              <div className="space-y-3">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Crop Shape</div>
                <div className="grid grid-cols-4 gap-2">
                  {ASPECT_RATIOS.map(ratio => (
                    <button
                      key={ratio.label}
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`flex flex-col items-center justify-center gap-2 py-3 rounded-lg border transition-all duration-200 ${
                        Math.abs(aspectRatio - ratio.value) < 0.01
                          ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <ratio.icon size={18} />
                      <span className="text-[10px] font-medium">{ratio.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Zoom Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium text-slate-400 uppercase tracking-wider">
                  <span>Zoom Level</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={e => setZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowCropper(false);
                    setImageSrc(null);
                  }}
                  className="flex-1 px-4 py-3 border border-white/10 text-slate-300 rounded-xl hover:bg-white/5 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropSave}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-500 hover:to-indigo-400 font-medium shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MutationFooter;
