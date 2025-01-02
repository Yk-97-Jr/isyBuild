import React from 'react';

import { Card, CardContent, CardHeader, Grid, MenuItem, Typography } from '@mui/material';

import type { UseFormRegister, FieldError } from 'react-hook-form';

import { useClientsRetrieveQuery } from '@/services/IsyBuildApi';
import CustomTextField from '@core/components/mui/TextField';
import type { FormValidateSubcontractorAddType } from './SchemaSubcontractorAdd';

type ClientStatusProps = {
  register: UseFormRegister<FormValidateSubcontractorAddType>;
  errors: {
    client_id?: FieldError;
  };
};

const TableClient = ({ register, errors }: ClientStatusProps) => {
  // Fetch clients data
  const { data: clientsData, isLoading, error } = useClientsRetrieveQuery({
    page: 1,
    pageSize: 500,
  });

  return (
    <Card className="mbe-12">
      <CardHeader title="ajouter client " />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Grid>
          <CustomTextField
            select
            fullWidth
            label='client'
            id="client-select"
            {...register("client_id")} // Register the client_id field with react-hook-form
            SelectProps={{ displayEmpty: true }}
            disabled={isLoading}
            error={!!errors.client_id?.message}
            helperText={error ? 'Erreur lors du chargement des clients' : ''}
          >
            <MenuItem value="">
              <Typography>No client selected</Typography>
            </MenuItem>

            {clientsData?.results.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                <Typography>{client.name}</Typography>
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TableClient;
