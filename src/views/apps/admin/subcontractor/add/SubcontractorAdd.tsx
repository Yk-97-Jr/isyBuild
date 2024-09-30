'use client'

import React, { useContext } from 'react'

import Grid from '@mui/material/Grid'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import SubcontractorAddHeader from '@/views/apps/admin/subcontractor/add/SubcontractorAddHeader'
import SubcontractorAdresse from '@/views/apps/admin/subcontractor/add/SubcontractorAdresse'

/* import AddLotToCompany from '@/views/apps/admin/subcontractor/add/AddLotToCompany' */

import SubcontractorInfo from '@/views/apps/admin/subcontractor/add/SubcontractorInfo'
import { useSubcontractorsCreateCreateMutation } from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import type { FormValidateSubcontractorAddType } from './SchemaSubcontractorAdd'
import { schemaSubcontractorAdd } from './SchemaSubcontractorAdd'
import ClientStatus from '@/views/apps/admin/subcontractor/add/AddLotToCompany'

const SubcontractorAdd = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateSubcontractorAddType>({
    resolver: yupResolver(schemaSubcontractorAdd)
  })

  const [createSubcontractor, { isLoading }] = useSubcontractorsCreateCreateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const onSubmit: SubmitHandler<FormValidateSubcontractorAddType> = async data => {
    try {
        await createSubcontractor({
        subcontractorCreateRequest: {
          name: data.subcontractorName,
          siren_number: data.sireneNumber,
          address: {
            street_number: data.address.streetNumber, // updated key
            street_name: data.address.streetName, // updated key
            country: data.address.country, // updated key
            city: data.address.city, // unchanged
            department: data.address.department || null, // allow null
            // unchanged
            postal_code:data.address.postal_code
          },
          contact_email: data.email,
          phone_number: data.phoneNumber,
          is_active: data?.is_active || false,
          lots_ids: data.lots_ids,
          client_id: data.client_id
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'entreprise ajouté avec succès' })
    } catch (err: any) {
      console.error('Failed to add entreprise:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.response?.data?.message || 'Échec de la création de entreprise'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SubcontractorAddHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} reset={reset} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <SubcontractorInfo register={register} errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <SubcontractorAdresse register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientStatus register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default SubcontractorAdd
