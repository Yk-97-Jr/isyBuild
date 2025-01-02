

import React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Card, CardHeader, CardContent, Typography, Chip, Box, Grid, MenuItem,  } from '@mui/material';

import type { FieldError, UseFormRegister } from 'react-hook-form';

import CustomTextField from '@/@core/components/mui/TextField';
import type { FormValidateDocDiffUpdateType } from './schemaDocDiffEdit';
import type { LocalisationRead } from '@/services/IsyBuildApi';
import CustomIconButton from '@/@core/components/mui/IconButton';
import { useAuth } from '@/contexts/AuthContext';

type DocDiffTypeAndLotProps = {
  type?: string; // Document type
  lot?: string;  // Project lot
  date?:string | null;
  indice?:string | null;
  status?:string;
   register: UseFormRegister<FormValidateDocDiffUpdateType>;
    errors: {
      title?: FieldError;
      phase?: FieldError;
      localisation?: FieldError;
    };
    localisations: LocalisationRead; // Adjust this type if necessary
    localisation?: LocalisationRead[]

};

const DocDiffTypeAndLotInfo: React.FC<DocDiffTypeAndLotProps> = ({register, errors, localisations, localisation, type, lot, date,indice,status }) => {

  const router = useRouter();
  const { edit,docDiffId } = useParams()
  const { user } = useAuth()
  const userRole = user?.role
  
  const handleRedirect = () => {
    // Get the current URL
    

    // Construct the new URL with the query parameter
    const newUrl = `/${userRole}/locations/add?return_to=${userRole}/projects/${edit}/details/documentDiffusions/${docDiffId}/details`;

    // Redirect to the new URL
    router.push(newUrl);
  };

  return (
    <Card>
      <CardHeader title="Informations du Document" />
      <CardContent className='flex flex-col gap-[1.638rem]'>
      {type && (
          <div className='flex items-center gap-4'>
          <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
            <div className='flex flex-col'>
            <Box display="flex" alignItems="center"className="mb-1">

            <Typography variant="body1" mr={2}>
              Type de Document: 
            </Typography>
            </Box>
            </div>
              <Chip label={type} color="primary" variant='tonal' />
            </div>
          </div>
        )}
        {/* Display Project Lot */}
     
        {lot && (
           <div className='flex items-center gap-4'>
           <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
             <div className='flex flex-col'>
         <Box display="flex" alignItems="center"className="mb-1">
           <Typography variant="body1" >
             Lot de Projet:
           </Typography>
         </Box>
           </div>
           <Typography variant="subtitle1" ml={2} >
             {lot}
           </Typography>
         </div>
       </div>
        )}
    
        {status ? (
         <div className='flex items-center gap-4'>
         <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
           <div className='flex flex-col'>
         <Box display="flex" alignItems="center"className="mb-1">
           <Typography variant="body1" >
           Statut:
           </Typography>
         </Box>
           </div>
           <Typography variant="subtitle1" ml={2} >
             <Chip label={status} color="primary" variant='tonal' />
           </Typography>
         </div>
       </div>
        ) : <Typography variant="body1" color="textSecondary">
        Aucune information disponible
      </Typography>}
        {date && (
         <div className='flex items-center gap-4'>
         <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
           <div className='flex flex-col'>
         <Box display="flex" alignItems="center"className="mb-1">
           <Typography variant="body1" >
             Date De Diffusion:
           </Typography>
         </Box>
         </div>
           <Typography variant="subtitle1" ml={2} >
             {date}
           </Typography>
         </div>
       </div>
        )}
      
        {indice ? (
         <div className='flex items-center gap-4'>
         
         <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
           <div className='flex flex-col'>
           <Typography variant="body1" >
           Indice:
           </Typography>
           </div>
           <Typography variant="subtitle1" ml={2} >
             {indice}
           </Typography>
         </div>
   
       </div>
        ) :
        <Box display="flex" alignItems="center"className="mb-1">

        <Typography variant="body1" color="textSecondary">
        Aucune information disponible
      </Typography>
        </Box> 
      }
        {/* Handle case where no data is available */}
        {!type && !lot  && (
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        )}
    
        <Grid container spacing={6} className="mbe-8">
                   
                 <Grid item xs={12}>
                 <div className="flex items-end gap-4 mb-8">

          <CustomTextField 
    select
    fullWidth
    label="Localisation"
    defaultValue={localisations?.id }
    {...register('localisation')}
    error={!!errors.localisation}
    helperText={errors.localisation?.message}
    >
    <MenuItem value="">
      <em>Sélectionnez une localisation</em>
    </MenuItem>
    {localisation?.map((location) => (
      <MenuItem key={location.id} value={location.id}>
        {location.name}
      </MenuItem>
    ))}
  </CustomTextField>
  <CustomIconButton
        variant="tonal"
        color="primary"
        className="min-is-fit"
        onClick={handleRedirect}
        
        >
        <i className="tabler-plus" />
      </CustomIconButton>
        </div>
    </Grid>
</Grid>

      
      </CardContent>
    </Card>
  );
};

export default DocDiffTypeAndLotInfo;
