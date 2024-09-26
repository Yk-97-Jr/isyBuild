'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react';

import Grid from '@mui/material/Grid';

import {CircularProgress} from "@mui/material";

import Box from "@mui/material/Box";

import ClientListTable from './ClientListTable';
import {useClientsRetrieveQuery} from '@/services/IsyBuildApi';

const UserList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  console.log("page" + page)

  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useClientsRetrieveQuery({page, pageSize});

  useEffect(() => {
    refetch();
  }, [page, pageSize]);

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
      <CircularProgress/>
    </Box>

  );
  if (error) return <div>Error fetching clients
    data: {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}</div>;
  const clients = data?.results || [];
  const countRecords = data?.count;


  console.log("countRecords1" + countRecords)
  console.log("users" + clients)
  console.log("isFetching" + isFetching)
  console.log("isloading" + isLoading)

  return (
    isFetching ?
      <ClientListTable pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} data={clients}
                     countRecords={countRecords} isFetching={isFetching} refetch={refetch}/>
      :
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ClientListTable pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} data={clients}
                         countRecords={countRecords} isFetching={isFetching} refetch={refetch}/>
        </Grid>
      </Grid>
  )
}

export default UserList;
