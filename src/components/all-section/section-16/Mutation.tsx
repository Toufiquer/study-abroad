// Mutation.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { ModerationItem } from './data';
import Image from 'next/image';

interface ActionPanelProps {
  item: ModerationItem;
  onResolve: (id: string) => void;
}

export const ModerationAction = ({ item, onResolve }: ActionPanelProps) => {
  const [status, setStatus] = useState<'idle' | 'approving' | 'rejecting'>('idle');

  const handleAction = (action: 'approve' | 'reject') => {
    setStatus(action === 'approve' ? 'approving' : 'rejecting');
    setTimeout(() => {
      onResolve(item.id);
    }, 1500);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-4 relative overflow-hidden group">
      {status === 'approving' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-green-500/10 z-10 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-500 text-black px-4 py-2 rounded-full font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> Approved
          </motion.div>
        </motion.div>
      )}

      {status === 'rejecting' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-red-500/10 z-10 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2"
          >
            <XCircle className="w-5 h-5" /> Purged
          </motion.div>
        </motion.div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden ring-2 ring-zinc-700">
              <Image width={200} height={200} src={item.author.avatar} alt={item.author.name} className="w-full h-full object-cover" />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-900 flex items-center justify-center text-[8px] font-bold
                ${item.author.trustScore > 80 ? 'bg-green-500 text-black' : item.author.trustScore > 40 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'}`}
            >
              {item.author.trustScore}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-zinc-200">{item.author.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase tracking-wider">{item.type}</span>
              {item.severity === 'high' && (
                <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> High Risk
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-sm mb-2">{item.content}</p>
            <div className="text-xs text-zinc-500 font-mono">
              Flagged: {item.flagReason} • {item.timestamp}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleAction('approve')}
            disabled={status !== 'idle'}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-green-500/20 hover:text-green-400 text-zinc-400 transition-colors disabled:opacity-50"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleAction('reject')}
            disabled={status !== 'idle'}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 transition-colors disabled:opacity-50"
          >
            <ShieldAlert className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const SystemOverride = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="p-6 bg-gradient-to-br from-red-500/5 to-purple-500/5 rounded-2xl border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Emergency Override
          </h3>
          <p className="text-xs text-zinc-500 mt-1">Force reset all active quantum nodes.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setActive(!active)}
          className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${active ? 'bg-red-500' : 'bg-zinc-700'}`}
        >
          <motion.div animate={{ x: active ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-lg" />
        </motion.button>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-xs font-mono animate-pulse">
              WARNING: SYSTEM INSTABILITY IMMINENT. CONFIRM PROTOCOL 15-B.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
