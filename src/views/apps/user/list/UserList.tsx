'use client'

// components/UserList.js
import React, {useState} from 'react';

import Grid from '@mui/material/Grid';

import UserListTable from './UserListTable';
import {useAdminStaffRetrieveQuery} from '@/services/IsyBuildApi';

const UserList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Pass parameters to the query hook
  const {data, error, isLoading} = useAdminStaffRetrieveQuery({page, pageSize});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data: {error.message}</div>;
  const users = data?.results || [];


return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable tableData={users}/>
      </Grid>
    </Grid>
  );
}

export default UserList;
