

import React from 'react';

import { Card, CardHeader, CardContent, Typography, Chip, Box, Grid, MenuItem, Divider } from '@mui/material';

import type { FieldError, UseFormRegister } from 'react-hook-form';

import CustomTextField from '@/@core/components/mui/TextField';
import type { FormValidateDocDiffUpdateType } from './schemaDocDiffEdit';
import type { LocalisationRead } from '@/services/IsyBuildApi';
import CustomIconButton from '@/@core/components/mui/IconButton';

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
  return (
    <Card>
      <CardHeader title="Informations du Document" />
      <CardContent>
      {type && (
          <div className="mb-4">
            <Box display="flex" alignItems="center"className="mb-1">

            <Typography variant="body1" mr={2}>
              Type de Document: 
            </Typography>
              <Chip label={type} color="primary" variant='tonal' />
            </Box>
            
          </div>
        )}
        {/* Display Project Lot */}
        <Divider className='mbe-4'/>
        {lot && (
         <div>
         <Box display="flex" alignItems="center"className="mb-1">
           <Typography variant="body1" >
             Lot de Projet:
           </Typography>
           <Typography variant="subtitle1" ml={2} >
             {lot}
           </Typography>
         </Box>
       </div>
        )}
        <Divider className='mbe-4'/>
        {status ? (
         <div>
         <Box display="flex" alignItems="center"className="mb-1">
           <Typography variant="body1" >
           Statut:
           </Typography>
           <Typography variant="subtitle1" ml={2} >
             {status}
           </Typography>
         </Box>
       </div>
        ) : <Typography variant="body1" color="textSecondary">
        Aucune information disponible
      </Typography>}
        {date && (
         <div>
         <Box display="flex" alignItems="center"className="mb-1">
           <Typography variant="body1" >
             Date De Diffusion:
           </Typography>
           <Typography variant="subtitle1" ml={2} >
             {date}
           </Typography>
         </Box>
       </div>
        )}
        <Divider className='mbe-4'/>
        {indice ? (
         <div>
         <Box display="flex" alignItems="center"className="mb-1">
           <Typography variant="body1" >
           Indice:
           </Typography>
           <Typography variant="subtitle1" ml={2} >
             {indice}
           </Typography>
         </Box>
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
        <Divider className='mbe-4'/>
        <Grid container spacing={6} className="mbe-6">
                   
                 <Grid item xs={12}>
                 <div className="flex items-end gap-4">

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
