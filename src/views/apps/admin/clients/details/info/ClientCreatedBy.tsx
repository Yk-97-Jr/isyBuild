import React from 'react';

import { Card, CardHeader, CardContent, Divider, Typography } from '@mui/material';

import type { ClientRead } from "@/services/IsyBuildApi";

type ClientEditProps = {
  clientData: ClientRead | undefined; // Adjust the type as necessary
};

const ClientCreatedBy: React.FC<ClientEditProps> = ({ clientData }) => {
  return (
    <Card>
      <CardHeader title='Créé par' />
      <CardContent>
        <Typography variant="subtitle2" className='mt-4' fontWeight="normal">Créé par</Typography>
        <Divider className='mlb-2' sx={{ height: '1px', width: '50%', marginLeft: '0' }} />

        {clientData ? (
          <>
            <Typography variant="h6" fontWeight="bold">
              {clientData.created_by?.first_name} {clientData.created_by?.last_name}
            </Typography>
            <Typography variant="body1">{clientData.created_by?.email}</Typography>

            <Typography variant="subtitle2" className='mt-4' fontWeight="normal">Plus De Détails</Typography>
            <Divider className='mlb-2' sx={{ height: '1px', width: '50%', marginLeft: '0' }} />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>Créé à:</Typography>
                <Typography>{clientData.created_at}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>Mise à jour à:</Typography>
                <Typography>{clientData.updated_at}</Typography>
              </div>
            </div>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary">Aucune information disponible</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientCreatedBy;
