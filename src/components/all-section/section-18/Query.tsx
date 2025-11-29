// Query.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Maximize2, Minimize2, ExternalLink, MapPin } from 'lucide-react';
import { locations, mapStyles } from './data';
import { LocationSelector, ContactOverlay } from './Mutation';

export default function LocationQuery() {
  const [activeId, setActiveId] = useState(locations[0].id);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeLocation = locations.find(l => l.id === activeId) || locations[0];
  const [iframeKey, setIframeKey] = useState(0);

  // Force re-render iframe on location change to animate the "fly-to"
  useEffect(() => {
    setIframeKey(prev => prev + 1);
  }, [activeId]);

  return (
    <div
      className={`min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-purple-500/30 overflow-hidden flex flex-col ${isExpanded ? 'h-screen' : ''}`}
    >
      {/* Header */}
      <nav className="border-b border-white/5 bg-[#050505]/90 backdrop-blur-md z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              NEXUS<span className="text-zinc-600">MAPS</span>
            </span>
          </div>
          <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SATELLITE UPLINK ESTABLISHED
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`lg:w-[450px] bg-[#050505] border-r border-white/5 flex flex-col z-30 relative shadow-2xl ${isExpanded ? 'hidden' : 'block'}`}
        >
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Our Locations</h1>
              <p className="text-zinc-400 text-sm">Global infrastructure nodes powering the decentralized web. Select a hub to initiate connection.</p>
            </div>

            <LocationSelector locations={locations} activeId={activeId} onSelect={setActiveId} />

            <ContactOverlay activeLocation={activeLocation} />

            {/* Location Detail Image */}
            <div className="mt-8 relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
              <Image
                src={activeLocation.image}
                alt={activeLocation.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <p className="text-sm font-medium text-white">{activeLocation.name} Interior View</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/5 bg-zinc-900/20 text-center">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Section 15 Protocol • Secure Connection</p>
          </div>
        </motion.aside>

        {/* Map Container */}
        <div className="flex-1 relative bg-zinc-900 overflow-hidden">
          {/* Map Controls */}
          <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-purple-600 hover:border-purple-500 transition-all shadow-lg"
            >
              {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button className="p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-zinc-800 transition-all shadow-lg">
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>

          {/* Map Overlay Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-6 left-6 z-20 hidden md:block"
            >
              <div className="bg-black/80 backdrop-blur-xl border-l-4 border-purple-500 pl-4 py-2 pr-6 rounded-r-xl shadow-2xl">
                <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Current Coordinates</p>
                <p className="text-xl font-mono text-white">
                  {activeLocation.coordinates.lat.toFixed(4)}° N, {Math.abs(activeLocation.coordinates.lng).toFixed(4)}° W
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* The Map (Simulated with Dark Mode Iframe) */}
          <div className="absolute inset-0 z-0">
            {/* 
                NOTE: This iframe uses a trick with CSS filters to invert a standard Google Map 
                into a "Dark Mode" map. The key changes to force a re-render.
             */}
            <iframe
              key={iframeKey}
              width="100%"
              height="100%"
              style={{ filter: mapStyles.darkFilter, opacity: 0.85 }}
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://maps.google.com/maps?q=${activeLocation.coordinates.lat},${activeLocation.coordinates.lng}&z=14&output=embed`}
              title="Google Map"
              className="w-full h-full grayscale transition-opacity duration-500 ease-in-out"
            />

            {/* Overlay Gradient to blend map edges */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#050505]/50" />

            {/* Animated Radar Effect at Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <motion.div
                animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full border border-purple-500/50 bg-purple-500/10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-purple-500 fill-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              </div>
            </div>
          </div>

          {/* Features Grid Floating at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pointer-events-auto">
              {activeLocation.features.map((feature, i) => (
                <motion.div
                  key={`${activeId}-${feature}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-900/80 backdrop-blur-md border border-white/5 p-4 rounded-xl flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]" />
                  <span className="text-sm font-medium text-zinc-200">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
