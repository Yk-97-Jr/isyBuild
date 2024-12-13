import React from 'react'

// import Card from '@mui/material/Card'
import { Card, CardHeader, CardContent, Divider, Typography, CircularProgress } from '@mui/material'

import Avatar from '@mui/material/Avatar'

import { getInitials } from '@/utils/getInitials'

import type { ProjectRead } from '@/services/IsyBuildApi'

interface CreatedByProps {
  projectState: ProjectRead
  setProjectState: (value: any) => void
  isLoading: boolean
}

const getAvatar = (params: Pick<any, 'avatar' | 'email'>) => {
  const { avatar, email } = params

  if (avatar) {
    return <Avatar src={avatar} />
  } else {
    return <Avatar>{getInitials(email as string)}</Avatar>
  }
}

function CreatedBy({ projectState, isLoading }: CreatedByProps) {
  if (isLoading || !projectState || !projectState.created_by) {
    return <CircularProgress />
  }

  return (
    <Card>
      <CardHeader title='Détails De Création' />
      <CardContent className='ml-1'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Créé pare:
        </Typography>
        <Divider className='mlb-2' sx={{ height: '1px', width: '90%', marginLeft: '0' }} />
        <>
          <div className='flex items-center gap-3'>
            {getAvatar({
              avatar: projectState?.created_by?.avatar ?? '/public/images/avatars/1.png',
              email: projectState?.created_by.email ?? ''
            })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {projectState?.created_by.first_name} {projectState?.created_by.last_name}
              </Typography>
              <Typography>{projectState?.created_by.email}</Typography>
            </div>
          </div>
          <Typography variant='subtitle2' className='mt-2' fontWeight='normal'>
            Plus De Détails
          </Typography>
          <Divider className='mlb-2' sx={{ height: '1px', width: '90%', marginLeft: '0' }} />

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

// MUI Imports

// Util Imports
