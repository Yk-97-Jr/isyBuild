// Type Imports
import type {rountingDataType} from '@/types/menuTypes'

const rountingData = (): rountingDataType[] => [
  {
    path: 'role/dashboard',
    roles: ['admin', 'client', 'subcontractor', 'intervenant'],
  },
  {
    path: 'role/users/list',
    roles: ['admin', 'client', 'subcontractor'],
  },
  {
    path: 'role/users/add',
    roles: ['admin', 'client', 'subcontractor'],
  },
  {
    path: 'role/users/[id]/details',
    roles: ['admin', 'client', 'subcontractor'],
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
    roles: ['admin', 'client']
  },
  {
    path: 'role/subcontractor/add',
    roles: ['admin', 'client']
  },
  {
    path: 'role/subcontractor/[id]/details',
    roles: ['admin', 'client']
  },
  {
    path: 'role/projects/list',
    roles: ['admin', 'client', 'subcontractor', 'intervenant']
  },
  {
    path: 'role/projects/add',
    roles: ['admin', 'client', 'intervenant']
  },
  {
    path: 'role/projects/[edit]/details',
    roles: ['admin', 'client', 'subcontractor', 'intervenant']
  },
  {
    path: 'role/projects/[edit]/details/[id]',
    roles: ['admin', 'client']
  },
  {
    path: 'role/staff/[id]/details/add',
    roles: ['admin']
  },
  {
    path: 'role/product/list',
    roles: ['subcontractor']
  },
  {
    path: 'role/product/add',
    roles: ['subcontractor']
  },
  {
    path: 'role/product/[id]/details',
    roles: ['subcontractor']
  }


]

export default rountingData




