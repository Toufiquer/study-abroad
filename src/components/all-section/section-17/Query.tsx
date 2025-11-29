// Query.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar, Hash, Zap } from 'lucide-react';
import { blogData, categories, BlogPost } from './data';
import { FilterBar } from './Mutation';

const FeaturedCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="relative w-full h-[60vh] min-h-[500px] rounded-3xl overflow-hidden mb-16 group">
      <div className="absolute inset-0">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">Featured</span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase tracking-widest rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight group-hover:text-purple-100 transition-colors">{post.title}</h1>

          <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl line-clamp-2 font-light">{post.excerpt}</p>

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <span className="text-white font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium text-white border border-white/10">
          {post.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-purple-400 transition-colors line-clamp-2">{post.title}</h3>
          <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-zinc-800">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <span className="text-xs text-zinc-500">{post.publishedAt}</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-500 transition-colors transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.div>
  );
};

export default function BlogQuery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = blogData.find(p => p.featured) || blogData[0];

  const filteredPosts = useMemo(() => {
    return blogData
      .filter(post => !post.featured) // Exclude featured from grid
      .filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 selection:text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none z-0" />

      {/* Navigation Stub */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Zap className="w-5 h-5 text-purple-500 fill-purple-500" />
            NEXUS<span className="text-zinc-500">BLOG</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <span className="text-white cursor-pointer">Journal</span>
            <span className="hover:text-white cursor-pointer transition-colors">Research</span>
            <span className="hover:text-white cursor-pointer transition-colors">Changelog</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-24">
        {/* Featured Section */}
        <FeaturedCard post={featuredPost} />

        {/* Filter & Search */}
        <FilterBar categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} onSearch={setSearchQuery} />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => <BlogCard key={post.id} post={post} />)
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
                  <Hash className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No transmissions found</h3>
                <p className="text-zinc-500">Adjust your frequency filters and try again.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Newsletter Section */}
        <section className="mt-32 relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 p-8 md:p-16 text-center">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Stay ahead of the curve</h2>
            <p className="text-zinc-400 mb-8 text-lg">Join 40,000+ developers exploring the future of interface design. No spam, just pure signal.</p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-black/50 border border-zinc-700 text-white px-6 py-4 rounded-xl outline-none focus:border-purple-500 transition-colors"
              />
              <button className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-zinc-200 transition-colors">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#020202] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-500 text-sm">© 2025 Nexus Protocol. All rights reserved.</div>
          <div className="flex gap-6">
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all cursor-pointer">
              X
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all cursor-pointer">
              In
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all cursor-pointer">
              Gh
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
