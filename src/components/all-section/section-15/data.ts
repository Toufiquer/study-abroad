// data.ts

export type ArticleBlock =
  | { type: 'text'; content: string }
  | { type: 'quote'; content: string; author: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'heading'; content: string };

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: Author;
  heroImage: string;
  content: ArticleBlock[];
  tags: string[];
}

export const articleData: Article = {
  id: 'art-15-2024',
  title: 'The Future of Quantum User Interfaces',
  subtitle: 'Exploring the intersection of multidimensional design and quantum computing paradigms in modern web experiences.',
  category: 'Design Engineering',
  readTime: '8 min read',
  publishedAt: 'Nov 29, 2025',
  author: {
    name: 'Elena Vance',
    role: 'Principal Product Designer',
    avatar: 'https://i.ibb.co.com/KpGnqS3D/nature.jpg',
  },
  heroImage: 'https://i.ibb.co.com/KpGnqS3D/nature.jpg',
  tags: ['UX Design', 'Quantum Computing', 'Web3', 'Framer Motion'],
  content: [
    {
      type: 'heading',
      content: 'Beyond the Flat Screen',
    },
    {
      type: 'text',
      content:
        'As we approach the event horizon of spatial computing, the traditional flat interfaces we have grown accustomed to are beginning to dissolve. The pixels are no longer static; they are probabilistic waves waiting to be observed.',
    },
    {
      type: 'image',
      src: 'https://i.ibb.co.com/KpGnqS3D/nature.jpg',
      alt: 'Cyberpunk abstract interface',
      caption: 'Figure 1.0: Visualizing data streams in a non-linear layout.',
    },
    {
      type: 'quote',
      content: 'The interface is no longer a window, but a membrane through which digital and physical realities osmose.',
      author: 'Dr. Aris Thorne',
    },
    {
      type: 'text',
      content:
        'Designers must now think in Z-index not just as a stacking context, but as a dimension of time and relevance. When a user interacts with a quantum UI, they are collapsing a wave function of potential layouts into a single, observable state.',
    },
    {
      type: 'heading',
      content: 'The Section 15 Protocol',
    },
    {
      type: 'text',
      content:
        'Section 15 refers to the specific layout grid anomaly where content breaks the container to establish dominance over the viewport. It is a bold, aggressive stance against the tyranny of the 12-column grid.',
    },
  ],
};
