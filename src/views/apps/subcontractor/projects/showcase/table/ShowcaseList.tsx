'use client'

// components/ProjectList.js
import React, {useEffect, useState} from 'react'

import { useParams } from 'next/navigation'

import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useDebounce} from "@uidotdev/usehooks";

import ShowcaseTable from './ShowcaseTable'
import {useProjectsLotsRetrieveQuery} from '@/services/IsyBuildApi'

const ShowcaseList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");

  const { id } = useParams() // Extract id from dynamic route


  const [sorting, setSorting] = React.useState<SortingState>([]);

  const debouncedSearch = useDebounce(search, 500);

  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useProjectsLotsRetrieveQuery({
    projectId:+id,
      page,
      pageSize,

      //isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,

       ordering: sorting
        .map((s) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',') as any, 

      search: debouncedSearch 
    },
  );

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize, sorting, debouncedSearch, refetch]);


  useEffect(() => {
    refetch();
  }, [ refetch]);


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

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ShowcaseTable
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

export default ShowcaseList
