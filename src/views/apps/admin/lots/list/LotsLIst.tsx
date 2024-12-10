'use client'

// components/UserList.js
import React, { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'

import { useDebounce } from '@uidotdev/usehooks'

import type { SortingState } from '@tanstack/react-table'

import LotsListTable from './LotsListTable'
import { useLotsRetrieveQuery } from '@/services/IsyBuildApi'

const LotsList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [clientId, setClientId] = useState<string | ''>('');
  const [search, setSearch] = useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const ordering = sorting.map((s) => `${s.desc ? '-' : ''}${s.id}`).join(',') as any;
  const debouncedSearch = useDebounce(search, 500);
  const clientIds = clientId ? clientId.toString() : undefined;

  // Pass parameters to the query hook
  const { data, error, isLoading, isFetching, refetch } = useLotsRetrieveQuery({ page, pageSize,clientIds,ordering, search: debouncedSearch })

  useEffect(() => {
    refetch()
  }, [page, pageSize, clientIds,debouncedSearch,ordering, refetch])

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
  const lots = data?.results || []
  const countRecords = data?.count

  

  return isFetching ? (
    <LotsListTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={lots}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
      setClientId={setClientId}
          clientId={clientId}
          setSorting={setSorting}
          sorting={sorting}
          setSearch={setSearch}
          search={search}
    />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LotsListTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={lots}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          setClientId={setClientId}
          clientId={clientId}
          setSorting={setSorting}
          sorting={sorting}
          setSearch={setSearch}
          search={search}
        />
      </Grid>
    </Grid>
  )
}

export default LotsList
