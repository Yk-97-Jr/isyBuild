// MUI Imports
import React from "react";

import Grid from '@mui/material/Grid'

import ClientEdit from "@views/apps/admin/clients/details/info/ClientEdit";


// Component Imports

const InfosClient = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <h1>
          <ClientEdit/>
        </h1>
      </Grid>
    </Grid>
  )
}

export default InfosClient
