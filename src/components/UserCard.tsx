import React from 'react'

import Typography from '@mui/material/Typography'

import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@/@core/components/mui/Avatar'


interface UserCardProps {
  firstName: string | undefined
  lastName: string | undefined
  avatar?: string | undefined
  email: string | undefined
}

const UserCard: React.FC<UserCardProps> = ({ firstName, lastName, avatar, email }) => {
  const getAvatar = (avatar: string | undefined, customerName: string | undefined) => {
    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(customerName || '')}
        </CustomAvatar>
      )
    }
  }

  const frenchMessage = 'Créé par informations manquantes';

  // Check if any critical data is missing
  const isDataMissing = !firstName || !lastName || !email;

  return (
    <div className="flex items-center gap-3">
      {isDataMissing ? (
        <Typography color="error" variant='subtitle2' className="font-thin">
          {frenchMessage}
        </Typography>
      ) : (
        <>
          {getAvatar(avatar, firstName)}
          <div className="flex flex-col">
            <Typography color="text.primary"  className="font-medium">
              {lastName} {firstName}
            </Typography>
            <Typography variant="body2">{email}</Typography>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard
