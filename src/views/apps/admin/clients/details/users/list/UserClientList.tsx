'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react'

import {useParams} from "next/navigation";

import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useDebounce} from "@uidotdev/usehooks";

import { useClientsStaffRetrieve3Query} from '@/services/IsyBuildApi'
import UserClientListTable from "@views/apps/admin/clients/details/users/list/UserClientListTable";

const UserClientList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState<string>("");
  const [isActive, setIsActive] = useState<string | null>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const debouncedSearch = useDebounce(search, 500);
  const {id} = useParams(); // Get clientId from route parameters


  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useClientsStaffRetrieve3Query({
      page,
      pageSize,
      clientId: +id,

      // isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      ordering: sorting
        .map((s) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',') as any,
      search: debouncedSearch
    },
  );

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize, sorting, isActive, debouncedSearch]);


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


  return (

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
          setIsActive={setIsActive}
          isActive={isActive}
          setSorting={setSorting}
          sorting={sorting}
          setSearch={setSearch}
          search={search}
        />
      </Grid>
    </Grid>)
}

export default UserClientList
