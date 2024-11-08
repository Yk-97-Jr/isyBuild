'use client'

// components/UserList.js
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'

import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'


import TeamTable from './teamTable'

import { useProjectsDeleteDestroyMutation, useProjectsRetrieveQuery } from '@/services/IsyBuildApi'

import type { ProjectRead } from '@/services/IsyBuildApi'

const TeamData = () => {
  const router = useRouter()

  const [tableRows, setTableRows] = useState<Partial<ProjectRead>[]>([])

  //retrive the data from the backend
  const { data: Project } = useProjectsRetrieveQuery({ page: 1, pageSize: 100 })

  const [status, setStatus] = useState<string>('')

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
    if (Project && Project.results) {
      setTableRows(
        Project.results.map(project => ({
          id: project.id,
          name: project.name,
          'start-date': project.start_date,
          budget: project.budget,
          status: project.status
        }))
      )
    }
  }, [Project])

  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchValue, setSearchValue] = useState<string>('')

  console.log('page' + page)
  
  // Pass parameters to the query hook

  const { data, error, isLoading, isFetching, refetch } = useProjectsRetrieveQuery(

    {
      status: status as 'canceled' | 'completed' | 'in_progress' | 'pending' | 'draft' | 'on_hold' | undefined,
      search: searchValue as string,
      page,
      pageSize
    },
    { refetchOnMountOrArgChange: true }

  )

  useEffect(() => {
    refetch()
  }, [page, pageSize, refetch])

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

  const handleEdit = (rowId: any) => {
    router.push(`${rowId}/details`)
  }

  return isFetching ? (
    <TeamTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={projects}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
      handleEdit={handleEdit}
      status={status}
      setStatus={setStatus}
      handleDelete={handleDelete}
      setTableRows={setTableRows}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TeamTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          status={status}
          setStatus={setStatus}
          data={projects}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setTableRows={setTableRows}
        />
      </Grid>
    </Grid>
  )
}

export default TeamData
