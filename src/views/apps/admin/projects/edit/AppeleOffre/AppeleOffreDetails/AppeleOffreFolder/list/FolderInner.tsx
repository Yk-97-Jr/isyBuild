'use client'

// MUI Imports
import React from "react";

import {useParams} from "next/navigation";

import Grid from '@mui/material/Grid'


import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";

import Typography from "@mui/material/Typography";

import {useProjectLotsRetrieveQuery} from "@/services/IsyBuildApi";
import FolderInnerListTable
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreFolder/list/FolderInnerListTable";


const FolderInnerList = () => {

  const {id} = useParams(); // Get clientId from route parameters

  const {data, error, refetch, isFetching, isLoading} = useProjectLotsRetrieveQuery({
    projectLotId: +id,
  });

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress/>
      </Box>
    )
  if (error)
    return (
      <div>
        Error fetching data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const documents = data?.folder?.documents || []

  console.log(isFetching)
  console.log(documents)


  return isFetching ?
    <Grid container spacing={6} justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{mt: 6}}>
        <Typography variant='h3' className='mbe-6'>
          Détails du dossier
        </Typography>
        <FolderInnerListTable tableData={documents} refetch={refetch} isFetching={isFetching}/>
      </Grid>
    </Grid>
    :
    <Grid container spacing={6} justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{mt: 6}}>
        {/*{ a small div here to rerender the component}*/}
        <div>
          <Typography variant='h3' className='mbe-6'>
            Détails du dossier
          </Typography>
          <FolderInnerListTable tableData={documents} refetch={refetch} isFetching={isFetching}/>
        </div>
      </Grid>
    </Grid>
}

export default FolderInnerList
