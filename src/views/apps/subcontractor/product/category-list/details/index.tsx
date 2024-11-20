// MUI Imports
import React from 'react'

import Grid from '@mui/material/Grid'

import CategoryEdit from '@/views/apps/subcontractor/product/category-list/details/CategoryEdit'

// Component Imports

const InfosCategory = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CategoryEdit />
      </Grid>
    </Grid>
  )
}

export default InfosCategory
