import type {VerticalMenuDataType} from '@/types/menuTypes';

// Define the menu data with dynamic role placeholder in the href
const allMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Tableau de bord',
    href: '/role/dashboard',  // Use role as a placeholder
    icon: 'tabler-smart-home',
    roles: ['admin', 'client','subcontractor'],
    permissions: ['view dashboard'],
    isSection: false,
    children: []
  },
  {
    label: 'Projects',
    href: '/role/projects/list', // Use role as a placeholder
    icon: 'tabler-clipboard-list',
    roles: ['admin', 'client','subcontractor'],
    isSection: false,
    children: []
  },

  {
    label: 'Utilisateurs',
    href: '/role/users/list', // Use role as a placeholder
    icon: 'tabler-user',
    roles: ['admin', 'client', 'subcontractor'],
    isSection: false,
    children: []
  },
  {
    label: 'Clients',
    href: '/role/clients/list',  // Use role as a placeholder
    icon: 'tabler-users',
    roles: ['admin'],  // For both 'client' and 'admin'
    isSection: false,
    children: []
  },
  {
    label: 'Lots',
    href: '/role/lots/list', // Use role as a placeholder
    icon: 'tabler-category',
    roles: ['admin','client'], // For both 'client' and 'admin'
    isSection: false,
    children: []
  },
  {
    label: 'Entreprise',
    href: '/role/subcontractor/list',
    icon: 'tabler-building-community',
    roles: ['admin', 'client'],
    isSection: false,
    children: []
  },
  {
    label: 'Produit',
    href: '/role/product/list',  // Use role as a placeholder
    icon: 'tabler-box',
    roles: ['subcontractor'],
    isSection: false,
    children: []
  },
]

// Function to get menu items based on user role and replace 'role' in href
const verticalMenuData = (userRole: string | undefined): VerticalMenuDataType[] => {
  //  return different menu items if ther is no role
  if (userRole === undefined) {
    // Handle the case for undefined userRole ( need to work on this )

    return []; // or some default menu data
  }

  // Filter menu items based on the user's role and replace 'role' in href

  return allMenuData()
    .filter(item => item.roles?.includes(userRole)) // Filter by user role
    .map(item => ({
      ...item,
      href: item.href?.replace('role', userRole), // Replace 'role' in href with the actual role
    }));
}

export default verticalMenuData;
