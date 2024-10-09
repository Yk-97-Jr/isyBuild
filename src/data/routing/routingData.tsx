// Type Imports
import type { rountingDataType } from '@/types/menuTypes'

const rountingData = (): rountingDataType[] => [
  {
    path: 'role/admin',
    roles: ['admin']
  },
  {
    path: 'role/dashboard',
    roles: ['admin', 'client']
  },
  {
    path: 'role/users/list',
    roles: ['admin']
  },
  {
    path: 'role/users/add',
    roles: ['admin']
  },
  {
    path: 'role/users/[id]/details',
    roles: ['admin']
  },
  {
    path: 'role/clients/list',
    roles: ['admin']
  },
  {
    path: 'role/clients/add',
    roles: ['admin']
  },
  {
    path: 'role/clients/[id]/details',
    roles: ['admin']
  },
  {
    path: 'role/lots/list',
    roles: ['admin', 'client']
  },
  {
    path: 'role/lots/add',
    roles: ['admin', 'client']
  },
  {
    path: 'role/lots/[id]/details',
    roles: ['admin', 'client']
  },
  {
    path: 'role/subcontractor/list',
    roles: ['admin']
  },
  {
    path: 'role/subcontractor/add',
    roles: ['admin']
  },
  {
    path: 'role/subcontractor/[id]/details',
    roles: ['admin']
  },
  {
    path: 'role/staff/[id]/details/add',
    roles: ['admin']
  }
]

export default rountingData
