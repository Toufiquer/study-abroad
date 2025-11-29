'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Handshake, ArrowRight, Zap, BoxSelect, Sparkles } from 'lucide-react';
import { ISection13Data, defaultDataSection13, Section13Props } from './data';

const ClientSection13: React.FC<Section13Props> = ({ data }) => {
  const sectionData: ISection13Data = useMemo(() => {
    if (!data) return defaultDataSection13;
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (e) {
      console.error('Failed to parse section data', e);
      return defaultDataSection13;
    }
  }, [data]);

  const duplicatedPartners = [...sectionData.partners, ...sectionData.partners, ...sectionData.partners];

  return (
    <section className="relative w-full py-24 md:py-32 bg-zinc-950 overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Handshake size={12} />
            <span>Partnership Network</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-6"
          >
            {sectionData.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{sectionData.subTitle}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 leading-relaxed"
          >
            {sectionData.description}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative w-full overflow-hidden mb-24 group">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 md:gap-24 items-center pr-12 md:pr-24"
              animate={{ x: '-50%' }}
              transition={{
                duration: 30,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              }}
              style={{ width: 'fit-content' }}
            >
              {duplicatedPartners.map((partner, idx) => (
                <div
                  key={`${partner.id}-${idx}`}
                  className="relative h-12 w-32 md:h-16 md:w-48 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                >
                  {partner.logo ? (
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain" unoptimized />
                  ) : (
                    <span className="text-xl font-bold text-zinc-700">{partner.name}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {sectionData.collabOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300 shadow-lg shadow-black/50">
                  {index === 0 && <Sparkles size={24} className="text-cyan-400" />}
                  {index === 1 && <BoxSelect size={24} className="text-blue-400" />}
                  {index === 2 && <Zap size={24} className="text-indigo-400" />}
                  {index > 2 && <Handshake size={24} className="text-zinc-400" />}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{option.title}</h3>

                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">{option.description}</p>

                <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 group-hover:text-white transition-colors cursor-pointer">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientSection13;
