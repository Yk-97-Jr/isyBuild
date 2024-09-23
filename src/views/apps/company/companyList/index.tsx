'use client'

// components/CompanyList.js
import React, { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'

import CompanyTable from '@/views/apps/company/companyTable'
import { useSubcontractorsRetrieveQuery } from '@/services/IsyBuildApi'

const CompanyList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  console.log('page ' + page)

  // Pass parameters to the query hook
  const { data, error, isLoading, isFetching, refetch } = useSubcontractorsRetrieveQuery({ page, pageSize })

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
        Error fetching user data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const users = data?.results || []
  const countRecords = data?.count

  return isFetching ? (
    <CompanyTable
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
        <CompanyTable
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

export default CompanyList
