'use client'

// components/ProjectList.js
import React, {useEffect, useState} from 'react'



import { useParams } from 'next/navigation';

import type {SortingState} from '@tanstack/react-table';
import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'



import LotTable from './LotTable'
import { useProjectLotsRetrieveQuery, } from '@/services/IsyBuildApi';


const LotsList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");

  const { docId } = useParams() 

  


  const [sorting, setSorting] = React.useState<SortingState>([]);

  
  const {data, error, isLoading, isFetching, refetch} = useProjectLotsRetrieveQuery({
    projectLotId:+docId,
  })

  // Pass parameters to the query hook
  

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize, ]);


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
  const project = data?.folder?.documents || null
  
  console.log(project);
  
  


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
