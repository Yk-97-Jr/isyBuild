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
    path: 'role/lots',
    roles: ['client', 'admin'],
  },
]

export default rountingData




