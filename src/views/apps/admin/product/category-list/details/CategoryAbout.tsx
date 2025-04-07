import React, { useState } from 'react';

import { Card, CardHeader, CardContent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import CustomTextField from '@core/components/mui/TextField';
import type { CategoryRead } from '@/services/IsyBuildApi';

type CategoryStausProps = {
  categoryData: CategoryRead | undefined;
};

const CategoryAbout: React.FC<CategoryStausProps> = () => {
  // States
  const [status, setStatus] = useState('1');

  return (
    <Card>
      <CardHeader title="Détails" />
      <CardContent>

          <CustomTextField
            select
            fullWidth
            label="Catégorie parente"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {/* Placeholder-like MenuItem */}
            <MenuItem value="1" disabled >
              Sélectionnez la catégorie parente
            </MenuItem>
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Scheduled">Scheduled</MenuItem>
          </CustomTextField>
        
      </CardContent>
    </Card>
  );
};

export default CategoryAbout;
