import React from 'react'

import { Card, CardHeader, CardContent, Divider, Typography } from '@mui/material'

import type { LotRead } from '@/services/IsyBuildApi'

type LotStausProps = {
  lotData: LotRead | undefined
}

const LotsAbout: React.FC<LotStausProps> = ({ lotData }) => {
  return (
    <Card>
      <CardHeader title='à propos' />
      <CardContent>
        <div className='flex items-center gap-2'>
          <i className='tabler-user' />
          <div className='flex items-center flex-wrap gap-2'>
            {lotData?.client?.name ? (
              <>
                <Typography variant='h6' fontWeight='medium'>
                  Client: {lotData.client.name}
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
        <Divider className='mlb-2' />
      </CardContent>
    </Card>
  )
}

export default LotsAbout
