import React from 'react';

import { Card, CardHeader, CardContent, Divider, Typography } from '@mui/material';

import type {SubcontractorStaffRead} from "@/services/IsyBuildApi";

type UserEditProps = {
  userStaffData: SubcontractorStaffRead | undefined; // Adjust the type as necessary
};

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);


return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const UserStaffCreatedBy: React.FC<UserEditProps> = ({ userStaffData }) => {
  return (
    <Card>
      <CardHeader title='Détails De Création' />
      <CardContent>
        <Typography variant="subtitle2" className='mt-4' fontWeight="normal">Créé par</Typography>
        <Divider className='mlb-2' sx={{ height: '1px', width: '50%', marginLeft: '0' }} />

        {userStaffData ? (
          <>
            <Typography variant="h6" fontWeight="bold">
              {userStaffData.created_by?.first_name} {userStaffData.created_by?.last_name}
            </Typography>
            <Typography variant="body1">{userStaffData.created_by?.email}</Typography>

            <Typography variant="subtitle2" className='mt-4' fontWeight="normal">Plus De Détails</Typography>
            <Divider className='mlb-2' sx={{ height: '1px', width: '50%', marginLeft: '0' }} />

            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>Créé à:</Typography>
                <Typography>{formatDate(userStaffData.created_at)}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>Mise à jour à:</Typography>
                <Typography>{formatDate(userStaffData.updated_at)}</Typography>
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

export default UserStaffCreatedBy;
