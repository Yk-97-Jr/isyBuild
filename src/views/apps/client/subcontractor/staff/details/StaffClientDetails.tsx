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

import { schemaStaffEdit } from './schemaStaffEdit'
import StaffCreatedBy from './StaffCreatedBy'
import StaffInformation from './StaffInformation'
import StaffEditHeader from './StaffEditHeader'



const StaffCLientDetails = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValidateStaffEditType>({
    resolver: yupResolver(schemaStaffEdit)
  })

  const { staffId } = useParams()



  const { data: subcontractorStaffData, isLoading: isLoadingQuery, refetch } = useSubcontractorsStaffRetrieveQuery({
    subcontractorStaffId: +staffId
  })

  const [updateUser, { isLoading }] = useSubcontractorsStaffUpdatePartialUpdateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
  const handleBack = useHandleBack()

  useEffect(() => {console.log('Updating form values...')

    if (subcontractorStaffData && subcontractorStaffData.user) {
      console.log('User data:', subcontractorStaffData.user)
      setValue('first_name', subcontractorStaffData.user.first_name || '')
      setValue('last_name', subcontractorStaffData.user.last_name || '')
      setValue('is_active', subcontractorStaffData.user.is_active || false)
      setValue('email', subcontractorStaffData.user.email || '')
    }
  }, [subcontractorStaffData, setValue])

  const onSubmit: SubmitHandler<FormValidateStaffEditType> = async data => {
    try {
      const response = await updateUser({
        subcontractorStaffId: +staffId,
        patchedSubcontractorStaffUpdateRequest: {
          user: {
            first_name: data.first_name,
            last_name: data.last_name,
            is_active: data.is_active
          }
        }
      }).unwrap()

      console.log('staff modifyed successfully!', response)
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'staff Modifié avec succès' })
      refetch()
     
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

  console.log('++++')

  console.log('Subcontractor Data:', subcontractorStaffData)
  console.log('ID from Params:', staffId)

  console.log('++++')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <StaffEditHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <StaffInformation register={register} errors={errors} user={subcontractorStaffData} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <StaffCreatedBy subcontractorData={subcontractorStaffData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default StaffCLientDetails
