import React, { useState } from 'react'

import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material'

import type { SubcontractorRead, ClientRead } from '@/services/IsyBuildApi'
import LabeledData from '@/components/LabledData'

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
      <CardContent className='flex flex-col gap-[1.638rem]'>
        {clients.length > 0 ? (
          <>
            {displayedClients.map((client: ClientRead) => (
              <div key={client.id} className='flex flex-col gap-[1.638rem]'>
                      <LabeledData label="Client"  chipProps={{
    label: client.name ,
    color: "primary" ,
    variant: 'tonal',
  }}/>
   <LabeledData label="Email"  value={client.contact_email}/>
  
            
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
