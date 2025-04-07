'use client';

// MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import type {UseFormRegister, FieldError} from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField';
import type {FormValidateClientAddType} from "@views/apps/admin/clients/add/shemaClientAdd";

// Type imports for form handling

type ClientInformationProps = {
  register: UseFormRegister<FormValidateClientAddType>; // Adjust the type as necessary
  errors: {
    clientName?: FieldError;
    sireneNumber?: FieldError;
    email?: FieldError;
    phoneNumber?: FieldError;
  };
};

const ClientInformation: React.FC<ClientInformationProps> = ({register, errors}) => {
  return (
    <Card>
      <CardHeader title='Information Client'/>
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label='Nome'
              placeholder='Nome'
              {...register('clientName')} // Registering the field
              error={!!errors.clientName} // Error handling
              helperText={errors.clientName?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label='Numéro De Sirene'
              placeholder='Numéro De Sirene'
              {...register('sireneNumber')}
              error={!!errors.sireneNumber}
              helperText={errors.sireneNumber?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='E-mail'
              placeholder='email@example.com'
              {...register('email')} // Registering the field
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Téléphone'
              placeholder='Téléphone'
              {...register('phoneNumber')} // Registering the field
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ClientInformation;
 