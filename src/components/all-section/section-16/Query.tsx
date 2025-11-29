// Query.tsx
'use client';

import React, { useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Activity, Users, Shield, Terminal, Search, Bell, LayoutGrid, Cpu, GitCommit, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { defaultDataSection16, ModerationItem } from './data';
import { ModerationAction, MutationSection16 } from './Mutation';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SidebarItem = ({ icon: Icon, label, active }: { icon: any; label: string; active?: boolean }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${active ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'hover:bg-white/5 text-zinc-500 hover:text-zinc-300'}`}
  >
    <Icon className={`w-5 h-5 ${active ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
    <span className="font-medium text-sm tracking-wide">{label}</span>
  </div>
);

const StatCard = ({ metric }: { metric: (typeof defaultDataSection16.metrics)[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors"
  >
    <div
      className={`absolute top-0 right-0 p-8 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${metric.status === 'warning' ? 'bg-red-500' : 'bg-purple-500'}`}
    />

    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400">
        <Activity className="w-5 h-5" />
      </div>
      <span
        className={`text-xs font-bold px-2 py-1 rounded-full border ${metric.status === 'warning' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}
      >
        {metric.status.toUpperCase()}
      </span>
    </div>

    <div className="relative z-10">
      <h4 className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-1">{metric.label}</h4>
      <div className="flex items-end gap-3">
        <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{metric.value}</span>
        <span className={`flex items-center text-xs font-bold mb-1.5 ${metric.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {metric.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(metric.trend)}%
        </span>
      </div>
    </div>

    {/* Decorative Graph Line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.random() * 60 + 40}%` }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className={`h-full ${metric.status === 'warning' ? 'bg-red-500' : 'bg-purple-500'}`}
      />
    </div>
  </motion.div>
);

export default function AdminQuery() {
  const [moderationQueue, setModerationQueue] = useState<ModerationItem[]>(defaultDataSection16.moderationQueue);

  const handleResolve = (id: string) => {
    setModerationQueue(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#050505] hidden md:flex flex-col p-6 z-20">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            NEXUS<span className="text-purple-500">ADMIN</span>
          </span>
        </div>

        <nav className="space-y-2 flex-1">
          <div className="text-xs font-semibold text-zinc-600 uppercase tracking-widest px-4 mb-2">Main</div>
          <SidebarItem icon={LayoutGrid} label="Dashboard" active />
          <SidebarItem icon={Users} label="User Grid" />
          <SidebarItem icon={Shield} label="Protocol Security" />

          <div className="text-xs font-semibold text-zinc-600 uppercase tracking-widest px-4 mb-2 mt-8">System</div>
          <SidebarItem icon={Terminal} label="Console" />
          <SidebarItem icon={GitCommit} label="Node Graph" />
          <SidebarItem icon={Activity} label="Health Status" />
        </nav>

        <div className="mt-auto px-4 py-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div className="flex-1">
              <p className="text-xs text-zinc-400">System Status</p>
              <p className="text-xs font-bold text-green-400">OPTIMAL</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative bg-grid-white/[0.02]">
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Command Center</h1>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </div>
            <div className="relative group cursor-pointer">
              <Bell className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 border border-zinc-700" />
          </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultDataSection16.metrics.map(metric => (
              <StatCard key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Moderation Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  Moderation Queue
                  <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-400 border border-zinc-700">{moderationQueue.length} Pending</span>
                </h3>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 min-h-[400px]">
                <LayoutGroup>
                  <AnimatePresence mode="popLayout">
                    {moderationQueue.length === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-zinc-500">
                        <Shield className="w-12 h-12 mb-4 opacity-20" />
                        <p>All sectors clear.</p>
                      </motion.div>
                    ) : (
                      moderationQueue.map(item => (
                        <motion.div key={item.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                          <ModerationAction item={item} onResolve={handleResolve} />
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </LayoutGroup>
              </div>
            </div>

            {/* Right Column: Logs & Tools */}
            <div className="space-y-6">
              <MutationSection16 />

              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    System Logs
                  </h3>
                </div>
                <div className="p-4 space-y-2 font-mono text-xs">
                  {defaultDataSection16.logs.map(log => (
                    <div key={log.id} className="flex gap-3 text-zinc-500 hover:bg-white/5 p-2 rounded transition-colors cursor-default">
                      <span className="text-zinc-600 select-none">[{log.time}]</span>
                      <span className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-blue-400'}>{log.event}</span>
                    </div>
                  ))}
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-4 bg-purple-500 ml-2 inline-block align-middle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
