/*
|-----------------------------------------
| Footer Editor Component (Glassmorphism Edition)
| Author: Toufiquer Rahman <toufiquer.0@gmail.com>
|-----------------------------------------
*/

'use client';

import React, { useState, useCallback } from 'react';
import { Save, Plus, Trash2, Upload, X, Globe, Smartphone, Mail, MapPin, LayoutTemplate, Type, Square, RectangleHorizontal } from 'lucide-react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import { ContactInfo, defaultDataFooter1, IFooter1Data } from './data';
import { toast } from 'react-toastify';

interface MutationFooter1Props {
  data?: string;
  onSave?: (settings: IFooter1Data) => Promise<void> | void;
}

// Define available aspect ratios for the logo
const ASPECT_RATIOS = [
  { label: 'Square', value: 1, icon: Square },
  { label: '16:9', value: 16 / 9, icon: RectangleHorizontal },
  { label: '4:3', value: 4 / 3, icon: LayoutTemplate },
  { label: 'Wide', value: 3 / 1, icon: RectangleHorizontal },
];

const MutationFooter1 = ({ data, onSave }: MutationFooter1Props) => {
  // 1. Initialize State: Use props if available, otherwise default
  const parseInitData = data ? JSON.parse(data) : null;
  const [settings, setSettings] = useState<IFooter1Data>(parseInitData || defaultDataFooter1);

  // Cropper State
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1); // Default to Square
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(settings);
      } else {
        // Simulate a delay if no handler is provided
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Saved Settings:', settings);
      }
      toast.success('Footer settings saved successfully!');
    } catch (error) {
      toast.error('Error saving footer settings');
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
        setAspectRatio(1); // Reset to square initially
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
      toast.success('Logo updated!');
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

  // Helper to update specific fields
  const updateContact = (field: keyof ContactInfo, value: string) => {
    setSettings(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value },
    }));
  };

  // Dynamic List Handlers
  const addQuickLink = () => {
    const newId = Date.now();
    setSettings({
      ...settings,
      quickLinks: [...settings.quickLinks, { id: newId, title: '', link: '' }],
    });
  };

  const updateQuickLink = (id: number, field: 'title' | 'link', value: string) => {
    setSettings({
      ...settings,
      quickLinks: settings.quickLinks.map(l => (l.id === id ? { ...l, [field]: value } : l)),
    });
  };

  const removeQuickLink = (id: number) => {
    setSettings({ ...settings, quickLinks: settings.quickLinks.filter(l => l.id !== id) });
  };

  const addSocialLink = () => {
    const newId = Date.now();
    setSettings({
      ...settings,
      socialLinks: [...settings.socialLinks, { id: newId, platform: '', link: '' }],
    });
  };

  const updateSocialLink = (id: number, field: 'platform' | 'link', value: string) => {
    setSettings({
      ...settings,
      socialLinks: settings.socialLinks.map(l => (l.id === id ? { ...l, [field]: value } : l)),
    });
  };

  const removeSocialLink = (id: number) => {
    setSettings({ ...settings, socialLinks: settings.socialLinks.filter(l => l.id !== id) });
  };

  // --- REUSABLE STYLES FOR GLASS EFFECT ---
  const glassCardClass = 'bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 relative overflow-hidden';
  const glassInputClass =
    'w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 outline-none transition-all text-white placeholder:text-slate-400';
  const labelClass = 'block text-sm font-medium text-slate-300 mb-2';

  return (
    // 1. MAIN BACKGROUND: Radial Gradient for "Eye-Catching" view
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black text-slate-100 pb-20 font-sans">
      {/* Sticky Header: Dark Glass */}
      <div className="sticky top-0 z-40 bg-slate-900/60 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
              <LayoutTemplate size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Footer Manager</h1>
              <p className="text-sm text-slate-400">Customize global footer settings</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8 mt-4">
        {/* Section: Brand Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* BRAND IDENTITY CARD */}
            <section className={glassCardClass}>
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>

              <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-white relative z-10">
                <Type className="text-indigo-400" size={20} />
                Brand Identity
              </h2>

              <div className="space-y-5 relative z-10">
                <div>
                  <label className={labelClass}>Brand Name</label>
                  <input
                    type="text"
                    value={settings.brandName}
                    onChange={e => setSettings({ ...settings, brandName: e.target.value })}
                    className={glassInputClass}
                    placeholder="e.g. Acme Corp"
                  />
                </div>

                <div>
                  <label className={labelClass}>Tagline / Description</label>
                  <textarea
                    value={settings.tagline}
                    onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                    rows={3}
                    className={`${glassInputClass} resize-none`}
                    placeholder="A short description about your company..."
                  />
                </div>
              </div>
            </section>

            {/* QUICK LINKS CARD */}
            <section className={glassCardClass}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <Globe className="text-indigo-400" size={20} />
                  Quick Links
                </h2>
                <button
                  onClick={addQuickLink}
                  className="text-sm flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-indigo-300 border border-indigo-500/30 rounded-md hover:bg-indigo-500/20 transition-all font-medium"
                >
                  <Plus size={16} /> Add Link
                </button>
              </div>

              <div className="space-y-3">
                {settings.quickLinks.length === 0 && (
                  <div className="text-center py-8 bg-black/10 rounded-lg border border-dashed border-white/10 text-slate-500">No links added yet</div>
                )}
                {settings.quickLinks.map(link => (
                  <div key={link.id} className="group flex items-start gap-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={link.title}
                        onChange={e => updateQuickLink(link.id, 'title', e.target.value)}
                        placeholder="Link Title"
                        className={glassInputClass}
                      />
                      <input
                        type="text"
                        value={link.link}
                        onChange={e => updateQuickLink(link.id, 'link', e.target.value)}
                        placeholder="/path"
                        className={`${glassInputClass} font-mono text-slate-300`}
                      />
                    </div>
                    <button
                      onClick={() => removeQuickLink(link.id)}
                      className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* LOGO CARD */}
            <section className={glassCardClass}>
              <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4">Logo Configuration</h2>

              <div className="bg-black/20 rounded-xl p-6 flex flex-col items-center justify-center border border-dashed border-white/20 mb-4 min-h-[140px]">
                {settings.logoUrl ? (
                  <div className="relative">
                    <Image
                      src={settings.logoUrl}
                      alt="Brand Logo"
                      width={settings.logoWidth}
                      height={settings.logoWidth}
                      className="object-contain transition-all duration-300 drop-shadow-lg"
                      style={{ width: `${settings.logoWidth}px` }}
                    />
                  </div>
                ) : (
                  <div className="text-slate-500 text-sm flex flex-col items-center gap-2">
                    <Upload size={20} className="opacity-50" />
                    <span>No logo uploaded</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="flex flex-col gap-2 cursor-pointer group">
                  <span className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-200 font-medium rounded-lg group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <Upload size={16} />
                    {settings.logoUrl ? 'Change Logo' : 'Upload Logo'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Size</span>
                    <span>{settings.logoWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    value={settings.logoWidth}
                    onChange={e => setSettings({ ...settings, logoWidth: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* CONTACT CARD */}
            <section className={glassCardClass}>
              <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4">Contact Details</h2>
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute top-3 left-3 text-indigo-400" size={16} />
                  <input
                    type="text"
                    value={settings.contactInfo.address}
                    onChange={e => updateContact('address', e.target.value)}
                    placeholder="Address"
                    className={`${glassInputClass} pl-10`}
                  />
                </div>
                <div className="relative">
                  <Smartphone className="absolute top-3 left-3 text-indigo-400" size={16} />
                  <input
                    type="text"
                    value={settings.contactInfo.phone}
                    onChange={e => updateContact('phone', e.target.value)}
                    placeholder="Phone"
                    className={`${glassInputClass} pl-10`}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute top-3 left-3 text-indigo-400" size={16} />
                  <input
                    type="email"
                    value={settings.contactInfo.email}
                    onChange={e => updateContact('email', e.target.value)}
                    placeholder="Email"
                    className={`${glassInputClass} pl-10`}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SOCIAL LINKS CARD */}
          <section className={glassCardClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Social Media</h2>
              <button
                onClick={addSocialLink}
                className="p-1.5 bg-white/5 text-indigo-300 border border-white/10 rounded-md hover:bg-white/10 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {settings.socialLinks.map(link => (
                <div key={link.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={link.platform}
                    onChange={e => updateSocialLink(link.id, 'platform', e.target.value)}
                    placeholder="Platform"
                    className={`${glassInputClass} w-1/3`}
                  />
                  <input
                    type="text"
                    value={link.link}
                    onChange={e => updateSocialLink(link.id, 'link', e.target.value)}
                    placeholder="URL"
                    className={`${glassInputClass} flex-1 font-mono text-slate-300`}
                  />
                  <button onClick={() => removeSocialLink(link.id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER TEXT CARD */}
          <section className={glassCardClass}>
            <h2 className="text-lg font-semibold text-white mb-4">Legal & Credits</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Copyright Text</label>
                <input
                  type="text"
                  value={settings.copyrightText}
                  onChange={e => setSettings({ ...settings, copyrightText: e.target.value })}
                  className={glassInputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Designer/Developer Credit</label>
                <input
                  type="text"
                  value={settings.designerName}
                  onChange={e => setSettings({ ...settings, designerName: e.target.value })}
                  className={glassInputClass}
                />
              </div>
            </div>
          </section>
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

export default MutationFooter1;
