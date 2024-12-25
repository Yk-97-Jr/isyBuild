'use client' // Keep this label at the top

import React from 'react'

import { useParams } from "next/navigation";

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'

import { useRetrieveFinanceByIdQuery  } from '@/services/IsyBuildApi' // Query to fetch Subcontractor data
import FinanceEarn from './FinanceEarn';
import FinanceListTable from './FinanceListTable';

const FinanceDetails = () => {
  const { financeId } = useParams() // Get subcontractorId from route parameters

  console.log(financeId);
  

  const { data , isLoading: isLoadingQuery, isFetching } = useRetrieveFinanceByIdQuery({
    financeId: +financeId
  })


  console.log(data);
  

  if (isLoadingQuery)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )

  return (
   
      <Grid container spacing={6}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} md={8.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FinanceListTable isFetching={isFetching} data={data?.finance_enterprises}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FinanceEarn data={data} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
   
  )
}

export default FinanceDetails
