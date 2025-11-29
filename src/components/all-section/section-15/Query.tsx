// Query.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Clock, Calendar, Share2, Bookmark, ChevronRight, ArrowUpRight } from 'lucide-react';
import { articleData, ArticleBlock } from './data';
import { NewsletterMutation } from './Mutation';

const RenderBlock = ({ block }: { block: ArticleBlock; index: number }) => {
  switch (block.type) {
    case 'heading':
      return (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6 tracking-tight"
        >
          {block.content}
        </motion.h2>
      );
    case 'quote':
      return (
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="my-12 border-l-4 border-purple-500 pl-6 md:pl-10 py-2 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent -z-10" />
          <blockquote className="text-xl md:text-2xl font-serif italic text-zinc-100 leading-relaxed">&quot;{block.content}&quot;</blockquote>
          <figcaption className="mt-4 text-purple-400 font-medium flex items-center gap-2">
            <span className="w-8 h-[1px] bg-purple-400/50" />
            {block.author}
          </figcaption>
        </motion.figure>
      );
    case 'image':
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="my-12 group">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800">
            <Image src={block.src} alt={block.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {block.caption && <p className="mt-3 text-sm text-zinc-500 text-center font-mono">{block.caption}</p>}
        </motion.div>
      );
    default:
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6 font-light"
        >
          {block.content}
        </motion.p>
      );
  }
};

export default function ArticleQuery() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            SECTION<span className="text-zinc-500">15</span>
          </div>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-zinc-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Bookmark className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>
      </nav>

      <header className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image src={articleData.heroImage} alt="Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#0a0a0a]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
              {articleData.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
          >
            {articleData.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {articleData.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </header>

      <main className="relative z-20 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="hidden lg:block lg:col-span-3 h-full">
            <div className="sticky top-32 space-y-8">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/20">
                  <Image src={articleData.author.avatar} alt={articleData.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-white">{articleData.author.name}</p>
                  <p className="text-xs text-zinc-500">{articleData.author.role}</p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-zinc-800" />

              <div className="space-y-4 text-sm text-zinc-400">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>{articleData.publishedAt}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  <span>{articleData.readTime}</span>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {articleData.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <article className="col-span-1 lg:col-span-7">
            <div className="lg:hidden flex items-center justify-between mb-8 pb-8 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={articleData.author.avatar} alt={articleData.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">{articleData.author.name}</p>
                  <div className="flex gap-2 text-xs text-zinc-500">
                    <span>{articleData.publishedAt}</span> • <span>{articleData.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {articleData.content.map((block, i) => (
              <RenderBlock key={i} block={block} index={i} />
            ))}

            <div className="mt-16">
              <NewsletterMutation />
            </div>
          </article>

          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-32 border-l border-zinc-800 pl-6">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-6">On this page</p>
              <ul className="space-y-4 text-sm">
                {articleData.content
                  .filter(b => b.type === 'heading')
                  .map((h, i) => (
                    <li key={i} className="text-zinc-400 hover:text-purple-400 cursor-pointer transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {h.content}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-zinc-900 border-t border-zinc-800 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-12 text-white flex items-center gap-2">
            Next from Section 15 <ArrowUpRight className="w-5 h-5 text-purple-500" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-zinc-800">
                  <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
                  <Image
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1635070041078-e363dbe005cb' : i === 2 ? '1558655146-d09347e0c766' : '1504639725590-34d0984388bd'}?auto=format&fit=crop&w=800&q=80`}
                    alt="Related"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-purple-400 text-xs font-semibold uppercase mb-2">Algorithm</p>
                <h4 className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors">The aesthetics of invisible computation</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
