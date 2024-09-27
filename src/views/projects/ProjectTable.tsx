'use client'
import React from 'react'

import type { FormEvent } from 'react'

//router shit
import { useRouter } from 'next/navigation'

// MUI table component
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'



function ProjectTable() {
  //States
  const router = useRouter()

  //Colums Def
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'start-date', headerName: 'Start Date', flex: 1 },
    { field: 'budget', headerName: 'budget', flex: 1 },
    { field: 'country', headerName: 'country', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: () => (
        <div>
          <Button sx={{ marginRight: 1 }} className='scale-90 '>
            <i className='tabler-trash  text-textSecondary' />
          </Button>

          <Button className='scale-95'>
            <i className='tabler-edit' />
          </Button>
        </div>
      )
    }
  ]

  //Default Pagination
  const paginationModel = { page: 0, pageSize: 10 }

  //DummyRows
  const rows: any = [
    { id: 1, name: 'Project Alpha', 'start-date': '2023-01-15', budget: '50000', country: 'USA' },
    { id: 2, name: 'Project Beta', 'start-date': '2023-03-22', budget: '75000', country: 'Canada' },
    { id: 3, name: 'Project Gamma', 'start-date': '2023-05-10', budget: '60000', country: 'Germany' },
    { id: 4, name: 'Project Delta', 'start-date': '2023-07-18', budget: '90000', country: 'France' },
    { id: 5, name: 'Project Epsilon', 'start-date': '2023-09-30', budget: '45000', country: 'Japan' },
    { id: 6, name: 'Project Zeta', 'start-date': '2023-11-05', budget: '80000', country: 'UK' },
    { id: 7, name: 'Project Eta', 'start-date': '2023-12-14', budget: '55000', country: 'Australia' }
  ]

  //Logique Functions
  const hanldeRouting = (path: string) => {
    router.push(`/Projects/${path}`)
  }

  const handleAdd = (arg: FormEvent) => {
    arg.preventDefault()
    hanldeRouting('addProject')
  }

  return (
    <div>
      <div className='p-5 flex justify-end '>
        <Button variant='contained' children='Ajouter un Projet' onClick={event => handleAdd(event)}></Button>
      </div>
      <Paper sx={{ height: 470, width: '100%' }} className='shadow-sm  '>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={true}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}

          // checkboxSelection
          
          sx={{
            border: 0,
            '.MuiDataGrid-columnHeaders': {
              backgroundColor: '#1976d2'
            },
            '.MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold'
            }
          }}
        />
      </Paper>
    </div>
  )
}

export default ProjectTable
