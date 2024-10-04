import React from 'react'

// import Card from '@mui/material/Card'
import { Card, CardHeader, CardContent, Divider, Typography } from '@mui/material'

import { CircularProgress } from '@mui/material'

import type{ ProjectRead } from '@/services/IsyBuildApi'



interface CreatedByProps {
  projectState: ProjectRead
  setProjectState: (value: any) => void
  isLoading: boolean
}

function CreatedBy({ projectState, isLoading }: CreatedByProps) {
  if (isLoading || !projectState || !projectState.created_by) {
    return <CircularProgress />
  }

  return (
    <Card>
      <CardHeader title='Détails De Création' />
      <CardContent>
        <Typography variant='subtitle2' className='mt-4' fontWeight='normal'>
          Créé pare:
        </Typography>
        <Divider className='mlb-2' sx={{ height: '1px', width: '50%', marginLeft: '0' }} />
        <>
          <Typography variant='h6' fontWeight='bold'>
            Client Name:{` ${projectState.created_by.first_name}  ${projectState.created_by.last_name}`}
          </Typography>
          <Typography variant='h6' className='font-medium' color='text.primary'>
            Client Email: {projectState.client.contact_email}
          </Typography>

          <Typography variant='subtitle2' className='mt-4' fontWeight='normal'>
            Plus De Détails
          </Typography>
          <Divider className='mlb-2' sx={{ height: '1px', width: '50%', marginLeft: '0' }} />

          <div className='flex flex-col gap-2'>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Créé à: {new Date(projectState.created_at).toLocaleString()}
              </Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Mise à jour à: {new Date(projectState.updated_at).toLocaleString()}
              </Typography>
            </div>
          </div>
        </>
      </CardContent>
    </Card>
  )
}

export default CreatedBy
