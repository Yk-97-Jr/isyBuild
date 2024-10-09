'use client'

import React, { useContext, useEffect } from 'react'

import { useParams } from 'next/navigation'

import Grid from '@mui/material/Grid'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'

import { CircularProgress } from '@mui/material'

import {
  useSubcontractorsStaffRetrieveQuery,
  useSubcontractorsStaffUpdatePartialUpdateMutation
} from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

import useHandleBack from '@/hooks/useHandleBack'

import type { FormValidateStaffEditType } from './schemaStaffEdit'
import StaffEditHeader from '@views/apps/client/subcontractor/staff/details/StaffEditHeader'
import StaffCreatedBy from '@views/apps/client/subcontractor/staff/details/StaffCreatedBy'
import { schemaStaffEdit } from './schemaStaffEdit'

import StaffInformation from '@views/apps/client/subcontractor/staff/details/StaffInformation'

const StaffCLientDetails = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValidateStaffEditType>({
    resolver: yupResolver(schemaStaffEdit)
  })

  const { id } = useParams() // Get clientId from route parameters

  const { data: subcontractorData, isLoading: isLoadingQuery } = useSubcontractorsStaffRetrieveQuery({
    subcontractorStaffId: +id
  })

  const [updateUser, { isLoading }] = useSubcontractorsStaffUpdatePartialUpdateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
  const handleBack = useHandleBack()

  useEffect(() => {
    if (subcontractorData && subcontractorData.user) {
      setValue('first_name', subcontractorData.user.first_name ?? '')
      setValue('last_name', subcontractorData.user.last_name ?? '')
      setValue('is_active', subcontractorData.user.is_active ?? false)
    }
  }, [subcontractorData, setValue])

  const onSubmit: SubmitHandler<FormValidateStaffEditType> = async data => {
    try {
      const response = await updateUser({
        subcontractorStaffId: +id,
        patchedSubcontractorStaffUpdateRequest: {
          user: { ...data }
        }
      }).unwrap()

      console.log('staff modifyed successfully!', response)
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'staff Modifié avec succès' })
    } catch (err: any) {
      console.error('Failed to modify staff:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.response || 'Échec de la modification de staff'
      })
    }
  }

  if (isLoadingQuery)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )

  console.log(subcontractorData?.created_by.email)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <StaffEditHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <StaffInformation register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <StaffCreatedBy subcontractorData={subcontractorData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default StaffCLientDetails
