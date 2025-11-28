export interface ISection8Data {
  id: string;
  country: string;
  city: string[];
  universitys: {
    id: string;
    name: string;
    image: string;
    location: string;
    courses: {
      id: string;
      name: string;
      tutionFees: string;
      duration: string;
      description: string;
      applyBtnParms: string[]; // [country, city, university, subject]
    }[];
    description: string;
  }[];
}

export interface Section8Props {
  data?: ISection8Data | string;
}

export const defaultDataSection8: ISection8Data = {
  id: 'AU-001',
  country: 'Australia',
  city: ['Sydney', 'Melbourne', 'Brisbane'],
  universitys: [
    {
      id: 'UNI-AU-SYD',
      name: 'University of Sydney',
      image: 'https://i.ibb.co.com/PGXYXwTq/img.jpg',
      location: 'Sydney',
      description: "Australia's first university, consistently ranked in the top 50 worldwide.",
      courses: [
        {
          id: 'CRS-SYD-01',
          name: 'Master of Commerce',
          tutionFees: 'AUD 54,000 / year',
          duration: '2 Years',
          description: 'Advanced business skills and leadership training.',
          applyBtnParms: ['Australia', 'Sydney', 'University of Sydney', 'Master of Commerce'],
        },
        {
          id: 'CRS-SYD-02',
          name: 'Bachelor of Architecture',
          tutionFees: 'AUD 48,000 / year',
          duration: '3 Years',
          description: 'Design environments for the future.',
          applyBtnParms: ['Australia', 'Sydney', 'University of Sydney', 'Bachelor of Architecture'],
        },
        {
          id: 'CRS-SYD-03',
          name: 'Veterinary Medicine',
          tutionFees: 'AUD 62,000 / year',
          duration: '5 Years',
          description: 'Comprehensive training in animal health.',
          applyBtnParms: ['Australia', 'Sydney', 'University of Sydney', 'Veterinary Medicine'],
        },
      ],
    },
    {
      id: 'UNI-AU-MEL',
      name: 'University of Melbourne',
      image: 'https://i.ibb.co.com/PGXYXwTq/img.jpg',
      location: 'Melbourne',
      description: 'A public research university located in Melbourne, Australia.',
      courses: [
        {
          id: 'CRS-MEL-01',
          name: 'Biomedicine',
          tutionFees: 'AUD 50,000 / year',
          duration: '3 Years',
          description: 'Understand the human body and disease.',
          applyBtnParms: ['Australia', 'Melbourne', 'University of Melbourne', 'Biomedicine'],
        },
        {
          id: 'CRS-MEL-02',
          name: 'Juris Doctor (Law)',
          tutionFees: 'AUD 46,000 / year',
          duration: '3 Years',
          description: 'Graduate law degree for aspiring lawyers.',
          applyBtnParms: ['Australia', 'Melbourne', 'University of Melbourne', 'Juris Doctor'],
        },
        {
          id: 'CRS-MEL-03',
          name: 'Fine Arts',
          tutionFees: 'AUD 38,000 / year',
          duration: '3 Years',
          description: 'Visual art, acting, and music performance.',
          applyBtnParms: ['Australia', 'Melbourne', 'University of Melbourne', 'Fine Arts'],
        },
      ],
    },
    {
      id: 'UNI-AU-QLD',
      name: 'University of Queensland',
      image: 'https://i.ibb.co.com/PGXYXwTq/img.jpg',
      location: 'Brisbane',
      description: "One of Australia's leading research and teaching institutions.",
      courses: [
        {
          id: 'CRS-QLD-01',
          name: 'Marine Biology',
          tutionFees: 'AUD 45,000 / year',
          duration: '3 Years',
          description: 'Study of marine organisms and ecosystems nearby the Great Barrier Reef.',
          applyBtnParms: ['Australia', 'Brisbane', 'University of Queensland', 'Marine Biology'],
        },
        {
          id: 'CRS-QLD-02',
          name: 'Information Technology',
          tutionFees: 'AUD 42,000 / year',
          duration: '3 Years',
          description: 'Software engineering and systems design.',
          applyBtnParms: ['Australia', 'Brisbane', 'University of Queensland', 'Information Technology'],
        },
        {
          id: 'CRS-QLD-03',
          name: 'Environmental Science',
          tutionFees: 'AUD 44,000 / year',
          duration: '3 Years',
          description: 'Solutions to environmental issues.',
          applyBtnParms: ['Australia', 'Brisbane', 'University of Queensland', 'Environmental Science'],
        },
      ],
    },
  ],
};
