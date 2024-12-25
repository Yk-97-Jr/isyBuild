'use client';

import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import type { UseFormRegister, FieldError } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField'; // Assuming you have a custom MUI TextField component

import type { FormValidateFinanceSituationUpdateType } from './schemaFinanceSituationUpdate';

type FinanceSituationFormProps = {
  register: UseFormRegister<FormValidateFinanceSituationUpdateType>;
  errors: {
    amount?: FieldError;
  };
};

const FinanceSituationUpdateForm: React.FC<FinanceSituationFormProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader title="Modifier la situation financière" />
      <CardContent>
        <Grid container spacing={6} className="mbe-6">
          {/* Amount */}
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Montant"
              placeholder="Ex. 1000.00"
              {...register('amount')}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FinanceSituationUpdateForm;
