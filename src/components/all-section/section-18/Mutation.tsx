// Mutation.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Mail, Clock, ArrowRight, Globe2, Copy } from 'lucide-react';
import { OfficeLocation } from './data';

interface LocationListProps {
  locations: OfficeLocation[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const LocationSelector = ({ locations, activeId, onSelect }: LocationListProps) => {
  return (
    <div className="space-y-4">
      {locations.map(loc => {
        const isActive = activeId === loc.id;
        return (
          <motion.button
            key={loc.id}
            onClick={() => onSelect(loc.id)}
            className={`w-full text-left relative p-4 rounded-xl border transition-all duration-300 group overflow-hidden ${
              isActive ? 'bg-purple-500/10 border-purple-500/50' : 'bg-zinc-900/50 border-white/5 hover:border-white/20'
            }`}
          >
            {isActive && <motion.div layoutId="activeGlow" className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-50" />}

            <div className="relative z-10 flex items-start gap-4">
              <div
                className={`p-3 rounded-lg flex-shrink-0 transition-colors ${
                  isActive ? 'bg-purple-500 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white'
                }`}
              >
                <MapPin className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>{loc.city}</h3>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[10px] font-bold uppercase tracking-wider bg-purple-500 text-white px-2 py-0.5 rounded-full"
                    >
                      Active
                    </motion.span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 font-medium mb-2">{loc.name}</p>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <Globe2 className="w-3 h-3" />
                  <span>{loc.country}</span>
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export const ContactOverlay = ({ activeLocation }: { activeLocation: OfficeLocation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-6">
      <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Direct Line</h4>

      <div className="space-y-6">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => handleCopy(activeLocation.contact.phone)}>
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-purple-500 transition-colors">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-0.5">Phone</p>
            <p className="text-white font-mono hover:text-purple-400 transition-colors">{activeLocation.contact.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => handleCopy(activeLocation.contact.email)}>
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-purple-500 transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-0.5">Email</p>
            <p className="text-white font-mono hover:text-purple-400 transition-colors">{activeLocation.contact.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-0.5">Hours</p>
            <p className="text-zinc-300 text-sm">{activeLocation.schedule}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
          <Navigation className="w-4 h-4" />
          Get Directions
        </button>
        <button
          onClick={() => handleCopy(activeLocation.address)}
          className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          {copied ? <ArrowRight className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
