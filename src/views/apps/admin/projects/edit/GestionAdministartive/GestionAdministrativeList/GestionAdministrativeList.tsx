'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react'

import {useParams} from "next/navigation";

import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useDebounce} from "@uidotdev/usehooks";

import {useListSuiviAdministrativeQuery} from '@/services/IsyBuildApi'
import GestionAdministrativeListListTable from "./GestionAdministrativeListTable";

const GestionAdministrativeList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string >();

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const debouncedSearch = useDebounce(search, 500);
  const {edit} = useParams(); // Get clientId from route parameters


  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useListSuiviAdministrativeQuery({
      page,
      pageSize,
      projectId: +edit,
      status: status as any,
      ordering: sorting
        .map((s) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',') as any,
      search: debouncedSearch
    },
  );

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize, sorting, status, debouncedSearch]);


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
  const countRecords = data?.count
  const tableData = data?.results || []


  return (

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GestionAdministrativeListListTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={tableData}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          setSearch={setSearch}
          setStatus={setStatus}
          status={status}
          setSorting={setSorting}
          sorting={sorting}
          search={search}
        />
      </Grid>
    </Grid>)
}

export default GestionAdministrativeList
