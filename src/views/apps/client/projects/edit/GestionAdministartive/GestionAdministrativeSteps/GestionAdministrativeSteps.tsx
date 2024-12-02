'use client'

import React, {useState} from 'react'

import {useParams} from "next/navigation"

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {CircularProgress} from '@mui/material'

import type {SuiviAdministrativeStepRead} from '@/services/IsyBuildApi';
import { useRetrieveSuiviAdministrativeDetailQuery} from '@/services/IsyBuildApi'
import StepCard from './StepCard'
import StepDetails
  from "@views/apps/client/projects/edit/GestionAdministartive/GestionAdministrativeSteps/GestionAdministrativeStepsDetails/StepDetails";

const GestionAdministrativeSteps = () => {
  const {id} = useParams()
  const [openAdd, setOpenAdd] = useState(false)
  const [step, setStep] = useState<SuiviAdministrativeStepRead | undefined>();

  const {data, error, isLoading} = useRetrieveSuiviAdministrativeDetailQuery({
    suiviAdministrativeId: +id,
  })

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress/>
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
            <StepCard step={step} setStep={setStep} setOpenAdd={setOpenAdd} openAdd={openAdd}/>
          </Grid>
        ))}
      </Grid>
      <StepDetails
        open={openAdd}
        setOpen={setOpenAdd}
        step={step}
      />
    </div>
  )
}

export default GestionAdministrativeSteps
