import type { VerticalMenuDataType } from '@/types/menuTypes'
import { useAuth } from '@/contexts/AuthContext' // Assuming AuthContext holds the user role information

// Define the menu data with dynamic role placeholder in the href
const allMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Tableau de bord',
    href: '/role/dashboard',  // Use role as a placeholder
    icon: 'tabler-smart-home',
    roles: ['admin', 'user'],
    permissions: ['view dashboard'],
    isSection: false,
    children: []
  },
  {
    label: 'Utilisateurs',
    href: '/role/users/list',  // Use role as a placeholder
    icon: 'tabler-user',
    roles: ['admin'], // Only for 'admin'
    isSection: false,
    children: []
  },
  {
    label: 'Clients',
    href: '/role/clients/list',  // Use role as a placeholder
    icon: 'tabler-users',
    roles: ['user'],  // Only for 'user'
    isSection: false,
    children: []
  },
  {
    label: 'Lots',
    href: '/role/lots',  // Use role as a placeholder
    icon: 'tabler-category',
    roles: ['user'],  // Only for 'user'
    isSection: false,
    children: []
  }
]

// Function to get menu items based on user role and replace role in href
const verticalMenuData = (): VerticalMenuDataType[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth(); // Assuming the user's role is in the Auth context

  const userRole = user?.role || 'admin'; // Default to 'guest' if no role is available

  // Filter menu items based on the user's role and replace role in href
  return allMenuData()
    .filter(item => item.roles?.includes(userRole)) // Filter by user role
    .map(item => ({
      ...item,
      href: item.href?.replace('role', userRole), // Replace role in href with the actual role
    }));
}

export default verticalMenuData;
