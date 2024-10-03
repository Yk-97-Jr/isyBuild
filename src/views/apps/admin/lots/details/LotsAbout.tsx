import React from 'react'

import { Card, CardHeader, CardContent, Divider, Typography, Icon } from '@mui/material'

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
            {lotData?.client ? (
              <>
                <Typography variant='h6' fontWeight='bold'>
                  Client:{lotData.client.name}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant='body1' color='text.secondary'>
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
