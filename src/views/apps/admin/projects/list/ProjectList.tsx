'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react'


import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useDebounce} from "@uidotdev/usehooks";

import type {ProjectStatusEnum} from '@/services/IsyBuildApi';
import { useProjectsRetrieveQuery} from '@/services/IsyBuildApi'
import ProjectListTable from "./ProjectListTable";

const ProjectList = () => {
  // States for pagination or other parameters

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const debouncedSearch = useDebounce(search, 500);

  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useProjectsRetrieveQuery({
      status: filter as ProjectStatusEnum || undefined,
      ordering: sorting
        .map((s) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',') as any,
      search: debouncedSearch
    },
  );

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize, sorting, filter, debouncedSearch]);


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
        <ProjectListTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={users}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          setSearch={setSearch}
          setFilter={setFilter}
          filter={filter}
          setSorting={setSorting}
          sorting={sorting}
          search={search}
        />
      </Grid>
    </Grid>)
}

export default ProjectList
