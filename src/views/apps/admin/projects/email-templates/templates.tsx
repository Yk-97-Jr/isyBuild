'use client'

// React/Next.js imports
import React, { useEffect, useContext } from 'react'

import type { FormEvent } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useForm, type SubmitHandler } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'

import { CircularProgress, Button } from '@mui/material'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// API Types

// API Hook
import {
  useProjectsTemplatesRetrieveQuery,
  useProjectsTemplatesUpdateUpdateMutation,
  useProjectsTemplatesResetCreateMutation
} from '@/services/IsyBuildApi'

import type { templateSchemaType } from './templatesSchema'

import { Schema } from './templatesSchema'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'

import type { SnackBarContextType } from '@/types/apps/snackbarType'

const Templates = () => {
  const params = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<templateSchemaType>({
    resolver: yupResolver(Schema)
  })

  const templateId: number = parseInt(params?.templates.toString())

  const router = useRouter()

  const { data: projectTemplates, isLoading, error } = useProjectsTemplatesRetrieveQuery({ templateId: templateId })

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const [trigger_Reset] = useProjectsTemplatesResetCreateMutation()

  const [update_trigger_function] = useProjectsTemplatesUpdateUpdateMutation()

  useEffect(() => {
    if (projectTemplates) {
      reset({
        subject: projectTemplates.email_template.subject_template ?? '',
        header: projectTemplates.email_template.header_template ?? '',
        body: projectTemplates.email_template.body_template ?? '',
        footer: projectTemplates.email_template.footer_template ?? ''
      })
    }
  }, [projectTemplates, reset])

  const handleSave: SubmitHandler<templateSchemaType> = async data => {
    const updated_Data = {
      name: projectTemplates?.email_template.name || '',
      subject_template: data.subject,
      header_template: data.header,
      body_template: data.body,
      footer_template: data.footer
    }

    const response = await update_trigger_function({
      templateId,
      projectEmailTemplateUpdateRequest: { email_template: updated_Data }
    })

    if (response) {
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'Modification avec succès' })

      window.location.reload()
    } else {
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'error', message: 'Erreur de modification' })
    }
  }

  const handleReset = async (event: FormEvent) => {
    event.preventDefault()

    try {
        //no need to await the response 
      const response = await trigger_Reset({ templateId }).unwrap()
      if (response) {
        reset({
          subject: projectTemplates?.email_template.subject_template ?? '',
          header: projectTemplates?.email_template.header_template ?? '',
          body: projectTemplates?.email_template.body_template ?? '',
          footer: projectTemplates?.email_template.footer_template ?? ''
        })
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'success', message: 'Template has been reset successfully.' })

        window.location.reload()
      }
    } catch (error) {
      setOpenSnackBar(true)
      
      setInfoAlert({ severity: 'error', message: 'Failed to reset the template.' })
    }
  }

  function handleCancel(event: FormEvent) {
    event.preventDefault()
    router.back()
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Typography variant='h6' color='error'>
          Error loading template.
        </Typography>
      </div>
    )
  }

  return (
    <div>
      <div className='flex sm:flex-row flex-col w-full justify-between items-center '>
        <CardHeader title={projectTemplates?.email_template.name} />
        <div className='flex flex-wrap max-sm:flex-col gap-4 px-5 w-full sm:w-auto'>
          <Button variant='tonal' color='secondary' onClick={handleCancel}>
            Annuler
          </Button>
          <Button variant='tonal' onClick={handleReset}>
            Réinitialiser
          </Button>
          <Button variant='contained' onClick={handleSubmit(handleSave)}>
            Modifier
          </Button>
        </div>
      </div>
      <Card>
        <CardContent>
          <Grid container spacing={6} className='mbe-6'>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Objet'
                {...register('subject')}
                error={!!errors.subject}
                helperText={errors.subject?.message}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Modèle'
                {...register('header')}
                error={!!errors.header}
                helperText={errors.header?.message}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Contenu'
                {...register('body')}
                error={!!errors.body}
                helperText={errors.body?.message}
                multiline
                rows={8}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Pied'
                {...register('footer')}
                error={!!errors.footer}
                helperText={errors.footer?.message}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default Templates
