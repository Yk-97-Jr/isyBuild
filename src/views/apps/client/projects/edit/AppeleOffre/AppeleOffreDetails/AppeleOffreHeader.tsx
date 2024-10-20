// ClientModifyHeader.tsx
import React from 'react';

import Typography from '@mui/material/Typography';

type Props = {
};

const AppeleOffreHeader: React.FC<Props> = () => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Informations Génerales sur le Appel Doffres
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        {/*<Button onClick={handleBack} variant='tonal' color='secondary'>*/}
        {/*  Annuler*/}
        {/*</Button>*/}
        {/*<Button variant='contained' onClick={onSubmit} disabled={isLoading}>*/}

        {/*  {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : 'Modifier un client'}*/}

        {/*</Button>*/}
      </div>
    </div>
  );
};

export default AppeleOffreHeader;
