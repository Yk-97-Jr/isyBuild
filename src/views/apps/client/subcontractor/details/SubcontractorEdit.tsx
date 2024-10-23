'use client' // Keep this label at the top

import React, { useContext, useEffect } from 'react'

import { useParams } from 'next/navigation'

import Grid from '@mui/material/Grid'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'

import { CircularProgress } from '@mui/material'

import SubcontractorInformation from '@/views/apps/client/subcontractor/details/subcontractorInformation'
import SubcontractorStatus from '@/views/apps/client/subcontractor/details/SubcontractorStatus'
import SubcontractorAdresse from '@/views/apps/client/subcontractor/details/SubcontractorAdresse'

import type { FormValidateSubcontractorEditType } from '@/views/apps/client/subcontractor/details/schemaSubcontractorEdit'
import { schemaSubcontractorEdit } from '@/views/apps/client/subcontractor/details/schemaSubcontractorEdit'



import SubcontractorModifyHeader from '@/views/apps/client/subcontractor/details/SubcontractorModifyHeader'

import type { SnackBarContextType } from '@/types/apps/snackbarType'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import { useSubcontractorsRetrieve2Query, useSubcontractorsUpdateUpdateMutation } from '@/services/IsyBuildApi' // Query to fetch Subcontractor data
import SubcontractorOwner from './SubcontractorOwner'

/* import SubcontractorListInfo from './ClientsListInfo' */
import SubcontractorCreatedBy from './SubcontractorCreatedBy'
import StaffList from '../staff/list/StaffList'

const SubcontractorEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValidateSubcontractorEditType>({
    resolver: yupResolver(schemaSubcontractorEdit)
  })
 
  const { id } = useParams() // Get subcontractorId from route parameters

  const { data: subcontractorData, isLoading: isLoadingQuery } = useSubcontractorsRetrieve2Query({
    subcontractorId: +id
  })

  const [updateSubcontractor, { isLoading: isUpdating }] = useSubcontractorsUpdateUpdateMutation()

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
  

  useEffect(() => {
    if (subcontractorData) {
      // Populate form fields with fetched data
      setValue('subcontractorName', subcontractorData.name)
      setValue('sireneNumber', subcontractorData.siren_number)
      setValue('address.streetNumber', subcontractorData.address?.street_number)
      setValue('address.streetName', subcontractorData.address?.street_name)
      setValue('address.postal_code', subcontractorData.address?.postal_code)
      setValue('address.city', subcontractorData.address?.city)
      setValue('address.department', subcontractorData.address?.department || '')
      setValue('address.country', subcontractorData.address?.country || '')
      setValue('email', subcontractorData.contact_email)
      setValue('phoneNumber', subcontractorData.phone_number)
      setValue('is_active', subcontractorData.is_active as boolean)
    }
  }, [subcontractorData, setValue])

  const onSubmit: SubmitHandler<FormValidateSubcontractorEditType> = async data => {
    try {
      // Call the mutation to update the subcontractor
      await updateSubcontractor({
        subcontractorId: +id,
        subcontractorUpdateRequest: {
          // Include the updated subcontractor fields here
          name: data.subcontractorName,
          siren_number: data.sireneNumber,

          address: {
            street_number: data.address.streetNumber,
            street_name: data.address.streetName,
            postal_code: data.address.postal_code,
            city: data.address.city,
            department: data.address.department,

            // region: data.address.region | null,
            country: data.address.country
          },
          contact_email: data.email,
          phone_number: data.phoneNumber,
          is_active: data.is_active
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'entreprise modifié avec succès' })

      // Optionally, redirect after successful submission
    } catch (err: any) {
      console.error('Failed to update entreprise:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.response || 'Échec de la modification du entreprise'
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
          <SubcontractorModifyHeader onSubmit={handleSubmit(onSubmit)} isLoading={isUpdating}  />
        </Grid>
        <Grid item xs={12} md={8.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <SubcontractorInformation register={register} errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <SubcontractorAdresse register={register} errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <StaffList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3.5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <SubcontractorOwner subcontractorData={subcontractorData} />
            </Grid>
            <Grid item xs={12}>
              <SubcontractorStatus register={register} errors={errors} setValue={setValue} subcontractorData={subcontractorData} selectedLotIds={[]}/>
            </Grid>
            {/* <Grid item xs={12}>
              <SubcontractorListInfo subcontractorData={subcontractorData} />
            </Grid> */}
            <Grid item xs={12}>
              <SubcontractorCreatedBy subcontractorData={subcontractorData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default SubcontractorEdit
