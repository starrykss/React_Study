import { AreaChart, Layers, AppWindow } from 'lucide-react';

// 타입 정의
type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'add job',
    icon: <Layers />,
  },
  {
    href: '/jobs',
    label: 'jobs',
    icon: <AppWindow />,
  },
  {
    href: '/stats',
    label: 'stats',
    icon: <AreaChart />,
  },
];

export default links;
