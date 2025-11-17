import type { Metadata } from 'next';
// Google Fonts temporarily disabled due to network restrictions in build environment
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';
import { ToastContainer } from 'react-toastify';
import MenuComponentWithSession from '@/components/common/MenuWithSession';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

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
        </ReduxProvider>
        <ToastContainer style={{ top: '65px' }} />
      </body>
    </html>
  );
}
