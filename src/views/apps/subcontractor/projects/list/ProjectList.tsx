'use client'

// components/ProjectList.js
import React, {useEffect, useState} from 'react'

import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useDebounce} from "@uidotdev/usehooks";

import ProjectTable from './ProjectTable'
import {useListProjectSubcontractorQuery} from '@/services/IsyBuildApi'

const ProjectList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");


  const [sorting, setSorting] = React.useState<SortingState>([]);

  const debouncedSearch = useDebounce(search, 500);

  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useListProjectSubcontractorQuery({
      page,
      pageSize,



       ordering: sorting
        .map((s) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',') as any, 

      search: debouncedSearch 
    },
  );

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize, sorting, debouncedSearch]);


  useEffect(() => {
    refetch();
  }, [ page, refetch]);


  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress/>
      </Box>
    )
  if (error)
    return (
      <div>
        Error fetching Project data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const project = data?.results || []
  const countRecords = data?.count


  return (

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProjectTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={project}
          countRecords={countRecords}
          isFetching={isFetching}
          
          setSearch={setSearch}
          setSorting={setSorting}
          sorting={sorting}
          search={search}
        />
      </Grid>
    </Grid>)
}

export default ProjectList
