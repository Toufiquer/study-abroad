// data.ts

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: number;
  status: 'stable' | 'warning' | 'critical';
}

export interface ModerationItem {
  id: string;
  type: 'comment' | 'article';
  content: string;
  author: {
    name: string;
    avatar: string;
    trustScore: number;
  };
  flagReason: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export interface SystemLog {
  id: string;
  event: string;
  source: string;
  time: string;
  type: 'info' | 'success' | 'error';
}

export const adminData = {
  metrics: [
    { id: 'm1', label: 'Network Velocity', value: '84.2 TB/s', trend: 12.5, status: 'stable' },
    { id: 'm2', label: 'Quantum Entanglement', value: '99.9%', trend: 0.4, status: 'stable' },
    { id: 'm3', label: 'Grid Anomalies', value: '15 Detected', trend: -2.3, status: 'warning' },
    { id: 'm4', label: 'Active Neural Nodes', value: '4,205', trend: 8.1, status: 'stable' },
  ] as DashboardMetric[],

  moderationQueue: [
    {
      id: 'mod-1',
      type: 'comment',
      content: 'The Section 15 protocol is a myth. The grid is a lie. Wake up.',
      author: {
        name: 'Neo_X',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        trustScore: 45,
      },
      flagReason: 'Subversive Content',
      timestamp: '2 mins ago',
      severity: 'high',
    },
    {
      id: 'mod-2',
      type: 'article',
      content: 'Draft: Implementing Hyper-Spatial Navigation in React',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        trustScore: 92,
      },
      flagReason: 'Pending Approval',
      timestamp: '15 mins ago',
      severity: 'low',
    },
    {
      id: 'mod-3',
      type: 'comment',
      content: 'Spam link: http://buy-quantum-crypto.com',
      author: {
        name: 'Bot_99',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        trustScore: 10,
      },
      flagReason: 'Malicious Link',
      timestamp: '1 hour ago',
      severity: 'high',
    },
  ] as ModerationItem[],

  logs: [
    { id: 'l1', event: 'System Purge Initiated', source: 'Core_Admin', time: '10:42:05', type: 'info' },
    { id: 'l2', event: 'Node #8842 Connected', source: 'Auth_Service', time: '10:41:55', type: 'success' },
    { id: 'l3', event: 'Firewall Breach Attempt', source: 'Security_Layer', time: '10:40:12', type: 'error' },
    { id: 'l4', event: 'Data Sync Complete', source: 'DB_Cluster', time: '10:38:00', type: 'success' },
  ] as SystemLog[],
};
