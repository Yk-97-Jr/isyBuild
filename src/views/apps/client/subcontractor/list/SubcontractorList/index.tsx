'use client'

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Grid from '@mui/material/Grid';
import { CircularProgress, Box} from '@mui/material';

import { useDebounce } from '@uidotdev/usehooks';

import type { SortingState } from '@tanstack/react-table';



import SubcontractorTable from '@/views/apps/client/subcontractor/list/SubcontractorTable';
import { useSubcontractorsRetrieveQuery } from '@/services/IsyBuildApi';

const SubcontractorList = () => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isActive, setIsActive] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [clientId, setClientId] = useState<string | ''>('');
  const [lotsId, setLotsId] = useState<string | ''>('');
  const debouncedSearch = useDebounce(search, 500);

  const clientIds = clientId ? clientId.toString() : undefined;
  const lotIds = lotsId ? lotsId.toString() : undefined;

  const router = useRouter()
  

 

  // Pass parameters to the query hook
  const { data, error, isLoading, isFetching, refetch } = useSubcontractorsRetrieveQuery({ page, pageSize,isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    ordering: sorting.map((s) => `${s.desc ? '-' : ''}${s.id}`)
    .join(',') as any,search: debouncedSearch ,clientIds,lotIds })

    useEffect(() => {
      refetch();
      setPage(1)
    }, [pageSize, sorting, isActive,debouncedSearch,clientIds,lotIds ]);

   
    

  useEffect(() => {
    refetch()
  }, [page, pageSize, refetch])


   // Handle error state in a separate effect
 useEffect(() => {
  if (error) {
    // Redirect to the SomethingWrong page if an error occurs
    router.push('/something-wrong'); // Adjust the URL as needed
  }
}, [error, router]);

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )
  if (error)
    return (
      <div>
        Error fetching user data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const users = data?.results || []
  const countRecords = data?.count

  

  return isFetching ? (
    <SubcontractorTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={users}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
      setSorting={setSorting}
          sorting={sorting}
          setIsActive={setIsActive}
          isActive={isActive}
          search={search}
          setSearch={setSearch}
          setClientId={setClientId}
          clientId={clientId}
          lotsId={lotsId}
          setLotsId={setLotsId}
          
    />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubcontractorTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={users}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          setSorting={setSorting}
          sorting={sorting}
          setIsActive={setIsActive}
          isActive={isActive}
          search={search}
          setSearch={setSearch}
          setClientId={setClientId}
          clientId={clientId}
          lotsId={lotsId}
          setLotsId={setLotsId}
          
        />
      </Grid>
    </Grid>
  )
}

export default SubcontractorList




/* // Define an interface for the error data structure you expect
interface ErrorData {
  message?: string;
}
 */
/* if (error) {

  // Redirect to the SomethingWrong page
   // Adjust the URL as needed
  
 // Prevent rendering anything while redirecting


  let errorMessage = 'An unexpected error occurred. Please try again later.'

  // Check if the error has a specific structure
  if ('status' in error) {
    if (typeof error.data === 'string') {
      // Handle string error data
      const messageMatch = error.data.match(/<h1>(.*?)<\/h1>/);

      errorMessage = messageMatch ? messageMatch[1] : 'Somthing went wrong: Please try again later.'
    } else if (error.data && typeof error.data === 'object') {
      // Assert the type of error.data
      const errorData = error.data as ErrorData;

      errorMessage = errorData.message || 'Error fetching subcontractor data.'
    }
  } else if ('message' in error) {
    // Handle SerializedError
    errorMessage = error.message || 'An unexpected error occurred.'
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh'>
      <Typography variant="h6" color="error">
        {errorMessage}
      </Typography>
      <Button variant="contained" color="primary" onClick={refetch}>
        Retry
      </Button>
    </Box>
  ) 
}*/