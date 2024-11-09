'use client'; // Keep this label at the top

import React from 'react';

import {useParams} from 'next/navigation';

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";


import {
  useProjectLotsRetrieveQuery
} from "@/services/IsyBuildApi"; // Query to fetch client data
import AppeleOffreHeader from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreHeader";
import AppeleOffresInformation
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffresInformation";
import AppeleOffreCreatedBy from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreCreatedBy";
import AppeleOffreSub
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/AppeleOffreSub";

const AppeleOffreDetails = () => {


  const {id} = useParams(); // Get clientId from route parameters

  const {data: projectLotData, isLoading: isLoadingQuery} = useProjectLotsRetrieveQuery({
    projectLotId: +id,
  });


  if (isLoadingQuery) return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
      <CircularProgress/>
    </Box>
  )


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AppeleOffreHeader/>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AppeleOffresInformation projectLotData={projectLotData}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AppeleOffreCreatedBy projectLotData={projectLotData}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <AppeleOffreSub projectLotData={projectLotData}/>
      </Grid>
    </Grid>
  );
};

export default AppeleOffreDetails;
