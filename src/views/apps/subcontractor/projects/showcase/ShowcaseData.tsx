'use client' // Keep this label at the top

import React  from 'react'

import { useParams } from "next/navigation";



import Grid from '@mui/material/Grid'


import Box from '@mui/material/Box'

import { CardHeader, CircularProgress } from '@mui/material'



import { useGetSubcontractorProjectDetailQuery } from '@/services/IsyBuildApi' // Query to fetch Subcontractor data

import ShowcaseList from './table/ShowcaseList';
import ClinetShowcase from './side-card/ClinetShowcase';
import ShowcaseAbout from './side-card/ShowcaseAbout';

const Showcase = () => {
  

  const { id } = useParams() // Get subcontractorId from route parameters


  const { data ,isLoading: isLoadingQuery } = useGetSubcontractorProjectDetailQuery({
    projectId: +id
  })

 




      

      

      
    

  if (isLoadingQuery)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )

  return (
   
      <Grid container spacing={6} >
        
        <Grid item xs={12} md={8}>
          <CardHeader title="info"/>
          </Grid>  
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            
            <ShowcaseList />
            
           
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={6}>
           
            
            <Grid item xs={12}>
            <ClinetShowcase clinetShowcaseData={data}  /> 
                
            </Grid>
            <Grid item xs={12}>
            <ShowcaseAbout clinetShowcaseData={data} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
   
  )
}

export default Showcase
