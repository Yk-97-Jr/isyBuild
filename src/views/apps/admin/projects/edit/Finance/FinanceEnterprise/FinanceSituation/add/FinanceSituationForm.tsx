'use client';

// MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// Import for form handling types
import type { UseFormRegister, FieldError } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField'; // Assuming you have a custom MUI TextField component

// Import the schema type
import type { FormValidateFinanceSituationAddType } from './schemaFinanceSituationAdd';

// Define the prop types based on the form schema
type FinanceSituationProps = {
  register: UseFormRegister<FormValidateFinanceSituationAddType>;
  errors: {
    finance_enterprise_id?: FieldError;
    amount?: FieldError;
  };
};

const FinanceSituationForm: React.FC<FinanceSituationProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader title="Ajouter une situation financière" />
      <CardContent>
        <Grid container spacing={6} className="mbe-6">
          {/* Finance Enterprise ID */}
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label="Identifiant de l'entreprise"
              placeholder="Ex. 123"
              {...register('finance_enterprise_id')}
              error={!!errors.finance_enterprise_id}
              helperText={errors.finance_enterprise_id?.message}
            />
          </Grid>

          {/* Amount */}
          <Grid item xs={6}>
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

export default FinanceSituationForm;
