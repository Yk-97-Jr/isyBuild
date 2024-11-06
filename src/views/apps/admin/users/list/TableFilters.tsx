// MUI Imports
import React from "react";

import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({setIsActive, isActive}: {
  setIsActive: React.Dispatch<React.SetStateAction<string | null>>
  isActive: string | null
}) => {


  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={isActive || ""}
            onChange={e => setIsActive(e.target.value as string)}
            SelectProps={{displayEmpty: true}}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <MenuItem value="">Choisir l'état d'activité</MenuItem>
            <MenuItem value="true">Actif</MenuItem>
            <MenuItem value="false">Inactif</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
