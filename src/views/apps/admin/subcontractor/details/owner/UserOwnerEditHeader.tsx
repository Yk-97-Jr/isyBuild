import React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CircularProgress} from "@mui/material";

type UserEditHeaderProps = {
  onSubmit: () => void; // Accept the onSubmit function as a prop
  isLoading: boolean;
  handleBack: () => void;
  isAdding: boolean;
};

const UserOwnerEditHeader: React.FC<UserEditHeaderProps> = ({onSubmit, isLoading, handleBack, isAdding}) => {

  
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Informations sur propriétaire
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button onClick={handleBack} variant='tonal' color='secondary'>
          Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>

          {isLoading ? <CircularProgress sx={{color: 'white'}}
                                         size={24}/> : isAdding ? 'Affecter un propriétaire' : 'Modifier un propriétaire'}

        </Button>
      </div>
    </div>
  );
};

export default UserOwnerEditHeader;
