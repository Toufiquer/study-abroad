'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import Image from 'next/image';

interface MenuItem {
  id: number;
  name: string;
  path: string;
  children?: MenuItem[];
}

interface BrandSettings {
  brandName: string;
  logoUrl: string | null;
  showText: boolean;
  showLogo: boolean;
  logoWidth: number;
}

const defaultBrandSettings: BrandSettings = {
  brandName: 'TestPrep',
  logoUrl: null,
  showText: true,
  showLogo: false,
  logoWidth: 40,
};

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
  pathname: string;
  isActive: (path: string) => boolean;
  isParentActive: (item: MenuItem) => boolean;
  level?: number;
}

interface MobileMenuItemProps {
  item: MenuItem;
  index: number;
  pathname: string;
  isActive: (path: string) => boolean;
  isParentActive: (item: MenuItem) => boolean;
  onNavigate: () => void;
  openItems: Set<number>;
  toggleItem: (id: number) => void;
  level?: number;
}

const logInMenuData: MenuItem[] = [
  { id: 1, name: 'About', path: '/about' },
  {
    id: 2,
    name: 'Menu',
    path: '/menu',
    children: [
      {
        id: 2001,
        name: 'S.Menu 1',
        path: '/menu/sub',
        children: [
          { id: 20011, name: 'SS.Menu 1', path: '/menu/sub/sub' },
          { id: 20012, name: 'SS.Menu 2', path: '/menu/sub/sub' },
          { id: 20013, name: 'SS.Menu 3', path: '/menu/sub/sub' },
        ],
      },
      {
        id: 2002,
        name: 'S.Menu 2',
        path: '/menu/sub',
        children: [
          { id: 20021, name: 'SS.Menu 1', path: '/menu/sub/sub' },
          { id: 20022, name: 'SS.Menu 2', path: '/menu/sub/sub' },
          { id: 20023, name: 'SS.Menu 3', path: '/menu/sub/sub' },
        ],
      },
      {
        id: 2003,
        name: 'S.Menu 3',
        path: '/menu/sub',
        children: [
          { id: 20031, name: 'SS.Menu 1', path: '/menu/sub/sub' },
          { id: 20032, name: 'SS.Menu 2', path: '/menu/sub/sub' },
          { id: 20033, name: 'SS.Menu 3', path: '/menu/sub/sub' },
        ],
      },
    ],
  },
  { id: 3, name: 'Contact', path: '/contact' },
  { id: 4, name: 'Service', path: '/service' },
];

const notLogInMenuData: MenuItem[] = [
  { id: 1, name: 'About', path: '/about' },
  {
    id: 2,
    name: 'Menu',
    path: '/menu',
    children: [
      {
        id: 2001,
        name: 'S.Menu 1',
        path: '/menu/sub',
        children: [
          { id: 20011, name: 'SS.Menu 1', path: '/menu/sub/sub' },
          { id: 20012, name: 'SS.Menu 2', path: '/menu/sub/sub' },
          { id: 20013, name: 'SS.Menu 3', path: '/menu/sub/sub' },
        ],
      },
      {
        id: 2002,
        name: 'S.Menu 2',
        path: '/menu/sub',
        children: [
          { id: 20021, name: 'SS.Menu 1', path: '/menu/sub/sub' },
          { id: 20022, name: 'SS.Menu 2', path: '/menu/sub/sub' },
          { id: 20023, name: 'SS.Menu 3', path: '/menu/sub/sub' },
        ],
      },
      {
        id: 2003,
        name: 'S.Menu 3',
        path: '/menu/sub',
        children: [
          { id: 20031, name: 'SS.Menu 1', path: '/menu/sub/sub' },
          { id: 20032, name: 'SS.Menu 2', path: '/menu/sub/sub' },
          { id: 20033, name: 'SS.Menu 3', path: '/menu/sub/sub' },
        ],
      },
    ],
  },
  { id: 3, name: 'Contact', path: '/contact' },
  { id: 4, name: 'Service', path: '/service' },
];

