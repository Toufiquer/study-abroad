'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Clock, XCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      const lastDismissed = localStorage.getItem('pwa-install-dismissed');
      const tryLaterDate = localStorage.getItem('pwa-install-try-later');

      if (tryLaterDate) {
        const nextShowDate = new Date(tryLaterDate);
        const now = new Date();

        if (now < nextShowDate) {
          return;
        }
      }

      if (!lastDismissed) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        localStorage.removeItem('pwa-install-dismissed');
        localStorage.removeItem('pwa-install-try-later');
      }

      setShowPrompt(false);
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
    setShowPrompt(false);
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  const handleTryLater = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem('pwa-install-try-later', tomorrow.toISOString());
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative max-w-md w-full"
        >
          <Card className="relative overflow-hidden border-2 border-sky-400/30 bg-gradient-to-br from-blue-950/95 via-sky-900/90 to-blue-950/95 backdrop-blur-xl shadow-2xl shadow-sky-900/50">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-blue-600/10" />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-sky-400/10 hover:bg-sky-400/20 text-sky-300 transition-all duration-300"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <CardHeader className="relative pb-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="flex justify-center mb-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-sky-500 to-blue-600 p-4 rounded-2xl shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>

              <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-sky-300 via-blue-300 to-sky-200 bg-clip-text text-transparent">
                Install Our App
              </CardTitle>
              <CardDescription className="text-center text-sky-100/80 text-base mt-2">
                Get instant access and enjoy a faster, more reliable experience!
              </CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-4 pb-6">
              <div className="space-y-3"></div>
            </CardContent>

            <CardFooter className="relative flex flex-col gap-3 pt-4 border-t border-sky-400/20">
              {/* Install Button */}
              <Button
                onClick={handleInstall}
                disabled={isInstalling}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg shadow-sky-500/40 hover:shadow-sky-500/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isInstalling ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Download className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Install Now
                  </>
                )}
              </Button>

              {/* Try Later & Cancel Buttons */}
              <div className="flex gap-2 w-full">
                <Button
                  onClick={handleTryLater}
                  variant="outline"
                  className="flex-1 h-10 text-sm border-sky-400/30 bg-sky-400/5 hover:bg-sky-400/10 text-sky-200 hover:text-sky-100 transition-all duration-300"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Try Later
                </Button>

                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  className="flex-1 h-10 text-sm text-sky-300/70 hover:text-sky-300 hover:bg-sky-400/10 transition-all duration-300"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-center text-sky-300/50 mt-2">You can always install later from your browser menu</p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
