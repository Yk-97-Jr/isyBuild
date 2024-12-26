// MUI Imports
import React from "react";

import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import {ProjectStatusMapping} from "@/utils/statusEnums";

const TableFilters = ({setFilter, filter}: {
  setFilter: React.Dispatch<React.SetStateAction<string | null>>
  filter: string | null
}) => {


  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={filter || ""}
            onChange={e => setFilter(e.target.value as string)}
            SelectProps={{displayEmpty: true}}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <MenuItem value="">Tout</MenuItem>
            {/* Generate menu items from mapping */}
            {Object.entries(ProjectStatusMapping).map(([key, {label}]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
