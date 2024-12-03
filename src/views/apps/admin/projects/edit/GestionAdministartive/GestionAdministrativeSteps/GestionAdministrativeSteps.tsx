'use client'

import React, {useEffect, useState} from 'react'

import {useParams} from "next/navigation"

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {CircularProgress} from '@mui/material'

import {useDispatch, useSelector} from "react-redux";

import type {SuiviAdministrativeStepRead} from '@/services/IsyBuildApi';
import {useRetrieveSuiviAdministrativeDetailQuery} from '@/services/IsyBuildApi'
import StepCard from './StepCard'
import StepDetails
  from "@views/apps/admin/projects/edit/GestionAdministartive/GestionAdministrativeSteps/GestionAdministrativeStepsDetails/StepDetails";
import {setError, setLoading, setSteps} from "@/store/slices/stepSlice";
import type {RootState} from "@/store";

const GestionAdministrativeSteps = () => {

  const [step, setStep] = useState<SuiviAdministrativeStepRead | undefined>();
  const {id} = useParams();
  const [openAdd, setOpenAdd] = useState(false);

  const dispatch = useDispatch();

  // Fetch steps from Redux store
  const {steps, loading, error} = useSelector((state: RootState) => state.steps);

  const {data, error: fetchError, isLoading} = useRetrieveSuiviAdministrativeDetailQuery({
    suiviAdministrativeId: +id,
  });


  // Dispatch actions to update Redux store with fetched data
  useEffect(() => {
    if (data) {
      dispatch(setSteps(data.steps)); // Update Redux state with fetched steps
    }

    if (fetchError) {
      dispatch(setError(fetchError));
    }

    dispatch(setLoading(isLoading)); // Update loading state
  }, [data, fetchError, isLoading, dispatch]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
        <CircularProgress/>
      </Box>
    );

  if (error)
    return (
      <div className="text-red-500 p-4">
        {error ? error : 'An unexpected error occurred.'}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Administrative Steps for Project: {data?.project_lot?.project?.name}</h1>
      <Grid container spacing={3}>
        {steps?.map((step) => (
          <Grid item xs={12} sm={6} md={4} key={step.status ? step.status + step.id : step.id}>
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
