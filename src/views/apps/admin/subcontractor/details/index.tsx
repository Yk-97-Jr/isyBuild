// MUI Imports
import React from 'react'

import Grid from '@mui/material/Grid'

import SubcontractorEdit from '@/views/apps/admin/subcontractor/details/SubcontractorEdit'

// Component Imports

const InfosSubcontractor = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <h1>
          <SubcontractorEdit />
        </h1>
      </Grid>
    </Grid>
  )
}

export default InfosSubcontractor
