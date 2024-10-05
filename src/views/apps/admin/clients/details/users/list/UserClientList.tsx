'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react'

import {useParams} from "next/navigation";

import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useClientsStaffRetrieve2Query} from '@/services/IsyBuildApi'
import UserClientListTable from "./UserClientListTable";

const UserClientList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const {id} = useParams(); // Get clientId from route parameters


  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useClientsStaffRetrieve2Query({
    page, pageSize,
    clientId: +id
  })

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
  const users = data?.results || []
  const countRecords = data?.count


  return isFetching ? (
    <UserClientListTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={users}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
    />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserClientListTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={users}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
        />
      </Grid>
    </Grid>
  )
}

export default UserClientList
