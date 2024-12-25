'use client' // Keep this label at the top

import React from 'react'

import { useParams } from "next/navigation";

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'

import { useRetrieveFinanceByIdQuery  } from '@/services/IsyBuildApi' // Query to fetch Subcontractor data
import EnterpriseDetails from './EnterpriseDetails';
import FinanceSituationlist from './FinanceSituation/list/FinanceSituationlist';

import AdditionalWorkList from './AdditionalWork/list/AdditionalWorkList';

const FinanceEnterprise = () => {
  const { financeId } = useParams() // Get subcontractorId from route parameters

  console.log(financeId);
  

  const { data , isLoading: isLoadingQuery,  } = useRetrieveFinanceByIdQuery({
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
              <FinanceSituationlist />
            </Grid>
            <Grid item xs={12}>
              <AdditionalWorkList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <EnterpriseDetails  />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
   
  )
}

export default FinanceEnterprise
