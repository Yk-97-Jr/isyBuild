'use client';

// MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';

// Components Imports
import type { UseFormRegister, FieldError } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField';

// Types
import type { FormValidateDocDiffUpdateType } from './schemaDocDiffEdit';
import type { PhaseEnum, LocalisationRead } from '@/services/IsyBuildApi';

type DocumentDiffusionUpdateProps = {
  register: UseFormRegister<FormValidateDocDiffUpdateType>;
  errors: {
    title?: FieldError;
    phase?: FieldError;
    localisation?: FieldError;
  };
  localisations: LocalisationRead; // Adjust this type if necessary
  localisation?: LocalisationRead[]
  phaseValue?: PhaseEnum
};

const DocDiffInfo: React.FC<DocumentDiffusionUpdateProps> = ({ register, errors, localisations, localisation, phaseValue }) => {
  console.log(localisations);

  return (
    <Card>
      <CardHeader title="Mise à jour des informations de diffusion" />
      <CardContent>
        <Grid container spacing={6} className="mbe-6">
          {/* Title Input */}
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Titre"
              placeholder="Entrez le titre"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>
          {/* Title Input */}
          <Grid item xs={12}>
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
</Grid>

{/* Phase Dropdown */}
<Grid item xs={12} >
  <CustomTextField
    select
    fullWidth
    label="Phase"
    defaultValue={phaseValue }
    {...register('phase')}
    error={!!errors.phase}
    helperText={errors.phase?.message}
  >
    <MenuItem value="">
      <em>Sélectionnez une phase</em>
    </MenuItem>
    {['design', 'execution'].map((phase) => (
      <MenuItem key={phase} value={phase}>
        {phase.charAt(0).toUpperCase() + phase.slice(1)}
      </MenuItem>
    ))}
  </CustomTextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DocDiffInfo;
