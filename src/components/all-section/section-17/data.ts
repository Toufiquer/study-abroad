// data.ts

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  author: Author;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const categories = ['All', 'Quantum UI', 'Engineering', 'Design Systems', 'Algorithms'];

export const blogData: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Event Horizon: Designing for Non-Linear Navigation',
    excerpt:
      'Traditional breadcrumbs fail in multidimensional interfaces. Here is how we implemented spatial state management using probabilistic graph theory.',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Nov 28, 2025',
    readTime: '12 min read',
    category: 'Quantum UI',
    tags: ['UX', 'Navigation', 'Math'],
    author: {
      name: 'Dr. Aris Thorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Lead Architect',
    },
    featured: true,
  },
  {
    id: 'post-2',
    title: 'CSS Grid Level 5: Subgrid Anomalies',
    excerpt: 'Exploring the weird parts of the new CSS specification where parent grids inherit constraints from their quantum children.',
    coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e0c766?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Nov 25, 2025',
    readTime: '6 min read',
    category: 'Engineering',
    tags: ['CSS', 'Frontend', 'Spec'],
    author: {
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'Principal Designer',
    },
  },
  {
    id: 'post-3',
    title: 'Algorithmic Typography: Variable Fonts in Motion',
    excerpt: 'Using the Web Audio API to drive font-weight and slant based on ambient user environment noise.',
    coverImage: 'https://images.unsplash.com/photo-1614741118881-1e4fe860b31d?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Nov 22, 2025',
    readTime: '8 min read',
    category: 'Design Systems',
    tags: ['Typography', 'Audio', 'Canvas'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      role: 'Creative Developer',
    },
  },
  {
    id: 'post-4',
    title: 'Server Components as Micro-Black Holes',
    excerpt: 'Optimizing data density by collapsing the hydration waterfall into a single singularity point.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Nov 18, 2025',
    readTime: '15 min read',
    category: 'Engineering',
    tags: ['React', 'Performance', 'Server'],
    author: {
      name: 'Marcus K.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      role: 'Systems Engineer',
    },
  },
  {
    id: 'post-5',
    title: 'Heuristics of the Void',
    excerpt: 'Why empty states in complex dashboards should never be truly empty. The psychology of negative space.',
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Nov 15, 2025',
    readTime: '5 min read',
    category: 'Quantum UI',
    tags: ['Psychology', 'UX'],
    author: {
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'Principal Designer',
    },
  },
  {
    id: 'post-6',
    title: 'Refactoring the Monolith',
    excerpt: 'A case study on breaking down a 50GB legacy codebase using the Strangler Fig pattern and nuclear fusion.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Nov 10, 2025',
    readTime: '20 min read',
    category: 'Algorithms',
    tags: ['Legacy', 'Architecture'],
    author: {
      name: 'Dr. Aris Thorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Lead Architect',
    },
  },
];
