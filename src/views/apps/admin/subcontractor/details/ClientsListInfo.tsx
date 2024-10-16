import React, { useState } from 'react'

import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material'

import type { SubcontractorRead, ClientRead } from '@/services/IsyBuildApi'

type ClientStatusProps = {
  subcontractorData: SubcontractorRead | undefined
}

const SubcontractorListInfo: React.FC<ClientStatusProps> = ({ subcontractorData }) => {
  const MAX_CLIENTS_DISPLAY = 4 // Maximum number of clients to display initially
  const clients = subcontractorData?.clients || []

  const [showAllClients, setShowAllClients] = useState(false)

  const displayedClients = showAllClients ? clients : clients.slice(0, MAX_CLIENTS_DISPLAY)

  const handleShowAllClients = () => setShowAllClients(!showAllClients)

  return (
    <Card>
      <CardHeader title='Clients' />
      <CardContent>
        {clients.length > 0 ? (
          <>
            {displayedClients.map((client: ClientRead) => (
              <div key={client.id} className='mb-4'>
                <Typography variant='h6'>{client.name}</Typography>
                <Typography variant='body1'>{client.contact_email}</Typography>
              </div>
            ))}

            {/* Toggle button to show/hide all clients */}
            {clients.length > MAX_CLIENTS_DISPLAY && (
              <Button variant='text' color='primary' fullWidth={true} onClick={handleShowAllClients}>
                {showAllClients ? 'Voir moins de clients' : 'Voir tous les clients'}
              </Button>
            )}
          </>
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
