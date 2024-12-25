import React from 'react';

import { Button, Typography, CircularProgress } from '@mui/material';

type FinanceSituationHeaderProps = {
  onSubmit: () => void;
  isLoading: boolean;
  handleBack: () => void;
};

const FinanceSituationHeader: React.FC<FinanceSituationHeaderProps> = ({ onSubmit, isLoading, handleBack }) => (
  <div className="flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6">
    <Typography variant="h4" className="mbe-1">
      Modifier une situation financière
    </Typography>
    <div className="flex flex-wrap max-sm:flex-col gap-4">
      <Button onClick={handleBack} variant="tonal" color="secondary">
        Annuler
      </Button>
      <Button variant="contained" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Enregistrer'}
      </Button>
    </div>
  </div>
);

export default FinanceSituationHeader;
