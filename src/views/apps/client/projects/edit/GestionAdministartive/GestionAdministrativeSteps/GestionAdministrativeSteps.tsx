'use client'

import React from 'react'

import { useParams } from "next/navigation"

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'

import { useRetrieveSuiviAdministrativeDetailQuery } from '@/services/IsyBuildApi'
import StepCard from './StepCard'

const GestionAdministrativeSteps = () => {
  const { id } = useParams()

  const { data, error, isLoading } = useRetrieveSuiviAdministrativeDetailQuery({
    suiviAdministrativeId: +id,
  })

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )

  if (error)
    return (
      <div className="text-red-500 p-4">
        Error fetching user data:{' '}
        {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
      </div>
    )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Administrative Steps for Project: {data?.project_lot?.project?.name}</h1>
      <Grid container spacing={3}>
        {data?.steps?.map((step) => (
          <Grid item xs={12} sm={6} md={4} key={step.id}>
            <StepCard step={step} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default GestionAdministrativeSteps
