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


  console.log("page" + page)

  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching} = useAdminStaffRetrieveQuery({page, pageSize});

  if (isLoading) return <div>Loading1111111111...</div>;
  if (error) return <div>Error fetching user data: {error.message}</div>;
  const users = data?.results || [];
  const countRecords = data.count;


  console.log("countRecords1" + countRecords)
  console.log("users" + users)
  console.log("isFetching" + isFetching)
  console.log("isloading" + isLoading)

  return (
    isFetching ? <div>Loading...</div> :
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <UserListTable pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} tableData={users}
                         countRecords={countRecords}/>
        </Grid>
      </Grid>
  );
}

export default UserList;
