'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react'

import {useParams} from "next/navigation";

import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useProjectsLotsRetrieveQuery} from "@/services/IsyBuildApi";
import AppeleOffreTable from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreList/AppeleOffreTable";

const AppeleOffre = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const {edit} = useParams();


  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useProjectsLotsRetrieveQuery({page, pageSize, projectId: +edit})

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize]);


  useEffect(() => {
    refetch();
  }, [page]);


  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress/>
      </Box>
    )
  if (error)
    return (
      <div>
        Error fetching user data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const lots_projects = data?.results || []
  const countRecords = data?.count

  console.log('countRecords1' + countRecords)
  console.log('lots_projects' + lots_projects)
  console.log('isFetching' + isFetching)
  console.log('isloading' + isLoading)

  return isFetching ? (
    <AppeleOffreTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={lots_projects}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
    />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AppeleOffreTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={lots_projects}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
        />
      </Grid>
    </Grid>
  )
}

export default AppeleOffre
