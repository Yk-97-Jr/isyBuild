import React, { useState } from 'react';

import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import CustomTextField from '@core/components/mui/TextField';
import { useLotsRetrieveQuery } from '@/services/IsyBuildApi';

const TableLotsFilters = ({
  setLotsId,
  lotsId
}: {
  setLotsId: React.Dispatch<React.SetStateAction<string | ''>>;
  lotsId: string | ''
}) => {
  const [selectedLots, setSelectedLots] = useState<string>(String(lotsId)); // Default to "Tous les Lotss"

  const { data: LotssData, isLoading, error } = useLotsRetrieveQuery({
    page: 1,
    pageSize: 500,
  });

  

  // Handle dropdown change
  const handleLotsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // Get the value of the selected item

    setSelectedLots(value); // Update dropdown state
    setLotsId(value === '' ? "" : String(value)); // Update filter
  };

 

  return (
    <CardContent>
      <Grid >
        
          <CustomTextField
            select
            fullWidth
            id="Lots-select"
            value={selectedLots || '' } // Bind dropdown to state
            onChange={handleLotsChange} // Update state on change
            SelectProps={{ displayEmpty: true }}
            disabled={isLoading}
            error={!!error}
            helperText={error ? 'Erreur lors du chargement des Lots' : ''}
          >
            {/* Default option for all Lotss */}
            <MenuItem value=''>Tous les Lots</MenuItem>

            {/* Dynamically load Lotss */}
            {LotssData?.results.map((lots) => (
              <MenuItem key={lots.id} value={lots.id}>
                {lots.name}
              </MenuItem>
            ))}
          </CustomTextField>
        
      </Grid>
    </CardContent>
  );
};

export default TableLotsFilters;
