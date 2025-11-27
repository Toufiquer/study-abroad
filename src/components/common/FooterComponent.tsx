import React from 'react';
import FooterClient from './FooterClient';
import Footer from '@/app/api/footer-settings/model';
import connectDB from '@/app/api/utils/mongoose';

async function getFooterData() {
  try {
    await connectDB();
    const rawFooters = await Footer.find({});

    const footers = JSON.parse(JSON.stringify(rawFooters));
    
    if (footers && footers.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return footers.filter((f: any) => f.isActive);
    }
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }

  return [
    {
      _id: '69282adbfffe80e4b79ca638',
      footerUId: 'footer-uid-2',
      isActive: true,
      data: {
        brandName: 'Tec Verse',
        logoUrl: 'https://i.ibb.co/pzsn8MG/english-logo.png',
        logoWidth: 50,
        tagline: 'Crafting digital experiences that inspire and innovate. We build the future, one pixel at a time.',
        quickLinks: [
          { id: 1, title: 'Company', link: '/company' },
          { id: 2, title: 'Services', link: '/services' },
          { id: 3, title: 'Case Studies', link: '/work' },
          { id: 4, title: 'Careers', link: '/careers' },
          { id: 5, title: 'Privacy', link: '/privacy' },
        ],
        contactInfo: {
          address: '101 Innovation Blvd, Tech City, CA 94000',
          phone: '+1 (555) 012-3456',
          email: 'toufiquer.0@gmail.com',
        },
        socialLinks: [
          { id: 1, platform: 'Twitter', link: '#' },
          { id: 2, platform: 'Github', link: '#' },
          { id: 3, platform: 'Linkedin', link: '#' },
          { id: 4, platform: 'Instagram', link: '#' },
        ],
        copyrightText: 'TecVerse Inc. All rights reserved.',
        designerName: 'Toufiquer',
      },
      disabledPath: ['/dashboard'],
      createdAt: '2025-11-27T10:41:31.134Z',
      updatedAt: '2025-11-27T10:48:06.088Z',
      __v: 0,
    },
  ];
}

const FooterComponent = async () => {
  const activeFooters = await getFooterData();

  return <FooterClient footers={activeFooters} />;
};

export default FooterComponent;
