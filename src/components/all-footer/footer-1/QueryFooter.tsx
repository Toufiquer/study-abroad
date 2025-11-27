/*
|-----------------------------------------
| English  - Main Footer (Dynamic Glass Edition)
| Author: Toufiquer Rahman <toufiquer.0@gmail.com>
|-----------------------------------------
*/

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
// Importing icons for social mapping
import { BiLogoFacebookCircle, BiLogoLinkedin, BiLogoInstagram, BiLogoYoutube, BiWorld } from 'react-icons/bi';
import { BsTwitter, BsGithub } from 'react-icons/bs';
import { defaultDataFooter1, IFooter1Data } from './data';

interface QueryFooter1Props {
  data?: string;
}

const QueryFooter1 = ({ data }: QueryFooter1Props) => {
  const parseInitData = data ? JSON.parse(data) : null;
  // 1. Initialize State with props data if available, otherwise use default
  const [settings] = useState<IFooter1Data>(parseInitData || defaultDataFooter1);

  // 2. Helper to map string platform names to React Icons
  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('facebook')) return <BiLogoFacebookCircle size={20} />;
    if (p.includes('twitter') || p.includes('x')) return <BsTwitter size={18} />;
    if (p.includes('linkedin')) return <BiLogoLinkedin size={20} />;
    if (p.includes('instagram')) return <BiLogoInstagram size={20} />;
    if (p.includes('youtube')) return <BiLogoYoutube size={20} />;
    if (p.includes('github')) return <BsGithub size={18} />;
    return <BiWorld size={20} />;
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-slate-900/30 backdrop-blur-xl text-slate-300 overflow-hidden z-10">
      {/* Decorative Glow Effects behind the glass */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16 relative z-10"
      >
        {/* Top Grid Section */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Logo & Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                {settings.logoUrl && (
                  <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                    {/* Updated Image Component for robust rendering */}
                    <Image
                      src={settings.logoUrl}
                      alt={`${settings.brandName} Logo`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="object-contain"
                      style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: `${settings.logoWidth}px`,
                        maxHeight: '80px', // Prevents logo from being too tall if aspect ratio is unique
                      }}
                      unoptimized // Crucial for rendering Base64 or external URLs without config issues
                    />
                  </div>
                )}
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-indigo-400 transition-all duration-300">
                  {settings.brandName}
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{settings.tagline}</p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-indigo-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {settings.quickLinks.map(link => (
                <motion.li key={link.id} whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Link href={link.link} className="text-sm text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-indigo-400 transition-colors"></span>
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              {settings.contactInfo.address && (
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-indigo-400">📍</span>
                  <span className="leading-relaxed">{settings.contactInfo.address}</span>
                </li>
              )}
              {settings.contactInfo.phone && (
                <li className="flex items-center gap-3 group">
                  <span className="text-indigo-400 group-hover:text-white transition-colors">📞</span>
                  <span className="group-hover:text-white transition-colors cursor-pointer">{settings.contactInfo.phone}</span>
                </li>
              )}
              {settings.contactInfo.email && (
                <li className="flex items-center gap-3 group">
                  <span className="text-indigo-400 group-hover:text-white transition-colors">✉️</span>
                  <span className="group-hover:text-white transition-colors cursor-pointer">{settings.contactInfo.email}</span>
                </li>
              )}
            </ul>
          </div>

          {/* 4. Social & Newsletter (Optional layout) */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 relative inline-block">
              Community
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
            </h3>
            <p className="text-sm text-slate-400 mb-6">Join our community and stay up to date with the latest news.</p>

            <div className="flex items-center gap-3 flex-wrap">
              {settings.socialLinks.map(social => (
                <Link
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  aria-label={social.platform}
                  className="p-3 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all duration-300"
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-slate-300">{settings.copyrightText}</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <p className="pl-6 border-l border-white/10">
              Made by <span className="text-indigo-400 font-medium">{settings.designerName}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default QueryFooter1;
