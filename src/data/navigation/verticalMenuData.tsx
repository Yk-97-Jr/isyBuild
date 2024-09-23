import type { VerticalMenuDataType } from '@/types/menuTypes'

// Define the menu data with roles
const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Tableau de bord',
    href: '/dashboard',
    icon: 'tabler-smart-home',
    roles: ['admin', 'user'],
    permissions: ['view dashboard'],
    isSection: false,
    children: []
  },
  {
    label: 'Utilisateurs',
    href: '/users/list',
    icon: 'tabler-users',
    roles: ['user'],
    isSection: false,
    children: []
  },
  {
    label: 'lots',
    href: '/lots',
    icon: 'tabler-category',
    roles: ['user'],
    isSection: false,
    children: []
  },
  {
    label: 'entreprise',
    href: '/company',
    icon: 'tabler-building-community',
    roles: ['user'],
    isSection: false,
    children: []
  },
  {
    label: 'Projects',
    href: '/Projects',
    icon: 'tabler-clipboard-list',
    roles: ['user','admin'],
    isSection: false,
    children: []
  }
]

export default verticalMenuData