const DesktopMenuItem: React.FC<DesktopMenuItemProps> = ({ item, index, pathname, isActive, isParentActive, level = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <Link href={item.path}>
        <motion.div
          initial={{ opacity: 0, [level === 0 ? 'y' : 'x']: -10 }}
          animate={{ opacity: 1, [level === 0 ? 'y' : 'x']: 0 }}
          transition={{ delay: index * 0.03 }}
          className={`${
            level === 0 ? 'group relative px-4 py-2 text-sm font-semibold' : 'px-4 py-3 text-sm font-medium'
          } tracking-wide transition-all duration-300 ${
            isActive(item.path) ? 'text-sky-300 bg-sky-400/10' : 'text-sky-100 hover:text-sky-300 hover:bg-sky-400/5'
          }`}
        >
          <span className="relative z-10">{item.name}</span>
          {level === 0 && (
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-sky-500/20 rounded-lg blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-400"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </>
          )}
        </motion.div>
      </Link>
    );
  }

  return (
    <div className={`relative ${level === 0 ? ' group ' : ' group/nested '}`}>
      {level === 0 ? (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`group relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
            isParentActive(item) ? 'text-sky-300' : 'text-sky-100 hover:text-sky-300'
          }`}
        >
          <Link href={item.path} className="relative z-10 flex items-center gap-1">
            {item.name}
            <ChevronDown size={16} />
          </Link>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-sky-500/20 rounded-lg blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          {isParentActive(item) && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-400"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ) : (
        <Link href={item.path}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`px-4 py-3 text-sm font-medium transition-all duration-300 flex items-center justify-between hover:underline hover:bg-sky-400/5 ${
              isActive(item.path) ? 'text-sky-300 bg-sky-400/10' : 'text-sky-100 hover:text-sky-300 hover:bg-sky-100'
            }`}
          >
            {item.name}
            <ChevronDown className="-rotate-90" size={14} />
          </motion.div>
        </Link>
      )}

      <div
        className={`
          ${
            level === 0
              ? ' absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible '
              : ' absolute left-full top-0 pl-0 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible '
          }
          transition-opacity duration-200
        `}
      >
        <div className="min-w-[200px] bg-gradient-to-b from-blue-950/95 via-sky-900/90 to-blue-950/95 backdrop-blur-xl border border-sky-400/30 rounded-lg shadow-[0_8px_32px_rgba(56,189,248,0.2)] ">
          {item.children?.map((childItem, childIndex) => (
            <DesktopMenuItem
              key={childItem.id}
              item={childItem}
              index={childIndex}
              pathname={pathname}
              isActive={isActive}
              isParentActive={isParentActive}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ item, index, pathname, isActive, isParentActive, onNavigate, openItems, toggleItem, level = 0 }) => {
  const isOpen = openItems.has(item.id);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <Link href={item.path} onClick={onNavigate}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.03 }}
          style={{ marginLeft: `${level * 1}rem` }}
          className={`px-4 ${level === 0 ? 'py-3' : 'py-2.5'} rounded-lg ${
            level === 0 ? 'text-base font-semibold' : 'text-sm font-medium'
          } tracking-wide transition-all duration-300 ${
            isActive(item.path) ? 'text-sky-300 bg-sky-400/10' : 'text-sky-100 hover:text-sky-300 hover:bg-sky-400/5 hover:translate-x-1'
          }`}
        >
          {item.name}
        </motion.div>
      </Link>
    );
  }

  return (
    <div style={{ marginLeft: level > 0 ? `${level * 1}rem` : undefined }}>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => toggleItem(item.id)}
        className={`w-full flex items-center justify-between px-4 ${level === 0 ? 'py-3' : 'py-2.5'} rounded-lg ${
          level === 0 ? 'text-base font-semibold' : 'text-sm font-medium'
        } tracking-wide transition-all duration-300 ${
          isParentActive(item) ? 'text-sky-300 bg-sky-400/10' : 'text-sky-100 hover:text-sky-300 hover:bg-sky-400/5'
        }`}
      >
        {item.name}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={level === 0 ? 18 : 16} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 space-y-1 overflow-hidden"
          >
            {item.children?.map((childItem, childIndex) => (
              <MobileMenuItem
                key={childItem.id}
                item={childItem}
                index={childIndex}
                pathname={pathname}
                isActive={isActive}
                isParentActive={isParentActive}
                onNavigate={onNavigate}
                openItems={openItems}
                toggleItem={toggleItem}
                level={level + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MenuComponentProps {
  serverMenuData?: MenuItem[];
  serverBrandSettings?: BrandSettings;
}

const MenuComponentWithSession = ({ serverMenuData, serverBrandSettings }: MenuComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileItems, setOpenMobileItems] = useState<Set<number>>(new Set());

  const brandSettings = serverBrandSettings || defaultBrandSettings;
  const pathname = usePathname();
  const session = useSession();

  const menuData = useMemo(() => {
    let items = serverMenuData && serverMenuData.length > 0 ? [...serverMenuData] : session?.data?.session ? [...logInMenuData] : [...notLogInMenuData];

    items = items.filter(item => item.path !== '/login' && item.path !== '/dashboard');

    if (session?.data?.session) {
      items.push({ id: 9999, name: 'Dashboard', path: '/dashboard' });
    } else {
      items.push({ id: 9999, name: 'Login', path: '/login' });
    }

    return items;
  }, [serverMenuData, session]);

  const isActive = (path: string) => pathname === path;

  const isParentActive = (item: MenuItem): boolean => {
    if (pathname === item.path) return true;
    if (item.children && item.children.length > 0) {
      return item.children.some(child => isParentActive(child));
    }
    return false;
  };

  const toggleMobileItem = (id: number) => {
    setOpenMobileItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleNavigate = () => {
    setIsOpen(false);
    setOpenMobileItems(new Set());
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-r from-blue-950/60 via-sky-900/40 to-blue-950/60 backdrop-blur-xl border-b border-sky-400/30 shadow-[0_4px_30px_rgba(56,189,248,0.15)]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link href="/" className="group relative flex items-center gap-3">
            {brandSettings.showLogo && brandSettings.logoUrl && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                <Image
                  width={200}
                  height={200}
                  src={brandSettings.logoUrl}
                  alt={brandSettings.brandName}
                  style={{ width: `${brandSettings.logoWidth}px`, height: 'auto', maxHeight: '50px' }}
                  className="object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]"
                />
              </motion.div>
            )}

            {brandSettings.showText && (
              <div className="relative">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl md:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-300 to-sky-200 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.8)] transition-all duration-300"
                >
                  {brandSettings.brandName}
                </motion.span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-sky-400/0 via-blue-400/20 to-sky-400/0 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </div>
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {menuData.map((item, index) => (
              <DesktopMenuItem key={item.id} item={item} index={index} pathname={pathname} isActive={isActive} isParentActive={isParentActive} />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden relative p-2 text-sky-100 hover:text-sky-300 transition-colors focus:outline-none group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-sky-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-gradient-to-b from-blue-950/95 via-sky-900/90 to-blue-950/95 backdrop-blur-xl border-t border-sky-400/20 shadow-[0_8px_32px_rgba(56,189,248,0.2)] overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {menuData.map((item, index) => (
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  index={index}
                  pathname={pathname}
                  isActive={isActive}
                  isParentActive={isParentActive}
                  onNavigate={handleNavigate}
                  openItems={openMobileItems}
                  toggleItem={toggleMobileItem}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MenuComponentWithSession;
