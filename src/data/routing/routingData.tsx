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
    roles: ['admin', 'client'],
  },
  {
    path: 'role/users/add',
    roles: ['admin', 'client'],
  },
  {
    path: 'role/users/[id]/details',
    roles: ['admin', 'client'],
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
    roles: ['admin']
  },
  {
    path: 'role/lots/list',
    roles: ['admin']
  },
  {
    path: 'role/lots/add',
    roles: ['admin']
  },
  {
    path: 'role/lots/[id]/details',
    roles: ['admin']
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
    path: 'role/projects/list',
    roles: ['admin', 'client']
  },
  {
    path: 'role/projects/add',
    roles: ['admin','client']
  }
]

export default rountingData




