'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { usePathname } from 'next/navigation';

const MenuComponentWithSession = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<number | null>(null);
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileDropdown(null);
  }, [pathname]);

  const logInMenuData = [
    { id: 1, name: 'Home', path: '/' },
    {
      id: 2,
      name: 'About',
      path: '/about',
      child: [
        { id: 100201, name: 'About', path: '/about' },
        { id: 100202, name: 'Our Partners', path: '/about/our-partners' },
        { id: 100203, name: 'Our Team', path: '/about/our-team' },
      ],
    },
    { id: 3, name: 'Contact', path: '/contact' },
    { id: 4, name: 'Career', path: '/career' },
    { id: 5, name: 'Institutions', path: '/institutions' },
    { id: 6, name: 'Students', path: '/students' },
    { id: 7, name: 'Study Abroad', path: '/study-abroad' },
    { id: 8, name: 'Dashboard', path: '/dashboard', highlight: true },
  ];

  const notLogInMenuData = [
    { id: 1, name: 'Home', path: '/' },
    {
      id: 2,
      name: 'About',
      path: '/about',
      child: [
        { id: 100201, name: 'About', path: '/about' },
        { id: 100202, name: 'Our Partners', path: '/about/our-partners' },
        { id: 100203, name: 'Our Team', path: '/about/our-team' },
      ],
    },
    { id: 3, name: 'Contact', path: '/contact' },
    { id: 4, name: 'Career', path: '/career' },
    { id: 5, name: 'Institutions', path: '/institutions' },
    { id: 6, name: 'Students', path: '/students' },
    { id: 7, name: 'Study Abroad', path: '/study-abroad' },
    { id: 8, name: 'Dashboard', path: '/dashboard', highlight: true },
  ];
  const menuData = session?.data?.session ? logInMenuData : notLogInMenuData;

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out
          ${
            scrolled
              ? 'bg-gradient-to-r from-blue-950/95 via-sky-900/90 to-blue-950/95 backdrop-blur-2xl shadow-2xl shadow-sky-900/30'
              : 'bg-gradient-to-r from-blue-950/60 via-sky-900/40 to-blue-950/60 backdrop-blur-xl'
          }
          border-b ${scrolled ? 'border-sky-400/40' : 'border-sky-400/20'}
        `}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo with Animation */}
            <Link href="/" className="relative group flex items-center gap-2">
              <motion.div whileHover={{ rotate: 180, scale: 1.1 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
                <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-sky-400" />
              </motion.div>
              <span
                className="
                  text-xl md:text-2xl lg:text-3xl font-extrabold 
                  bg-gradient-to-r from-sky-300 via-blue-300 to-sky-200 
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]
                  group-hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]
                  transition-all duration-300
                "
              >
                Study Abroad
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {menuData.map(item => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.child && setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.child ? (
                    <button
                      className={`
                        group relative px-4 xl:px-5 py-2 rounded-lg
                        text-sm xl:text-base font-semibold tracking-wide
                        transition-all duration-300 flex items-center gap-1
                        ${isActive(item.path) ? 'text-sky-300 bg-sky-400/10' : 'text-sky-100 hover:text-sky-300 hover:bg-sky-400/5'}
                      `}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                      <span
                        className="
                          absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                          bg-gradient-to-r from-transparent via-sky-400 to-transparent
                          group-hover:w-full transition-all duration-300
                        "
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      className={`
                        group relative px-4 xl:px-5 py-2 rounded-lg
                        text-sm xl:text-base font-semibold tracking-wide
                        transition-all duration-300 flex items-center gap-2
                        ${
                          item.highlight
                            ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/40 hover:shadow-sky-500/60 hover:scale-105'
                            : isActive(item.path)
                              ? 'text-sky-300 bg-sky-400/10'
                              : 'text-sky-100 hover:text-sky-300 hover:bg-sky-400/5'
                        }
                      `}
                    >
                      {item.name}
                      {!item.highlight && (
                        <span
                          className="
                            absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                            bg-gradient-to-r from-transparent via-sky-400 to-transparent
                            group-hover:w-full transition-all duration-300
                          "
                        />
                      )}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {item.child && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="
                          absolute top-full mt-2 left-0 min-w-[220px]
                          bg-gradient-to-br from-blue-950/98 via-sky-900/95 to-blue-950/98
                          backdrop-blur-2xl rounded-xl
                          border border-sky-400/30 shadow-2xl shadow-sky-900/40
                          overflow-hidden
                        "
                      >
                        <div className="p-2">
                          {item.child.map((childItem, index) => (
                            <motion.div key={childItem.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                              <Link
                                href={childItem.path}
                                className={`
                                  block px-4 py-3 rounded-lg text-sm font-medium
                                  transition-all duration-200
                                  ${
                                    isActive(childItem.path)
                                      ? 'bg-sky-400/20 text-sky-300'
                                      : 'text-sky-100 hover:bg-sky-400/10 hover:text-sky-300 hover:translate-x-1'
                                  }
                                `}
                              >
                                {childItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="
                lg:hidden relative p-2 rounded-lg
                text-sky-100 hover:text-sky-300 hover:bg-sky-400/10
                transition-all duration-300 focus:outline-none
              "
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="
                lg:hidden overflow-hidden
                bg-gradient-to-b from-blue-950/98 via-sky-900/95 to-blue-950/98
                backdrop-blur-2xl border-t border-sky-400/20
                shadow-2xl shadow-sky-900/30
              "
            >
              <div className="container mx-auto px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {menuData.map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
                    {item.child ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => setMobileDropdown(mobileDropdown === item.id ? null : item.id)}
                          className={`
                            w-full flex items-center justify-between px-4 py-3.5 rounded-xl
                            text-base font-semibold tracking-wide
                            transition-all duration-300 active:scale-[0.98]
                            ${isActive(item.path) ? 'bg-sky-400/20 text-sky-300' : 'text-sky-100 hover:bg-sky-400/10 hover:text-sky-300'}
                          `}
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdown === item.id ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {mobileDropdown === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 space-y-1"
                            >
                              {item.child.map(childItem => (
                                <Link
                                  key={childItem.id}
                                  href={childItem.path}
                                  className={`
                                    block px-4 py-3 rounded-lg text-sm font-medium
                                    transition-all duration-200 active:scale-[0.98]
                                    ${
                                      isActive(childItem.path)
                                        ? 'bg-sky-400/20 text-sky-300'
                                        : 'text-sky-100/90 hover:bg-sky-400/10 hover:text-sky-300 hover:translate-x-1'
                                    }
                                  `}
                                >
                                  {childItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.path}
                        className={`
                          block px-4 py-3.5 rounded-xl text-base font-semibold tracking-wide
                          transition-all duration-300 active:scale-[0.98]
                          ${
                            item.highlight
                              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/40 text-center'
                              : isActive(item.path)
                                ? 'bg-sky-400/20 text-sky-300'
                                : 'text-sky-100 hover:bg-sky-400/10 hover:text-sky-300'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default MenuComponentWithSession;
