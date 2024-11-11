'use client'

// components/UserList.js
import React, {useEffect, useState} from 'react'

import {useParams} from "next/navigation";

import Grid from '@mui/material/Grid'

import {CircularProgress} from '@mui/material'

import Box from '@mui/material/Box'

import type {ProjectLotRead} from '@/services/IsyBuildApi';
import { useProjectLotsSubcontractorsRetrieve2Query} from '@/services/IsyBuildApi'
import LotsSubListTable
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/list/LotsSubListTable";

type Props = {
  projectLotData: ProjectLotRead | undefined; // Adjust the type as necessary
};

const LotsSubList: React.FC<Props> = ({projectLotData}) => {
  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const {id} = useParams(); // Get clientId from route parameters


  // Pass parameters to the query hook
  const {data, error, isLoading, isFetching, refetch} = useProjectLotsSubcontractorsRetrieve2Query({
    page, pageSize,
    projectLotId: +id
  })

  useEffect(() => {
    refetch();
    setPage(1)
  }, [pageSize]);


  useEffect(() => {
    refetch();
  }, [page]);


  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress/>
      </Box>
    )
  if (error)
    return (
      <div>
        Error fetching user data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )
  const projectLotsSubs = data?.results || []
  const countRecords = data?.count


  return isFetching ? (
    <LotsSubListTable
      pageSize={pageSize}
      setPageSize={setPageSize}
      page={page}
      setPage={setPage}
      data={projectLotsSubs}
      countRecords={countRecords}
      isFetching={isFetching}
      refetch={refetch}
      projectLotData={projectLotData}
    />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LotsSubListTable
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          data={projectLotsSubs}
          countRecords={countRecords}
          isFetching={isFetching}
          refetch={refetch}
          projectLotData={projectLotData}
        />
      </Grid>
    </Grid>
  )
}

export default LotsSubList
