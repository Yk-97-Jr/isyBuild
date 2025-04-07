import React from 'react'

import { Card, CardHeader, CardContent,  Typography } from '@mui/material'



type LotStausProps = {
  client: string | undefined
}

const ClinetCard: React.FC<LotStausProps> = ({ client }) => {
  return (
    <Card>
      <CardHeader title='Détails' />
      <CardContent>
        <div className='flex items-center gap-2'>
          <div className='flex items-center flex-wrap gap-2'>
            {client ? (
              <>
                <Typography variant='h6' fontWeight='medium'>
                  Client: {client}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant='body1' color='text.secondary' className=' font-medium text-[15px] leading-[22px] '>
                  Aucune information disponible
                </Typography>
              </>
            )}
          </div>
        </div>
      
      </CardContent>
    </Card>
  )
}

export default ClinetCard
