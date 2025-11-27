'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPwaPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const hiddenUntil = localStorage.getItem('pwa-popup-hidden-until');
      if (hiddenUntil && new Date().getTime() < parseInt(hiddenUntil, 10)) {
        return;
      }
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleMaybeLater = () => {
    setIsVisible(false);
    const nextShowTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem('pwa-popup-hidden-until', nextShowTime.toString());
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // 1. Background Overlay
    <div className="fixed text-white inset-0 z-[999] flex items-center justify-center w-full h-screen bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      <style jsx>{`
        @keyframes popup-enter {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-popup {
          animation: popup-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        @media (prefers-color-scheme: dark) {
          .glass-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>

      {/* 2. Glassy Card Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl glass-card animate-popup">
        {/* Decoration Blobs */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        {/* Button 2: Cross (X) - FIXED: Added z-50 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 text-gray-500 transition-colors duration-200 rounded-full hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content Area */}
        <div className="relative flex flex-col items-center p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            {/* Ensure this path is correct in your project */}
            <Image alt="Logo" src="/icons/icon-512x512.png" width={200} height={200}></Image>
          </div>

          <h3 className="text-2xl font-bold text-white">Install App</h3>
          <p className="mt-2 text-sm font-medium text-gray-300">Get the best experience! Install our app to your home screen for quick and easy access.</p>

          <div className="flex flex-col w-full gap-3 mt-8 sm:flex-row">
            <button
              onClick={handleMaybeLater}
              className="flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 bg-transparent border border-gray-300 rounded-xl text-gray-200 dark:border-gray-600 cursor-pointer"
            >
              Maybe later
            </button>

            <button
              onClick={handleInstallClick}
              className="flex-1 px-4 py-3 text-sm font-bold text-white transition-all duration-200 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:-translate-y-0.5"
            >
              Install Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
