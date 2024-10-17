// MUI Imports
import Grid from '@mui/material/Grid'

import UserClientList from "@views/apps/admin/clients/details/users/list/UserClientList";



// Component Imports

const UsersClient = () => {
  return (
    <Grid container spacing={6}>
       <Grid item xs={12}>
        <h1>
         <UserClientList/>
        </h1>
      </Grid>
    </Grid>
  )
}

export default UsersClient
