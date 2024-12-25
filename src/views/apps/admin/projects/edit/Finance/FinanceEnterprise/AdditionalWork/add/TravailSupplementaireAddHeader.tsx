import React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';

type TravailSupplementaireAddHeaderProps = {
  onSubmit: () => void; // Function to handle form submission
  isLoading: boolean; // Loading state to show spinner
  handleBack: () => void; // Function to handle back navigation
};

const TravailSupplementaireAddHeader: React.FC<TravailSupplementaireAddHeaderProps> = ({
  onSubmit,
  isLoading,
  handleBack,
}) => {
  return (
    <div className="flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6">
      <div>
        <Typography variant="h4" className="mbe-1">
          Ajouter un Travail Supplémentaire
        </Typography>
      </div>
      <div className="flex flex-wrap max-sm:flex-col gap-4">
        {/* Back Button */}
        <Button onClick={handleBack} variant="tonal" color="secondary">
          Annuler
        </Button>

        {/* Submit Button */}
        <Button variant="contained" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <CircularProgress sx={{ color: 'white' }} size={24} />
          ) : (
            'Ajouter un Travail Supplémentaire'
          )}
        </Button>
      </div>
    </div>
  );
};

export default TravailSupplementaireAddHeader;
