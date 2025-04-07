'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react'

import { useParams } from 'next/navigation';

import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useDebounce} from "@uidotdev/usehooks";

import {useListProjectLotFinanceQuery} from '@/services/IsyBuildApi'
import FinanceTable from './FinanceTable';

const UserList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState<string>("");


  const [sorting, setSorting] = React.useState<SortingState>([]);

  const debouncedSearch = useDebounce(search, 500);

  const { edit } = useParams(); 

  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useListProjectLotFinanceQuery({projectId:+edit ,page, pageSize,
   
    ordering: sorting
      .map((s) => `${s.desc ? '-' : ''}${s.id}`)
      .join(',') as any,
    search: debouncedSearch
  },);

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize, sorting,  debouncedSearch]);


  useEffect(() => {
    refetch();
  }, [page]);


  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
      <CircularProgress/>
    </Box>

  );
  if (error) return <div>Error fetching clients
    data: {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}</div>;
  const clients = data?.results || [];
  const countRecords = data?.count;


  console.log("countRecords1" + countRecords)
  console.log("users" + clients)
  console.log("isFetching" + isFetching)
  console.log("isloading" + isLoading)

  return (
    isFetching ?
      <FinanceTable pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} data={clients}
                       countRecords={countRecords} isFetching={isFetching} refetch={refetch} setSorting={setSorting}
                       sorting={sorting}
                       setSearch={setSearch}
                       search={search}/>
      :
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FinanceTable pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} data={clients}
                           countRecords={countRecords} isFetching={isFetching} refetch={refetch} setSorting={setSorting}
                           sorting={sorting}
                           setSearch={setSearch}
                           search={search}/>
        </Grid>
      </Grid>
  )
}

export default UserList;
