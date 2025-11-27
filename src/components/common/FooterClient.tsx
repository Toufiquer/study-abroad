'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Facebook, Mail, MapPin, Phone, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface QuickLink {
  id: number;
  title: string;
  link: string;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface SocialLink {
  id: number;
  platform: string;
  link: string;
}

interface FooterDataDetails {
  brandName: string;
  logoUrl: string;
  logoWidth: number;
  tagline: string;
  quickLinks: QuickLink[];
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  copyrightText: string;
  designerName: string;
}

interface FooterItem {
  _id: string;
  footerUId: string;
  isActive: boolean;
  disabledPath?: string[];
  data: FooterDataDetails;
}

const SocialIcon = ({ platform }: { platform: string }) => {
  const normalized = platform.toLowerCase();
  switch (normalized) {
    case 'github':
      return <Github size={20} />;
    case 'linkedin':
      return <Linkedin size={20} />;
    case 'twitter':
      return <Twitter size={20} />;
    case 'instagram':
      return <Instagram size={20} />;
    case 'facebook':
      return <Facebook size={20} />;
    default:
      return <Globe size={20} />;
  }
};

export default function FooterClient({ footers }: { footers: FooterItem[] }) {
  const pathname = usePathname();

  if (!pathname) return null;

  if (pathname.includes('/dashboard')) return null;

  const isDisabledPath = footers.some(footer => footer.disabledPath?.some(path => path === pathname));

  if (isDisabledPath) return null;

  if (footers.length === 0) return null;

  return (
    <footer className="w-full bg-slate-950 text-slate-200 overflow-hidden font-sans border-t border-slate-900">
      {footers.map(footer => (
        <div key={footer._id} className="relative z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />

          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-20 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="lg:col-span-5 space-y-8"
              >
                <Link href="/" className="inline-block">
                  <div className="flex items-center gap-3 group">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-tr from-white/10 to-transparent p-3 backdrop-blur-sm border border-white/5 group-hover:border-white/10 transition-colors">
                      <Image
                        width={200}
                        height={200}
                        src={footer.data.logoUrl}
                        alt={footer.data.brandName}
                        style={{ width: footer.data.logoWidth }}
                        className="object-contain filter drop-shadow-lg"
                      />
                    </div>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                      {footer.data.brandName}
                    </span>
                  </div>
                </Link>

                <p className="text-slate-400 text-lg leading-relaxed max-w-md font-light">{footer.data.tagline}</p>

                <div className="flex gap-4 pt-2">
                  {footer.data.socialLinks.map((social, index) => (
                    <motion.a
                      key={social.id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-2xl bg-slate-900/50 border border-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all duration-300 shadow-lg shadow-black/20"
                    >
                      <SocialIcon platform={social.platform} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 lg:col-start-7"
              >
                <h3 className="text-white font-semibold text-xl mb-8 flex items-center gap-3">
                  <span className="w-1 h-6 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></span>
                  Quick Links
                </h3>
                <ul className="space-y-4">
                  {footer.data.quickLinks.map(link => (
                    <li key={link.id}>
                      <Link href={link.link} className="group flex items-center text-slate-400 hover:text-white transition-all duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-3 group-hover:bg-indigo-400 group-hover:scale-125 transition-all duration-300"></span>
                        <span className="group-hover:translate-x-2 transition-transform duration-300 text-base">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-3"
              >
                <h3 className="text-white font-semibold text-xl mb-8 flex items-center gap-3">
                  <span className="w-1 h-6 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></span>
                  Contact Us
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-slate-400 group">
                    <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 group-hover:border-purple-500/30 transition-colors">
                      <MapPin className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="group-hover:text-slate-200 transition-colors mt-1.5 text-sm leading-relaxed">{footer.data.contactInfo.address}</span>
                  </li>
                  <li className="flex items-center gap-4 text-slate-400 group">
                    <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 group-hover:border-purple-500/30 transition-colors">
                      <Phone className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="group-hover:text-slate-200 transition-colors text-sm">{footer.data.contactInfo.phone}</span>
                  </li>
                  <li className="flex items-center gap-4 text-slate-400 group">
                    <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 group-hover:border-purple-500/30 transition-colors">
                      <Mail className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="group-hover:text-slate-200 transition-colors text-sm">{footer.data.contactInfo.email}</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, borderTopColor: 'rgba(30,41,59,0)' }}
              whileInView={{ opacity: 1, borderTopColor: 'rgba(30,41,59,0.5)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <p className="text-slate-500 text-sm font-medium">{footer.data.copyrightText}</p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/30 border border-slate-800/50">
                <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Designed by</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold text-sm">
                  {footer.data.designerName}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </footer>
  );
}
