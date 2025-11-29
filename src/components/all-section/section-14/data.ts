export interface IEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  description: string;
  actionText: string;
}

export interface ISection14Data {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  events: IEvent[];
}

export interface Section14Props {
  data?: ISection14Data | string;
}

export const defaultDataSection14: ISection14Data = {
  id: 'section-14-get-together',
  title: 'Community',
  subTitle: 'Gatherings',
  description: 'Join our vibrant community events. Connect, learn, and grow together in spaces designed for collaboration.',
  events: [
    {
      id: 'evt-1',
      title: 'Annual Tech Summit',
      date: 'Oct 15, 2024',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
      category: 'Conference',
      description: 'A full day of keynotes, workshops, and networking with industry leaders.',
      actionText: 'Register Now',
    },
    {
      id: 'evt-2',
      title: 'Design Systems Workshop',
      date: 'Nov 02, 2024',
      location: 'Online / Zoom',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
      category: 'Workshop',
      description: 'Deep dive into building scalable UI libraries with Figma and React.',
      actionText: 'Join Waitlist',
    },
    {
      id: 'evt-3',
      title: 'Winter Hackathon',
      date: 'Dec 10, 2024',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=1000',
      category: 'Hackathon',
      description: '48 hours of coding, pizza, and innovation. Open to all skill levels.',
      actionText: 'Apply to Hack',
    },
  ],
};
