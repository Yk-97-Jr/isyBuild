'use client' // Keep this label at the top

import React, { useContext, useEffect } from 'react'

import { useParams  } from 'next/navigation'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'
import { CircularProgress } from '@mui/material'

import LocationsCreatedBy from './LocationsCreatedBy'



import type { FormValidateLocationsEditType } from '@/views/apps/admin/locations/details/schemaLocations'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'

import { schemaLocationsEdit } from '@/views/apps/admin/locations/details/schemaLocations'

import { useLocalisationDetailQuery, useLocalisationUpdateMutation } from '@/services/IsyBuildApi'
import LocationsEditHeader from './LocationsEditHeader'
import LocationsEditInfo from './locationsEditInfo'

const LocationsEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValidateLocationsEditType>({
    resolver: yupResolver(schemaLocationsEdit)
  })

  const { id } = useParams()

  const { data: locationData, isLoading: isLoadingQuery, refetch } = useLocalisationDetailQuery({
    localisationId: +id
  })

  const [updateLocations, { isLoading: isUpdating }] = useLocalisationUpdateMutation()

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  useEffect(() => {
    if (locationData) {
      setValue('firstName', locationData.name)
    }
  }, [locationData, setValue])

  const onSubmit: SubmitHandler<FormValidateLocationsEditType> = async data => {
    try {
      await updateLocations({
        localisationId: +id,
        localisationUpdateRequest: {
          name: data.firstName,
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'locations modifié avec succès' })
      refetch()
    } catch (err: any) {
      console.error('Failed to update locations:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.response || 'Échec de la modification du locations'
      })
    }
  }

  if (isLoadingQuery)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <LocationsEditHeader onSubmit={handleSubmit(onSubmit)} isLoading={isUpdating}  />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <LocationsEditInfo register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <LocationsCreatedBy locationData={locationData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default LocationsEdit
