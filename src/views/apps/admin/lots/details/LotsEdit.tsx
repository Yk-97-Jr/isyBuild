'use client' // Keep this label at the top

import React, { useContext, useEffect } from 'react'

import { useParams  } from 'next/navigation'



import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'
import { CircularProgress } from '@mui/material'



import LotsCreatedBy from './LotsCreatedBy'
import LotsEditInfo from '@/views/apps/admin/lots/details/LotsEditInfo'
import LotsEditHeader from '@/views/apps/admin/lots/details/LotsEditHeader'
import LotsAbout from '@/views/apps/admin/lots/details/LotsAbout'

import type { FormValidateLotsEditType } from '@/views/apps/admin/lots/details/schemaLots'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'

import { schemaLotsEdit } from '@/views/apps/admin/lots/details/schemaLots'

import { useLotsRetrieve2Query, useLotsUpdateUpdateMutation } from '@/services/IsyBuildApi'


const LotsEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValidateLotsEditType>({
    resolver: yupResolver(schemaLotsEdit)
  })

  const { id } = useParams()

  

  const { data: lotData, isLoading: isLoadingQuery } = useLotsRetrieve2Query({
    lotId: +id
  })

  const [updateLots, { isLoading: isUpdating }] = useLotsUpdateUpdateMutation()

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
 

  useEffect(() => {
    if (lotData) {
      setValue('firstName', lotData.name)
      setValue('description', lotData.description || '')
    }
  }, [lotData, setValue])

  const onSubmit: SubmitHandler<FormValidateLotsEditType> = async data => {
    try {
      await updateLots({
        lotId: +id,
        lotCreateUpdateRequest: {
          name: data.firstName,
          description: data.description
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'lots modifié avec succès' })
      

      

    } catch (err: any) {
      console.error('Failed to update lots:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.response || 'Échec de la modification du lots'
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
          <LotsEditHeader onSubmit={handleSubmit(onSubmit)} isLoading={isUpdating}  />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <LotsEditInfo register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <LotsAbout lotData={lotData} />
            </Grid>
            <Grid item xs={12}>
              <LotsCreatedBy lotData={lotData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default LotsEdit
