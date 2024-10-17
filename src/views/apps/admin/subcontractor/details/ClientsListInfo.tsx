import React from 'react'

import { Card, CardHeader, CardContent, Typography } from '@mui/material'

import type { SubcontractorRead, ClientRead } from '@/services/IsyBuildApi'

type ClientStausProps = {
  subcontractorData: SubcontractorRead | undefined
}

const SubcontractorListInfo: React.FC<ClientStausProps> = ({ subcontractorData }) => {
  return (
    <Card>
      <CardHeader title='Clients' />
      <CardContent className='mlb-2'>
        {subcontractorData?.clients && subcontractorData.clients.length > 0 ? (
          subcontractorData.clients.map((client: ClientRead) => (
            <div key={client.id} className='mb-4'>
              <Typography variant='h6' fontWeight='bold'>
                {client.name}
              </Typography>
              <Typography variant='body1'>{client.contact_email}</Typography>
            </div>
          ))
        ) : (
          <Typography variant='body1' color='textSecondary'>
            No clients available
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default SubcontractorListInfo
