// Type Imports
import type {rountingDataType} from '@/types/menuTypes'

const rountingData = (): rountingDataType[] => [
  {
    path: 'role/admin',
    roles: ['admin'],
  },
  {
    path: 'role/dashboard',
    roles: ['admin', 'client'],
  },
  {
    path: 'role/users/list',
    roles: ['admin'],
  },
  {
    path: 'role/users/add',
    roles: ['admin'],
  },
  {
    path: 'role/clients/list',
    roles: ['admin'],
  },
  {
    path: 'role/clients/add',
    roles: ['admin'],
  },
  {
    path: 'role/clients/[id]/details',
    roles: ['admin'],
  },
]

export default rountingData




