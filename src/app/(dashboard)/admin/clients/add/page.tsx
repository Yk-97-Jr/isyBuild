// React Imports
import React from 'react'

// Component Imports
import Grid from "@mui/material/Grid";

import ClientAddHeader from "@views/apps/admin/clients/add/ClientAddHeader";
import ClientInformation from "@views/apps/admin/clients/add/ClientInformation";
import ClientStatus from "@views/apps/admin/clients/add/ClientStatus";
import ClientAdresse from "@views/apps/admin/clients/add/ClientAdresse";


const ClientAddApp = () => {


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ClientAddHeader/>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ClientInformation/>
          </Grid>
          <Grid item xs={12}>
            <ClientAdresse/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ClientStatus/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ClientAddApp
