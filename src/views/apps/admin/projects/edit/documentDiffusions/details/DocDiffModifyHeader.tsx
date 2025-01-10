'use client';

import React from 'react';

import { useParams, useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth } from '@/contexts/AuthContext';

type DocDiffModifyHeaderProps = {
  onSubmit: () => void; // Callback function to handle form submission
  isLoading: boolean;   // Loading state for the save button
};

const DocDiffModifyHeader: React.FC<DocDiffModifyHeaderProps> = ({ onSubmit, isLoading }) => {
  const router = useRouter();
  const { user } = useAuth();
  const userRole = user?.role;
  const {edit} = useParams()

  // Redirect to the document diffusion list on cancel
  const handleDiscard = () => {
    const redirectUrl = `/${userRole}/projects/${edit}/details?tab=Diffusions%20De%20Documents`;
    
    router.push(redirectUrl);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 sm:items-center max-sm:flex-col">
      <Typography variant="h4" className="mbe-1">
        Informations de Diffusion du Document
      </Typography>
      <div className="flex flex-wrap gap-4 max-sm:flex-col">
        <Button onClick={handleDiscard} variant="tonal" color="secondary">
          Annuler
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Enregistrer les modifications'}
        </Button>
      </div>
    </div>
  );
};

export default DocDiffModifyHeader;
