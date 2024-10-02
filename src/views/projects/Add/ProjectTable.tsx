// 'use client'
// import React from 'react'

// import type { FormEvent } from 'react'

// import { useState } from 'react'

// import { useRouter } from 'next/navigation'

// // MUI table component
// import { DataGrid } from '@mui/x-data-grid'

// import type { GridColDef } from '@mui/x-data-grid'

// import Paper from '@mui/material/Paper'

// import Button from '@mui/material/Button'

// import { CircularProgress } from '@mui/material'

// import type { Project } from '@/services/IsyBuildApi'

// import { useProjectsRetrieveQuery } from '@/services/IsyBuildApi'

// import { useProjectsDeleteDestroyMutation } from '@/services/IsyBuildApi'

// import type { ProjectsDeleteDestroyApiArg } from '@/services/IsyBuildApi'

// function ProjectTable() {
//   const router = useRouter()
//   const [tableRows, setTableRows] = useState<Partial<Project>[]>([])

//   //retrive the data from the backend
//   const { data, isLoading } = useProjectsRetrieveQuery({ page: 1, pageSize: 100 })

//   const [trigerFunction, {}] = useProjectsDeleteDestroyMutation()

//   async function handleDelete(id: ProjectsDeleteDestroyApiArg) {
//     try {
//       setTableRows(preRows => {
//         const newRows = preRows.filter(row => {
//           if (typeof row.code === 'undefined') {
//             return false
//           } else {
//             const rowCode = parseInt(row.code as string)

//             return !isNaN(rowCode) && rowCode !== id.projectId
//           }
//         })

//         return newRows
//       })

//       const result = await trigerFunction(id).unwrap()

//       console.log('Successfully deleted:', result)

//       return result
//     } catch (DeleteError) {
//       console.error('Error while deleting project:', DeleteError)
//       setTableRows(preRows => [...preRows])
//     }

//     window.location.reload()
//   }

//   React.useEffect(() => {
//     if (data && data.results) {
//       setTableRows(
//         data.results.map(project => ({
//           id: project.id,
//           name: project.name,
//           'start-date': project.start_date,
//           budget: project.budget,
//           status: project.status
//         }))
//       )
//     }
//   }, [data])

//   const columns: GridColDef[] = [
//     { field: 'name', headerName: 'Name', flex: 1 },
//     { field: 'start-date', headerName: 'Start Date', flex: 1 },
//     { field: 'budget', headerName: 'budget', flex: 1 },
//     { field: 'status', headerName: 'status', flex: 1 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       flex: 1,
//       renderCell: params => (
//         <div>
//           <Button
//             sx={{ marginRight: 1 }}
//             className='scale-90'
//             onClick={() => handleDelete({ projectId: params.row.id })}
//           >
//             <i className='tabler-trash text-textSecondary' />
//           </Button>
//           <Button className='scale-95' onClick={() => handleEdit({ projectId: params.row.id })}>
//             <i className='tabler-edit' />
//           </Button>
//         </div>
//       )
//     }
//   ]

//   const paginationModel = { page: 0, pageSize: 10 }

//   //Logique Functions
//   const hanldeRouting = (path: string) => {
//     router.push(`/Projects/${path}`)
//   }

//   const handleAdd = (arg: FormEvent) => {
//     arg.preventDefault()
//     hanldeRouting('add')
//   }
//   const handleEdit = (rowId: any) => {
//     const { projectId } = rowId
//     hanldeRouting(`edit/${projectId}`)
//   }

//   return (
//     <div>
//       <div className='p-5 flex justify-end '>
//         <Button variant='contained' children='Ajouter un Projet' onClick={event => handleAdd(event)}></Button>
//       </div>
//       <Paper sx={{ height: 470, width: '100%' }} className='shadow-sm  '>
//         {isLoading ? (
//           <div className='flex justify-center items-center h-full'>
//             <CircularProgress />
//           </div>
//         ) : (
//           <DataGrid
//             rows={tableRows}
//             columns={columns}
//             pagination={true}
//             initialState={{ pagination: { paginationModel } }}
//             pageSizeOptions={[5, 10]}
//             sx={{
//               border: 0,
//               '.MuiDataGrid-columnHeaders': {
//                 backgroundColor: '#1976d2'
//               },
//               '.MuiDataGrid-columnHeaderTitle': {
//                 fontWeight: 'bold'
//               }
//             }}
//           />
//         )}
//       </Paper>
//     </div>
//   )
// }

// export default ProjectTable
'use client'

// components/UserList.js
import React, { useEffect, useState } from 'react'


import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'

import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'

import { useProjectsRetrieveQuery } from '@/services/IsyBuildApi'

import ProjectListTable from './ProjectListTable'


import { useProjectsDeleteDestroyMutation } from '@/services/IsyBuildApi'


import type { ProjectRead } from '@/services/IsyBuildApi'

const UserList = () => {
  const router = useRouter()

  const [tableRows, setTableRows] = useState<Partial<ProjectRead>[]>([])

  //retrive the data from the backend
  const { data: Client } = useProjectsRetrieveQuery({ page: 1, pageSize: 100 })

  const [deleteProject] = useProjectsDeleteDestroyMutation()

  const handleDelete = async (id: number) => {
    try {
      await deleteProject({ projectId: id }).unwrap()
      setTableRows(tableRows => tableRows.filter(row => row.id !== id))
      console.log(tableRows)
      console.log('Successfully deleted project with ID:', id)
      window.location.reload()
    } catch (error) {
      console.error('Error while deleting project:', error)
    }
  }

  React.useEffect(() => {
    if (Client && Client.results) {
      setTableRows(
        Client.results.map(project => ({
          id: project.id,
          name: project.name,
          'start-date': project.start_date,
          budget: project.budget,
          status: project.status
        }))
      )
    }
  }, [Client])

  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  console.log('page' + page)

  // Pass parameters to the query hook
  const { data, error, isLoading, isFetching, refetch } = useProjectsRetrieveQuery({ page, pageSize })

  useEffect(() => {
    refetch()
  }, [page, pageSize])

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )
  if (error)
    return (
      <div>
        Error fetching Project data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const projects = data?.results || []
  const countRecords = data?.count

  //Logique Functions
  const hanldeRouting = (path: string) => {
    router.push(`/Projects/${path}`)
  }


  const handleEdit = (rowId: any) => {
    hanldeRouting(`edit/${rowId}`)
  }

  return isFetching ? (

    <ProjectListTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={projects}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      setTableRows={setTableRows}
    />
  ) : 
  (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProjectListTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={projects}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setTableRows={setTableRows}
        />
      </Grid>
    </Grid>
  )
}

export default UserList
