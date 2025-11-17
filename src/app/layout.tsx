import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';
import { ToastContainer } from 'react-toastify';
import MenuComponentWithSession from '@/components/common/MenuWithSession';
import PWAInstallPrompt from '@/components/common/Install-Pop-Up';

export const metadata: Metadata = {
  title: 'Study Abroad',
  description: 'The Dream came true',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <ReduxProvider>
          <MenuComponentWithSession />
          <div>{children}</div>
          <PWAInstallPrompt />
        </ReduxProvider>
        <ToastContainer style={{ top: '65px' }} />
      </body>
    </html>
  );
}
