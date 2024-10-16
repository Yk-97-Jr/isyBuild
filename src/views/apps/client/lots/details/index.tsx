// MUI Imports
import React from 'react'

import Grid from '@mui/material/Grid'

import LotsEdit from '@/views/apps/client/lots/details/LotsEdit'

// Component Imports

const InfosLots = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LotsEdit />
      </Grid>
    </Grid>
  )
}

export default InfosLots
