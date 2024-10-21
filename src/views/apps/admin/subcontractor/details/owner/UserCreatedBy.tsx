import React from 'react';

import { Card,  CardContent,  Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar'

import type {UserRead} from "@/services/IsyBuildApi";
import { getInitials } from '@/utils/getInitials'

type UserEditProps = {
  userData: UserRead | undefined; // Adjust the type as necessary
};

/* const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
} */

const getAvatar = (params: Pick<any, 'avatar' | 'email'>) => {
  const { avatar, email } = params

  if (avatar) {
    return <Avatar src={avatar} />
  } else {
    return <Avatar>{getInitials(email as string)}</Avatar>
  }
}

const UserCreatedBy: React.FC<UserEditProps> = ({ userData }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Créé Par
        </Typography>
        <div className='flex items-center gap-3'>
          {getAvatar({
            avatar: userData?.avatar ?? '/images/avatars/1.png',
            email: userData?.email ?? ''
          })}
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {/* {userData?.created_by.first_name} {userData?.created_by.last_name} */}
            </Typography>
              <Typography>{/* {userData?.created_by.email} */}</Typography>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <Typography variant='subtitle2' className='font-medium mlb-2'>
              Plus de détails
            </Typography>
          </div>
          {userData ? (
            <>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Créé à:</Typography>
                <Typography> {/* {formatDate(userData.created_at)} */}</Typography>
              </div>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Mis à jour à:</Typography>
                <Typography> {/* {formatDate(userData.updated_at)} */}</Typography>
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
};

export default UserCreatedBy;
