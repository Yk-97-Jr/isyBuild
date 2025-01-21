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
import type { FormValidateDocDiffAddType } from './schemaDocDiffAdd';
import type { ProjectLotRead } from '@/services/IsyBuildApi';

type DocumentDiffusionInfoProps = {
  register: UseFormRegister<FormValidateDocDiffAddType>;
  errors: {
    title?: FieldError;
    phase?: FieldError;
    type?: FieldError;
    localisation?: FieldError;
    project_lot_id?: FieldError;
  };
  projectLots?: ProjectLotRead[]; // Adjust this type if necessary
};

const DocDiffInfo: React.FC<DocumentDiffusionInfoProps> = ({ register, errors, projectLots }) => {
  return (
    <Card>
      <CardHeader title="Informations de diffusion de document" />
      <CardContent>
        <Grid container spacing={6} className="mbe-6">
          {/* Title Input */}
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="Titre"
              placeholder="Entrez le titre"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          {/* Project Lot Dropdown */}
          <Grid item xs={12} sm={6}>
            <CustomTextField
              select
              fullWidth
              label="Lot "
              defaultValue=""
              {...register('project_lot_id')}
              error={!!errors.project_lot_id}
              helperText={errors.project_lot_id?.message}
            >
              <MenuItem value="">
                <em>Sélectionnez un lot</em>
              </MenuItem>
              {projectLots?.map((lots) => (
                <MenuItem key={lots.id} value={lots.id}>
                  {lots.lot.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          {/* Type Dropdown */}
          <Grid item xs={12} sm={6}>
            <CustomTextField
              select
              fullWidth
              label="Type"
              defaultValue=""
              {...register('type')}
              error={!!errors.type}
              helperText={errors.type?.message}
            >
              <MenuItem value="">
                <em>Sélectionnez un type</em>
              </MenuItem>
              {['plan_technique', 'plan_de_coffrage', 'fiche_technique', 'avis_technique', 'note_de_calcul', 'fiche_question', 'autre'].map((type) => (
                <MenuItem key={type} value={type}>
                  {type.replaceAll('_',' ')}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          {/* Phase Dropdown */}
          <Grid item xs={12} sm={6}>
            <CustomTextField
              select
              fullWidth
              label="Phase"
              defaultValue=""
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
