import type { VerticalMenuDataType } from '@/types/menuTypes';

// Define the menu data with roles
const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'tabler-smart-dashboard',
    roles: ['admin', 'user'],
    isSection: false,
    children: []
  },
  {
    label: 'About',
    href: '/about',
    icon: 'tabler-info-circle',
    roles: ['user'],
    isSection: false,
    children: []
  },
  {
    label: 'Admin',
    href: '/admin',
    icon: 'tabler-shield',
    roles: ['admin'],
    isSection: false,
    children: []
  }
];

export default verticalMenuData;
