import React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CircularProgress} from "@mui/material";

type UserAddHeaderProps = {
  onSubmit: () => void; // Accept the onSubmit function as a prop
  isLoading: boolean;
  handleBack: () => void;
};

const UserAddHeader: React.FC<UserAddHeaderProps> = ({onSubmit, isLoading, handleBack}) => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Ajouter un Utilisateur
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button onClick={handleBack} variant='tonal' color='secondary'>
          Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>

          {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : 'Ajouter un Utilisateur'}

        </Button>
      </div>
    </div>
  );
};

export default UserAddHeader;
