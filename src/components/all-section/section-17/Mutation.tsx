// Mutation.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSearch: (query: string) => void;
}

export const FilterBar = ({ categories, selectedCategory, onSelectCategory, onSearch }: FilterBarProps) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
    setIsSearchActive(false);
  };

  return (
    <div className="sticky top-20 z-30 w-full mb-12">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-2xl shadow-purple-900/20">
        {/* Categories */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto p-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors outline-none whitespace-nowrap"
            >
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-zinc-800 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${selectedCategory === cat ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>{cat}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-auto flex items-center gap-2 px-2 relative">
          <motion.div
            initial={false}
            animate={{ width: isSearchActive ? 240 : 40 }}
            className="h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center overflow-hidden"
          >
            <button onClick={() => setIsSearchActive(true)} className="min-w-[40px] h-full flex items-center justify-center text-zinc-500 hover:text-white">
              <Search className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => !searchValue && setIsSearchActive(false)}
              placeholder="Search protocol..."
              className={`bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-600 w-full pr-8 transition-opacity ${isSearchActive ? 'opacity-100' : 'opacity-0'}`}
            />

            {searchValue && (
              <button onClick={clearSearch} className="absolute right-4 text-zinc-500 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>

          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:text-purple-400 hover:border-purple-500/50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
