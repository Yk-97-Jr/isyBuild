import React, { useState } from 'react';

import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import CustomTextField from '@core/components/mui/TextField';
import { useClientsRetrieveQuery } from '@/services/IsyBuildApi';

const TableClientFilters = ({
  setClientId,
  clientId
}: {
  setClientId: React.Dispatch<React.SetStateAction<string | ''>>;
  clientId: string | ''
}) => {
  const [selectedClient, setSelectedClient] = useState<string>(String(clientId)); // Default to "Tous les clients"

  const { data: clientsData, isLoading, error } = useClientsRetrieveQuery({
    page: 1,
    pageSize: 500,
  });

  

  // Handle dropdown change
  const handleClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // Get the value of the selected item

    setSelectedClient(value); // Update dropdown state
    setClientId(value === '' ? "" : String(value)); // Update filter
  };

 

  return (
    <CardContent>
      <Grid container spacing={6}>
      <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id="client-select"
            value={selectedClient || '' } // Bind dropdown to state
            onChange={handleClientChange} // Update state on change
            SelectProps={{ displayEmpty: true }}
            disabled={isLoading}
            error={!!error}
            helperText={error ? 'Erreur lors du chargement des clients' : ''}
          >
            {/* Default option for all clients */}
            <MenuItem value=''>Tous les clients</MenuItem>

            {/* Dynamically load clients */}
            {clientsData?.results.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TableClientFilters;
