'use client'

import React, { useContext } from 'react'

import { useParams } from 'next/navigation'

import Grid from '@mui/material/Grid'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import StaffAddHeader from '@/views/apps/admin/subcontractor/staff/add/StaffAddHeader'

/* import AddLotToCompany from '@/views/apps/admin/Staff/add/AddLotToCompany' */

import StaffInfo from '@/views/apps/admin/subcontractor/staff/add/StaffInfo'
import { useSubcontractorsStaffCreateCreateMutation } from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import type { FormValidateStaffAddType } from './SchemaStaffAdd'
import { schemaStaffAdd } from './SchemaStaffAdd'
import useHandleBack from '@/hooks/useHandleBack'

const StaffAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateStaffAddType>({
    resolver: yupResolver(schemaStaffAdd)
  })

  const [createStaff, { isLoading }] = useSubcontractorsStaffCreateCreateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const { id } = useParams()

  console.log(id)

  const handleBack = useHandleBack()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  const onSubmit: SubmitHandler<FormValidateStaffAddType> = async data => {
    try {
      await createStaff({
        subcontractorStaffCreateRequest: {
          user: {
            first_name: data.first_name, // Correct field names
            last_name: data.last_name,
            email: data.email,
            is_active: data?.is_active || false, // Optional field
            redirect_uri: appUrl + '/set-password' // Add a valid value
          }
        },
        subcontractorId: +id
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'entreprise ajouté avec succès' })
    } catch (err: any) {
      console.error('Failed to add entreprise:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.data?.message || 'Échec de la création de entreprise'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <StaffAddHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack} />
        </Grid>
        <Grid item xs={12} md={15}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <StaffInfo register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default StaffAdd
