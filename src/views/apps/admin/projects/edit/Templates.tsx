'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import { CircularProgress } from '@mui/material'

import { Card, CardContent, CardHeader, Typography, Button } from '@mui/material'

import type { ProjectEmailTemplateRead } from '@/services/IsyBuildApi'


interface Templates {
  templates: ProjectEmailTemplateRead[]
  templates_loading: boolean
}

function Templates({ templates, templates_loading }: Templates) {
  const router = useRouter()

  if (!templates || templates_loading === true) {
    return (
      <div className='flex justify-center items-center h-full'>
        <CircularProgress /> {/* Indicateur de chargement */}
      </div>
    )
  }

  const handleRouts = (id: number) => {
    router.push(`${id}/templates`)
  }



  return (
    <Card>
      <CardHeader title='Templates des Email' />
      <CardContent>
        <div>
          {templates.map((Element: ProjectEmailTemplateRead) => {
            return (
              <div className='flex flex-col p-2' key={Element.id}>
                <div className='flex justify-between items-center'>
                  <Typography variant='h6' className='mt-4' fontWeight='semibold' color='text.primary'>
                    {`${Element.template_type} email `}
                  </Typography>
                  <Button
                    children='Modifier'
                    className='scale-90'
                    variant='contained'
                    onClick={() => handleRouts(Element.id)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default Templates
