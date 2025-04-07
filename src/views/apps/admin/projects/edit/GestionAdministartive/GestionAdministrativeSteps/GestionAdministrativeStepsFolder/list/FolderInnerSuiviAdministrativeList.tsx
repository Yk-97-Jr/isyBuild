'use client'

// MUI Imports
import React from "react";

import {useParams} from "next/navigation";

import Grid from '@mui/material/Grid'


import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";

import Typography from "@mui/material/Typography";

import FolderInnerSuiviAdministrativeListTable
  from "@views/apps/admin/projects/edit/GestionAdministartive/GestionAdministrativeSteps/GestionAdministrativeStepsFolder/list/FolderInnerSuiviAdministrativeListTable";
import {useRetrieveSuiviAdministrativeStepDetailQuery} from "@/services/IsyBuildApi";


const FolderInnerSuiviAdministrativeList = () => {

  const {stepId} = useParams(); // Get clientId from route parameters

  const {data, error, refetch, isFetching, isLoading} = useRetrieveSuiviAdministrativeStepDetailQuery({
    stepId: +stepId,
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
  const documents = data?.step_documents || []

  console.log(isFetching)
  console.log(documents)


  return (
    <Grid container spacing={6} justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ mt: 6 }}>
        <Box>
          {/* Main Title */}
          <Typography variant="h3" className="mbe-6">
            Détails du dossier
          </Typography>
          {/* Subtitle with step name */}
          <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
            Étape actuelle: <strong>{data?.step_name}</strong>
          </Typography>
          {/* Table Component */}
          <FolderInnerSuiviAdministrativeListTable
            tableData={documents}
            refetch={refetch}
            isFetching={isFetching}
          />
        </Box>
      </Grid>
    </Grid>
  )

}

export default FolderInnerSuiviAdministrativeList
