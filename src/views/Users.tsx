'use client'

// React Imports
import React from 'react'

// Material-UI Imports
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import {useAdminStaffListQuery} from "@/services/IsyBuildApi";

// Import the query hook

const AdminStaffList = () => {
  // Use the query hook to fetch the data
  const { data, error, isLoading } = useAdminStaffListQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">Error fetching staff list: {error.message}</Typography>
  }

  return (
    <List>
      {data.map((user) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  )
}

export default AdminStaffList
