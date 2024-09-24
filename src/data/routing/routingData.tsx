// Type Imports
import type { rountingDataType } from '@/types/menuTypes'

const rountingData = (): rountingDataType[] =>  [
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
  ]

export default rountingData




