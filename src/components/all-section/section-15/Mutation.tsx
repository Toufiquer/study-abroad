// Mutation.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Loader2, Sparkles } from 'lucide-react';

export const MutationSection15 = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-16 relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />

      <div className="relative p-8 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-12 -mr-8 -mt-8 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium tracking-wide text-sm uppercase">Join the Inner Circle</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Unlock Section 15</h3>
            <p className="text-zinc-400">Get weekly insights on quantum UI patterns and advanced frontend architecture.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto min-w-[300px]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center justify-center gap-3"
                >
                  <div className="bg-green-500 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-green-400 font-medium">You`&apos;re on the list!</span>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={status === 'loading'}
                    className="w-full bg-zinc-900/50 border border-zinc-700 text-white px-4 py-4 pr-14 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-zinc-600"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-2 top-2 bottom-2 aspect-square bg-white text-black rounded-lg flex items-center justify-center hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MutationSection15;
