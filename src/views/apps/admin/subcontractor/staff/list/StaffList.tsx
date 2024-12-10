'use client'

// components/UserList.js
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import Grid from '@mui/material/Grid'

import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'

import {useDebounce} from "@uidotdev/usehooks";

import type { SortingState } from '@tanstack/react-table'

import StaffListTable from './StaffListTable'
import { useSubcontractorsStaffRetrieve2Query } from '@/services/IsyBuildApi'

const StaffList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState<string>("");
  const [isActive, setIsActive] = useState<string | null>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const debouncedSearch = useDebounce(search, 500);


  const { id } = useParams() // Extract id from dynamic route


   // Calculate ordering
   const ordering = sorting.map((s) => `${s.desc ? '-' : ''}${s.id}`).join(',') as any ;
   
   const IsActive = isActive === 'true' ? true : isActive === 'false' ? false : undefined;


  // Pass parameters to the query hook
  const { data, error, isLoading, isFetching, refetch } = useSubcontractorsStaffRetrieve2Query({
    subcontractorId: +id,
    page,
    pageSize,
    isActive: IsActive,
      ordering,
      search: debouncedSearch
  })

  useEffect(() => {
    refetch()
    setPage(1)
  }, [pageSize, refetch, sorting, isActive, debouncedSearch])

  useEffect(() => {
    refetch()
  }, [page, refetch])

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )
  if (error)
    return (
      <div>
        Error fetching subcontractorStaff data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const subcontractorStaff = data?.results || []
  const countRecords = data?.count

  return isFetching ? (
    <StaffListTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={subcontractorStaff}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
      setSearch={setSearch}
          setIsActive={setIsActive}
          isActive={isActive}
          setSorting={setSorting}
          sorting={sorting}
          search={search}
    />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StaffListTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={subcontractorStaff}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          setSearch={setSearch}
          setIsActive={setIsActive}
          isActive={isActive}
          setSorting={setSorting}
          sorting={sorting}
          search={search}
        />
      </Grid>
    </Grid>
  )
}

export default StaffList
