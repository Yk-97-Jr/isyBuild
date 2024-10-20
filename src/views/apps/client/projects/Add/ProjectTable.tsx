'use client'

// components/UserList.js
import React, { useEffect, useState } from 'react'


import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'

import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'


import ProjectListTable from './ProjectListTable'


import { useProjectsDeleteDestroyMutation,useProjectsRetrieveQuery } from '@/services/IsyBuildApi'


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
  }, [page, pageSize,refetch])

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
  // const hanldeRouting = (path: string) => {
  //   router.push(`/role/projects/${path}`)
  // }


  const handleEdit = (rowId: any) => {
    // hanldeRouting()
    router.push(`${rowId}/details`)
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
