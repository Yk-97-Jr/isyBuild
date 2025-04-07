'use client'

// components/LocationsList.js
import React, {useEffect, useState} from 'react'

 import { useParams } from 'next/navigation'

import type {SortingState} from '@tanstack/react-table';

import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import {useDebounce} from "@uidotdev/usehooks"; 

import DocDiffTable from './DocDiffTable'
import {useDocumentDiffusionsListQuery} from '@/services/IsyBuildApi'

const DocDiffList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { edit } = useParams(); 

 const [search, setSearch] = useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]); 

  const debouncedSearch = useDebounce(search, 500); 

  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useDocumentDiffusionsListQuery({
    projectId:+edit,
      page,
      pageSize,

      ordering: sorting.map((s) => `${s.desc ? '-' : ''}${s.id}`).join(',') as any,
      search: debouncedSearch 
    },
  );

  console.log(data);
  

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize, sorting ,   debouncedSearch ]);


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
        Error fetching Locations data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const docDiff = data?.results || []
  const countRecords = data?.count


  return (

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DocDiffTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={docDiff}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}

          setSorting={setSorting}
          sorting={sorting}
          setSearch={setSearch}
          search={search} 
        />
      </Grid>
    </Grid>)
}

export default DocDiffList
