'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import {
  Upload,
  Image as ImageIcon,
  Type,
  Save,
  ZoomIn,
  Check,
  Smartphone,
  Monitor,
  Layout,
  Sparkles,
  Settings,
  Eye,
  RectangleHorizontal,
  Square as SquareIcon,
  LayoutTemplate,
} from 'lucide-react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandSettingsProps {
  initialSettings?: BrandSettings;
  onSave: (settings: BrandSettings) => void;
}

export interface BrandSettings {
  brandName: string;
  logoUrl: string | null;
  showText: boolean;
  showLogo: boolean;
  logoWidth: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const defaultSettings: BrandSettings = {
  brandName: 'Nexus',
  logoUrl: null,
  showText: true,
  showLogo: false,
  logoWidth: 40,
};

// Define available aspect ratios
const ASPECT_RATIOS = [
  { label: 'Square', value: 1, icon: SquareIcon },
  { label: '16:9', value: 16 / 9, icon: RectangleHorizontal },
  { label: '4:3', value: 4 / 3, icon: LayoutTemplate },
  { label: 'Wide', value: 3 / 1, icon: RectangleHorizontal },
];

export default function BrandSettingsEditor({ initialSettings = defaultSettings, onSave }: BrandSettingsProps) {
  const [settings, setSettings] = useState<BrandSettings>(initialSettings);
  const [tempImage, setTempImage] = useState<string | null>(null);

  // Crop States
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1); // Default to square
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop');
  const [mobileTab, setMobileTab] = useState<'settings' | 'preview'>('settings');

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setTempImage(imageDataUrl as string);
      setAspectRatio(1); // Reset to square on new file
      setZoom(1);
      setIsCropModalOpen(true);
      e.target.value = '';
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    try {
      if (tempImage && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
        setSettings({ ...settings, logoUrl: croppedImage, showLogo: true });
        setIsCropModalOpen(false);
        setTempImage(null);
        setZoom(1);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.message + ' Failed to crop image');
    }
  };

  return (
    <div className="w-full min-h-[400px] lg:h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-purple-600/20 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] bg-blue-600/20 rounded-full blur-[60px] lg:blur-[100px] pointer-events-none mix-blend-screen" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-[1400px] h-full max-h-[900px] backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[24px] lg:rounded-[32px] shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10"
      >
        {/* Mobile Tabs */}
        <div className="lg:hidden flex border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
          <button
            onClick={() => setMobileTab('settings')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all relative ${
              mobileTab === 'settings' ? 'text-white' : 'text-white/40'
            }`}
          >
            <Settings size={16} />
            <span>Settings</span>
            {mobileTab === 'settings' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_-2px_10px_rgba(59,130,246,0.5)]" />
            )}
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all relative ${
              mobileTab === 'preview' ? 'text-white' : 'text-white/40'
            }`}
          >
            <Eye size={16} />
            <span>Preview</span>
            {mobileTab === 'preview' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_-2px_10px_rgba(59,130,246,0.5)]" />
            )}
          </button>
        </div>

        {/* Settings Panel */}
        <div
          className={`w-full lg:w-[400px] xl:w-[450px] flex-col h-full bg-gradient-to-b from-white/5 to-transparent relative z-20 transition-transform duration-300 lg:flex ${
            mobileTab === 'settings' ? 'flex' : 'hidden'
          }`}
        >
          <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Visual Identity</h2>
                <p className="text-xs text-blue-200/60 font-medium mt-0.5">Customize your brand appearance</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Brand Name Input */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-blue-100 font-medium flex items-center gap-2">
                    <Type size={14} className="text-blue-400" />
                    Brand Name
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-200/50">{settings.showText ? 'Shown' : 'Hidden'}</span>
                    <button
                      onClick={() => setSettings(s => ({ ...s, showText: !s.showText }))}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${settings.showText ? 'bg-blue-500' : 'bg-slate-700'}`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${settings.showText ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>
                <Input
                  value={settings.brandName}
                  onChange={e => setSettings({ ...settings, brandName: e.target.value })}
                  className="bg-black/20 border-white/10 text-white placeholder:text-white/20 focus:bg-black/40 focus:border-blue-500/50 rounded-xl h-12 pl-4 transition-all"
                  placeholder="Enter brand name"
                />
              </div>

              {/* Logo Upload */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-blue-100 font-medium flex items-center gap-2">
                    <ImageIcon size={14} className="text-purple-400" />
                    Logo Symbol
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-200/50">{settings.showLogo ? 'Shown' : 'Hidden'}</span>
                    <button
                      onClick={() => setSettings(s => ({ ...s, showLogo: !s.showLogo }))}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${settings.showLogo ? 'bg-blue-500' : 'bg-slate-700'}`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${settings.showLogo ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>

                {!settings.logoUrl ? (
                  <label className="group relative flex flex-col items-center justify-center w-full h-32 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 hover:border-purple-400/50 transition-all overflow-hidden bg-black/10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
                      <div className="p-2 bg-white/10 rounded-full mb-2 group-hover:scale-110 transition-transform shadow-lg">
                        <Upload className="text-blue-200" size={18} />
                      </div>
                      <p className="text-xs text-blue-200/70 font-medium">Click to upload logo</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
                  </label>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                      <div className="relative h-14 w-14 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                        <NextImage src={settings.logoUrl} alt="Logo" fill className="object-contain p-1.5" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <div className="flex gap-2 w-full">
                          <label className="flex-1 flex items-center justify-center text-[11px] font-medium py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-blue-100 cursor-pointer transition-colors border border-white/5">
                            Replace
                            <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
                          </label>
                          <button
                            onClick={() => setSettings({ ...settings, logoUrl: null })}
                            className="flex-1 text-[11px] font-medium py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 rounded-lg transition-colors border border-red-500/10"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between text-[10px] uppercase font-bold text-blue-200/50 tracking-wider">
                        <span>Size</span>
                        <span>{settings.logoWidth}px</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="200" // Increased max slightly for rectangular logos
                        value={settings.logoWidth}
                        onChange={e => setSettings({ ...settings, logoWidth: Number(e.target.value) })}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400 hover:accent-purple-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 pt-0 border-t border-white/10 mt-auto bg-gradient-to-t from-black/40 to-transparent">
            <Button
              onClick={() => onSave(settings)}
              variant="outline"
              size="lg"
              className="w-full border-white/20 text-black hover:bg-white/10 hover:text-white backdrop-blur-sm"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div
          className={`flex-1 bg-black/20 relative flex-col min-h-0 lg:border-l border-white/10 backdrop-blur-sm transition-opacity duration-300 lg:flex ${
            mobileTab === 'preview' ? 'flex h-full' : 'hidden'
          }`}
        >
          {/* Header */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-white/5 gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-200/50 uppercase tracking-widest">
              <Layout size={14} />
              <span>Live Preview</span>
            </div>
            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 backdrop-blur-md self-start sm:self-auto">
              <button
                onClick={() => setActiveView('desktop')}
                className={`p-2 rounded-md transition-all duration-300 flex items-center gap-2 sm:gap-0 ${activeView === 'desktop' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                <Monitor size={16} />
                <span className="text-[10px] font-medium ml-2 sm:hidden">Desktop</span>
              </button>
              <button
                onClick={() => setActiveView('mobile')}
                className={`p-2 rounded-md transition-all duration-300 flex items-center gap-2 sm:gap-0 ${activeView === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                <Smartphone size={16} />
                <span className="text-[10px] font-medium ml-2 sm:hidden">Mobile</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 lg:p-12 overflow-hidden relative w-full h-full bg-slate-900/50">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                className={`relative transition-all duration-500 ease-in-out origin-top sm:origin-center
                  ${activeView === 'mobile' ? 'w-[320px] aspect-[9/19] max-h-[85vh]' : 'w-full max-w-[900px] aspect-[16/10] max-h-[85vh]'} 
                  bg-white rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border-[6px] lg:border-[8px] border-slate-800 overflow-hidden flex flex-col mx-auto`}
              >
                {/* Mock Browser Header */}
                <div className="h-6 bg-slate-800 flex items-center justify-center relative shrink-0">
                  {activeView === 'mobile' ? (
                    <div className="w-16 h-2 bg-black/40 rounded-full" />
                  ) : (
                    <div className="flex gap-1.5 absolute left-3">
                      <div className="w-2 h-2 rounded-full bg-red-500/80" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <div className="w-2 h-2 rounded-full bg-green-500/80" />
                    </div>
                  )}
                </div>

                {/* Navbar */}
                <div className="h-14 lg:h-16 border-b border-gray-100 flex items-center px-4 md:px-6 bg-white justify-between relative z-10 shrink-0">
                  <div className="flex items-center gap-3">
                    {settings.showLogo && settings.logoUrl && (
                      <div
                        className="relative transition-all duration-300"
                        style={{
                          width: `${activeView === 'mobile' ? Math.min(settings.logoWidth, 60) : settings.logoWidth}px`,
                          height: '40px', // Fixed height container
                        }}
                      >
                        <NextImage src={settings.logoUrl} alt="Brand Logo" fill className="object-contain object-left" unoptimized />
                      </div>
                    )}
                    {settings.showText && (
                      <span
                        className={`font-bold text-gray-900 tracking-tight leading-none truncate ${activeView === 'mobile' ? 'text-sm max-w-[120px]' : 'text-xl'}`}
                      >
                        {settings.brandName || 'Brand'}
                      </span>
                    )}
                  </div>

                  <div className={`flex items-center ${activeView === 'mobile' ? 'gap-2' : 'gap-6'} text-sm font-medium text-gray-500`}>
                    {activeView === 'desktop' ? (
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:block h-2 w-12 bg-gray-100 rounded-full" />
                        <div className="hidden sm:block h-2 w-12 bg-gray-100 rounded-full" />
                        <div className="h-8 w-20 lg:w-24 bg-blue-600 rounded-lg ml-2 opacity-90 shadow-sm" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-gray-400 box-content border-y-[3px] border-transparent border-t-gray-400 py-[2px]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Mock Content */}
                <div className="flex-1 bg-gray-50 p-4 md:p-8 flex flex-col gap-4 md:gap-6 overflow-hidden relative">
                  <div className="w-full h-full absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

                  <div className="h-32 md:h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl w-full border border-blue-100 relative overflow-hidden shrink-0 group">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                    <div className="absolute top-6 left-6 right-6 space-y-3">
                      <div className="h-4 bg-blue-200/50 rounded w-1/2" />
                      <div className="h-3 bg-blue-200/30 rounded w-1/3" />
                    </div>
                  </div>

                  <div className="flex gap-4 h-full min-h-0">
                    <div className="h-full bg-white rounded-xl w-2/3 border border-gray-100 shadow-sm p-4 space-y-3">
                      <div className="h-3 w-16 bg-gray-100 rounded" />
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-50 rounded" />
                        <div className="h-2 w-full bg-gray-50 rounded" />
                        <div className="h-2 w-4/5 bg-gray-50 rounded" />
                      </div>
                    </div>
                    <div className="h-full bg-white rounded-xl w-1/3 border border-gray-100 shadow-sm p-4">
                      <div className="h-8 w-8 rounded-full bg-indigo-50 mb-3" />
                      <div className="h-2 w-full bg-gray-50 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* CROP MODAL */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-xl bg-slate-950/90 backdrop-blur-2xl border-white/10 text-white p-0 overflow-hidden gap-0 rounded-3xl shadow-2xl z-[100]">
          <DialogHeader className="p-5 border-b border-white/10 bg-white/5">
            <DialogTitle className="flex items-center gap-2 text-lg font-light">
              <span className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-300">
                <ZoomIn size={14} />
              </span>
              Adjust Image
            </DialogTitle>
          </DialogHeader>

          <div className="relative h-[300px] sm:h-[400px] w-full bg-black/50 touch-none">
            {tempImage && (
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio} // Use dynamic aspect ratio
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                classes={{
                  containerClassName: 'bg-transparent',
                  cropAreaClassName: 'border-2 border-indigo-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] rounded-lg',
                }}
              />
            )}
          </div>

          <div className="p-6 bg-gradient-to-t from-black/80 to-slate-900/50 border-t border-white/10 space-y-6">
            {/* Aspect Ratio Controls */}
            <div className="space-y-3">
              <div className="text-xs font-medium text-blue-200/60 uppercase tracking-wider">Shape</div>
              <div className="grid grid-cols-4 gap-2">
                {ASPECT_RATIOS.map(ratio => (
                  <button
                    key={ratio.label}
                    onClick={() => setAspectRatio(ratio.value)}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border transition-all ${
                      Math.abs(aspectRatio - ratio.value) < 0.01
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <ratio.icon size={18} />
                    <span className="text-[10px] font-medium">{ratio.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-medium text-blue-200/60 uppercase tracking-wider">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={e => setZoom(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-0 pt-2">
              <Button
                variant="ghost"
                onClick={() => setIsCropModalOpen(false)}
                className="w-full sm:w-auto text-white/50 hover:text-white hover:bg-white/10 rounded-xl h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveCrop}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white min-w-[120px] rounded-xl shadow-lg shadow-indigo-900/40 h-11"
              >
                <Check size={16} className="mr-2" /> Apply Crop
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function readFile(file: File) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  return canvas.toDataURL('image/png');
}

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}
