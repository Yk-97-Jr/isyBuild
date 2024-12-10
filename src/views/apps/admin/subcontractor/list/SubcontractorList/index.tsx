'use client'

// components/CompanyList.js
import React, { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'
 
import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'

import type { SortingState } from '@tanstack/react-table'

import { useDebounce } from '@uidotdev/usehooks'

import SubcontractorTable from '@/views/apps/admin/subcontractor/list/SubcontractorTable'
import { useSubcontractorsRetrieveQuery } from '@/services/IsyBuildApi'

const SubcontractorList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isActive, setIsActive] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [clientId, setClientId] = useState<string | ''>('');
  const [lotsId, setLotsId] = useState<string | ''>('');
  const debouncedSearch = useDebounce(search, 500);

  const clientIds = clientId ? clientId.toString() : undefined;
  const lotIds = lotsId ? lotsId.toString() : undefined;
  

 

  // Pass parameters to the query hook
  const { data, error, isLoading, isFetching, refetch } = useSubcontractorsRetrieveQuery({ page, pageSize,isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    ordering: sorting.map((s) => `${s.desc ? '-' : ''}${s.id}`)
    .join(',') as any,search: debouncedSearch ,clientIds,lotIds })

    useEffect(() => {
      refetch();
      setPage(1)
    }, [pageSize, sorting, isActive,debouncedSearch,clientIds, refetch]);

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
    <SubcontractorTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={users}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
      setSorting={setSorting}
          sorting={sorting}
          setIsActive={setIsActive}
          isActive={isActive}
          search={search}
          setSearch={setSearch}
          setClientId={setClientId}
          clientId={clientId}
          lotsId={lotsId}
          setLotsId={setLotsId}
          
    />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubcontractorTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={users}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          setSorting={setSorting}
          sorting={sorting}
          setIsActive={setIsActive}
          isActive={isActive}
          search={search}
          setSearch={setSearch}
          setClientId={setClientId}
          clientId={clientId}
          lotsId={lotsId}
          setLotsId={setLotsId}
          
        />
      </Grid>
    </Grid>
  )
}

export default SubcontractorList
