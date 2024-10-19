import React from 'react'
 
import { Card,  CardContent, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import type { LotRead } from '@/services/IsyBuildApi'
import { getInitials } from '@/utils/getInitials'

type LotsEditProps = {
  lotData: LotRead | undefined // Adjust the type as necessary
}

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getAvatar = (params: Pick<any, 'avatar' | 'email'>) => {
  const { avatar, email } = params

  if (avatar) {
    return <Avatar src={avatar} />
  } else {
    return <Avatar>{getInitials(email as string)}</Avatar>
  }
}

const LotsCreatedBy: React.FC<LotsEditProps> = ({ lotData }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Créé Par
        </Typography>
        <div className='flex items-center gap-3'>
          {getAvatar({
            avatar: lotData?.created_by?.avatar ?? '/images/avatars/1.png',
            email: lotData?.created_by.email ?? ''
          })}
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {lotData?.created_by.first_name} {lotData?.created_by.last_name}
            </Typography>
              <Typography>{lotData?.created_by.email}</Typography>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <Typography variant='subtitle2' className='font-medium mlb-2'>
              Plus de détails
            </Typography>
          </div>
          {lotData ? (
            <>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Créé à:</Typography>
                <Typography> {formatDate(lotData.created_at)}</Typography>
              </div>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Mis à jour à:</Typography>
                <Typography> {formatDate(lotData.updated_at)}</Typography>
              </div>
            </>
          ) : (
            <Typography variant='body1' color='text.secondary'>
              Aucune information disponible
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default LotsCreatedBy
