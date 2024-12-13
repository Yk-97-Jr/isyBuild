'use client'

// components/UserList.js
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'

import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'

import TeamTable from './teamTable'

import {
  useClientsRetrieveQuery,
  useListProjectStaffQuery,
  useProjectsDeleteDestroyMutation,
  useProjectsRetrieveQuery
} from '@/services/IsyBuildApi'

import type { ProjectStaffRead } from '@/services/IsyBuildApi'

const TeamData = () => {
  const router = useRouter()

  const params = useParams()

  const projectId = parseInt(params.edit.toString())

  //List all staf for a projectQ
  const { data: stafData, isFetching: IsStaffFetching } = useListProjectStaffQuery({ projectId: projectId })

  const { data: client_project } = useClientsRetrieveQuery({ page: 1, pageSize: 50 })

  const [tableRows, setTableRows] = useState<Partial<ProjectStaffRead>[]>([])

  //retrive the data from the backend

  const [status] = useState<string>('')

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

  useEffect(() => {
    if (stafData && stafData.results) {
      setTableRows(
        stafData.results.map(staffItem => ({
          id: staffItem.id,
          staff: staffItem.staff,
          role: staffItem.role,
          supervisor: staffItem.supervisor,
          created_by: staffItem.created_by,
          created_at: staffItem.created_at,
          updated_at: staffItem.updated_at
        }))
      )
    }
  }, [stafData])

  // States for pagination or other parameters

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchValue, setSearchValue] = useState<string>('')

  console.log('page' + page)

  // Pass parameters to the query hook

  const { data, error, isLoading, refetch } = useProjectsRetrieveQuery(
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
  const project_Staf = stafData?.results || []
  const client_staf_project = client_project?.results || []
  const countRecords = data?.count

  const handleEdit = (rowId: any) => {
    router.push(`${rowId}/details`)
  }

  console.log(project_Staf)

  return IsStaffFetching ? (
    <TeamTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={project_Staf}
      countRecords={countRecords}
      isFetching={IsStaffFetching}
      refetch={refetch}
      handleEdit={handleEdit}
      status={status}
      handleDelete={handleDelete}
      setTableRows={setTableRows}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      client_staf_project={client_staf_project}
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
          data={project_Staf}
          countRecords={countRecords}
          isFetching={IsStaffFetching}
          refetch={refetch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setTableRows={setTableRows}
          client_staf_project={client_staf_project}
        />
      </Grid>
    </Grid>
  )
}

export default TeamData
