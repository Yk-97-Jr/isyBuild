

import React, {  useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Card, CardHeader, CardContent, Typography,  Box, Grid, MenuItem,  } from '@mui/material';

import type { FieldError, UseFormRegister } from 'react-hook-form';

import CustomTextField from '@/@core/components/mui/TextField';
import type { FormValidateDocDiffUpdateType } from './schemaDocDiffEdit';
import type { LocalisationRead, StatusE51Enum, Type474Enum } from '@/services/IsyBuildApi';
import CustomIconButton from '@/@core/components/mui/IconButton';
import { useAuth } from '@/contexts/AuthContext';
import LabeledData from '@/components/LabledData';
import {  getStatus } from '@/utils/statusHelper';
import { StatusE51Mapping, Type474Mapping } from '@/utils/statusEnums';

type DocDiffTypeAndLotProps = {
  type: Type474Enum; // Document type
  lot?: string;  // Project lot
  date?:string | null;
  indice?:string | null;
  status?:StatusE51Enum;
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

  const [types, ] = useState<keyof typeof Type474Mapping>(
                type
              );
              
            const {
              label,
              color
            } = getStatus<Type474Enum >(types, Type474Mapping);

            const {
              label:labelStatus,
              color:colorStatus
            } = getStatus<StatusE51Enum >(status, StatusE51Mapping);

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
      
      {/* Render Type */}
      {type && (
        <LabeledData
          label="Type"
          chipProps={{ label: label, color: color, variant: 'tonal' }}
        />
      )}

      {/* Render Lot */}
      {lot && (
        <LabeledData
          label="Lot"
          value={lot}
        />
      )}

      {/* Render Status */}
      {status ? (
        <LabeledData
          label="Statut"
          chipProps={{ label: labelStatus, color: colorStatus, variant: 'tonal' }}
        />
      ) : (
        <Typography variant="body1" color="textSecondary">
          Aucune information disponible
        </Typography>
      )}

      {/* Render Date */}
      {date && (
        <LabeledData
          label="Date De Diffusion"
          value={date}
        />
      )}

      {/* Render Indice */}
      {indice ? (
        <LabeledData
          label="Indice"
          value={indice}
        />
      ) : (
        <Box display="flex" alignItems="center" className="mb-1">
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        </Box>
      )}

      {/* Handle case where no data is available */}
      {!type && !lot && (
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
