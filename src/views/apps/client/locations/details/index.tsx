// MUI Imports
import React from 'react'

import Grid from '@mui/material/Grid'

import LocationsEdit from './LocationsEdit'



// Component Imports

const InfosLots = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LocationsEdit/>
      </Grid>
    </Grid>
  )
}

export default InfosLots
