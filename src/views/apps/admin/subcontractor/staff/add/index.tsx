// MUI Imports
import React from 'react'

import Grid from '@mui/material/Grid'

import StaffAdd from '@/views/apps/admin/subcontractor/staff/add/StaffAdd'

// Component Imports

const StaffSubcontractor = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <h1>
          <StaffAdd />
        </h1>
      </Grid>
    </Grid>
  )
}

export default StaffSubcontractor
