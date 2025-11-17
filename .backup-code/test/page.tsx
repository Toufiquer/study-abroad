/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: App Generator, November, 2025
|-----------------------------------------
*/

'use client';

import { useSession } from '@/lib/auth-client';
import { useEffect } from 'react';
const Page = () => {
  const session = useSession();
  // console.log('session : ', session);
  useEffect(() => {
    fetch('/api/test')
      .then(d => d.json())
      .then(t => {
        console.log(t);
      });
  }, []);
  return <main className="pt-[75px] bg-slate-700 text-slate-200 h-screen w-full">{JSON.stringify(session)}</main>;
};
export default Page;
