// MUI Imports
import React from "react";

import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({setStatus, status}: {
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>
  status: string | undefined
}) => {


  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={status || ""}
            onChange={e => setStatus(e.target.value as string)}
            SelectProps={{displayEmpty: true}}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <MenuItem value="">Tout</MenuItem>
            <MenuItem value="not_started">Non démarré</MenuItem>
            <MenuItem value="in_progress">En cours</MenuItem>
            <MenuItem value="completed">Terminé</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
