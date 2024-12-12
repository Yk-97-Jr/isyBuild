import React, { useState } from 'react';

import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import CustomTextField from '@core/components/mui/TextField';
import { useCategoriesListQuery } from '@/services/IsyBuildApi';

const TableCategoryFilters = ({
  setCategoryId,
  categoryId
}: {
  setCategoryId: React.Dispatch<React.SetStateAction<string | ''>>;
  categoryId: string | ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(String(categoryId)); // Default to "Toutes les Catégories"

  const { data: categoriesData, isLoading, error } = useCategoriesListQuery({
    page: 1,
    pageSize: 500,
  });

  // Handle dropdown change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // Get the value of the selected item

    setSelectedCategory(value); // Update dropdown state
    setCategoryId(value === '' ? "" : String(value)); // Update filter
  };

  return (
    <CardContent>
      <Grid container spacing={6}>
      <Grid item xs={12} sm={4}>
        <CustomTextField
          select
          fullWidth
          id="category-select"
          value={selectedCategory || ''} // Bind dropdown to state
          onChange={handleCategoryChange} // Update state on change
          SelectProps={{ displayEmpty: true }}
          disabled={isLoading}
          error={!!error}
          helperText={error ? 'Erreur lors du chargement des Catégories' : ''}
        >
          {/* Default option for all categories */}
          <MenuItem value=''>Toutes les Catégories</MenuItem>

          {/* Dynamically load categories */}
          {categoriesData?.results.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TableCategoryFilters;
