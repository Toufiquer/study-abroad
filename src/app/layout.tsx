import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'sonner';
import MenuComponentWithSession from '@/components/common/MenuWithSession';
import { getMenuData } from '@/app/api/menu-editor/controller';
import fs from 'fs';
import path from 'path';
import FooterComponent from '@/components/common/FooterComponent';

export const metadata: Metadata = {
  title: 'Tec Verse - App Generator',
  description: 'For Faster Development',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
};

const SETTINGS_FILE = path.join(process.cwd(), 'brand-settings.json');

const defaultSettings = {
  brandName: 'TestPrep',
  logoUrl: null,
  showText: true,
  showLogo: false,
  logoWidth: 40,
};

async function getBrandSettingsData() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menu, brandSettings] = await Promise.all([getMenuData('main-menu'), getBrandSettingsData()]);
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col">
        <ReduxProvider>
          <MenuComponentWithSession serverMenuData={menu?.items} serverBrandSettings={brandSettings} />
          <main className=" animate-in fade-in duration-500">{children}</main>
          <FooterComponent />
        </ReduxProvider>
        <Toaster position="top-right" richColors closeButton theme="light" />
        <ToastContainer style={{ top: '80px', zIndex: 9999 }} toastClassName="backdrop-blur-md bg-white/90 shadow-xl border border-slate-100 rounded-xl" />
      </body>
    </html>
  );
}
