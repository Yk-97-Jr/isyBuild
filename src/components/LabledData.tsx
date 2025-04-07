import React from 'react';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

type LabeledDataProps = {
  label: string;
  value?: string | number; // Optional value if chipProps is used
  chipProps?: {
    label: string;
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning';
    variant?: 'filled' | 'outlined' | 'tonal'; // Include 'tonal' for MUI v6+
  };
};

const LabeledData: React.FC<LabeledDataProps> = ({ label, value, chipProps }) => (
  <div className="flex items-center gap-4">
    <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full">
      <div className="flex flex-col">
        <Typography className="font-medium" color="text.primary">
          {label}
        </Typography>
      </div>
      {chipProps ? (
        <Chip
          label={chipProps.label}
          color={chipProps.color || 'default'}
          variant={chipProps.variant || 'outlined'}
        />
      ) : (
        <Typography>{value}</Typography>
      )}
    </div>
  </div>
);

export default LabeledData;
