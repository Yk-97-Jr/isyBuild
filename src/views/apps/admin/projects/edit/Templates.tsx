'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import { CircularProgress, IconButton, Card, CardContent, CardHeader, Typography } from '@mui/material'


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
                    {`${Element.email_template.name} email `}
                  </Typography>
                  <IconButton onClick={() => handleRouts(Element.id)}>
                    <i className='tabler-edit text-textSecondary' />
                  </IconButton>
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
