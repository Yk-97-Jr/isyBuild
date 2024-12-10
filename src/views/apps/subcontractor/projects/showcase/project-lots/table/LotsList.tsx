'use client'

// components/ProjectList.js
import React, {useEffect, useState} from 'react'



import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'



import LotTable from './LotTable'
import type { ProjectLotRead } from '@/services/IsyBuildApi';


const LotsList = ({data, error, isLoading, isFetching, refetch}:{data?:ProjectLotRead 
  error:any
  isLoading:boolean
  isFetching:boolean
  refetch:() => void
}) => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");

  


  const [sorting, setSorting] = React.useState<SortingState>([]);

  

  // Pass parameters to the query hook
  

  useEffect(() => {

    if (data) {
      
     
      setPage(1)
    }
  }, [pageSize, data, refetch]);


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
  const project = data?.folder?.documents || null
  


  return (

    <Grid container spacing={6}>
      <Grid item xs={12} >
        <LotTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={project}
          
          isFetching={isFetching}
          
          setSearch={setSearch}
          setSorting={setSorting}
          sorting={sorting}
          search={search}
        />
      </Grid>
    </Grid>)
}

export default LotsList
