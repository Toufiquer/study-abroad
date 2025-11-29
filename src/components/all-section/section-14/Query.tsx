'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CalendarDays, MapPin, ArrowUpRight, Users } from 'lucide-react';
import { ISection14Data, defaultDataSection14, Section14Props } from './data';

const ClientSection14: React.FC<Section14Props> = ({ data }) => {
  const [, setHoveredEvent] = useState<string | null>(null);

  const sectionData: ISection14Data = useMemo(() => {
    if (!data) return defaultDataSection14;
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (e) {
      console.error('Failed to parse section data', e);
      return defaultDataSection14;
    }
  }, [data]);

  return (
    <section className="relative w-full py-24 md:py-32 bg-zinc-950 overflow-hidden selection:bg-rose-500/30 selection:text-rose-100">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest"
            >
              <Users size={12} />
              <span>Get Together</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight"
            >
              {sectionData.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">{sectionData.subTitle}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-zinc-400 leading-relaxed max-w-lg"
            >
              {sectionData.description}
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <button className="px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
              View All Events
            </button>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sectionData.events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col h-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-rose-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-900/20"
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                {event.image ? (
                  <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                    <CalendarDays size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-80" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6 md:p-8 pt-2 relative">
                {/* Date Float */}
                <div className="absolute -top-10 right-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-center min-w-[70px] shadow-xl group-hover:border-rose-500/50 transition-colors">
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-0.5">{event.date.split(' ')[0]}</div>
                  <div className="text-xl font-black text-white">{event.date.split(' ')[1].replace(',', '')}</div>
                </div>

                <div className="mb-4 space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                    <MapPin size={12} className="text-rose-500" />
                    {event.location}
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-rose-400 transition-colors">{event.title}</h3>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">{event.description}</p>

                <div className="pt-6 border-t border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">{event.actionText}</span>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ArrowUpRight size={18} className="transform group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientSection14;
