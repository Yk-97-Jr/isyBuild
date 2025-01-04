'use client' // Keep this label at the top

import React from 'react'

import { useParams } from "next/navigation";

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {  CircularProgress, Typography } from '@mui/material'

import {  useRetrieveFinanceEnterpriseByIdQuery  } from '@/services/IsyBuildApi' // Query to fetch Subcontractor data
import EnterpriseDetails from './EnterpriseDetails';
import FinanceSituationlist from './FinanceSituation/list/FinanceSituationlist';

import AdditionalWorkList from './AdditionalWork/list/AdditionalWorkList';
import FEDataCard from './FEDataCard';
import Payment from './Payment';
import { RefetchProvider } from '@/contexts/RefetchContextProvider';
import PaymentProgressChart from '../charts/PaymentProgressChart';

const FinanceEnterprise = () => {
  const {   idFe} = useParams() // Get subcontractorId from route parameters

  console.log("ide:",idFe) ;
  

  




 


  
    const {data,isLoading: isLoadingQuery, refetch} = useRetrieveFinanceEnterpriseByIdQuery({financeEnterpriseId:+idFe});


 
      
  

  if (isLoadingQuery)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )

  return (
    <RefetchProvider refetch={refetch}>
     
      <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      
        <Typography variant='h4' className='mbe-4'>
            {`Gestion finance pour l'Enterprise: ${data?.subcontractor.name}`}
        </Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FinanceSituationlist />
            </Grid>
            <Grid item xs={12}>
              <AdditionalWorkList  />
            </Grid>
            <Grid item xs={12} md={6}>
              <PaymentProgressChart data={data} />
            </Grid>
            <Grid item xs={12} md={6}>
            
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <EnterpriseDetails />
            </Grid>
            <Grid item xs={12}>
              <FEDataCard  data={data}/>
            </Grid>
            <Grid item xs={12}>
              <Payment  data={data} refetch={refetch}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RefetchProvider>
   
  )
}

export default FinanceEnterprise
