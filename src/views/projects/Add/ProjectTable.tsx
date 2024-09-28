'use client'
import React from 'react'

import type { FormEvent } from 'react'


import { useState } from 'react'

import { useRouter } from 'next/navigation'

// MUI table component
import { DataGrid } from '@mui/x-data-grid'

import type { GridColDef } from '@mui/x-data-grid'

import Paper from '@mui/material/Paper'

import Button from '@mui/material/Button'

import { CircularProgress } from '@mui/material'


import type{ Project } from '@/services/IsyBuildApi'

import { useProjectsRetrieveQuery } from '@/services/IsyBuildApi'


import { useProjectsDeleteDestroyMutation } from '@/services/IsyBuildApi'

import type{ ProjectsDeleteDestroyApiArg } from '@/services/IsyBuildApi'

function ProjectTable() {
  const router = useRouter()
  const [tableRows, setTableRows] = useState<Partial<Project>[]>([])

  //retrive the data from the backend
  const { data, error, isLoading } = useProjectsRetrieveQuery({ page: 1, pageSize: 100 })
  
  const [trigerFunction, { data: DeleteData, error: DeleteError, isLoading: DeleteIsLoding }] =
    useProjectsDeleteDestroyMutation()

  async function handleDelete(id: ProjectsDeleteDestroyApiArg) {
    try {

      setTableRows(preRows => {
        const newRows = preRows.filter(row => {

          if (typeof row.code === 'undefined') {
            return false
          } 
          else {
            const rowCode = parseInt(row.code as string)

            return !isNaN(rowCode) && rowCode !== id.projectId
          
          }
        })

        return newRows

      })

      const result = await trigerFunction(id).unwrap()

      console.log('Successfully deleted:', result)

      return result

    } 
    catch (DeleteError) {
      console.error('Error while deleting project:', DeleteError)
      setTableRows(preRows => [...preRows])
    }

    window.location.reload()
  }

  React.useEffect(() => {

    if (data && data.results) {
      
      setTableRows(
        data.results.map(project => ({
          id: project.id,
          name: project.name,
          'start-date': project.start_date,
          budget: project.budget,
          status: project.status
        }))
      )
    }

  }, [data])

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'start-date', headerName: 'Start Date', flex: 1 },
    { field: 'budget', headerName: 'budget', flex: 1 },
    { field: 'status', headerName: 'status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: params => (
        <div>
          <Button
            sx={{ marginRight: 1 }}
            className='scale-90'
            onClick={() => handleDelete({ projectId: params.row.id })}
          >
            <i className='tabler-trash text-textSecondary' />
          </Button>
          <Button className='scale-95'>
            <i className='tabler-edit' />
          </Button>
        </div>
      )
    }
  ]

  const paginationModel = { page: 0, pageSize: 10 }

  //Logique Functions
  const hanldeRouting = (path: string) => {
    router.push(`/Projects/${path}`)
  }

  const handleAdd = (arg: FormEvent) => {
    arg.preventDefault()
    hanldeRouting('add')
  }

  return (
    <div>
      <div className='p-5 flex justify-end '>
        <Button variant='contained' children='Ajouter un Projet' onClick={event => handleAdd(event)}></Button>
      </div>
      <Paper sx={{ height: 470, width: '100%' }} className='shadow-sm  '>
        {isLoading ? (
          <div className='flex justify-center items-center h-full'>
            <CircularProgress />
          </div>
        ) : (
          <DataGrid
            rows={tableRows}
            columns={columns}
            pagination={true}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
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
        )}
      </Paper>
    </div>
  )
}

export default ProjectTable
