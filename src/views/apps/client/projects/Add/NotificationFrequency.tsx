import React from 'react'


import { Card, CardHeader, CardContent } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'


//TODO ask 90% the frequency card is in the  details of the project not when we are creating the project
//ask saad to move it  (because in created project no feilds for them)

const NotificationFrequency = ({
  handleFrequency,
  handleMaxFrequency,
}: any) => {
  return (
    <Card>
      <CardHeader title='Email Frequency' />
      <CardContent>
        <CustomTextField
          type='number'
          fullWidth
          label='Notification Frequency'
          className='mbe-6'
          onChange={handleFrequency}

          //TODO   ask saad about the constraint of the freqency first

          // error={!!errors.latitude}

          // helperText={errors.latitude}

        />
        <CustomTextField
          type='number'
          fullWidth
          label='Max Notification'
          placeholder=''
          className='mbe-6'
          onChange={handleMaxFrequency}

          // error={!!errors.longitude}

          // helperText={errors.longitude}

        />
      </CardContent>
    </Card>
  )
}

export default NotificationFrequency
