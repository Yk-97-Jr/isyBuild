'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react'

import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import UserListTable from './UserListTable'
import {useAdminStaffRetrieveQuery} from '@/services/IsyBuildApi'

const UserList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isActive, setIsActive] = useState<string | null>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useAdminStaffRetrieveQuery({
    page,
    pageSize,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : null,
    ordering: sorting
      .map((s) => `${s.desc ? '-' : ''}${s.id}`)
      .join(',') as any
  });

  useEffect(() => {
    console.log(isActive)
    refetch();
    setPage(1)
  }, [pageSize, sorting, isActive]);


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
    <UserListTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={users}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
      setIsActive={setIsActive}
      isActive={isActive}
      setSorting={setSorting}
      sorting={sorting}
    />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={users}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          setIsActive={setIsActive}
          isActive={isActive}
          setSorting={setSorting}
          sorting={sorting}
        />
      </Grid>
    </Grid>
  )
}

export default UserList
