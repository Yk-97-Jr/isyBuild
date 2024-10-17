'use client'

// React/Next.js imports
import React, { useState, useEffect, useContext } from 'react'

import type { FormEvent } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useForm,  type SubmitHandler } from 'react-hook-form'


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
import type { ProjectEmailTemplateRead } from '@/services/IsyBuildApi'

// API Hook
import { useProjectsTemplatesRetrieveQuery } from '@/services/IsyBuildApi'

import { useProjectsTemplatesUpdateUpdateMutation } from '@/services/IsyBuildApi'

import type { EmailTemplateUpdateRequest } from '@/services/IsyBuildApi'

import type { templateSchemaType } from './templatesSchema'

import { Schema } from './templatesSchema'

import { useProjectsTemplatesResetCreateMutation } from '@/services/IsyBuildApi'

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

  const [templateContent, setTemplateContent] = useState<ProjectEmailTemplateRead | undefined>(undefined)

  const { data: projectTemplates, isLoading, error } = useProjectsTemplatesRetrieveQuery({ templateId: templateId })

  const [new_template, set_new_template] = useState<EmailTemplateUpdateRequest>({
    name: templateContent?.email_template.name || '',
    subject_template: templateContent?.email_template.subject_template || ' ',
    header_template: templateContent?.email_template.header_template || '',
    body_template: templateContent?.email_template.body_template || '',
    footer_template: templateContent?.email_template.footer_template || ''
  })

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const [trigger_Reset] =
    useProjectsTemplatesResetCreateMutation()

  useEffect(() => {
    if (projectTemplates) {
      setTemplateContent(projectTemplates)
    }
  }, [projectTemplates])

  const handlesubject_template = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    set_new_template({ ...new_template, subject_template: event.target.value })
  }

  const handleheader_template = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    set_new_template({ ...new_template, header_template: event.target.value })
  }

  const handlebody_template = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    set_new_template({ ...new_template, body_template: event.target.value })
    console.log(new_template.body_template)
  }

  const handlefooter_template = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    set_new_template({ ...new_template, footer_template: event.target.value })
  }

  const [update_trigger_function] = useProjectsTemplatesUpdateUpdateMutation()

  useEffect(() => {
    if (templateContent) {
      set_new_template({
        ...new_template,
        name: templateContent.email_template.name,
        subject_template: templateContent.email_template.subject_template,
        header_template: templateContent.email_template.header_template,
        body_template: templateContent.email_template.body_template,
        footer_template: templateContent.email_template.footer_template
      })
      reset({
        subject: templateContent.email_template.subject_template ?? '',
        header: templateContent.email_template.header_template ?? '',
        body: templateContent.email_template.body_template ?? '',
        footer: templateContent.email_template.footer_template ?? ''
      })
    }
  }, [templateContent, reset])

  const handleSave: SubmitHandler<templateSchemaType> = async () => {
    const updated_Data: EmailTemplateUpdateRequest = {
      name: new_template.name || '',
      subject_template: new_template.subject_template || '',
      header_template: new_template.header_template || '',
      body_template: new_template.body_template || '',
      footer_template: new_template.footer_template || ''
    }

    const response = await update_trigger_function({
      templateId,
      projectEmailTemplateUpdateRequest: { email_template: updated_Data }
    })

    if (response) {
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'Modification avec succe' })
      window.location.reload()
    } else {
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'error', message: 'Error de modification' })
    }
  }

  //TODO waiting saad to create the endpoints
  //Done
  const handleReset = async (event: FormEvent) => {

    event.preventDefault()

    try {
      const response = await trigger_Reset({ templateId }).unwrap()

      if (isLoading) {
        return (
          <div className='flex justify-center items-center'>
            <CircularProgress />
          </div>
        )
      }

      if (response) {
        if (templateContent) {
          set_new_template({
            name: templateContent.email_template.name || '',
            subject_template: templateContent.email_template.subject_template || '',
            header_template: templateContent.email_template.header_template || '',
            body_template: templateContent.email_template.body_template || '',
            footer_template: templateContent.email_template.footer_template || ''
          })
        }
      }
      
      setOpenSnackBar(true)

      setInfoAlert({ severity: 'success', message: 'Template has been reset successfully.' })

      window.location.reload()

    } 
    catch (error) 
    {

      setOpenSnackBar(true)

      setInfoAlert({ severity: 'error', message: 'Failed to reset the template.' })

    }
  }

  //DONE
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
    <Card>
      <div className='flex sm:flex-row  flex-col w-full justify-between items-center '>
        <CardHeader title={templateContent?.email_template.name} />
        <div className='flex flex-wrap max-sm:flex-col gap-4 px-5 w-full sm:w-auto'>
          <Button variant='tonal' color='secondary' onClick={handleCancel}>
            Annuler
          </Button>
          <Button variant='tonal' onClick={handleReset}>
            Reinitialiser
          </Button>
          <Button variant='contained' onClick={handleSubmit(handleSave)}>
            Modifier
          </Button>
        </div>
      </div>
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='Objet'
              {...register('subject')}
              defaultValue={templateContent?.email_template.subject_template}
              error={!!errors.subject}
              helperText={errors.subject?.message}
              onChange={handlesubject_template}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='Modèle'
              {...register('header')}
              defaultValue={templateContent?.email_template.header_template}
              error={!!errors.header}
              helperText={errors.header?.message}
              onChange={handleheader_template}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='Contenu'
              {...register('body')}
              defaultValue={templateContent?.email_template.body_template}
              error={!!errors.body}
              helperText={errors.body?.message}
              onChange={handlebody_template}
              multiline
              rows={8}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='Pied'
              {...register('footer')}
              defaultValue={templateContent?.email_template.footer_template}
              error={!!errors.footer}
              helperText={errors.footer?.message}
              onChange={handlefooter_template}
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Templates
