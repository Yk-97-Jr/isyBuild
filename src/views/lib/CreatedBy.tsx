import React from 'react'


import type{ StaticImageData } from 'next/image'


import Card from '@mui/material/Card'

import CardContent from '@mui/material/CardContent'


// import Avatar from '@mui/material/Avatar'

import Typography from '@mui/material/Typography'




// import { getInitials } from '@/utils/getInitials'
// import Image from 'next/image'

//TODO add the devider and the image (mokhttar).

interface CreatedByProps {
  url?: StaticImageData
  email: string
  first_name_createdBy: string
  last_name_createdBy: string
  email_createdBy: string
  createdAt: string
  updatedAt: string
}

const CreatedByV2: React.FC<CreatedByProps> = ({
  // url,
  // email,
  first_name_createdBy,
  last_name_createdBy,
  email_createdBy,
  createdAt,
  updatedAt
}) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Créé Par
        </Typography>
        <div className='flex items-center gap-3'>
          {/* <Image src='/public/next.svg' alt='test-asmg'></Image> */}
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {first_name_createdBy} {last_name_createdBy}
            </Typography>
            <Typography>{email_createdBy}</Typography>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <Typography variant='subtitle2' className='font-medium mlb-2'>
              Plus de détails
            </Typography>
          </div>
          {/* Display created and updated dates if available */}
          {createdAt && updatedAt ? (
            <>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Créé à:</Typography>
                <Typography>{new Date(createdAt).toLocaleString('fr-FR')}</Typography>
              </div>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Mis à jour à:</Typography>
                <Typography>{new Date(updatedAt).toLocaleString('fr-FR')}</Typography>
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

export default CreatedByV2
