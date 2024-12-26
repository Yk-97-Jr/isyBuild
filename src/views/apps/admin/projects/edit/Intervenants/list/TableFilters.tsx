// MUI Imports
import React from "react";

import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import {useIntervenantRolesRetrieveQuery} from "@/services/IsyBuildApi";

const TableFilters = ({setIsActive, isActive}: {
  setIsActive: React.Dispatch<React.SetStateAction<string | null>>
  isActive: string | null
}) => {
  const {data: roles, isLoading, error} = useIntervenantRolesRetrieveQuery();


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
            <MenuItem value="">Tout</MenuItem>
            {isLoading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : error ? (
              <MenuItem disabled>Error loading roles</MenuItem>
            ) : (

              roles?.map((role: { value: string; label: string }) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))
            )}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
