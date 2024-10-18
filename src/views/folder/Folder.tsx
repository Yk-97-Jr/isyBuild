'use client'

// MUI Imports
import React from "react";

import {useParams} from "next/navigation";

import Grid from '@mui/material/Grid'


import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";

import Typography from "@mui/material/Typography";

import FolderListTable from "@views/folder/FolderListTable";
import {useGetFolderDetailQuery} from "@/services/IsyBuildApi";
import FolderHeader from "@views/folder/FolderHeader";


const FolderList = () => {

  const {id} = useParams(); // Get clientId from route parameters
  const {data, error, isLoading} = useGetFolderDetailQuery({folderId: +id})


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
  const documents = data?.documents || []


  return (
    <Grid container spacing={6} justifyContent="center" alignItems="center">
      <Grid item xs={10} sx={{mt: 8}}>
        <FolderHeader/>
      </Grid>
      <Grid item xs={10} sx={{mt: 6}}>
        <Typography variant='h3' className='mbe-6'>
          Détails du dossier
        </Typography>
        <FolderListTable tableData={documents}/>
      </Grid>
    </Grid>
  )
}

export default FolderList
